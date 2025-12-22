export const gettingStartedWithReactTypescript = {
  title: 'Getting Started with React and TypeScript: A Complete Developer\'s Guide',
  date: 'March 15, 2025',
  author: 'Dhrubaraj Pati',
  category: 'Development',
  readTime: '12 min read',
  content: `
     <h2>Why React + TypeScript? The Perfect Developer Combo</h2>
    <p>If you're reading this, you've probably heard about React and TypeScript. But do you know why combining them creates the ultimate frontend development experience? Let me break it down for you.</p>

    <p><strong>React</strong> revolutionized how we build user interfaces with its component-based architecture and declarative approach. <strong>TypeScript</strong> brings static typing to JavaScript, catching errors before they reach production.</p>

    <p>Together, they eliminate an entire category of runtime bugs, provide excellent developer experience with autocompletion, and make large-scale applications maintainable. Think of it as having a co-pilot that catches your mistakes before they become problems.</p>

    <h2>🛠️ Setting Up Your Development Environment</h2>
    <p>Before we dive into code, let's ensure you have the right tools. Here's what you'll need:</p>

    <h3>Essential Tools</h3>
    <ul>
      <li><strong>Node.js 18+</strong> - The runtime environment for modern JavaScript</li>
      <li><strong>npm or yarn</strong> - Package managers for installing dependencies</li>
      <li><strong>Visual Studio Code</strong> - The best editor for TypeScript development</li>
      <li><strong>TypeScript Extension</strong> - Built-in VS Code extension for TypeScript support</li>
    </ul>

    <h3>Recommended VS Code Extensions</h3>
    <ul>
      <li><strong>TypeScript Importer</strong> - Auto-import TypeScript definitions</li>
      <li><strong>ESLint</strong> - Code linting for consistent code quality</li>
      <li><strong>Prettier</strong> - Code formatting for consistent style</li>
      <li><strong>Auto Rename Tag</strong> - Automatically rename paired HTML/JSX tags</li>
    </ul>

    <h2>📦 Creating Your First React + TypeScript Project</h2>
    <p>Let's create a modern React TypeScript project. We'll use Vite for faster development and better performance:</p>

    <h3>Option 1: Vite (Recommended)</h3>
    <pre><code class="language-bash">npm create vite@latest my-react-ts-app -- --template react-ts
cd my-react-ts-app
npm install
npm run dev</code></pre>

    <h3>Option 2: Create React App (Traditional)</h3>
    <pre><code class="language-bash">npx create-react-app my-app --template typescript
cd my-app
npm start</code></pre>

    <p><strong>Why Vite?</strong> It's significantly faster than CRA, has better TypeScript support, and provides a more modern development experience.</p>

    <h2>Understanding TypeScript Configuration</h2>
    <p>After creating your project, you'll see a <code>tsconfig.json</code> file. This is your TypeScript configuration. Here's what the important settings mean:</p>

    <pre><code class="language-json">{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}</code></pre>

    <h2>TypeScript Fundamentals for React Developers</h2>
    <p>Now let's dive into the TypeScript concepts you'll use daily in React development.</p>

    <h3>1. Basic Types</h3>
    <pre><code class="language-typescript">// Primitive types
const name: string = "John Doe";
const age: number = 25;
const isActive: boolean = true;
const data: null = null;
const config: undefined = undefined;

// Arrays
const numbers: number[] = [1, 2, 3, 4, 5];
const names: Array&lt;string&gt; = ["Alice", "Bob", "Charlie"];

// Objects
const user: { name: string; age: number } = {
  name: "John",
  age: 25
};</code></pre>

    <h3>2. Interfaces vs Type Aliases</h3>
    <pre><code class="language-typescript">// Interface (recommended for objects)
interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

// Type Alias (for unions, primitives, etc.)
type UserId = string | number;
type Status = "loading" | "success" | "error";
type ApiResponse&lt;T&gt; = {
  data: T;
  status: Status;
  message?: string;
};</code></pre>

    <h3>3. React Component Props</h3>
    <pre><code class="language-typescript">interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
}

const Button: React.FC&lt;ButtonProps&gt; = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick
}) =&gt; {
  return (
    &lt;button
      className={\`btn btn-\${variant} btn-\${size}\`}
      disabled={disabled}
      onClick={onClick}
    &gt;
      {children}
    &lt;/button&gt;
  );
};</code></pre>

    <h3>4. State Management with TypeScript</h3>
    <pre><code class="language-typescript">import { useState, useEffect } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

const TodoApp: React.FC = () =&gt; {
  const [todos, setTodos] = useState&lt;Todo[]&gt;([]);
  const [loading, setLoading] = useState&lt;boolean&gt;(false);
  const [filter, setFilter] = useState&lt;'all' | 'active' | 'completed'&gt;('all');

  const addTodo = (text: string, priority: Todo['priority'] = 'medium') =&gt; {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
      priority
    };
    setTodos(prev =&gt; [...prev, newTodo]);
  };

  return (
    &lt;div&gt;
      {/* Your component JSX */}
    &lt;/div&gt;
  );
};</code></pre>

    <h3>5. Event Handlers</h3>
    <pre><code class="language-typescript">interface FormProps {
  onSubmit: (data: FormData) =&gt; void;
}

const ContactForm: React.FC&lt;FormProps&gt; = ({ onSubmit }) =&gt; {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent&lt;HTMLInputElement | HTMLTextAreaElement&gt;) =&gt; {
    const { name, value } = e.target;
    setFormData(prev =&gt; ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent&lt;HTMLFormElement&gt;) =&gt; {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    &lt;form onSubmit={handleSubmit}&gt;
      &lt;input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Your name"
      /&gt;
      &lt;input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Your email"
      /&gt;
      &lt;textarea
        name="message"
        value={formData.message}
        onChange={handleInputChange}
        placeholder="Your message"
      /&gt;
      &lt;button type="submit"&gt;Send Message&lt;/button&gt;
    &lt;/form&gt;
  );
};</code></pre>

    <h3>6. Custom Hooks with TypeScript</h3>
    <pre><code class="language-typescript">// useLocalStorage hook
function useLocalStorage&lt;T&gt;(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState&lt;T&gt;(() =&gt; {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(\`Error reading localStorage key "\${key}":\`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) =&gt; T)) =&gt; {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(\`Error setting localStorage key "\${key}":\`, error);
    }
  };

  return [storedValue, setValue] as const;
}

// Usage
const [user, setUser] = useLocalStorage('user', { name: '', email: '' });</code></pre>

    <h2>Common TypeScript Pitfalls & Solutions</h2>

    <h3>1. The 'any' Type Anti-pattern</h3>
    <pre><code class="language-typescript">// Bad: Using 'any' everywhere
const user: any = { name: "John", age: 30 };

// Good: Proper typing
interface User {
  name: string;
  age: number;
}

const user: User = { name: "John", age: 30 };

// For dynamic data, use generics
const apiResponse: ApiResponse&lt;User&gt; = {
  data: user,
  status: "success"
};</code></pre>

    <h3>2. Optional Props Handling</h3>
    <pre><code class="language-typescript">interface ComponentProps {
  title: string;           // Required
  subtitle?: string;       // Optional
  onClick?: () =&gt; void;    // Optional callback
}

const MyComponent: React.FC&lt;ComponentProps&gt; = ({
  title,
  subtitle,
  onClick
}) =&gt; {
  return (
    &lt;div&gt;
      &lt;h1&gt;{title}&lt;/h1&gt;
      {subtitle && &lt;h2&gt;{subtitle}&lt;/h2&gt;}
      &lt;button onClick={onClick} disabled={!onClick}&gt;
        Click me
      &lt;/button&gt;
    &lt;/div&gt;
  );
};</code></pre>

    <h2>Advanced Patterns</h2>

    <h3>Generic Components</h3>
    <pre><code class="language-typescript">interface SelectProps&lt;T&gt; {
  options: T[];
  value: T | null;
  onChange: (value: T) =&gt; void;
  getLabel: (option: T) =&gt; string;
  getValue: (option: T) =&gt; string | number;
}

function Select&lt;T&gt;({
  options,
  value,
  onChange,
  getLabel,
  getValue
}: SelectProps&lt;T&gt;) {
  return (
    &lt;select
      value={value ? getValue(value) : ''}
      onChange={(e) =&gt; {
        const selectedOption = options.find(
          opt =&gt; getValue(opt).toString() === e.target.value
        );
        if (selectedOption) onChange(selectedOption);
      }}
    &gt;
      &lt;option value=""&gt;Select an option&lt;/option&gt;
      {options.map((option) =&gt; (
        &lt;option key={getValue(option)} value={getValue(option)}&gt;
          {getLabel(option)}
        &lt;/option&gt;
      ))}
    &lt;/select&gt;
  );
}

// Usage
interface User {
  id: number;
  name: string;
}

const users: User[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
];

&lt;Select
  options={users}
  value={selectedUser}
  onChange={setSelectedUser}
  getLabel={(user) =&gt; user.name}
  getValue={(user) =&gt; user.id}
/&gt;</code></pre>

    <h3>Higher-Order Components (HOCs)</h3>
    <pre><code class="language-typescript">// HOC for adding loading state
function withLoading&lt;P extends object&gt;(
  WrappedComponent: React.ComponentType&lt;P&gt;
) {
  return function WithLoadingComponent(props: P) {
    const [loading, setLoading] = useState(true);

    useEffect(() =&gt; {
      // Simulate loading
      const timer = setTimeout(() =&gt; setLoading(false), 2000);
      return () =&gt; clearTimeout(timer);
    }, []);

    if (loading) {
      return &lt;div&gt;Loading...&lt;/div&gt;;
    }

    return &lt;WrappedComponent {...props} /&gt;;
  };
}

// Usage
interface UserProfileProps {
  userId: string;
}

const UserProfile: React.FC&lt;UserProfileProps&gt; = ({ userId }) =&gt; {
  // Component logic
  return &lt;div&gt;User Profile&lt;/div&gt;;
};

export default withLoading(UserProfile);</code></pre>

    <h2>TypeScript Configuration Best Practices</h2>
    <p>Here are some recommended TypeScript configurations for React projects:</p>

    <h3>Essential tsconfig.json Settings</h3>
    <pre><code class="language-json">{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}</code></pre>

    <h2>Useful Resources & Learning Paths</h2>
    <ul>
      <li><strong>Official TypeScript Handbook:</strong> <a href="https://www.typescriptlang.org/docs/" target="_blank">typescriptlang.org/docs</a></li>
      <li><strong>React TypeScript Cheatsheet:</strong> <a href="https://react-typescript-cheatsheet.netlify.app/" target="_blank">react-typescript-cheatsheet</a></li>
      <li><strong>TypeScript Deep Dive:</strong> Free online book by Basarat Syed</li>
      <li><strong>Total TypeScript:</strong> Comprehensive TypeScript course by Matt Pocock</li>
    </ul>

    <h2>Key Takeaways</h2>
    <div style="background: rgba(10, 10, 10, 0.1); border-left: 4px solid rgb(16, 189, 108); padding: 1rem; margin: 1rem 0;">
      <ul>
        <li><strong>Start Simple:</strong> Begin with basic types and gradually add complexity</li>
        <li><strong>Use Interfaces for Objects:</strong> Better for extending and implementing</li>
        <li><strong>Leverage Generics:</strong> They make your components reusable and type-safe</li>
        <li><strong>Enable Strict Mode:</strong> Catch more errors at compile time</li>
        <li><strong>Don't Fear 'any':</strong> But use it sparingly and replace with proper types</li>
        <li><strong>Custom Hooks:</strong> Great for encapsulating typed logic</li>
      </ul>
    </div>

    <h2>What's Next?</h2>
    <p>Now that you have a solid foundation in React + TypeScript, here are some advanced topics to explore:</p>

    <ul>
      <li><strong>React Query + TypeScript</strong> for server state management</li>
      <li><strong>Zustand or Redux Toolkit</strong> for complex state management</li>
      <li><strong>React Hook Form + Zod</strong> for advanced form validation</li>
      <li><strong>Next.js with TypeScript</strong> for full-stack applications</li>
      <li><strong>Testing with Jest + React Testing Library</strong></li>
    </ul>

    <h2>Conclusion</h2>
    <p>Congratulations! You've taken the first step towards becoming a more confident and productive React developer. TypeScript might feel overwhelming at first, but the benefits far outweigh the learning curve.</p>

    <p>Remember, every expert was once a beginner. Start building small projects, make mistakes, learn from them, and gradually you'll develop an intuition for TypeScript patterns.</p>

    <p>The combination of React's flexibility and TypeScript's safety creates a development experience that's simply unparalleled. Welcome to the future of JavaScript development! 🚀</p>

    <p><em>Happy coding, and may your types always be correct!</em></p>
    `,
  image: '/blog/blog2.png',
  tags: ['React', 'TypeScript', 'Web Development', 'JavaScript', 'Frontend'],
};
