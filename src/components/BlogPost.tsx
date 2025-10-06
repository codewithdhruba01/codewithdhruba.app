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
