export const howNextAuthWorks = {
  title: 'How NextAuth.js Works',
  date: 'January 31, 2026',
  author: 'Dhrubaraj Pati',
  category: 'Web Development',
  readTime: '10 min read',
  image: '/blog/blog6.png',
  tags: ['Next.js', 'NextAuth.js', 'Authentication', 'React', 'Security'],
  content: `
    <h2>Introduction</h2>
    <p>Authentication is a crucial part of modern web applications. Implementing secure login, session handling, OAuth integration (like Google or GitHub login), and user management manually can be quite complex and time-consuming.</p>
    <p><strong>NextAuth.js</strong> (now Auth.js) is a powerful and secure authentication solution for Next.js applications that simplifies all of this complexity.</p>
    <p>In this guide, we will understand <strong>how NextAuth.js works</strong>, both concept-wise and step-by-step.</p>

    <h2>1. What is NextAuth.js?</h2>
    <p><strong>NextAuth.js</strong> is an open-source authentication library specifically designed for <strong>Next.js</strong>. It provides serverless and secure authentication.</p>
    <p>It handles:</p>
    <ul>
      <li>User Authentication (Login/Signup)</li>
      <li>OAuth Providers (Google, GitHub, Facebook, Twitter, etc.)</li>
      <li>Session and JWT (JSON Web Token) management</li>
      <li>Secure Cookies handling</li>
      <li>Database Integration (Prisma, MongoDB, etc.)</li>
    </ul>
    <p>👉 In simple terms:<br /><strong>NextAuth.js = Secure authentication without writing complex logic.</strong></p>

    <h2>2. Why Do We Need NextAuth.js?</h2>
    <p>If we were to implement authentication manually, we would have to manage all of the following ourselves:</p>
    <ul>
      <li>Password Hashing (for security)</li>
      <li>OAuth Flows (communicating with Google, exchanging tokens)</li>
      <li>Token Generation & Validation</li>
      <li>Session Expiry & Refresh Tokens</li>
      <li>CSRF Protection and Cookie Security</li>
    </ul>
    <p>NextAuth.js handles all of this <strong>automatically</strong>, which saves development time and ensures the application remains secure.</p>

    <h2>3. Authentication Flow: How It Works</h2>
    <p>To understand the working mechanism of NextAuth.js, let's look at the flow step-by-step. The diagram below explains the entire process:</p>

    <figure>
        <img src="/blog/nextauth-architecture.png" alt="NextAuth.js Architecture Flow Diagram" style="width: 80%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin: 0 auto; display: block;" />
        <figcaption style="text-align: center; margin-top: 10px; font-size: 0.9em; color: #666;">NextAuth.js Authentication Flow</figcaption>
    </figure>

    <h3>Step 1: User Initiates Login</h3>
    <p>When a user clicks the "Sign in with Google" or "Login" button on the website, the <code>signIn()</code> method of NextAuth.js is called.</p>

    <h3>Step 2: Redirect to Provider</h3>
    <p>If you are using OAuth (like Google/GitHub), NextAuth <strong>redirects</strong> the user to that provider's secure login page. Here, the user enters their password and grants permission.</p>

    <h3>Step 3: Verification & Callback</h3>
    <p>Once the user successfully logs in, the Provider (Google/GitHub) sends the user back to your website (Redirect back). Along with this, it sends a secret <strong>authorization code</strong>.</p>
    <p>The NextAuth.js backend (API route) receives this code and verifies whether it is genuine or not.</p>

    <h3>Step 4: Session Creation</h3>
    <p>After successful verification, NextAuth.js creates a <strong>Session</strong>. This session can be of two types:</p>
    <ul>
        <li><strong>JWT (JSON Web Token):</strong> Session data is stored in an encrypted form within the user's browser cookie. (Default behavior)</li>
        <li><strong>Database Session:</strong> The session ID is in the cookie, and the actual data is saved in the database.</li>
    </ul>

    <h3>Step 5: Cookie Set & Login Complete</h3>
    <p>Finally, a secure, encrypted <strong>HTTP-only cookie</strong> is set in the browser. Now, whenever the user visits a protected page, NextAuth checks this cookie and grants access.</p>

    <h2>4. Core Concepts</h2>

    <h3>a) Providers</h3>
    <p>Providers are the services through which a user logs in. NextAuth has built-in support for:</p>
    <ul>
      <li><strong>OAuth Providers:</strong> Google, GitHub, Discord, Twitter, etc.</li>
      <li><strong>Credentials Provider:</strong> Your own custom Email/Password login system.</li>
      <li><strong>Email Provider:</strong> Magic Links (Passwordless login via email).</li>
    </ul>

    <h3>b) Sessions & Strategies</h3>
    <p>NextAuth uses 2 strategies to manage sessions:</p>
    <ul>
      <li><strong>JWT (Stateless):</strong> No database required. It is fast and best for small to medium applications.</li>
      <li><strong>Database (Stateful):</strong> The session is stored in the database. This is better if you need to logout a user from the server side.</li>
    </ul>

    <h3>c) Adapters</h3>
    <p>If you want to save user data (Profile, Sessions) in your database (MongoDB, Postgres, MySQL), <strong>Adapters</strong> are used. NextAuth provides adapters for popular ORMs like Prisma, Drizzle, Mongoose, etc.</p>

    <h2>5. Security</h2>
    <p>NextAuth.js prioritizes security:</p>
    <ul>
      <li><strong>CSRF Token:</strong> Protects against Cross-Site Request Forgery attacks.</li>
      <li><strong>Encrypted Cookies:</strong> Cookies are encrypted by default, so no one can read them.</li>
      <li><strong>HTTP-Only:</strong> Client-side JavaScript (XSS attacks) cannot access the cookies.</li>
    </ul>

    <h2>Conclusion</h2>
    <p>So friends, NextAuth.js is not just a wrapper; it is a complete security suite for Next.js. It hides the complexity of OAuth flows, sessions, and security headers so you can focus on your app's features.</p>
    <p>If you are using Next.js, NextAuth.js (Auth.js) is definitely the best choice for authentication!</p>
  `,
};
