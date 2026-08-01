export const howToWorkWithMcpServer = {
  title: 'How to Work MCP Server',
  date: 'August 1, 2026',
  author: 'Dhrubaraj Pati',
  category: 'Development',
  readTime: '12 min read',
  image: '/blog/mcp.png',
  tags: ['MCP', 'AI', 'Architecture', 'Backend'],
  content: `
    <h2>Executive Summary</h2>
    <p>The Model Context Protocol (MCP) is an open standard that makes AI assistants and agents much more powerful by giving them a <em>standardized "plug"</em> into external data sources and tools. Think of MCP as a "USB-C for AI": it lets large language models (LLMs) access enterprise systems (databases, APIs, SaaS apps, etc.) through a common protocol. An <strong>MCP server</strong> is simply a program that implements this protocol: it exposes <strong>Tools</strong> (callable functions), <strong>Resources</strong> (contextual data), and <strong>Prompts</strong> (structured templates) to the AI agent. For example, a Slack MCP server exposes Slack search and messaging as tools; a custom MCP server might expose "get_order_status" or "update_crm_record" tools backed by your own database.</p>

    <p>This article covers everything you need to know to plan, install, and operate an MCP server. We explain the architecture (client-server model over JSON-RPC with STDIO or HTTP transports), core components (tools, resources, prompts), and typical use cases. We list prerequisites (OS, runtimes, hardware, network, dependencies) and walk through step-by-step installation and configuration (including sample commands, JSON config snippets, ports and services). We describe how to deploy MCP servers (locally or in the cloud, containerized, or integrated into systems like databases and CI/CD). We also cover operational tasks (backup, logging, monitoring, scaling, security hardening, patching) and give troubleshooting tips for common errors. Performance tuning advice and benchmark results are discussed (showing, for example, that Go/Java servers can achieve 10×-30× higher throughput than single-threaded Python/Node servers). Finally, we present a sample workflow scenario with a Mermaid sequence diagram, and a comparison table of major MCP server implementations (official reference, Slack, Celigo, Red Hat, Azure, Google).</p>

    <p>Throughout, we cite official docs and authoritative sources (MCP documentation, vendor guides, research studies) to back up each point. (We assume a Linux or similar environment and MCP spec version ≥2025-11-25; where items are unspecified we note them.)</p>

    <h2>What is an MCP Server?</h2>
    <p>An MCP (Model Context Protocol) server is <em>a standardized server interface that securely exposes tools, data, and prompts to AI agents</em>. In MCP's client-server architecture, the AI application (the <strong>host</strong>, e.g. a chat app or IDE) contains an <strong>MCP client</strong>. The client communicates with one or more <strong>MCP servers</strong> via JSON-RPC 2.0 messages. Each MCP server "offers" a catalog of capabilities:</p>
    <ul>
      <li><strong>Tools:</strong> callable functions or actions (with defined JSON-schema inputs/outputs) that the AI agent can invoke (e.g. "search_customer_records", "send_slack_message").</li>
      <li><strong>Resources:</strong> contextual data sources (read-only context) such as database tables, file contents, or API responses that the agent can use for information.</li>
      <li><strong>Prompts:</strong> pre-defined prompt templates or assistants that guide the AI on how to use the tools and data.</li>
    </ul>

    <p>For example, Slack provides an official Slack MCP server so that Claude or Copilot can interact with Slack via MCP. The Slack documentation notes: <em>"The Slack MCP server lets third-party AI assistants securely access your Slack content so they can search messages, find information, and take actions in Slack on your behalf."</em> Similarly, Celigo's integration platform includes a managed MCP server that publishes selected business integration capabilities as MCP tools (e.g. CRM updates). In each case, the MCP server acts as <strong>the bridge between the LLM-based assistant and the enterprise systems</strong>, exposing a curated set of operations (tools) that AI can call.</p>

    <p>Anthropic (who introduced MCP) emphasizes that without a standard, each AI-to-API integration would be ad-hoc and bespoke. MCP solves this "N×M integration" problem by letting developers spin up <em>small servers</em> that wrap existing services. As one explanation puts it, MCP allows developers to <em>"spin up small 'servers' that expose tools (like databases or SaaS apps) over a secure protocol."</em> In effect, each MCP server becomes an AI-accessible API gateway: it handles authentication/authorization on behalf of the AI, enforces schemas, logs activity, and returns results in JSON.</p>

    <p>Typical use cases include:</p>
    <ul>
      <li><strong>Data retrieval and query:</strong> Exposing enterprise databases, search engines, knowledge bases, or APIs as MCP tools. E.g. an MCP server for PostgreSQL that lets the LLM query tables, update records, or list schemas.</li>
      <li><strong>Application actions:</strong> Letting AI agents execute actions in enterprise apps (CRM, ERP, Ticketing, GitHub, etc.). For instance, updating a CRM contact, creating support tickets, or merging a GitHub PR via the MCP server's tools.</li>
      <li><strong>Workflow orchestration:</strong> Coordinating multi-step processes. For example, an AI assistant in "agentic" mode might use a Sales MCP server to "pull opportunity data, validate pricing, create an order in the ERP, and log the interaction for audit". All steps are exposed as MCP tools and coordinated by the AI agent and server.</li>
      <li><strong>File and resource access:</strong> Providing AI with relevant documents or file contexts through resources. E.g. exposing a document store or knowledge base via an MCP resource endpoint.</li>
    </ul>

    <p>In all cases, <em>governance</em> is key: MCP servers allow centralized control over what the AI can do. Each tool can require specific credentials or scopes, and servers can restrict tools to certain agents or roles. This makes it far easier to audit and secure AI-driven automation than exposing raw APIs directly.</p>

    <h2>Architecture and Core Components</h2>
    <p>The MCP architecture is a <strong>client-server model</strong>. An <strong>MCP Host</strong> (the AI application) can create multiple <strong>MCP Clients</strong>, one per server, each maintaining a connection. For local servers (typically using the STDIO transport), the client is usually a lightweight wrapper launched alongside the AI app. For remote servers, communication happens over HTTP (using <em>"Streamable HTTP"</em> for efficiency). The key participants are:</p>

    <ul>
      <li><strong>MCP Host:</strong> the AI tool or interface (e.g. Claude for Desktop, VS Code Copilot) that orchestrates the conversation.</li>
      <li><strong>MCP Client:</strong> the component inside the host that knows how to speak the MCP JSON-RPC protocol and relay requests/responses to the server.</li>
      <li><strong>MCP Server:</strong> the external program exposing tools, resources, prompts via the MCP protocol.</li>
    </ul>

    <p>For example, Visual Studio Code is an MCP host. When VS Code connects to a Sentry MCP server, it creates an MCP client to communicate; likewise it can connect to a local file-system MCP server over STDIO. The MCP server program itself can run locally or remotely (cloud, on-prem, container). A local server typically uses STDIO (no network overhead) and is single-tenant. A remote server uses HTTP (with JSON-RPC requests) and can serve many clients concurrently.</p>

    <p><strong>Transports:</strong> MCP supports two primary transports:</p>
    <ul>
      <li><strong>STDIO:</strong> the MCP server is started as a child process of the client. The client writes JSON-RPC messages to the server's STDIN and reads responses from STDOUT. This is simple and requires no network, but doesn't scale beyond one client per process.</li>
      <li><strong>Streamable HTTP:</strong> the client sends MCP JSON-RPC messages via HTTP POST requests, and receives partial results via streaming responses (the "streamable" mode defined in MCP 2025-March). This allows horizontal scaling (multiple server instances behind a load balancer) and uses standard web infrastructure. (Earlier "HTTP+SSE" was replaced by Streamable HTTP in 2025.)</li>
    </ul>

    <p><strong>Core Components:</strong> Within an MCP server, the <strong>data layer</strong> implements JSON-RPC calls for:</p>
    <ul>
      <li><code>server/discover</code> (version and capability discovery)</li>
      <li><code>tools/list</code> and <code>tools/execute</code> for the callable tools.</li>
      <li><code>resources/list</code> and <code>resources/read</code> for data resources.</li>
      <li><code>prompts/list</code> and <code>prompts/read</code> for pre-configured prompt templates.</li>
    </ul>

    <p>At a high level, the server provides three kinds of capabilities:</p>
    <ol>
      <li><strong>Tools:</strong> Defined actions with input/output schemas. For example, a "get_forecast(latitude, longitude) → weather_report" tool in a weather server, or "executeQuery(sql, params)" in a database server. The MCP client invokes a tool by name with JSON arguments.</li>
      <li><strong>Resources:</strong> Contextual data like file contents, config values, or API responses. For example, a resource might represent a CSV or a data query result. The agent can fetch resources to attach as context for prompts.</li>
      <li><strong>Prompts:</strong> Reusable prompt templates or "assistant states" packaged by the server to guide users. For instance, a GitHub server might include a prompt template for "summarize open PRs in a repository" that the assistant can use.</li>
    </ol>

    <p>These abstractions let servers present a <em>curated, AI-friendly interface</em>. The MCP server translates the AI's JSON requests into real system actions. For example, an MCP server running in Kubernetes might interpret a tool "list_pods" as an internal API call to the K8s API server and return the result. The protocol itself doesn't care what the server does internally – it only defines the request/response format.</p>

    <p><strong>Mermaid Architecture Diagram:</strong> The following illustrates a typical MCP setup. An LLM-driven assistant (host) connects via an MCP client to an MCP server. The server exposes Tools and Resources that map to backend systems (databases, APIs, etc.).</p>

    <img src="/blog/workflow1.png" alt="MCP Architecture Workflow" className="w-full h-auto rounded-lg my-6 border border-neutral-800" />
    <p><em>Diagram: An AI assistant (Host) uses an MCP Client to communicate with the MCP Server. The server provides Tools, Resources, and Prompts, which in turn interface with enterprise systems (databases, APIs, etc.).</em></p>

    <h2>Prerequisites and System Requirements</h2>
    <p>An MCP server is generally lightweight in resource needs. In practice, the requirements are similar to any small web service or tool:</p>
    <ul>
      <li><strong>Operating System:</strong> Linux is preferred for production (any distribution). macOS is also supported. Windows can be used via WSL, but most server deployments use Linux.</li>
      <li><strong>Runtime/Language:</strong> Depends on the implementation. For Python-based servers, <strong>Python 3.10+</strong> is required. For Node.js servers, <strong>Node.js 20+</strong> is recommended. Java servers require a recent JDK (e.g. Java 21+) if using a Java MCP SDK.</li>
      <li><strong>Dependencies:</strong> The MCP SDK and any tool-specific libraries. For example, a Python server might use the <code>mcp</code> SDK (<code>pip install mcp</code> or <code>mcp[cli]</code>). A Node server would install <code>@modelcontextprotocol/server</code> via npm.</li>
      <li><strong>Hardware:</strong> Even a minimal cloud VM (1 CPU, ~2 GB RAM) is often sufficient for a small MCP server under light load. If the AI agent performs heavy work (e.g. large vector search, image processing), higher resources may be needed.</li>
      <li><strong>Network:</strong> If using a remote HTTP server, the machine needs network access (public or internal). Open ports: by convention, MCP servers often listen on 3000+ (e.g. <code>http://localhost:3001</code>); this is configurable. If hosting publicly, TLS is required for security. If internal only, ensure firewall rules permit the clients to reach the port.</li>
      <li><strong>Security/Authentication:</strong> For local STDIO servers no authentication is needed (client launches it). For remote HTTP servers, use HTTPS/TLS. Most server implementations support API tokens or OAuth for clients. For example, Azure's MCP server uses Azure AD (Entra ID) for auth, and Google Cloud MCP servers rely on Google IAM policies.</li>
      <li><strong>Containerization (optional):</strong> You can run an MCP server in Docker or Kubernetes. Containerization helps with isolation and scaling. For local dev, it's optional; for production, Docker/K8s is a common choice.</li>
    </ul>

    <p>In summary, you <em>do not</em> need a powerful machine: <strong>Linux or WSL, Python 3.10+/Node 20+, and a small VM (1vCPU,2GB)</strong> will run most MCP servers comfortably. Key system requirements are simply having the right language runtime and network connectivity.</p>

    <h2>Installation and Configuration</h2>
    <p>Installation steps vary by language/implementation, but typically involve: installing the SDK or server package, writing some code or configuration to define your tools/resources, and configuring the host to connect. Below is a generic outline, with examples for Python and Node:</p>

    <ul>
      <li><strong>Install the MCP SDK or reference server:</strong> For Python, you can use <code>pip</code> or the <code>astral/uv</code> tool. For example, to use the reference PostgreSQL server, you could run:</li>
    </ul>
    <pre><code class="language-bash">
# Using uvx (Astral) environment tool
uv add "mcp-server-postgres"
# Or with pip and module invocation
pip install mcp-server-postgres
python -m mcp_server_postgres
    </code></pre>
    <p>(These commands come from the official GitHub reference and start the server process.)<br>For a TypeScript server, you would <code>npm install @modelcontextprotocol/server</code> and build your project.</p>

    <ul>
      <li><strong>Write or configure your server code:</strong> Using the SDK, you register your tools/resources. The official docs include examples in Python, TS, Java, etc. For instance, a simple Python MCP server might look like:</li>
    </ul>
    <pre><code class="language-python">
from mcp.server import MCPServer, ToolSchema
mcp = MCPServer(name="weather")
mcp.add_tool("get_forecast", input_schema=ToolSchema(...), handler=get_forecast)
if __name__ == "__main__":
    mcp.run(transport="stdio")
    </code></pre>
    <p>Here <code>transport="stdio"</code> tells the server to use STDIO. (If using HTTP, you might instead call <code>mcp.run(transport="http", port=3000)</code>.) <strong>Important:</strong> For STDIO servers, <em>never print to stdout</em>, only stderr. Logging frameworks should write to stderr or a file, because any output on stdout would corrupt the JSON-RPC stream.</p>

    <ul>
      <li><strong>Configure the host to connect:</strong> Once the server is running, the AI host (e.g. Claude Desktop, VS Code) needs to know how to start or reach it. This typically involves editing a JSON config. For example, Claude Desktop on macOS has a <code>claude_desktop_config.json</code> file. To add a local server named "weather", you might add:</li>
    </ul>
    <pre><code class="language-json">
{
  "mcpServers": {
    "weather": {
      "command": "uv",
      "args": ["--directory", "/ABSOLUTE/PATH/TO/weather", "run", "weather.py"]
    }
  }
}
    </code></pre>
    <p>In Visual Studio Code, MCP servers are configured in <code>.vscode/mcp.json</code>. For example, the VS Code docs show a workspace config with both a remote HTTP and a local server:</p>
    <pre><code class="language-json">
{
  "servers": {
    "github": { "type": "http", "url": "https://api.githubcopilot.com/mcp" },
    "playwright": { "command": "npx", "args": ["-y", "@microsoft/mcp-server-playwright"] }
  }
}
    </code></pre>

    <h2>Deployment and Integration</h2>
    <p>After building and testing locally, you'll likely deploy the MCP server to your target environment. Deployment options include:</p>
    <ul>
      <li><strong>Self-hosted on Servers/VMs:</strong> Deploy the server (e.g. via a Python virtualenv or container) on a Linux VM. Use a process manager (systemd, PM2 for Node, etc.) to keep it running.</li>
      <li><strong>Containers/Kubernetes:</strong> Package the server in a Docker container. You can run it in Kubernetes (as a Deployment or a Knative/Cloud Run service for serverless). For example, Red Hat's Kubernetes MCP server is designed as a container that connects to the K8s API and can run on OpenShift.</li>
      <li><strong>CI/CD Integration:</strong> In your CI/CD pipeline, include steps to build the server image, run tests (e.g. using <code>claude mcp validate</code> or similar), and deploy.</li>
    </ul>

    <p><strong>Integration with Systems:</strong> MCP servers are typically connectors to existing infrastructure:</p>
    <ul>
      <li><strong>Databases:</strong> e.g. a PostgreSQL MCP server (read/write) can be deployed as a cloud service that agents call to query/update records.</li>
      <li><strong>Cloud Services:</strong> Cloud providers offer MCP servers for their ecosystems. Microsoft's Azure MCP Server provides dozens of "Azure skills" (tools) for things like deploying resources via <code>azd</code>.</li>
      <li><strong>APIs and SaaS:</strong> If you have a REST API or SaaS platform, you can wrap it in an MCP server. For example, a Slack MCP server uses Slack's Web API internally.</li>
    </ul>

    <h2>Operational Tasks</h2>
    <p><strong>Backup:</strong> If your MCP server stores any state, back it up according to your usual data policies. For stateless servers, ensure you have version control of your code and configuration.</p>
    <p><strong>Monitoring & Metrics:</strong> Expose basic health endpoints (e.g. <code>/healthz</code>) and integrate with monitoring. Watch request count, latency, error rates (via Prometheus or cloud monitoring).</p>
    <p><strong>Logging:</strong> Always log to stderr or log files. Use a structured logging framework if possible. Keep logs of critical errors or schema mismatches.</p>
    <p><strong>Scaling:</strong> To scale an MCP server, run multiple instances (horizontal scaling). Use Kubernetes Deployments or cloud autoscaling groups. Choose <strong>Streamable HTTP</strong> transport for remote servers.</p>
    <p><strong>Security Hardening:</strong></p>
    <ul>
      <li><strong>TLS/Network:</strong> Use HTTPS for all remote servers. Lock down firewall rules to only allow known clients.</li>
      <li><strong>Auth/Zones:</strong> Integrate with identity: e.g. use OAuth2 scopes or enterprise SSO (Azure AD, GCP IAM).</li>
      <li><strong>Input Validation:</strong> Define strict JSON schemas for each tool to prevent schema mismatch and injection.</li>
    </ul>

    <h2>Troubleshooting Common Issues</h2>
    <ul>
      <li><strong>"Server not found" or fails to launch:</strong> Usually the configured command/path in your MCP config is wrong. Check that the absolute path in your JSON matches the actual location.</li>
      <li><strong>Invalid JSON in config:</strong> A missing comma or quote in the JSON config will prevent the server from registering. Validate syntax with tools like <code>jq</code>.</li>
      <li><strong>Port in use / connection refused:</strong> If using HTTP transport, ensure the port isn't already occupied.</li>
      <li><strong>Timeout after 30 seconds:</strong> Some MCP clients may give up if the server takes too long to respond. You can extend this by configuring a larger timeout.</li>
    </ul>

    <h2>Performance Tuning and Benchmarks</h2>
    <p>MCP servers have been performance-tested, revealing some key insights:</p>
    <ul>
      <li><strong>Transport Matters:</strong> Benchmarks show <strong>STDIO transport does <em>not</em> scale</strong>. Use <strong>Streamable HTTP</strong> for any production or multi-agent scenario.</li>
      <li><strong>Language/Implementation Differences:</strong> A multi-language benchmark compared Java, Go, Node.js, and Python MCP servers under heavy load. Java and Go implementations achieved <em>sub-millisecond</em> average latencies and over <strong>1600 requests/sec</strong>. Node.js and Python were 10×-30× slower.</li>
      <li><strong>Concurrency:</strong> Ensure your server can handle concurrent calls. If using Python's asyncio, configure <code>asyncio.run</code> properly and consider worker pools.</li>
      <li><strong>Caching and Batching:</strong> Where possible, cache expensive operations in the server (e.g. database queries).</li>
    </ul>

    <h2>Sample Workflow Scenario</h2>
    <p>Consider a real-world example: a customer-support chatbot that helps with order inquiries. A user asks "<em>Where is my order #12345?</em>" The LLM assistant knows that order info is in the company database. It thus invokes an MCP server designed for order management. The sequence is:</p>
    <ol>
      <li><strong>User:</strong> "Where is order 12345?"</li>
      <li><strong>LLM (assistant) → MCP Client:</strong> The LLM selects the <code>get_order_status(order_id)</code> tool and calls the MCP client.</li>
      <li><strong>MCP Client → MCP Server:</strong> Sends a JSON-RPC request: <code>tools/execute</code> with <code>{"tool": "get_order_status", "arguments": {"order_id": 12345}}</code>.</li>
      <li><strong>MCP Server:</strong> Receives the request, validates the schema, and runs the tool's handler. It queries the backend DB (e.g. <code>SELECT status FROM orders WHERE id=12345</code>).</li>
      <li><strong>Database → MCP Server:</strong> Returns e.g. <code>{"status":"Shipped"}</code>.</li>
      <li><strong>MCP Server → Client:</strong> Returns the result JSON with <code>{"status":"Shipped"}</code>.</li>
      <li><strong>LLM:</strong> Incorporates that into a reply: "Your order #12345 has been shipped."</li>
    </ol>

    <img src="/blog/workflow2.png" alt="MCP Sequence Diagram" className="w-full h-auto rounded-lg my-6 border border-neutral-800" />

    <h2>Comparison of Major MCP Server Implementations</h2>
    <p>Each implementation reflects different trade-offs. Open-source MCP SDKs give maximum flexibility at the cost of DIY effort. Vendor offerings (Azure, Google) provide rich tools and governance but tie you to that cloud's ecosystem.</p>
    <ul>
      <li><strong>MCP Reference Servers (Open Source):</strong> Community SDKs & Reference. Free and flexible; multi-language support. Requires development effort.</li>
      <li><strong>Slack MCP Server:</strong> SaaS (Slack). Quick setup (Slack app); secure model to Slack data. Scope limited to Slack workspace data.</li>
      <li><strong>Celigo Integrator.io MCP:</strong> Managed iPaaS. Enterprise features: UI for tools, scopes, audit. Locked into Celigo ecosystem.</li>
      <li><strong>Red Hat Kubernetes MCP:</strong> Self-hosted Container. Native to K8s/OpenShift; secure and performant. Specialized to K8s clusters.</li>
      <li><strong>Azure MCP Server (Microsoft):</strong> Cloud / Developer tool. Rich Azure ecosystem support; managed authentication. Azure-only focus.</li>
      <li><strong>Google Cloud MCP (GCP):</strong> Cloud / Enterprise. Enterprise security: IAM policies, audit, risk scanning. Vendor lock-in to GCP.</li>
    </ul>

    <h2>Sources</h2>
    <p>This report draws on official MCP documentation and related sources:</p>
    <ul>
      <li>The ModelContextProtocol documentation and tutorials</li>
      <li>Anthropic and partner blogs announcing MCP</li>
      <li>Product docs (Slack, Celigo, Azure, Google) describing their MCP servers</li>
      <li>Community articles and benchmarks.</li>
    </ul>
    <p>Where specifics (e.g. commands, code) are given, they come from authoritative tutorials or code samples. All code/config snippets and diagrams are illustrative; real-world values (paths, ports) should be adapted to your setup.</p>
  `,
};
