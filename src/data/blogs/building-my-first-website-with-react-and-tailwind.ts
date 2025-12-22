export const buildingMyFirstWebsiteWithReactAndTailwind = {
  title: 'Building My First Website from Scratch with React and Tailwind CSS',
  date: 'October 13, 2025',
  author: 'Dhrubaraj Pati',
  category: 'Web Development',
  readTime: '7 min read',
  image: '/blog/blog3.png',
  tags: ['React', 'Tailwind CSS', 'Frontend', 'Portfolio', 'Web Development'],
  content: `
    <h2>Introduction</h2>
    <p>Building your first website from scratch is a milestone moment for any developer. Instead of relying on templates or pre-built themes, I decided to create my personal website entirely using <strong>React</strong> and <strong>Tailwind CSS</strong>. It was challenging, exciting, and one of the most valuable learning experiences of my journey so far.</p>

    <h2>Why React and Tailwind?</h2>
    <p>I chose React for its component-based architecture and flexibility, and Tailwind CSS for its lightning-fast styling approach. Together, they allowed me to build a modern, responsive, and clean UI without writing tons of custom CSS.</p>
    <ul>
      <li><strong>React:</strong> For reusable components and smooth UI interactions.</li>
      <li><strong>Tailwind CSS:</strong> For utility-first styling, responsive design, and customization.</li>
      <li><strong>Vite:</strong> As a blazing-fast build tool that made development smooth.</li>
    </ul>

    <h2>Project Setup</h2>
    <p>I initialized my project using Vite and set up Tailwind CSS as follows:</p>
    <pre><code class="language-bash">npm create vite@latest my-portfolio
cd my-portfolio
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p</code></pre>

    <p>In <code>tailwind.config.js</code> I added the following content paths:</p>
    <pre><code class="language-javascript">content: [
  "./index.html",
  "./src/**/*.{js,jsx,ts,tsx}",
],</code></pre>

    <p>Then I imported Tailwind directives in <code>index.css</code>:</p>
    <pre><code class="language-css">@tailwind base;
@tailwind components;
@tailwind utilities;</code></pre>

    <p>Once everything compiled successfully, I was ready to build my layout.</p>

    <h2>Structuring the Website</h2>
    <p>I started by breaking down the site into logical sections:</p>
    <ul>
      <li>Navbar</li>
      <li>Hero Section</li>
      <li>About Section</li>
      <li>Projects Showcase</li>
      <li>Contact Form & Footer</li>
    </ul>

    <p>Each section was created as a separate React component. For example, the hero section:</p>
    <pre><code class="language-jsx">&lt;section className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-900 to-black text-white"&gt;
  &lt;h1 className="text-5xl font-bold mb-3"&gt;Hi, I'm Dhrubaraj &lt;/h1&gt;
  &lt;p className="text-lg text-gray-400"&gt;Frontend Developer & UI Enthusiast&lt;/p&gt;
&lt;/section&gt;</code></pre>

    <p>Tailwind made it easy to quickly experiment with layouts and responsiveness without switching between HTML and CSS files.</p>

    <h2>Adding Interactivity & Animations</h2>
    <p>I wanted the site to feel dynamic, so I added small but meaningful interactions:</p>
    <ul>
      <li>Dark/Light mode toggle using React state</li>
      <li>Smooth scrolling navigation with <code>react-scroll</code></li>
      <li>Subtle fade and slide animations using <a href="https://www.framer.com/motion/" target="_blank">Framer Motion</a></li>
    </ul>

    <p>For example, my theme toggle looked like this:</p>
    <pre><code class="language-javascript">const [darkMode, setDarkMode] = useState(true);

&lt;button
  onClick={() =&gt; setDarkMode(!darkMode)}
  className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition"
&gt;
  {darkMode ? '🌙' : '☀️'}
&lt;/button&gt;</code></pre>

    <h2>Challenges I Faced</h2>
    <ul>
      <li><strong>Tailwind Config Issues:</strong> A small typo in the <code>content</code> array broke all styling for 30 minutes </li>
      <li><strong>Sticky Navbar Glitch:</strong> Had to debounce scroll events for smooth transitions.</li>
      <li><strong>Image Optimization:</strong> Switching to WebP format improved performance a lot.</li>
    </ul>

    <h2>Deploying the Website</h2>
    <p>I deployed the project on <strong>Netlify</strong> using the following steps:</p>
    <ol>
      <li>Pushed the code to GitHub.</li>
      <li>Connected the repository to Netlify.</li>
      <li>Set build command to <code>npm run build</code>.</li>
      <li>Clicked <strong>Deploy</strong> and watched it go live 🚀</li>
    </ol>

    <p>👉 Live site: <a href="https://codewithdhruba.netlify.app" target="_blank">https://codewithdhruba.netlify.app</a></p>

    <h2>Extra Touches</h2>
    <p>To make the website feel more professional, I added:</p>
    <ul>
      <li>SEO meta tags and Open Graph images</li>
      <li>Custom 404 page</li>
      <li>Responsive breakpoints for all screen sizes</li>
      <li>Twitter card integration for better link previews</li>
    </ul>

    <h2>Future Plans</h2>
    <ul>
      <li>Add a blog section using MDX or Markdown</li>
      <li>Persist dark mode preference with localStorage</li>
      <li>Optimize performance with code splitting</li>
      <li>Implement small admin panel for dynamic content</li>
    </ul>

    <h2>Conclusion</h2>
    <p>This project pushed me out of my comfort zone and helped me deeply understand React, Tailwind, and deployment workflows. Building from scratch might seem intimidating, but it's the best way to learn how everything fits together.</p>
    <p>If you're starting out, pick a simple idea, break it into sections, and build it step by step. Every bug you fix and every feature you add makes you a better developer 💪</p>
  `,
};
