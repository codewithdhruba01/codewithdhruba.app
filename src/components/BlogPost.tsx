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
    tags: ['React', 'TypeScript', 'Web Development'],
  },

  'building-my-first-website-with-react-and-tailwind': {
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
    <pre><code>npm create vite@latest my-portfolio
cd my-portfolio
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
    </code></pre>

    <p>In <code>tailwind.config.js</code> I added the following content paths:</p>
    <pre><code>
content: [
  "./index.html",
  "./src/**/*.{js,jsx,ts,tsx}",
],
    </code></pre>

    <p>Then I imported Tailwind directives in <code>index.css</code>:</p>
    <pre><code>
@tailwind base;
@tailwind components;
@tailwind utilities;
    </code></pre>

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
    <pre><code>
&lt;section className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-900 to-black text-white"&gt;
  &lt;h1 className="text-5xl font-bold mb-3"&gt;Hi, I'm Dhrubaraj 👋&lt;/h1&gt;
  &lt;p className="text-lg text-gray-400"&gt;Frontend Developer & UI Enthusiast&lt;/p&gt;
&lt;/section&gt;
    </code></pre>

    <p>Tailwind made it easy to quickly experiment with layouts and responsiveness without switching between HTML and CSS files.</p>

    <h2>Adding Interactivity & Animations</h2>
    <p>I wanted the site to feel dynamic, so I added small but meaningful interactions:</p>
    <ul>
      <li>Dark/Light mode toggle using React state</li>
      <li>Smooth scrolling navigation with <code>react-scroll</code></li>
      <li>Subtle fade and slide animations using <a href="https://www.framer.com/motion/" target="_blank">Framer Motion</a></li>
    </ul>

    <p>For example, my theme toggle looked like this:</p>
    <pre><code>
const [darkMode, setDarkMode] = useState(true);

&lt;button
  onClick={() =&gt; setDarkMode(!darkMode)}
  className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition"
&gt;
  {darkMode ? '🌙' : '☀️'}
&lt;/button&gt;
    </code></pre>

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
    <p>This project pushed me out of my comfort zone and helped me deeply understand React, Tailwind, and deployment workflows. Building from scratch might seem intimidating, but it’s the best way to learn how everything fits together.</p>
    <p>If you're starting out, pick a simple idea, break it into sections, and build it step by step. Every bug you fix and every feature you add makes you a better developer 💪</p>
  `,
  },

  'chrome-keyboard-shortcuts': {
    title: '10 Chrome Keyboard Shortcuts to Boost Your Productivity',
    date: 'October 6, 2025',
    author: 'Dhrubaraj Pati',
    category: 'Productivity',
    readTime: '5 min read',
    content: `
   <p>Google Chrome is not just a browser — it’s a productivity tool hiding in plain sight. While most users rely on their mouse for every action, Chrome offers dozens of keyboard shortcuts that make everyday browsing smoother, faster, and more efficient. By learning just a handful of these shortcuts, you can cut down the time spent on routine actions and focus more on what actually matters.</p>
    <p>Whether you’re on <strong>Windows</strong> or <kbd>⌘</kbd> <strong>Mac</strong>, mastering these 10 essential shortcuts will turn you into a power user — helping you open tabs, switch between tasks, and navigate like a pro without ever taking your hands off the keyboard.</p>

    <h2>1. Open a New Tab</h2>
    <ul>
      <li><strong>Windows:</strong> <kbd>Ctrl</kbd> + <kbd>T</kbd></li>
      <li><strong>Mac:</strong> <kbd>⌘</kbd> + <kbd>T</kbd></li>
    </ul>
    <p>Opening a new tab is something we do constantly, whether to search for information, visit another website, or start a new task. Instead of moving your hand to the mouse and clicking the “+” icon every time, use this quick shortcut to open a fresh tab in less than a second. Over time, these small actions add up to a significant boost in speed and productivity.</p>

    <h2>2. Reopen a Closed Tab</h2>
    <ul>
      <li><strong>Windows:</strong> <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>T</kbd></li>
      <li><strong>Mac:</strong> <kbd>⌘</kbd> + <kbd>Shift</kbd> + <kbd>T</kbd></li>
    </ul>
    <p>We’ve all accidentally closed a tab that we still needed — maybe a research article, an email draft, or a form you hadn’t submitted yet. Instead of digging through your history, this shortcut instantly brings the tab back to life. Press it multiple times to reopen several closed tabs in the exact order you closed them. It’s like an “undo” for your browser.</p>

    <h2>3. Open a New Window</h2>
    <ul>
      <li><strong>Windows:</strong> <kbd>Ctrl</kbd> + <kbd>N</kbd></li>
      <li><strong>Mac:</strong> <kbd>⌘</kbd> + <kbd>N</kbd></li>
    </ul>
    <p>Sometimes, you need more than just a new tab — especially when you’re managing multiple projects or separating work from personal tasks. Opening a new window gives you a clean, distraction-free space. For example, you might keep one window for research and another for writing, helping you stay organized and mentally focused.</p>

    <h2>4. Go Incognito</h2>
    <ul>
      <li><strong>Windows:</strong> <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>N</kbd></li>
      <li><strong>Mac:</strong> <kbd>⌘</kbd> + <kbd>Shift</kbd> + <kbd>N</kbd></li>
    </ul>
    <p>Chrome’s <strong>Incognito Mode</strong> is perfect for situations where you don’t want your browsing history, cookies, or login sessions to be saved. This is great for logging into multiple accounts simultaneously, searching for sensitive information, or simply browsing without leaving a trace. Using the shortcut makes switching to private browsing seamless and fast.</p>

    <h2>5. Switch Between Tabs</h2>
    <ul>
      <li><strong>Windows:</strong> <kbd>Ctrl</kbd> + <kbd>Tab</kbd> / <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Tab</kbd></li>
      <li><strong>Mac:</strong> <kbd>⌘</kbd> + <kbd>Option</kbd> + <kbd>→</kbd> / <kbd>⌘</kbd> + <kbd>Option</kbd> + <kbd>←</kbd></li>
    </ul>
    <p>When you have multiple tabs open, clicking each one manually slows you down. With these shortcuts, you can cycle through tabs forward and backward instantly, keeping your workflow uninterrupted. You can also jump directly to a specific tab with:</p>
    <ul>
      <li><strong>Windows:</strong> <kbd>Ctrl</kbd> + <kbd>1–8</kbd></li>
      <li><strong>Mac:</strong> <kbd>⌘</kbd> + <kbd>1–8</kbd></li>
    </ul>
    <p>This is especially useful for power users who like to keep tabs grouped for different tasks or reference materials.</p>

    <h2>6. Close the Current Tab</h2>
    <ul>
      <li><strong>Windows:</strong> <kbd>Ctrl</kbd> + <kbd>W</kbd></li>
      <li><strong>Mac:</strong> <kbd>⌘</kbd> + <kbd>W</kbd></li>
    </ul>
    <p>Closing tabs with the mouse might not seem like a big deal, but when you’re working with 10+ tabs, it can get tedious. This shortcut closes the active tab instantly and moves to the previous one, making it ideal for quickly cleaning up your workspace or closing irrelevant tabs while researching.</p>

    <h2>7. Open Downloads Page</h2>
    <ul>
      <li><strong>Windows:</strong> <kbd>Ctrl</kbd> + <kbd>J</kbd></li>
      <li><strong>Mac:</strong> <kbd>⌘</kbd> + <kbd>Shift</kbd> + <kbd>J</kbd></li>
    </ul>
    <p>Every time you download something, Chrome keeps a detailed record. Instead of manually navigating to <em>chrome://downloads</em>, use this shortcut to jump straight to the Downloads page. From here, you can open files, check progress, retry failed downloads, or locate the file on your computer. It’s far faster than hunting through folders.</p>

    <h2>8. Open Browsing History</h2>
    <ul>
      <li><strong>Windows:</strong> <kbd>Ctrl</kbd> + <kbd>H</kbd></li>
      <li><strong>Mac:</strong> <kbd>⌘</kbd> + <kbd>Y</kbd></li>
    </ul>
    <p>Need to revisit a page you saw earlier but forgot to bookmark? With this shortcut, you can instantly open your entire browsing history and search through it. Whether you’re doing research or retracing steps from yesterday, this feature saves you from repeating work or endlessly Googling to find that one lost article.</p>

    <h2>9. Zoom In or Out</h2>
    <ul>
      <li><strong>Windows:</strong> <kbd>Ctrl</kbd> + <kbd>+</kbd> / <kbd>Ctrl</kbd> + <kbd>-</kbd></li>
      <li><strong>Mac:</strong> <kbd>⌘</kbd> + <kbd>+</kbd> / <kbd>⌘</kbd> + <kbd>-</kbd></li>
    </ul>
    <p>Not all websites are designed with readability in mind. Some pages have tiny fonts, while others might require zooming out to see more content at once. These shortcuts let you instantly adjust the zoom level without going into settings. Use <kbd>Ctrl</kbd> + <kbd>0</kbd> (Windows) or <kbd>⌘</kbd> + <kbd>0</kbd> (Mac) to reset it to the default view.</p>

    <h2>10. Bookmark the Current Page</h2>
    <ul>
      <li><strong>Windows:</strong> <kbd>Ctrl</kbd> + <kbd>D</kbd></li>
      <li><strong>Mac:</strong> <kbd>⌘</kbd> + <kbd>D</kbd></li>
    </ul>
    <p>When you find something worth revisiting — a helpful tutorial, a research paper, or a blog post — bookmarking ensures you don’t lose it. This shortcut lets you save the page instantly, and you can choose the destination folder to keep your bookmarks neatly organized for future reference.</p>

    <h2>Bonus: Open Chrome Task Manager</h2>
    <ul>
      <li><strong>Windows:</strong> <kbd>Shift</kbd> + <kbd>Esc</kbd></li>
      <li><strong>Mac:</strong> Use <em>Window → Task Manager</em> from the menu bar (no direct shortcut available).</li>
    </ul>
    <p>Chrome has its own built-in Task Manager that most users don’t know about. It gives you a real-time view of which tabs and extensions are consuming memory and CPU. If your browser ever slows down, opening this quickly can help you identify and close the culprit — without restarting everything.</p>

    <h2>Conclusion</h2>
    <p>Keyboard shortcuts may seem small individually, but together they have a massive impact on your browsing efficiency. By mastering these 10 Chrome shortcuts — on both Windows and Mac — you’ll be able to open, close, switch, and manage tabs like a true power user.</p>
    <p>Start by memorizing a few that you’ll use most often. Over time, your hands will naturally use them without thinking, and you’ll notice just how much faster and smoother your workflow becomes.</p>
  `,
    image: '/blog/chrome_shortcuts.png',
    tags: [
      'Chrome',
      'Productivity',
      'Keyboard Shortcuts',
      'Time Management',
      'Browsing Tips',
    ],
  },

  'essential-linux-commands': {
  title: 'Essential Linux Commands: A Comprehensive Guide',
  date: 'October 7, 2025',
  author: 'Dhrubaraj Pati',
  category: 'Linux',
  readTime: '7 min read',
  content: `
    <p>Linux is one of the most powerful and flexible operating systems in the world, widely used by developers, system administrators, cybersecurity experts, and tech enthusiasts. Although Linux provides a graphical interface, its true power lies in the command line — where simple commands can perform complex tasks efficiently.</p>

    <p>In this guide, we’ll explore the most essential Linux commands every beginner and intermediate user should know. Each command includes a clear explanation of what it does, helping you understand how Linux works behind the scenes.</p>

    <h2>1. <code>pwd</code> — Print Working Directory</h2>
    <p><strong>Purpose:</strong> Displays the full path of the directory you are currently in.</p>
    <p>Useful when you get lost in deep directory structures and want to confirm where you are.</p>

    <h2>2. <code>ls</code> — List Files and Directories</h2>
    <p><strong>Purpose:</strong> Shows all files and folders inside the current directory.</p>
    <ul>
      <li><code>ls -l</code> — detailed list</li>
      <li><code>ls -a</code> — includes hidden files</li>
    </ul>
    <p>This command helps you quickly view directory contents without opening a file manager.</p>

    <h2>3. <code>cd</code> — Change Directory</h2>
    <p><strong>Purpose:</strong> Moves you from one folder to another.</p>
    <ul>
      <li><code>cd ..</code> — go one level back</li>
      <li><code>cd /</code> — go to root directory</li>
    </ul>
    <p>One of the most frequently used commands for navigation.</p>

    <h2>4. <code>touch</code> — Create New File</h2>
    <p><strong>Purpose:</strong> Creates an empty file or updates an existing file’s timestamp.</p>
    <p>Helpful for quickly creating files during development or testing.</p>

    <h2>5. <code>mkdir</code> — Make Directory</h2>
    <p><strong>Purpose:</strong> Creates new folders.</p>
    <ul>
      <li><code>mkdir -p folder/subfolder</code> — create nested folders</li>
    </ul>

    <h2>6. <code>cp</code> — Copy Files and Directories</h2>
    <p><strong>Purpose:</strong> Copies files or entire folders to another location.</p>
    <ul>
      <li><code>cp file.txt backup.txt</code></li>
      <li><code>cp -r folder1 folder2</code> — copy a directory recursively</li>
    </ul>

    <h2>7. <code>mv</code> — Move or Rename Files</h2>
    <p><strong>Purpose:</strong> Moves files or renames them.</p>
    <p>Useful when organizing files or renaming multiple items quickly.</p>

    <h2>8. <code>rm</code> — Remove Files or Directories</h2>
    <p><strong>Purpose:</strong> Deletes files and folders.</p>
    <ul>
      <li><code>rm file.txt</code> — delete file</li>
      <li><code>rm -r folder</code> — delete directory</li>
      <li><code>rm -rf folder</code> — force delete (dangerous)</li>
    </ul>

    <h2>9. <code>cat</code> — View File Content</h2>
    <p><strong>Purpose:</strong> Displays the entire content of a file in the terminal.</p>
    <p>Great for reading log files, scripts, or configuration files quickly.</p>

    <h2>10. <code>nano</code> / <code>vim</code> — Text Editors</h2>
    <p><strong>Purpose:</strong> Allows editing files directly from the terminal.</p>
    <p><code>nano</code> is beginner-friendly, while <code>vim</code> is powerful for advanced users.</p>

    <h2>11. <code>head</code> — Show First Few Lines</h2>
    <p><strong>Purpose:</strong> Displays the first 10 lines of a file.</p>
    <p>Useful for inspecting large files quickly.</p>

    <h2>12. <code>tail</code> — Show Last Few Lines</h2>
    <p><strong>Purpose:</strong> Displays the last 10 lines — commonly used for monitoring logs.</p>

    <h2>13. <code>less</code> — Scroll Through File</h2>
    <p><strong>Purpose:</strong> Opens file content in a scrollable viewer.</p>
    <p>Ideal for reading long files without loading the entire content at once.</p>

    <h2>14. <code>grep</code> — Search Text in Files</h2>
    <p><strong>Purpose:</strong> Finds lines containing specific words or patterns.</p>
    <p>Extremely powerful for developers and system admins analyzing logs.</p>

    <h2>15. <code>find</code> — Search Files by Name or Type</h2>
    <p><strong>Purpose:</strong> Searches the filesystem for matching files or directories.</p>

    <h2>16. <code>tar</code> — Archive or Extract Files</h2>
    <p><strong>Purpose:</strong> Creates compressed archives or extracts them.</p>

    <h2>17. <code>zip</code> / <code>unzip</code> — Compress or Extract Files</h2>
    <p><strong>Purpose:</strong> Easily create .zip files or extract them.</p>

    <h2>18. <code>chmod</code> — Change File Permissions</h2>
    <p><strong>Purpose:</strong> Modifies read, write, and execute permissions for users.</p>

    <h2>19. <code>chown</code> — Change File Ownership</h2>
    <p><strong>Purpose:</strong> Changes the owner or group of a file.</p>

    <h2>20. <code>sudo</code> — Run Commands as Administrator</h2>
    <p><strong>Purpose:</strong> Executes commands with root privileges.</p>

    <h2>21. <code>ip</code> — Network Information</h2>
    <p><strong>Purpose:</strong> Shows IP address, network interfaces, and connection details.</p>

    <h2>22. <code>ping</code> — Test Connectivity</h2>
    <p><strong>Purpose:</strong> Checks if a server or website is reachable.</p>

    <h2>23. <code>curl</code> — Fetch Data from URLs</h2>
    <p><strong>Purpose:</strong> Downloads content or sends API requests.</p>

    <h2>24. <code>wget</code> — Download Files</h2>
    <p><strong>Purpose:</strong> Downloads files directly from the internet.</p>

    <h2>25. <code>top</code> — System Performance Monitor</h2>
    <p><strong>Purpose:</strong> Shows real-time CPU, memory, and process usage.</p>

    <h2>26. <code>df</code> — Disk Usage</h2>
    <p><strong>Purpose:</strong> Displays available and used disk space.</p>

    <h2>27. <code>du</code> — Directory Size</h2>
    <p><strong>Purpose:</strong> Shows how much space a file or folder consumes.</p>

    <h2>28. <code>free</code> — Memory Usage</h2>
    <p><strong>Purpose:</strong> Shows available and used RAM and swap memory.</p>

    <h2>29. <code>uname</code> — System Information</h2>
    <p><strong>Purpose:</strong> Displays OS, kernel version, and hardware details.</p>

    <h2>30. <code>apt</code> Commands (Ubuntu/Debian)</h2>
    <p><strong>Purpose:</strong> Install, update, or remove software packages.</p>
    <ul>
      <li><code>sudo apt update</code> — refresh package list</li>
      <li><code>sudo apt install package</code></li>
      <li><code>sudo apt remove package</code></li>
    </ul>

    <h2>31. <code>ps</code> — View Running Processes</h2>
    <p><strong>Purpose:</strong> Lists all active processes.</p>

    <h2>32. <code>kill</code> — Terminate Processes</h2>
    <p><strong>Purpose:</strong> Stops programs using their PID.</p>

    <h2>Conclusion</h2>
    <p>Mastering Linux commands unlocks the true power of the operating system. These essential commands help you navigate the filesystem, manage files, monitor performance, and control system behavior like a true professional.</p>
    <p>Start by learning the basics such as <code>pwd</code>, <code>ls</code>, and <code>cd</code>. As you grow more comfortable, explore advanced commands like <code>grep</code>, <code>tar</code>, and <code>chmod</code>. With enough practice, the Linux terminal will become one of your most powerful tools.</p>
  `,
  image: '/blog/linux_commands.png',
  tags: [
    'Linux',
    'Commands',
    'CLI',
    'System Administration',
    'Terminal Guide',
  ],
},


  'openweather-api-guide': {
    title:
      'The Ultimate Guide to OpenWeather API: Features, API Key Generation & Integration',
    date: 'October 8, 2025',
    author: 'Dhrubaraj Pati',
    category: 'Web Development',
    readTime: '7 min read',
    content: `
<p>The OpenWeather API is one of the most popular and reliable weather data services available today. Whether you're building a weather app, adding real-time forecasts to your website, or working on a smart IoT project, OpenWeather provides accurate and comprehensive data to power your ideas.</p>

<p>In this detailed guide, we'll explore everything you need to know about the OpenWeather API — including its features, how to generate your API key, endpoints, integration examples, pricing, and best practices.</p>

<h2>Introduction</h2>
<p>Weather data powers mobile apps, websites, travel portals, agriculture systems, smart home devices, and even AI prediction models. OpenWeather API allows you to integrate real-time weather, forecasts, and historical data into your applications.</p>

<h2>What is OpenWeather API?</h2>
<p><a href="https://openweathermap.org/" target="_blank">OpenWeather</a> provides developer-friendly APIs that return weather data in <strong>JSON or XML</strong> formats. It covers:</p>
<ul>
<li>🌡️ Current temperature, humidity, wind speed, and conditions</li>
<li>📅 Forecasts (short-term and long-term)</li>
<li>🕰 Historical weather data</li>
<li>☁️ Air pollution and AQI</li>
<li>Geocoding (city name ↔ latitude/longitude)</li>
</ul>

<h2>Key Features</h2>
<ul>
<li>Global Coverage</li>
<li>Real-Time Weather Data</li>
<li>Forecasts: 5-day/3-hour, 16-day daily, and more</li>
<li>Historical Data</li>
<li>Air Pollution API</li>
<li>Geocoding API</li>
<li>One Call API (current, minutely, hourly, daily, alerts)</li>
<li>Easy integration across programming languages</li>
</ul>

<h2>Pricing Overview</h2>
<ul>
<li>Free Plan – 60 calls/min, current weather + 5-day forecast, basic geocoding</li>
<li>Paid Plans – Higher call limits, historical data, advanced models, premium datasets, technical support</li>
</ul>
<p>Pricing details: <a href="https://openweathermap.org/price" target="_blank">OpenWeather Pricing</a></p>

<h2>📝 Step-by-Step: Generate Your API Key</h2>

<h3>Step 1 — Create an Account</h3>
<ol>
<li>Visit <a href="https://home.openweathermap.org/users/sign_up" target="_blank">OpenWeather Sign Up</a></li>
<li>Enter your email and password</li>
<li>Verify your email</li>
</ol>

<h3>Step 2 — Generate API Key</h3>
<ol>
<li>Go to your <a href="https://home.openweathermap.org/api_keys" target="_blank">API Keys</a> section</li>
<li>Click “+ Generate” or “Create Key”</li>
<li>Name your key (e.g., <em>MyWeatherApp</em>)</li>
<li>Click Generate. Wait 10–15 minutes for activation</li>
</ol>
<p>Keep your key private. Do not share it publicly.</p>

<h2>Step 3: Make Your First API Call</h2>
<pre><code>https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY</code></pre>
<p>Replace <code>YOUR_API_KEY</code> with your actual key. You can use a browser or Postman to test.</p>

<h2>Step 4: Integration Example (JavaScript)</h2>
<pre><code class="language-javascript">
fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY&units=metric')
  .then(response => response.json())
  .then(data => {
    console.log('City:', data.name);
    console.log('Temperature:', data.main.temp + '°C');
    console.log('Weather:', data.weather[0].description);
  })
  .catch(error => console.error('Error fetching data:', error));
</code></pre>

<h2>Useful Parameters</h2>
<ul>
<li><code>q</code> – City name</li>
<li><code>lat</code> & <code>lon</code> – Latitude/longitude</li>
<li><code>units</code> – metric / imperial / standard</li>
<li><code>lang</code> – Language of response</li>
</ul>

<h2>Real-World Use Cases</h2>
<ul>
<li>News websites – Current weather for articles</li>
<li>Travel apps - Destination forecasts</li>
<li>Agriculture - Crop prediction, irrigation planning</li>
<li>Smart homes - Automate appliances</li>
<li>Weather apps - Full-featured dashboards</li>
</ul>

<h2>Common Mistakes</h2>
<ul>
<li>Using API key before activation</li>
<li>Forgetting <code>appid</code> parameter</li>
<li>Exceeding free plan limits</li>
</ul>

<h2>Best Practices</h2>
<ul>
<li>Keep API keys secret (use env variables or backend proxy)</li>
<li>Use caching to save calls</li>
<li>Handle errors gracefully</li>
<li>Geocode cities first to reduce calls</li>
<li>Test endpoints regularly</li>
</ul>

<h2>Conclusion</h2>
<p>OpenWeather API allows you to integrate reliable, real-time, and forecast weather data into any project. Follow the steps above to create an account, generate your API key, and start fetching data. Experiment with cities and explore advanced features like historical data and air quality for more complex apps.</p>

<h2>Quick Links</h2>
<ul>
<li><a href="https://openweathermap.org/" target="_blank">Official Site</a></li>
<li><a href="https://openweathermap.org/api" target="_blank">API Documentation</a></li>
<li><a href="https://openweathermap.org/price" target="_blank">Pricing Plans</a></li>
<li><a href="https://home.openweathermap.org/api_keys" target="_blank">API Key Dashboard</a></li>
</ul>
`,
    image: '/blog/OpenWeather.png',
    tags: [
      'OpenWeather',
      'API',
      'Web Development',
      'Weather App',
      'JavaScript',
      'Beginner Guide',
    ],
  },
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
        <div className="text-center"></div>
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
          <h1 className="text-4xl md:text-5xl font-bold font-outfit mb-6">{post.title}</h1>
          <div className="flex items-center text-gray-400 mb-8">
            <img
              src="https://avatars.githubusercontent.com/u/146111647?v=4"
              alt={post.author}
              className="w-10 h-10 rounded-full mr-4"
            />
            <div>
              <div className="text-white font-supreme font-samibold">
                {post.author}
              </div>
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
          className="prose prose-lg prose-invert max-w-none text-base font-poppins font-light text-neutral-400"
          dangerouslySetInnerHTML={{ __html: post.content }}
          data-aos="fade-up"
        />

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-gray-800" data-aos="fade-up">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag: string) => (
              <span
                key={tag}
                className="bg-[#111111] text-neutral-400 font-light font-poppins px-3 py-1 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Share Section */}
        <div
          className="mt-12 flex items-center justify-between"
          data-aos="fade-up"
        >
          <div className="text-neutral-400 font-supreme">Follow More:</div>
          <div className="flex space-x-4">
            <a
              href="https://x.com/codewithdhruba"
              className="text-muted-foreground hover:text-foreground"
            >
              <Twitter className="h-5 w-5 hover:text-[#00CAFF]" />
            </a>
            <a
              href="https://www.linkedin.com/in/dhrubaraj-pati/"
              className="text-muted-foreground hover:text-foreground"
            >
              <Linkedin className="h-5 w-5 hover:text-[#5093f7]" />
            </a>
            <a
              href="https://www.instagram.com/dhrubaraj_pati/"
              className="text-muted-foreground hover:text-foreground"
            >
              <Instagram className="h-5 w-5 hover:text-[#E4405F]" />
            </a>
            <a
              href="https://m.facebook.com/dhruba.raj.113858/"
              className="text-muted-foreground hover:text-foreground"
            >
              <Facebook className="h-5 w-5 hover:text-[#4a5bf5]" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;
