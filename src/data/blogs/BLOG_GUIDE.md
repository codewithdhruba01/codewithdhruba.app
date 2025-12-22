# Blog Management Guide

This guide explains how to add new blog posts to the portfolio website.

## Folder Structure

```
src/data/blogs/
├── README.md                    # This guide
├── index.ts                     # Central export file
├── getting-started-with-react-typescript.ts
├── building-my-first-website-with-react-and-tailwind.ts
├── chrome-keyboard-shortcuts.ts
├── essential-linux-commands.ts
└── openweather-api-guide.ts
```

## Adding a New Blog Post

### Step 1: Create Blog Post File

Create a new TypeScript file in `src/data/blogs/` with the following naming convention:
- Use kebab-case for the filename
- Example: `my-awesome-blog-post.ts`

### Step 2: Blog Post Structure

Each blog post must export an object with the following structure:

```typescript
export const myAwesomeBlogPost = {
  title: 'My Awesome Blog Post Title',
  date: 'December 25, 2025',          // Use format: 'Month DD, YYYY'
  author: 'Your Name',
  category: 'Category Name',           // Single category as string
  readTime: '5 min read',              // Estimated reading time
  image: '/blog/your-image.png',       // Path to blog image in public/blog/
  tags: ['Tag1', 'Tag2', 'Tag3'],      // Array of tags for the post
  content: `
    <h2>Your First Heading</h2>
    <p>Your blog content goes here...</p>

    <h2>Another Heading</h2>
    <p>More content...</p>

    <pre><code class="language-javascript">console.log('Hello World!');</code></pre>
  `,
};
```

### Step 3: Update Index File

Add your blog post to `src/data/blogs/index.ts`:

```typescript
// Add import at the top
import { myAwesomeBlogPost } from './my-awesome-blog-post';

// Add to blogPostsData object
export const blogPostsData = {
  // ... existing posts
  'my-awesome-blog-post': myAwesomeBlogPost,
};
```

### Step 4: Add Description for Listing

Update `src/pages/AllPosts.tsx` to include a description for your blog post:

```typescript
const blogDescriptions = {
  // ... existing descriptions
  'my-awesome-blog-post': 'A brief, engaging description of your blog post for the listing page.',
};
```

### Step 5: Add Blog Image

Place your blog image in the `public/blog/` folder. Make sure:
- Image name matches the path in your blog post
- Recommended size: 800x400px or similar aspect ratio
- Format: PNG, JPG, or WebP

## Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `title` | string | Blog post title | `"Getting Started with React"` |
| `date` | string | Publication date | `"December 25, 2025"` |
| `author` | string | Author name | `"Dhrubaraj Pati"` |
| `category` | string | Main category | `"Development"` |
| `readTime` | string | Estimated read time | `"5 min read"` |
| `image` | string | Image path | `"/blog/my-post.png"` |
| `tags` | string[] | Tags array | `["React", "Tutorial"]` |
| `content` | string | HTML content | Blog post content |

## Content Formatting

### Supported HTML Tags
- Headings: `<h1>`, `<h2>`, `<h3>`, etc.
- Paragraphs: `<p>`
- Lists: `<ul>`, `<ol>`, `<li>`
- Links: `<a href="...">`
- Code blocks: `<pre><code class="language-javascript">`
- Inline code: `<code>`
- Bold: `<strong>`, `<b>`
- Italic: `<em>`, `<i>`
- Images: `<img src="..." alt="...">`

### Syntax Highlighting
Use Prism.js classes for code blocks:
- `language-javascript` for JavaScript
- `language-typescript` for TypeScript
- `language-python` for Python
- `language-bash` for terminal commands
- `language-json` for JSON
- `language-css` for CSS
- `language-html` for HTML

## Best Practices

### Writing Tips
1. **Keep titles concise** - Remove unnecessary parts after colons for listings
2. **Write engaging descriptions** - Make them 1-2 sentences, under 150 characters
3. **Use proper headings** - Start with H2, use H3 for subsections
4. **Add alt text to images** - For accessibility
5. **Test code blocks** - Ensure syntax highlighting works

### File Organization
1. **Use descriptive filenames** - `react-hooks-guide.ts` not `post1.ts`
2. **Consistent naming** - Match filename with export name
3. **Date format** - Use "Month DD, YYYY" format consistently

### Content Guidelines
1. **Original content** - Write your own thoughts and experiences
2. **Code examples** - Test all code snippets before publishing
3. **Links** - Ensure all links are working and relevant
4. **SEO friendly** - Use descriptive titles and include relevant keywords

## 🔧 Development Workflow

### Testing Your Blog Post
1. Add the blog post file
2. Update `index.ts`
3. Add description to `AllPosts.tsx`
4. Run `npm run dev`
5. Check the blog listing page
6. Click through to your blog post
7. Verify all content displays correctly

### Deployment
1. Commit your changes
2. Push to your repository
3. The blog post will be live on your next deployment

## Troubleshooting

### Common Issues
1. **Blog not showing**: Check if it's added to `index.ts`
2. **Image not loading**: Verify path and file exists in `public/blog/`
3. **Syntax highlighting not working**: Check language class on code blocks
4. **Description not showing**: Add entry to `blogDescriptions` in `AllPosts.tsx`

### Getting Help
If you encounter issues:
1. Check the console for errors
2. Verify all required fields are present
3. Compare with existing blog post files
4. Test in development mode first

## Examples

### Complete Blog Post Example
```typescript
export const reactBestPractices = {
  title: 'React Best Practices for 2025',
  date: 'January 15, 2025',
  author: 'Dhrubaraj Pati',
  category: 'Development',
  readTime: '8 min read',
  image: '/blog/react-best-practices.png',
  tags: ['React', 'JavaScript', 'Best Practices', 'Frontend'],
  content: `
    <h2>Introduction</h2>
    <p>React has evolved significantly, and staying current with best practices is crucial for maintainable code.</p>

    <h2>Component Organization</h2>
    <p>Use functional components with hooks instead of class components.</p>

    <pre><code class="language-typescript">const UserProfile = ({ user }: UserProfileProps) => {
  const [loading, setLoading] = useState(false);

  return (
    &lt;div&gt;
      &lt;h2&gt;{user.name}&lt;/h2&gt;
      &lt;p&gt;{user.email}&lt;/p&gt;
    &lt;/div&gt;
  );
};</code></pre>

    <h2>Conclusion</h2>
    <p>Following these practices will make your React applications more robust and maintainable.</p>
  `,
};
```

Remember to also add the description in `AllPosts.tsx`:

```typescript
const blogDescriptions = {
  // ... other descriptions
  'react-best-practices': 'Learn essential React best practices for modern development in 2025.',
};
```

## Happy Blogging!

Your blog posts will automatically appear on the website once added. Make sure to write engaging content and share your knowledge with the community!
