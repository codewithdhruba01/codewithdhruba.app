export const howNextAuthWorks = {
    title: 'How NextAuth.js Works',
    date: 'January 30, 2026',
    author: 'Dhrubaraj Pati',
    category: 'Web Development',
    readTime: '6 min read',
    image: '/blog/blog6.png',
    tags: ['Next.js', 'NextAuth.js', 'Authentication', 'React', 'Security'],
    content: `
    <h2>Introduction</h2>
    <p>Authentication is one of the most critical parts of any web application, but it's also one of the hardest to get right. NextAuth.js (now known as Auth.js) has emerged as the go-to solution for authentication in Next.js applications.</p>
    <p>In this post, we'll dive deep into how NextAuth.js works under the hood and why it's such a popular choice for developers.</p>

    <h2>What is NextAuth.js?</h2>
    <p>NextAuth.js is an open-source authentication library designed specifically for Next.js. It supports various authentication methods, including OAuth (Google, GitHub, Twitter), passwordless login (email magic links), and traditional credentials.</p>

    <h2>Core Concepts</h2>
    
    <h3>1. Sessions</h3>
    <p>NextAuth.js manages sessions using either JSON Web Tokens (JWT) or database sessions. By default, it uses JWTs, which means no database is required to get started. The session data is encrypted and stored in a secure, HTTP-only cookie.</p>

    <h3>2. Providers</h3>
    <p>Providers are services that handle the authentication. NextAuth.js comes with built-in support for 50+ providers like:</p>
    <ul>
      <li><strong>OAuth Providers:</strong> Google, Facebook, GitHub, etc.</li>
      <li><strong>Email:</strong> Passwordless sign-in via email.</li>
      <li><strong>Credentials:</strong> Custom username/password authentication.</li>
    </ul>

    <h3>3. Adapters</h3>
    <p>If you need to persist user data (like user profiles or sessions) in a database, NextAuth.js uses "Adapters." It supports popular databases like PostgreSQL, MySQL, MongoDB, and Prisma.</p>

    <h2>How the Flow Works</h2>
    <p>Here is a simplified breakdown of the authentication flow:</p>
    <ol>
      <li><strong>User Clicks Login:</strong> The user selects a provider (e.g., "Sign in with Google").</li>
      <li><strong>Redirect to Provider:</strong> The app redirects the user to the provider's login page.</li>
      <li><strong>User Authenticates:</strong> The user logs in and approves permissions.</li>
      <li><strong>Callback:</strong> The provider redirects back to your app with a code.</li>
      <li><strong>Token Exchange:</strong> NextAuth.js exchanges the code for an access token (and ID token).</li>
      <li><strong>Session Created:</strong> A session is created (JWT or Database) and the user is logged in.</li>
    </ol>

    <h2>Basic Setup</h2>
    <p>Setting up NextAuth.js is surprisingly simple. You create a dynamic API route at <code>pages/api/auth/[...nextauth].js</code> (or <code>app/api/auth/[...nextauth]/route.ts</code> in the App Router):</p>
    
    <pre><code class="language-javascript">import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
}

export default NextAuth(authOptions)</code></pre>

    <h2>Conclusion</h2>
    <p>NextAuth.js abstracts away the complexity of OAuth and session management, allowing developers to implement secure authentication in minutes. Whether you are building a simple side project or a large enterprise app, NextAuth.js provides the flexibility and security you need.</p>
  `,
};
