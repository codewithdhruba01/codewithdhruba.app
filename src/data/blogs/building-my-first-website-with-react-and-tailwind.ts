export const buildingMyFirstWebsiteWithReactAndTailwind = {
  title: 'Building My First Website from Scratch with React and Tailwind CSS',
  date: 'December 29, 2025',
  author: 'Dhrubaraj Pati',
  category: 'Web Development',
  readTime: '8 min read',
  image: '/blog/blog3.png',
  tags: ['React', 'Tailwind CSS', 'TypeScript', 'Portfolio', 'GitHub API', 'AOS'],
  content: `
    <h2>Introduction</h2>
    <p>As a Computer Engineering student passionate about full-stack development, I wanted to create a portfolio website that truly represents my journey as a developer. This website you're currently viewing is my personal portfolio - a comprehensive showcase of my skills, projects, and experience. Built entirely from scratch using <strong>React</strong>, <strong>TypeScript</strong>, and <strong>Tailwind CSS</strong>, this project has been both challenging and incredibly rewarding.</p>

    <h2>Why This Tech Stack?</h2>
    <p>After experimenting with various frameworks, I settled on this powerful combination:</p>
    <ul>
      <li><strong>React + TypeScript:</strong> For type-safe, component-based architecture that scales</li>
      <li><strong>Tailwind CSS:</strong> For rapid, utility-first styling with consistent design system</li>
      <li><strong>Vite:</strong> Lightning-fast development server and optimized production builds</li>
      <li><strong>AOS (Animate On Scroll):</strong> For smooth scroll-triggered animations</li>
      <li><strong>React Router:</strong> For seamless client-side navigation</li>
    </ul>

    <h2>Project Setup & Configuration</h2>
    <p>I started with Vite's React TypeScript template and configured Tailwind CSS:</p>
    <pre><code class="language-bash">npm create vite@latest codewithdhruba.app -- --template react-ts
cd codewithdhruba.app
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p</code></pre>

    <p>Then configured Tailwind to scan all React components:</p>
    <pre><code class="language-javascript">/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#00DC82',
      },
      fontFamily: {
        'synonym': ['Synonym', 'sans-serif'],
        'outfit': ['Outfit', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'satoshi': ['Satoshi', 'sans-serif'],
      }
    },
  },
  plugins: [],
}</code></pre>

    <h2>Building the Core Architecture</h2>
    <p>The website follows a modular structure with distinct sections:</p>
    <ul>
      <li><strong>Hero Section:</strong> Dynamic image carousel with social links</li>
      <li><strong>Projects Showcase:</strong> Interactive project cards with modal details</li>
      <li><strong>GitHub Contributions:</strong> Real-time contribution visualization</li>
      <li><strong>Skills & Education:</strong> Technical expertise display</li>
      <li><strong>Blog System:</strong> MDX-powered blog with routing</li>
      <li><strong>AI Chat Assistant:</strong> Interactive chatbot for user engagement</li>
    </ul>

    <p>The hero section uses a custom image carousel component:</p>
    <pre><code class="language-jsx">const Hero = () => {
  return (
    &lt;section className="relative bg-[#0A0A0A] flex items-center overflow-hidden pt-24 md:pt-28"&gt;
      &lt;div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center"&gt;
        &lt;div className="mt-6 md:mt-12"&gt;
          &lt;h1 className="font-bold text-white text-4xl font-outfit sm:text-5xl lg:text-5xl"&gt;
            Frontend engineer, technical writer & open-source Contributor
          &lt;/h1&gt;
          &lt;TextGenerateEffect words="I'm Dhrubaraj Pati, a Frontend developer..." /&gt;
        &lt;/div&gt;
        &lt;ImageCarousel images={[...]} className="w-full max-w-sm md:max-w-md" /&gt;
      &lt;/div&gt;
    &lt;/section&gt;
  );
};</code></pre>

    <h2>Implementing Advanced Features</h2>
    <h3>GitHub Contributions Integration</h3>
    <p>One of the most complex features was the GitHub contributions calendar. I used GraphQL to fetch real contribution data:</p>
    <pre><code class="language-typescript">const fetchContributions = async (selectedYear: number) => {
  const query = gql\`
    query {
      user(login: "codewithdhruba01") {
        contributionsCollection(from: "\${selectedYear}-01-01T00:00:00Z") {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  \`;

  const data = await request('https://api.github.com/graphql', query, {}, {
    Authorization: \`Bearer \${TOKEN}\`
  });
};</code></pre>

    <h3>Interactive Chat Assistant</h3>
    <p>The AI chat assistant uses simple pattern matching to provide contextual responses:</p>
    <pre><code class="language-typescript">const getBotReply = (userInput: string): string => {
  const input = userInput.toLowerCase();

  if (input.includes('project'))
    return \`Current projects include MultiCalc, Outfit Wallpaper Generator, and GitHub Developer Tools...\`;

  if (input.includes('skills'))
    return 'My skills include HTML, CSS, JS, React, TypeScript, Tailwind CSS...';

  return "Thanks for reaching out! I'll record your message and get back to you soon.";
};</code></pre>

    <h2>Animation & User Experience</h2>
    <p>I implemented multiple animation libraries for smooth interactions:</p>
    <ul>
      <li><strong>AOS:</strong> Scroll-triggered animations for section reveals</li>
      <li><strong>Framer Motion:</strong> Complex component transitions</li>
      <li><strong>CSS Transitions:</strong> Hover effects and micro-interactions</li>
      <li><strong>Custom Keyframes:</strong> Loading states and shimmer effects</li>
    </ul>

    <p>The contribution grid uses staggered animations:</p>
    <pre><code class="language-css">@keyframes fade-in {
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}</code></pre>

    <h2>Challenges & Solutions</h2>
    <h3>GitHub API Integration</h3>
    <p>Implementing the GitHub GraphQL API required careful token management and rate limiting:</p>
    <ul>
      <li>Environment variable setup for secure token storage</li>
      <li>Error handling for API failures and network issues</li>
      <li>Loading states with skeleton animations</li>
      <li>Data transformation from GraphQL response to calendar format</li>
    </ul>

    <h3>Responsive Design Complexity</h3>
    <p>The image carousel and contribution grid presented unique responsive challenges:</p>
    <ul>
      <li>Custom breakpoints for mobile, tablet, and desktop layouts</li>
      <li>Touch-friendly interactions for mobile devices</li>
      <li>Optimized image loading with lazy loading</li>
      <li>Scrollbar customization for better UX</li>
    </ul>

    <h3>Performance Optimization</h3>
    <p>Vite's build optimization combined with code splitting reduced bundle size significantly:</p>
    <ul>
      <li>Lazy loading of route components</li>
      <li>Image optimization and WebP format usage</li>
      <li>Dynamic imports for heavy libraries</li>
      <li>Efficient re-rendering with React.memo and useMemo</li>
    </ul>

    <h2>Deployment & Hosting</h2>
    <p>The website is deployed on <strong>Vercel</strong> with automated deployments from GitHub:</p>
    <ol>
      <li>Connected GitHub repository to Vercel dashboard</li>
      <li>Configured build settings (<code>npm run build</code>)</li>
      <li>Set up environment variables for GitHub API token</li>
      <li>Enabled automatic deployments on push to main branch</li>
    </ol>

    <p>👉 Live site: <a href="https://codewithdhruba.vercel.app/" target="_blank">https://codewithdhruba.app</a></p>

    <h2>Key Features Implemented</h2>
    <ul>
      <li><strong>Dynamic Content:</strong> Real-time GitHub contributions and project data</li>
      <li><strong>SEO Optimization:</strong> Meta tags, structured data, and performance optimization</li>
      <li><strong>Accessibility:</strong> ARIA labels, keyboard navigation, and screen reader support</li>
      <li><strong>PWA Ready:</strong> Service worker setup for offline functionality</li>
      <li><strong>Analytics:</strong> Integrated tracking for user behavior insights</li>
    </ul>

    <h2>Future Enhancements</h2>
    <ul>
      <li>Add a CMS for dynamic blog content management</li>
      <li>Implement dark/light theme toggle with localStorage persistence</li>
      <li>Enhanced AI chat with actual API integration</li>
      <li>Add project filtering and search functionality</li>
      <li>Implement contact form with email integration</li>
    </ul>

    <h2>Lessons Learned</h2>
    <p>This project taught me invaluable lessons about modern web development:</p>
    <ul>
      <li><strong>Component Architecture:</strong> Building reusable, maintainable React components</li>
      <li><strong>API Integration:</strong> Handling asynchronous data and error states</li>
      <li><strong>Performance:</strong> Optimizing for Core Web Vitals and user experience</li>
      <li><strong>Design Systems:</strong> Creating consistent UI patterns with Tailwind CSS</li>
      <li><strong>Deployment:</strong> CI/CD pipelines and environment management</li>
    </ul>

    <h2>Conclusion</h2>
    <p>Building this portfolio website from scratch has been transformative. It represents not just my technical skills, but my growth as a developer. Every component, every animation, and every feature tells a story of problem-solving and continuous learning.</p>
    <p>The journey from a simple "Hello World" to a fully-featured portfolio has reinforced my belief that building from scratch is the best way to truly understand web development. This website isn't just a showcase—it's a testament to the power of modern web technologies and the importance of attention to detail.</p>
    <p>If you're considering building your own portfolio, start small but think big. Focus on clean code, great UX, and features that genuinely solve problems. Your portfolio is often the first impression potential employers or clients will have of you—make it count! 🚀</p>
  `,
};
