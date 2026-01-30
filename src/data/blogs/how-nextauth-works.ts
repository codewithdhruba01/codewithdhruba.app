export const howNextAuthWorks = {
    title: 'How NextAuth.js Works',
    date: 'January 30, 2026',
    author: 'Dhrubaraj Pati',
    category: 'Web Development',
    readTime: '8 min read',
    image: '/blog/blog6.png',
    tags: ['Next.js', 'NextAuth.js', 'Authentication', 'React', 'Security'],
    content: `
    <h2>Introduction</h2>
    <p>Authentication is a core part of modern web applications. Manually implementing secure login, session handling, OAuth integration, and user management is complex.</p>
    <p><strong>NextAuth.js</strong> (Auth.js) is a powerful authentication solution for Next.js applications that simplifies all this complexity.</p>
    <p>In this guide, we will understand NextAuth.js <strong>concept-wise and step-by-step</strong>.</p>

    <h2>1. What is NextAuth.js?</h2>
    <p><strong>NextAuth.js</strong> is an open-source authentication library specifically designed for <strong>Next.js</strong>.</p>
    <p>It handles:</p>
    <ul>
      <li>User authentication</li>
      <li>OAuth providers (Google, GitHub, etc.)</li>
      <li>Session & JWT management</li>
      <li>Secure cookies</li>
      <li>Database integration</li>
    </ul>
    <p>👉 In simple words:<br /><strong>NextAuth.js = Secure authentication without writing complex logic</strong></p>

    <h2>2. Why Do We Need NextAuth.js?</h2>
    <p>If we implement authentication ourselves, we have to manage all of this:</p>
    <ul>
      <li>Password hashing</li>
      <li>OAuth flow</li>
      <li>Token generation</li>
      <li>Session expiration</li>
      <li>Cookie security</li>
    </ul>
    <p>NextAuth.js:</p>
    <ul>
      <li>Handles all of this automatically</li>
      <li>Follows industry-standard security</li>
      <li>Saves developer time</li>
    </ul>

    <h2>3. Core Concepts of NextAuth.js</h2>
    <p>To understand NextAuth.js, it is important to clear some core concepts.</p>

    <h3>a) Providers</h3>
    <p>Providers determine <strong>how the user will log in</strong>.</p>
    <p>Types of providers:</p>
    <ul>
      <li>OAuth → Google, GitHub, Facebook</li>
      <li>Credentials → Email & Password</li>
      <li>Email → Magic link login</li>
    </ul>
    <p>Every provider tells NextAuth:</p>
    <ul>
      <li>Where authentication will happen</li>
      <li>How user data will be obtained</li>
    </ul>

    <h3>b) Sessions</h3>
    <p>Session means <strong>keeping the user in a logged-in state</strong>.</p>
    <p>NextAuth supports 2 types of sessions:</p>
    <ul>
      <li>JWT based session</li>
      <li>Database based session</li>
    </ul>

    <h2>4. Authentication Flow in NextAuth.js</h2>
    <p>Now let's see the <strong>actual working flow</strong> of NextAuth.js.</p>

    <h3>Step 1: User Initiates Login</h3>
    <p>User clicks the "Sign in" button.</p>

    <h3>Step 2: Redirect to Provider</h3>
    <p>If OAuth is being used:</p>
    <ul>
      <li>User is redirected to the provider's page (Google / GitHub)</li>
    </ul>

    <h3>Step 3: Provider Verifies User</h3>
    <p>Provider:</p>
    <ul>
      <li>Verifies the user's identity</li>
      <li>Asks for permission (email, profile)</li>
    </ul>

    <h3>Step 4: Callback Handling</h3>
    <p>After successful login, the Provider:</p>
    <ul>
      <li>Sends a response to the NextAuth callback URL</li>
      <li>NextAuth extracts user data</li>
    </ul>

    <h3>Step 5: Session Creation</h3>
    <p>NextAuth:</p>
    <ul>
      <li>Creates a JWT or database session</li>
      <li>Stores it in a secure cookie</li>
    </ul>

    <h3>Step 6: User Logged In</h3>
    <p>User is successfully logged in 🎉</p>

    <h2>5. Callbacks in NextAuth.js</h2>
    <p>Callbacks give developers control to customize the authentication flow.</p>
    <p>Common callbacks:</p>
    <ul>
      <li><code>signIn</code> → Allow or deny login</li>
      <li><code>jwt</code> → Modify token</li>
      <li><code>session</code> → Add extra data to session</li>
      <li><code>redirect</code> → Custom redirect logic</li>
    </ul>
    <p>Use cases:</p>
    <ul>
      <li>Adding user role</li>
      <li>Admin / user access control</li>
      <li>Attaching custom claims</li>
    </ul>

    <h2>6. Session Management Explained</h2>

    <h3>a) JWT Session</h3>
    <ul>
      <li>Session data is in an encrypted cookie</li>
      <li>No database required</li>
      <li>Fast & scalable</li>
    </ul>
    <p>Best for:</p>
    <ul>
      <li>Small to medium applications</li>
    </ul>

    <h3>b) Database Session</h3>
    <ul>
      <li>Session is stored in the database</li>
      <li>Multi-device logout possible</li>
      <li>Better control</li>
    </ul>
    <p>Best for:</p>
    <ul>
      <li>Large & enterprise applications</li>
    </ul>

    <h2>7. Cookie & Security Handling</h2>
    <p>NextAuth.js automatically:</p>
    <ul>
      <li>Uses HTTP-only cookies</li>
      <li>Provides CSRF protection</li>
      <li>Encrypts tokens</li>
    </ul>
    <p>Because of this:</p>
    <ul>
      <li>Risk of XSS attacks is low</li>
      <li>Authentication is secure</li>
    </ul>

    <h2>8. Database Integration in NextAuth.js</h2>
    <p>NextAuth.js easily integrates with:</p>
    <ul>
      <li>MongoDB</li>
      <li>PostgreSQL</li>
      <li>MySQL</li>
      <li>Prisma ORM</li>
    </ul>
    <p>Database is used to:</p>
    <ul>
      <li>Store users</li>
      <li>Link OAuth accounts</li>
      <li>Manage sessions</li>
    </ul>

    <h2>9. Authentication vs Authorization</h2>
    <p>Important difference 👇</p>
    <ul>
      <li><strong>Authentication</strong> → Who is the user?</li>
      <li><strong>Authorization</strong> → What can the user do?</li>
    </ul>
    <p>NextAuth:</p>
    <ul>
      <li>Handles Authentication</li>
    </ul>
    <p>Authorization:</p>
    <ul>
      <li>Roles</li>
      <li>Permissions</li>
      <li>Handled by Middleware</li>
    </ul>

    <h2>10. Protecting Pages & API Routes</h2>
    <p>Through NextAuth:</p>
    <ul>
      <li>Server-side pages can be protected</li>
      <li>API routes can be secured</li>
    </ul>
    <p>Logic is simple:</p>
    <ul>
      <li>Session exists → Access allowed</li>
      <li>No session → Redirect to login</li>
    </ul>

    <h2>11. Advantages of NextAuth.js</h2>
    <p> Easy configuration<br /> Secure by default<br /> Multiple login methods<br /> Next.js friendly<br /> Active community</p>

    <h2>12. When Should You Use NextAuth.js?</h2>
    <p>Use NextAuth.js if:</p>
    <ul>
      <li>You are building a Next.js project</li>
      <li>You need OAuth or email login</li>
      <li>You need secure authentication</li>
      <li>You need fast development</li>
    </ul>

    <h2>13. Conclusion</h2>
    <p>NextAuth.js makes authentication:</p>
    <ul>
      <li>Simple</li>
      <li>Secure</li>
      <li>Scalable</li>
    </ul>
  `,
};
