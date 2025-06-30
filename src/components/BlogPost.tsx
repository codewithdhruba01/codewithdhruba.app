import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'

// Blog post data (mocked, would come from an API in real case)
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
      
       <h2>Setting Up Your Development Environment</h2>
    <p>Before you begin, make sure you have the following tools installed:</p>
    <ul>
      <li><strong>Node.js</strong> (recommended version 18.x or later)</li>
      <li><strong>npm</strong> or <strong>yarn</strong> as your package manager</li>
      <li><strong>Visual Studio Code</strong> for code editing, along with extensions like ESLint, Prettier, and the TypeScript language support</li>
    </ul>
    <p>These tools provide a modern development setup that supports TypeScript features like autocompletion, type checking, and more.</p>
      
      <h2>Creating a New React TypeScript Project</h2>
    <p>The easiest way to get started is by using Create React App with the TypeScript template. Open your terminal and run:</p>
    <pre><code>npx create-react-app my-app --template typescript</code></pre>
    <p>This command will create a new React project pre-configured for TypeScript. You’ll notice files like <code>tsconfig.json</code> and components using <code>.tsx</code> extensions, which support JSX and TypeScript together.</p>
      
     <h2>Basic TypeScript Concepts for React</h2>
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
    image: '/blog/thumbnails/blog2.jpg',
    tags: ['React', 'TypeScript', 'Web Development']
  },

  'optimizing-neural-networks-edge-devices': {
    title: 'Optimizing Neural Networks for Edge Devices',
    date: 'March 20, 2025',
    author: 'Dhrubaraj Pati',
    category: 'Machine Learning',
    readTime: '8 min read',
    content: `
      <h2>Introduction to Edge AI</h2>
      <p>Edge AI is revolutionizing how we deploy machine learning models...</p>
      <h2>Challenges in Edge Deployment</h2>
      <p>Deploying neural networks on edge devices presents unique challenges...</p>
      <h2>Optimization Techniques</h2>
      <ul>
        <li>Model Quantization</li>
        <li>Network Pruning</li>
        <li>Knowledge Distillation</li>
      </ul>
      <h2>Conclusion</h2>
      <p>These techniques improve performance and reduce resource usage.</p>
    `,
    image: '/blog/thumbnails/blog3.jpg',
    tags: ['Machine Learning', 'Edge Computing', 'Neural Networks', 'Optimization']
  },

  'building-a-responsive-portfolio': {
    title: 'Building a Responsive Portfolio Website',
    date: 'April 10, 2025',
    author: 'Dhrubaraj Pati',
    category: 'Web Design',
    readTime: '6 min read',
    content: `
      <h2>Why a Portfolio Website Matters</h2>
      <p>Your portfolio is the first impression recruiters get...</p>
      <h2>Planning Your Layout</h2>
      <p>Use clear sections like Home, About, Projects, and Contact.</p>
      <h2>Using Flexbox and Grid</h2>
      <p>Leverage modern CSS for a great user experience.</p>
    `,
    image: 'https://via.placeholder.com/1200x600',
    tags: ['Portfolio', 'HTML', 'CSS', 'Responsive Design']
  },

  'getting-started-with-sql': {
    title: 'Getting Started with SQL',
    date: 'May 05, 2025',
    author: 'Dhrubaraj Pati',
    category: 'Database',
    readTime: '7 min read',
    content: `
      <h2>Introduction to SQL</h2>
      <p>SQL (Structured Query Language) is used to interact with relational databases...</p>
      <h2>Core SQL Commands</h2>
      <ul>
        <li><strong>DDL:</strong> CREATE, DROP, ALTER</li>
        <li><strong>DML:</strong> INSERT, UPDATE, DELETE</li>
        <li><strong>DQL:</strong> SELECT, WHERE, GROUP BY</li>
      </ul>
      <h2>Practice and Learning</h2>
      <p>Practice with online platforms or local tools like MySQL.</p>
    `,
    image: 'https://via.placeholder.com/1200x600',
    tags: ['SQL', 'Databases', 'MySQL', 'PostgreSQL']
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
          <h2 className="text-2xl font-bold mb-4">Blog Post Not Found</h2>
          <a href="/blog" className="text-[#00DC82] hover:text-white transition-colors">
            Return to Blog
          </a>
        </div>
      </div>
    );
  }

  return (
    <article className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-12" data-aos="fade-up">
          <div className="mb-6">
            <span className="bg-[#00DC82] text-black px-3 py-1 rounded-full text-sm font-medium">
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
              <div className="font-medium text-white">{post.author}</div>
              <div className="text-sm">
                {post.date} · {post.readTime}
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-12" data-aos="fade-up">
          <img
            src='/blog/thumbnails/blog2.jpg'
            alt= 'Started with React and TypeScript'
            className="w-full h-[400px] object-cover rounded-lg"
          />
        </div>

        {/* Content */}
        <div
          className="prose prose-lg prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
          data-aos="fade-up"
        />

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-gray-800" data-aos="fade-up">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag: string) => (
              <span
                key={tag}
                className="bg-[#111111] text-gray-300 px-3 py-1 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Share Section */}
        <div className="mt-12 flex items-center justify-between" data-aos="fade-up">
          <div className="text-gray-400">Share this article:</div>
          <div className="flex space-x-4">
          
            
            <div className="flex space-x-4">
              <a href="https://x.com/codewithdhruba" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5 hover:text-[#00CAFF]" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://www.linkedin.com/in/dhrubaraj-pati/" className="text-muted-foreground hover:text-foreground">
                <Linkedin className="h-5 w-5 hover:text-[#5093f7]" />
                <span className="sr-only">Linkedin</span>
              </a>
              <a href="https://www.instagram.com/dhrubaraj_pati/" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-5 w-5 hover:text-[#E4405F] transition-transform hover:scale-110" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://m.facebook.com/dhruba.raj.113858/" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-5 w-5 hover:text-[#4a5bf5] transition-transform hover:scale-110" />
                <span className="sr-only">Facebook</span>
              </a>
            </div>
          
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;
