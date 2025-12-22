import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Undo2, Heart, Loader2, ThumbsUp, Calendar, MessageCircle } from 'lucide-react';
import GiscusComments from './GiscusComments';
import { commentService, supabase } from '../lib/supabase';

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
    title: 'Essential Linux Commands: A Comprehensive Guide (50 Commands with Examples)',
    date: 'Dec 8, 2025',
    author: 'Dhrubaraj Pati',
    category: 'Linux',
    readTime: '10 min read',
    content: `
    <p>Linux is one of the most powerful and flexible operating systems available today. Whether you’re a developer, system administrator, cybersecurity learner, or technology enthusiast, Linux commands help you work faster, automate tasks, and control your entire system from the terminal.</p>

    <p>This guide covers <strong>50 essential Linux commands</strong> with explanations and real examples — perfect for beginners and intermediate users looking to improve their Linux skills.</p>

    <h2>1. pwd — Print Working Directory</h2>
    <p><strong>Purpose:</strong> Shows your current directory path.</p>
    <p><strong>Example:</strong> <code>pwd</code></p>

    <h2>2. ls — List Files</h2>
    <p><strong>Purpose:</strong> Displays files and folders.</p>
    <p><strong>Example:</strong> <code>ls -la</code></p>

    <h2>3. cd — Change Directory</h2>
    <p><strong>Purpose:</strong> Moves between folders.</p>
    <p><strong>Example:</strong> <code>cd Documents/</code></p>

    <h2>4. touch — Create File</h2>
    <p><strong>Purpose:</strong> Creates an empty file.</p>
    <p><strong>Example:</strong> <code>touch notes.txt</code></p>

    <h2>5. mkdir — Make Directory</h2>
    <p><strong>Purpose:</strong> Creates new folders.</p>
    <p><strong>Example:</strong> <code>mkdir projects</code></p>

    <h2>6. rmdir — Remove Empty Directory</h2>
    <p><strong>Purpose:</strong> Deletes an empty directory.</p>
    <p><strong>Example:</strong> <code>rmdir oldfolder</code></p>

    <h2>7. rm — Remove Files</h2>
    <p><strong>Purpose:</strong> Deletes files or folders.</p>
    <p><strong>Example:</strong> <code>rm -rf folder</code></p>

    <h2>8. cp — Copy Files</h2>
    <p><strong>Purpose:</strong> Copies files or directories.</p>
    <p><strong>Example:</strong> <code>cp file.txt backup.txt</code></p>

    <h2>9. mv — Move or Rename</h2>
    <p><strong>Purpose:</strong> Moves or renames files.</p>
    <p><strong>Example:</strong> <code>mv old.txt new.txt</code></p>

    <h2>10. cat — View File Content</h2>
    <p><strong>Purpose:</strong> Prints file content to terminal.</p>
    <p><strong>Example:</strong> <code>cat info.txt</code></p>

    <h2>11. nano — Edit File (Beginner-Friendly)</h2>
    <p><strong>Purpose:</strong> Opens file in nano editor.</p>
    <p><strong>Example:</strong> <code>nano config.txt</code></p>

    <h2>12. vim — Advanced Text Editor</h2>
    <p><strong>Purpose:</strong> Opens file in vim editor.</p>
    <p><strong>Example:</strong> <code>vim main.py</code></p>

    <h2>13. head — Show First Lines</h2>
    <p><strong>Purpose:</strong> Prints first 10 lines.</p>
    <p><strong>Example:</strong> <code>head logs.txt</code></p>

    <h2>14. tail — Show Last Lines</h2>
    <p><strong>Purpose:</strong> Prints last 10 lines.</p>
    <p><strong>Example:</strong> <code>tail logs.txt</code></p>

    <h2>15. less — Scroll File Content</h2>
    <p><strong>Purpose:</strong> Opens file in scroll mode.</p>
    <p><strong>Example:</strong> <code>less story.txt</code></p>

    <h2>16. grep — Search in Files</h2>
    <p><strong>Purpose:</strong> Searches text inside files.</p>
    <p><strong>Example:</strong> <code>grep "error" server.log</code></p>

    <h2>17. find — Search Files</h2>
    <p><strong>Purpose:</strong> Finds files by name/type.</p>
    <p><strong>Example:</strong> <code>find / -name "config.json"</code></p>

    <h2>18. locate — Fast File Search</h2>
    <p><strong>Purpose:</strong> Quickly finds file locations.</p>
    <p><strong>Example:</strong> <code>locate notes.txt</code></p>

    <h2>19. df — Disk Usage</h2>
    <p><strong>Purpose:</strong> Shows free/used disk space.</p>
    <p><strong>Example:</strong> <code>df -h</code></p>

    <h2>20. du — Directory Size</h2>
    <p><strong>Purpose:</strong> Shows folder size.</p>
    <p><strong>Example:</strong> <code>du -sh /var/log</code></p>

    <h2>21. free — Memory Usage</h2>
    <p><strong>Purpose:</strong> Displays RAM usage.</p>
    <p><strong>Example:</strong> <code>free -h</code></p>

    <h2>22. uname — System Information</h2>
    <p><strong>Purpose:</strong> Shows OS, kernel version.</p>
    <p><strong>Example:</strong> <code>uname -a</code></p>

    <h2>23. top — Process Viewer</h2>
    <p><strong>Purpose:</strong> Shows real-time CPU and RAM usage.</p>
    <p><strong>Example:</strong> <code>top</code></p>

    <h2>24. htop — Advanced Process Viewer</h2>
    <p><strong>Purpose:</strong> Colorful interactive system monitor.</p>
    <p><strong>Example:</strong> <code>htop</code></p>

    <h2>25. ps — Process Status</h2>
    <p><strong>Purpose:</strong> Shows running processes.</p>
    <p><strong>Example:</strong> <code>ps aux</code></p>

    <h2>26. kill — Terminate Process</h2>
    <p><strong>Purpose:</strong> Stops a process by PID.</p>
    <p><strong>Example:</strong> <code>kill 1234</code></p>

    <h2>27. ping — Test Connectivity</h2>
    <p><strong>Purpose:</strong> Checks server connection.</p>
    <p><strong>Example:</strong> <code>ping google.com</code></p>

    <h2>28. curl — Download or Fetch URLs</h2>
    <p><strong>Purpose:</strong> Sends API requests or downloads data.</p>
    <p><strong>Example:</strong> <code>curl https://api.github.com</code></p>

    <h2>29. wget — Download Files</h2>
    <p><strong>Purpose:</strong> Downloads files from URLs.</p>
    <p><strong>Example:</strong> <code>wget https://example.com/file.zip</code></p>

    <h2>30. ip a — Network Info</h2>
    <p><strong>Purpose:</strong> Shows IP addresses & interfaces.</p>
    <p><strong>Example:</strong> <code>ip a</code></p>

    <h2>31. hostname — Show System Name</h2>
    <p><strong>Purpose:</strong> Displays device hostname.</p>
    <p><strong>Example:</strong> <code>hostname</code></p>

    <h2>32. whoami — Current User</h2>
    <p><strong>Purpose:</strong> Prints the logged-in username.</p>
    <p><strong>Example:</strong> <code>whoami</code></p>

    <h2>33. history — Command History</h2>
    <p><strong>Purpose:</strong> Shows previously used commands.</p>
    <p><strong>Example:</strong> <code>history</code></p>

    <h2>34. sudo — Run as Administrator</h2>
    <p><strong>Purpose:</strong> Executes commands with root privileges.</p>
    <p><strong>Example:</strong> <code>sudo apt update</code></p>

    <h2>35. chmod — Change Permissions</h2>
    <p><strong>Purpose:</strong> Sets read/write/execute permissions.</p>
    <p><strong>Example:</strong> <code>chmod +x script.sh</code></p>

    <h2>36. chown — Change File Owner</h2>
    <p><strong>Purpose:</strong> Changes file ownership.</p>
    <p><strong>Example:</strong> <code>chown user:user file.txt</code></p>

    <h2>37. tar — Archive Files</h2>
    <p><strong>Purpose:</strong> Create or extract .tar archives.</p>
    <p><strong>Example:</strong> <code>tar -cvf backup.tar folder/</code></p>

    <h2>38. zip — Create Zip File</h2>
    <p><strong>Purpose:</strong> Compress files into .zip.</p>
    <p><strong>Example:</strong> <code>zip project.zip file1 file2</code></p>

    <h2>39. unzip — Extract Zip File</h2>
    <p><strong>Purpose:</strong> Extracts .zip files.</p>
    <p><strong>Example:</strong> <code>unzip project.zip</code></p>

    <h2>40. man — Command Manual</h2>
    <p><strong>Purpose:</strong> Displays documentation for commands.</p>
    <p><strong>Example:</strong> <code>man ls</code></p>

    <h2>41. echo — Print Text</h2>
    <p><strong>Purpose:</strong> Prints text to the terminal.</p>
    <p><strong>Example:</strong> <code>echo "Hello Linux"</code></p>

    <h2>42. date — Show Date & Time</h2>
    <p><strong>Purpose:</strong> Prints system date/time.</p>
    <p><strong>Example:</strong> <code>date</code></p>

    <h2>43. cal — Calendar View</h2>
    <p><strong>Purpose:</strong> Shows a monthly calendar.</p>
    <p><strong>Example:</strong> <code>cal</code></p>

    <h2>44. shutdown — Power Off System</h2>
    <p><strong>Purpose:</strong> Shutdown or restart Linux.</p>
    <p><strong>Example:</strong> <code>shutdown now</code></p>

    <h2>45. reboot — Restart System</h2>
    <p><strong>Purpose:</strong> Reboots the computer.</p>
    <p><strong>Example:</strong> <code>reboot</code></p>

    <h2>46. apt install — Install Software</h2>
    <p><strong>Purpose:</strong> Installs packages (Debian/Ubuntu).</p>
    <p><strong>Example:</strong> <code>sudo apt install git</code></p>

    <h2>47. apt remove — Remove Software</h2>
    <p><strong>Purpose:</strong> Uninstalls packages.</p>
    <p><strong>Example:</strong> <code>sudo apt remove nodejs</code></p>

    <h2>48. systemctl — Manage Services</h2>
    <p><strong>Purpose:</strong> Controls system services.</p>
    <p><strong>Example:</strong> <code>systemctl restart apache2</code></p>

    <h2>49. service — Start/Stop Services</h2>
    <p><strong>Purpose:</strong> Manually control services.</p>
    <p><strong>Example:</strong> <code>service ssh start</code></p>

    <h2>50. passwd — Change Password</h2>
    <p><strong>Purpose:</strong> Updates user password.</p>
    <p><strong>Example:</strong> <code>passwd</code></p>

    <h2>Conclusion</h2>
    <p>These 50 essential Linux commands will help you navigate, control, and manage your system more efficiently. Whether you're a beginner or aspiring power user, mastering these commands will greatly improve your productivity and confidence in the Linux environment.</p>
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

  const [blogLoves, setBlogLoves] = useState(0);
  const [userHasLoved, setUserHasLoved] = useState(false);
  const [lovingBlog, setLovingBlog] = useState(false);

  const [blogLikes, setBlogLikes] = useState(0);
  const [userHasLiked, setUserHasLiked] = useState(false);
  const [likingBlog, setLikingBlog] = useState(false);

  const [blogReactionsError, setBlogReactionsError] = useState<string | null>(
    null
  );

  const [commentCount, setCommentCount] = useState<number>(0);
  const [loadingComments, setLoadingComments] = useState<boolean>(false);

  const userId = 'blog-user-' + Math.random().toString(36).substr(2, 9);

  const loadUserReactionHistory = () => {
    if (!slug) return;
    const loved = JSON.parse(localStorage.getItem('lovedBlogs') || '[]');
    const liked = JSON.parse(localStorage.getItem('likedBlogs') || '[]');
    setUserHasLoved(loved.includes(slug));
    setUserHasLiked(liked.includes(slug));
  };

  const saveUserReaction = (type: 'love' | 'like') => {
    if (!slug) return;
    const key = type === 'love' ? 'lovedBlogs' : 'likedBlogs';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    if (!existing.includes(slug)) {
      existing.push(slug);
      localStorage.setItem(key, JSON.stringify(existing));
    }
  };

  const fetchCommentCount = async () => {
    if (!slug) return;

    try {
      setLoadingComments(true);
      // GitHub REST API to get all discussions
      const response = await fetch(
        'https://api.github.com/repos/codewithdhruba01/codewithdhruba.app/discussions?category_id=DIC_kwDOO78xo84C0Eyx',
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          },
        }
      );

      if (response.ok) {
        const discussions = await response.json();
        // Find discussion that matches our blog post term
        const discussionTerm = `blog-${slug}`;
        const discussion = discussions.find((d: any) => d.title === discussionTerm);
        setCommentCount(discussion?.comments || 0);
      } else {
        console.error('Failed to fetch discussions:', response.status);
        setCommentCount(0);
      }
    } catch (error) {
      console.error('Error fetching comment count:', error);
      setCommentCount(0);
    } finally {
      setLoadingComments(false);
    }
  };

  useEffect(() => {
    if (slug && blogPostsData[slug as keyof typeof blogPostsData]) {
      setPost(blogPostsData[slug as keyof typeof blogPostsData]);
      loadBlogReactions();
      incrementBlogViews();
      fetchCommentCount();
    }
  }, [slug]);

  const incrementBlogViews = async () => {
    if (!slug) return;
    try {
      await commentService.incrementBlogViews(slug);
    } catch { }
  };

  useEffect(() => {
    if (!slug) return;

    const channel = supabase
      .channel(`blog-reactions-${slug}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'blog_loves',
          filter: `blog_slug=eq.${slug}`,
        },
        () => loadBlogReactions()
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'blog_likes',
          filter: `blog_slug=eq.${slug}`,
        },
        () => loadBlogReactions()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [slug]);

  const loadBlogReactions = async () => {
    if (!slug) return;
    try {
      const [loves, likes] = await Promise.all([
        commentService.getBlogLovesCount(slug),
        commentService.getBlogLikesCount(slug),
      ]);
      setBlogLoves(loves);
      setBlogLikes(likes);
      loadUserReactionHistory();
    } catch (e) {
      console.error(e);
    }
  };

  const handleBlogLove = async () => {
    if (!slug || userHasLoved || lovingBlog) return;
    try {
      setLovingBlog(true);
      await commentService.loveBlogPost(slug, userId);
      saveUserReaction('love');
      setBlogLoves((p) => p + 1);
      setUserHasLoved(true);
    } catch {
      setBlogReactionsError('Failed to love the post.');
    } finally {
      setLovingBlog(false);
    }
  };

  const handleBlogLike = async () => {
    if (!slug || userHasLiked || likingBlog) return;
    try {
      setLikingBlog(true);
      await commentService.likeBlogPost(slug, userId);
      saveUserReaction('like');
      setBlogLikes((p) => p + 1);
      setUserHasLiked(true);
    } catch {
      setBlogReactionsError('Failed to like the post.');
    } finally {
      setLikingBlog(false);
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center" />
    );
  }

  return (
    <article className="py-20 px-4">
      <div className="max-w-4xl mx-auto py-10 mb-8">
        {/* Back */}
        <div className="mb-8">
          <a
            href="/all-posts"
            className="inline-flex items-center text-gray-400 hover:text-white transition"
          >
            <Undo2 className="h-4 w-4 mr-2" />
            Back to Blog
          </a>
        </div>

        {/* Header */}
        <header className="mb-12">
          <div className="mb-6">
            <span className="bg-[#1e1e1e] text-neutral-300 px-3 py-1 rounded-full text-sm">
              {post.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {post.title}
          </h1>
          <div className="flex items-center text-gray-400 mb-8">
            <img
              src="https://avatars.githubusercontent.com/u/146111647?v=4"
              alt={post.author}
              className="w-10 h-10 rounded-full mr-4"
            />
            <div>
              <div className="text-white font-bold">
                {post.author}
              </div>
              <div className="text-sm text-neutral-400">
                {post.readTime}
              </div>
            </div>
          </div>
        </header>

        {/* Image */}
        <div className="mb-6">
          <img
            src={post.image}
            alt={post.title}
            className="w-full rounded-lg"
            style={{ maxHeight: '500px', objectFit: 'contain' }}
          />
        </div>

        {/* ✅ NEW: Stats synced with reactions */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 text-sm text-neutral-400">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{post.date}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
              <Heart className="h-4 w-4 text-red-400" />
              <span>{blogLoves}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
              <ThumbsUp className="h-4 w-4 text-blue-400" />
              <span>{blogLikes}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
              <MessageCircle className="h-4 w-4 text-green-400" />
              <span>{loadingComments ? '...' : commentCount}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div
          className="prose prose-lg prose-invert max-w-none text-neutral-400"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag: string) => (
              <span
                key={tag}
                className="bg-[#111111] text-neutral-400 px-3 py-1 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Reactions (main buttons) */}
        <div className="mt-12 flex items-center justify-center space-x-4">
          {blogReactionsError && (
            <p className="text-red-400 text-sm mb-4">
              {blogReactionsError}
            </p>
          )}

          <button
            onClick={handleBlogLove}
            disabled={userHasLoved || lovingBlog}
            className={`flex items-center gap-2 px-5 py-2 rounded-full border transition
              ${userHasLoved
                ? 'bg-red-500/20 border-red-500/40 text-red-400'
                : 'bg-white/5 border-white/10 text-neutral-300 hover:bg-red-500/10'
              }`}
          >
            {lovingBlog ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Heart
                className={`h-4 w-4 ${userHasLoved ? 'fill-red-400 text-red-400' : ''
                  }`}
              />
            )}
            <span>{blogLoves}</span>
          </button>

          <button
            onClick={handleBlogLike}
            disabled={userHasLiked || likingBlog}
            className={`flex items-center gap-2 px-5 py-2 rounded-full border transition
              ${userHasLiked
                ? 'bg-blue-500/20 border-blue-500/40 text-blue-400'
                : 'bg-white/5 border-white/10 text-neutral-300 hover:bg-blue-500/10'
              }`}
          >
            {likingBlog ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ThumbsUp
                className={`h-4 w-4 ${userHasLiked ? 'fill-blue-400 text-blue-400' : ''
                  }`}
              />
            )}
            <span>{blogLikes}</span>
          </button>
        </div>

        {/* Comments */}
        <GiscusComments slug={slug || ''} />
      </div>
    </article>
  );
};

export default BlogPost;

