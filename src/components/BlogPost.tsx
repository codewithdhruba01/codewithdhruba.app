import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Undo2 } from 'lucide-react';

// Blog post data
const blogPostsData = {
  'getting-started-with-react-typescript': {
    title: 'Getting Started with React and TypeScript',
    date: 'March 15, 2025',
    author: 'Dhrubaraj Pati',
    category: 'Development',
    readTime: '5 min read',
    content: `
     <h2>Introduction</h2>
    <p>React is one of the most popular JavaScript libraries for building user interfaces, and TypeScript is a powerful tool that adds type safety to JavaScript. Combining the two can significantly improve your development experience by helping you catch bugs earlier and write more maintainable code.</p>
    <p>In this guide, we’ll walk through how to set up a React project using TypeScript, understand key TypeScript concepts, and explore how TypeScript integrates with React components.</p>
      
       <h3>Setting Up Your Development Environment</h3>
    <p>Before you begin, make sure you have the following tools installed:</p>
    <ul>
      <li><strong>Node.js</strong> (recommended version 18.x or later)</li>
      <li><strong>npm</strong> or <strong>yarn</strong> as your package manager</li>
      <li><strong>Visual Studio Code</strong> for code editing, along with extensions like ESLint, Prettier, and the TypeScript language support</li>
    </ul>
    <p>These tools provide a modern development setup that supports TypeScript features like autocompletion, type checking, and more.</p>
      
      <h3>Creating a New React TypeScript Project</h3>
    <p>The easiest way to get started is by using Create React App with the TypeScript template. Open your terminal and run:</p>
    <pre><code>npx create-react-app my-app --template typescript</code></pre>
    <p>This command will create a new React project pre-configured for TypeScript. You’ll notice files like <code>tsconfig.json</code> and components using <code>.tsx</code> extensions, which support JSX and TypeScript together.</p>
      
     <h3>Basic TypeScript Concepts for React</h3>
    <p>Here are some fundamental TypeScript features you'll frequently use in React:</p>
    <ul>
      <li><strong>Props and State Types:</strong> You can define interfaces for component props and use them to enforce strict type checking.</li>
      <li><strong>Interfaces:</strong> These define object shapes, useful for props and data models.</li>
      <li><strong>Union Types:</strong> Handle multiple allowed value types elegantly (e.g., <code>type Status = "loading" | "success" | "error";</code>).</li>
      <li><strong>Generics:</strong> Allow you to write reusable components that work with a variety of types.</li>
    </ul>

    <h3>Example: Typing Props</h3>
    <pre><code>
interface UserCardProps {
  name: string;
  age: number;
}

const UserCard: React.FC<UserCardProps> = ({ name, age }) => (
  &lt;div&gt;
    &lt;h3&gt;{name}&lt;/h3&gt;
    &lt;p&gt;Age: {age}&lt;/p&gt;
  &lt;/div&gt;
);
</code></pre>
    <p>In the above example, TypeScript ensures that <code>name</code> is a string and <code>age</code> is a number. If incorrect types are passed, you’ll get a compile-time error.</p>
      
      <h2>Conclusion</h2>
    <p>TypeScript and React work together beautifully to help you build scalable, maintainable, and bug-free applications. TypeScript adds a robust layer of tooling, which is invaluable in large projects or when working with teams.</p>
    <p>Start small by typing props and state, and gradually explore more advanced features like generics and custom hooks with TypeScript support.</p>
    <p>Once you get the hang of it, you'll never want to go back to plain JavaScript. Happy coding! 🚀</p>
    `,
    image: '/blog/blog2.png',
    tags: ['React', 'TypeScript', 'Web Development']
  },

  'getting-started-with-vs-code': {
  title: 'Getting Started with Visual Studio Code: The Complete Guide',
  date: 'July 2, 2025',
  author: 'Dhrubaraj Pati',
  category: 'Development Tools',
  readTime: '8 min read',
  content: `
    <h2>Introduction</h2>
    <p>Visual Studio Code, commonly known as VS Code, is a lightweight but powerful source-code editor developed by Microsoft. Whether you are a beginner learning to code or a professional building large-scale applications, VS Code provides the tools and flexibility to boost your productivity.</p>
    
    <h2>Why Use VS Code?</h2>
    <p>VS Code has become the most popular code editor for several reasons:</p>
    <ul>
      <li><strong>Free and Open Source:</strong> Completely free to use with an active community.</li>
      <li><strong>Cross-Platform:</strong> Available on Windows, macOS, and Linux.</li>
      <li><strong>Extensions Marketplace:</strong> Thousands of extensions to add support for any language or tool.</li>
      <li><strong>Built-in Git Integration:</strong> Manage your repositories without leaving the editor.</li>
      <li><strong>Customizable:</strong> Themes, icons, keybindings, and settings can be tailored to your workflow.</li>
    </ul>
    
    <h2>Installing VS Code</h2>
    <p>You can download the latest version from the <a href="https://code.visualstudio.com/" target="_blank">official website</a>. The installation is straightforward:</p>
    <ol>
      <li>Download the installer for your operating system.</li>
      <li>Run the installer and follow the prompts.</li>
      <li>Launch VS Code after installation completes.</li>
    </ol>
    
    <h2>Exploring the User Interface</h2>
    <p>When you first open VS Code, you'll see:</p>
    <ul>
      <li><strong>Activity Bar:</strong> On the left side, gives quick access to Explorer, Search, Source Control, Extensions, and more.</li>
      <li><strong>Side Bar:</strong> Displays your project files and folders.</li>
      <li><strong>Editor:</strong> Where you write your code.</li>
      <li><strong>Status Bar:</strong> Shows information about your project and editor state.</li>
      <li><strong>Command Palette:</strong> Press <code>Ctrl+Shift+P</code> (or <code>Cmd+Shift+P</code> on Mac) to access all commands.</li>
    </ul>
    
    <h2>Essential Extensions</h2>
    <p>Extensions make VS Code incredibly powerful. Here are some recommended ones:</p>
    <ul>
      <li><strong>Python:</strong> Adds rich support for Python development, including IntelliSense and debugging.</li>
      <li><strong>Prettier:</strong> Automatically formats your code for consistent style.</li>
      <li><strong>ESLint:</strong> Helps you find and fix problems in JavaScript and TypeScript.</li>
      <li><strong>GitLens:</strong> Supercharges Git capabilities with blame annotations and history exploration.</li>
      <li><strong>Live Server:</strong> Launch a development server with live reload for HTML and JavaScript.</li>
    </ul>
    
    <h2>Customizing Your Environment</h2>
    <p>One of VS Code's strengths is customization:</p>
    <ul>
      <li><strong>Themes:</strong> Change the look and feel via <em>Extensions &gt; Themes</em>.</li>
      <li><strong>Settings:</strong> Configure settings using the <code>settings.json</code> file or the UI editor.</li>
      <li><strong>Keybindings:</strong> Modify keyboard shortcuts to match your preferences.</li>
      <li><strong>Snippets:</strong> Create reusable code snippets to speed up your workflow.</li>
    </ul>
    
    <h2>Using the Integrated Terminal</h2>
    <p>VS Code includes a built-in terminal so you don’t have to leave the editor to run commands:</p>
    <pre><code>
View > Terminal
    </code></pre>
    <p>You can open multiple terminals and run different processes simultaneously.</p>
    
    <h2>Debugging Your Code</h2>
    <p>VS Code has excellent debugging support:</p>
    <ol>
      <li>Set breakpoints by clicking next to the line numbers.</li>
      <li>Launch the debugger using the <strong>Run and Debug</strong> icon in the Activity Bar.</li>
      <li>Use the Debug Console to inspect variables and control execution.</li>
    </ol>
    
    <h2>Working with Git</h2>
    <p>VS Code makes version control simple:</p>
    <ul>
      <li>Initialize a repository or clone an existing one.</li>
      <li>Stage changes, commit, and push to remote repositories.</li>
      <li>View diffs and manage branches.</li>
    </ul>
    
    <h2>Conclusion</h2>
    <p>Visual Studio Code is a modern, flexible editor that adapts to any project or technology stack. With its powerful extensions, built-in tools, and extensive customization options, it’s an essential tool in every developer’s toolkit.</p>
    <p>Download VS Code today and start building your next project faster and more efficiently!</p>
  `,
  image: '/blog/blog1.png',
  tags: ['VS Code', 'Code Editor', 'Development', 'Productivity']
},

  'chrome-keyboard-shortcuts': {
  title: '10 Chrome Keyboard Shortcuts to Boost Your Productivity',
  date: 'October 6, 2025',
  author: 'Dhrubaraj Pati',
  category: 'Productivity',
  readTime: '5 min read',
  content: `
    <p>Google Chrome is packed with powerful features that can make your browsing experience smoother and faster — but most people barely scratch the surface. Mastering a few essential <strong>Chrome keyboard shortcuts</strong> can save you precious seconds on every task, adding up to hours of extra productivity each month.</p>
    <p>Whether you're a student, developer, or professional, these <strong>10 must-know Chrome shortcuts</strong> will help you browse smarter, multitask faster, and get more done — without ever touching your mouse.</p>

    <h3>1. Open a New Tab — <kbd>Ctrl</kbd> + <kbd>T</kbd></h3>
    <p>Instantly open a new tab to start a fresh search or navigate to a new website. No need to reach for the mouse — just press <kbd>Ctrl</kbd> + <kbd>T</kbd> and keep working at lightning speed.</p>

    <h3>2. Reopen a Closed Tab — <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>T</kbd></h3>
    <p>We've all been there — accidentally closing an important tab. This shortcut brings it back in an instant. Press it repeatedly to restore multiple recently closed tabs in the exact order you closed them. Lifesaver!</p>

    <h3>3. Open a New Window — <kbd>Ctrl</kbd> + <kbd>N</kbd></h3>
    <p>Need to separate tasks or organize work into different windows? Open a new Chrome window with this quick shortcut. It's great for research, side projects, or separating work and personal browsing.</p>

    <h3>4. Go Incognito — <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>N</kbd></h3>
    <p>Private browsing at your fingertips. This shortcut launches an <strong>Incognito Window</strong>, which doesn’t save your browsing history, cookies, or search data. Perfect for checking multiple accounts or private research.</p>

    <h3>5. Switch Between Tabs — <kbd>Ctrl</kbd> + <kbd>Tab</kbd> / <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Tab</kbd></h3>
    <p>Juggling multiple tabs? Navigate like a pro by cycling through open tabs with <kbd>Ctrl</kbd> + <kbd>Tab</kbd> to go forward and <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Tab</kbd> to go backward. You can also jump directly to a specific tab with <kbd>Ctrl</kbd> + <kbd>1–8</kbd>.</p>

    <h3>6. Close the Current Tab — <kbd>Ctrl</kbd> + <kbd>W</kbd></h3>
    <p>Done with a page? Close it instantly using this shortcut. It’s faster and more fluid than reaching for the “X” on the tab bar, especially when working with dozens of open tabs.</p>

    <h3>7. Open Downloads Page — <kbd>Ctrl</kbd> + <kbd>J</kbd></h3>
    <p>Keep track of your downloads easily. This shortcut opens Chrome’s dedicated <strong>Downloads page</strong>, where you can view progress, access previously downloaded files, or retry failed downloads.</p>

    <h3>8. Open Browsing History — <kbd>Ctrl</kbd> + <kbd>H</kbd></h3>
    <p>Need to revisit a page you found earlier? Open your full browsing history in seconds. From here, you can search and quickly return to any site without digging through bookmarks or search results again.</p>

    <h3>9. Zoom In or Out — <kbd>Ctrl</kbd> + <kbd>+</kbd> / <kbd>Ctrl</kbd> + <kbd>-</kbd></h3>
    <p>Perfect for presentations, reading small text, or detailed inspection. Use these shortcuts to adjust the zoom level of any page instantly. <kbd>Ctrl</kbd> + <kbd>0</kbd> resets it back to default.</p>

    <h3>10. Bookmark the Current Page — <kbd>Ctrl</kbd> + <kbd>D</kbd></h3>
    <p>Found a useful page? Bookmark it in a flash. You can even choose the folder directly to keep your bookmarks neatly organized for future access.</p>

    <h3>Bonus: Open Chrome Task Manager — <kbd>Shift</kbd> + <kbd>Esc</kbd></h3>
    <p>Chrome’s built-in Task Manager is a hidden gem. This shortcut lets you monitor which tabs or extensions are consuming the most resources — and close them instantly to speed up your browser.</p>

    <h3>Conclusion</h3>
    <p>Productivity is all about minimizing friction. By mastering these 10 Chrome keyboard shortcuts, you'll navigate the web faster, switch between tasks more efficiently, and spend less time on repetitive actions.</p>
    <p>Start by picking 2–3 shortcuts to integrate into your daily routine. Once they become second nature, add more — and soon, you’ll browse like a true power user.</p>
  `,
  image: '/blog/chrome_shortcuts.png',
  tags: ['Chrome', 'Productivity', 'Keyboard Shortcuts', 'Time Management', 'Browsing Tips']
}
};

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    if (slug && blogPostsData[slug as keyof typeof blogPostsData]) {
      setPost(blogPostsData[slug as keyof typeof blogPostsData]);
    }
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
        </div>
      </div>
    );
  }

  return (
    <article className="py-20 px-4">
      <div className="max-w-4xl mx-auto py-10 mb-8">
        {/* Back Button */}
        <div className="mb-8" data-aos="fade-up">
          <a
            href="/all-posts"
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <Undo2 className="h-4 w-4 mr-2" />
            Back to Blog
          </a>
        </div>

        {/* Header */}
        <header className="mb-12" data-aos="fade-up">
          <div className="mb-6">
            <span className="bg-[#1e1e1e] text-neutral-300 px-3 py-1 rounded-full text-sm font-poppins">
              {post.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
          <div className="flex items-center text-gray-400 mb-8">
            <img
              src="https://avatars.githubusercontent.com/u/146111647?v=4"
              alt={post.author}
              className="w-10 h-10 rounded-full mr-4"
            />
            <div>
              <div className="text-white font-supreme font-samibold">{post.author}</div>
              <div className="text-sm font-supreme text-neutral-400">
                {post.date} · {post.readTime}
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-12" data-aos="fade-up">
          <img
            src={post.image}
            alt={`Thumbnail for ${post.title}`}
            className="w-full h-auto rounded-lg"
            style={{ maxHeight: '500px', objectFit: 'contain' }}
          />
        </div>

        {/* Content */}
        <div
          className="prose prose-lg prose-invert max-w-none text-sm font-light text-neutral-400"
          dangerouslySetInnerHTML={{ __html: post.content }}
          data-aos="fade-up"
        />

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-gray-800" data-aos="fade-up">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag: string) => (
              <span
                key={tag}
                className="bg-[#111111] text-neutral-400 font-light px-3 py-1 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Share Section */}
        <div className="mt-12 flex items-center justify-between" data-aos="fade-up">
          <div className="text-gray-400">Follow More:</div>
          <div className="flex space-x-4">
            <a href="https://x.com/codewithdhruba" className="text-muted-foreground hover:text-foreground">
              <Twitter className="h-5 w-5 hover:text-[#00CAFF]" />
            </a>
            <a href="https://www.linkedin.com/in/dhrubaraj-pati/" className="text-muted-foreground hover:text-foreground">
              <Linkedin className="h-5 w-5 hover:text-[#5093f7]" />
            </a>
            <a href="https://www.instagram.com/dhrubaraj_pati/" className="text-muted-foreground hover:text-foreground">
              <Instagram className="h-5 w-5 hover:text-[#E4405F]" />
            </a>
            <a href="https://m.facebook.com/dhruba.raj.113858/" className="text-muted-foreground hover:text-foreground">
              <Facebook className="h-5 w-5 hover:text-[#4a5bf5]" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;
