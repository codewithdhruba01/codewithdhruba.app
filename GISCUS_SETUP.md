# Giscus Setup Guide - GitHub Discussions Powered Comments

This guide will help you set up Giscus, a GitHub Discussions-powered comment system for your blog.

## 🚀 What is Giscus?

Giscus is a comment system powered by GitHub Discussions. It allows visitors to leave comments and reactions on your website using their GitHub account, without requiring them to create an additional account.

## 📋 Prerequisites

1. **GitHub Account** - You need a GitHub account
2. **Public Repository** - Your blog's GitHub repository must be public
3. **GitHub Discussions Enabled** - Discussions must be enabled on your repository

## ⚙️ Step-by-Step Setup

### Step 1: Enable GitHub Discussions

1. Go to your GitHub repository
2. Click on the **"Settings"** tab
3. Scroll down to **"Features"** section
4. **Check the box** for "Discussions"
5. Click **"Save changes"**

### Step 2: Install Giscus App

1. Go to [Giscus App](https://github.com/apps/giscus)
2. Click **"Install"**
3. Select your repository or organization
4. Choose **"All repositories"** or select specific repositories
5. Click **"Install"**

### Step 3: Configure Giscus

1. Go to [Giscus Website](https://giscus.app/)
2. Fill in the configuration:
   - **Repository**: `your-username/your-repo-name`
   - **Page ↔ Discussions mapping**: Choose `Discussion title contains page pathname`
   - **Discussion category**: Create a new category called "Blog Comments"
   - **Features**: Enable reactions, enable metadata if needed
   - **Theme**: Choose "Dark" for dark mode sites

3. **Copy the generated configuration values**:
   - Repository ID (something like `R_kgDOMxxxxx`)
   - Discussion Category ID (something like `DIC_kwDOMxxxxx`)

### Step 4: Update Giscus Component

1. Open `src/components/GiscusComments.tsx`
2. Replace the placeholder values:

```typescript
<Giscus
  id="comments"
  repo="YOUR_USERNAME/YOUR_REPO_NAME" // Replace with your actual repo
  repoId="R_kgDOMxxxxx" // Replace with your repo ID from Giscus
  category="Blog Comments"
  categoryId="DIC_kwDOMxxxxx" // Replace with your category ID from Giscus
  mapping="pathname"
  term={`blog-${slug}`}
  reactionsEnabled="1"
  emitMetadata="0"
  inputPosition="top"
  theme={theme === 'dark' ? 'dark' : 'light'}
  lang="en"
  loading="lazy"
/>
```

### Step 5: Test the Setup

1. Run your development server: `npm run dev`
2. Open a blog post
3. Scroll to the comments section
4. Try leaving a comment (you'll need to sign in with GitHub)
5. Check your GitHub repository's Discussions tab to see the comment

## 🎨 Customization Options

### Theme Configuration

Giscus supports multiple themes. The component automatically switches between light and dark themes based on your site preferences.

### Language Support

Giscus supports multiple languages. Change the `lang` prop to your preferred language:
- `en` (English)
- `zh-CN` (Chinese Simplified)
- `es` (Spanish)
- `fr` (French)
- And many more...

### Advanced Configuration

```typescript
<Giscus
  // Basic settings
  repo="username/repo"
  repoId="R_kgDOMxxxxx"
  category="General"
  categoryId="DIC_kwDOMxxxxx"

  // Mapping options
  mapping="pathname" // or "url", "title", "og:title", "specific-term"
  term="blog-post-slug" // Only used with "specific-term" mapping

  // Features
  reactionsEnabled="1" // Enable reactions (1 = yes, 0 = no)
  emitMetadata="0" // Emit discussion metadata (1 = yes, 0 = no)
  inputPosition="top" // Comment input position ("top" or "bottom")
  theme="dark" // Theme ("light", "dark", "dark_dimmed", etc.)
  lang="en" // Language code

  // Performance
  loading="lazy" // Loading strategy ("lazy" or "eager")
/>
```

## 🔧 Troubleshooting

### Comments Not Loading

1. **Check Repository Visibility**: Make sure your repository is public
2. **Verify Discussions**: Ensure GitHub Discussions are enabled
3. **Check App Installation**: Make sure Giscus app is installed on your repository
4. **Verify Configuration**: Double-check repo ID and category ID
5. **Browser Console**: Check for any JavaScript errors

### Authentication Issues

1. **GitHub Sign-in Required**: Users must have a GitHub account to comment
2. **Repository Access**: Users need read access to your repository
3. **Private Repositories**: Giscus doesn't work with private repositories

### Theme Issues

1. **Theme Not Changing**: Make sure your theme detection logic is correct
2. **Custom Themes**: You can create custom themes using CSS variables

## 🚀 Production Deployment

### Environment Variables (Optional)

For production, you might want to use environment variables for sensitive configuration:

```env
VITE_GISCUS_REPO=your-username/your-repo
VITE_GISCUS_REPO_ID=R_kgDOMxxxxx
VITE_GISCUS_CATEGORY_ID=DIC_kwDOMxxxxx
```

### Performance Optimization

1. **Lazy Loading**: Keep `loading="lazy"` for better performance
2. **Preloading**: Consider preloading Giscus on important pages
3. **Caching**: GitHub's API responses are cached for performance

## 🔒 Security & Privacy

### Data Storage
- Comments are stored as GitHub Discussions
- All data is publicly accessible (same as your repository)
- No additional data collection beyond GitHub's standard features

### Privacy
- Users must authenticate with GitHub
- GitHub's privacy policies apply
- No tracking beyond GitHub's analytics

### Moderation
- You can moderate discussions directly in GitHub
- Use GitHub's built-in moderation tools
- Comments appear as regular GitHub discussions

## 📊 Analytics & Insights

### GitHub Insights
- View comment activity in GitHub Insights
- Track engagement through GitHub's analytics
- Monitor discussion trends

### Integration Benefits
- **SEO Friendly**: Comments are indexed by search engines
- **Backup**: All data is backed up with your repository
- **Version Control**: Discussion history is maintained
- **Community Building**: Leverages GitHub's social features

## 🎉 Success!

Once set up, your blog will have:
- ✅ GitHub-powered comments
- ✅ No additional user accounts required
- ✅ Automatic spam filtering via GitHub
- ✅ Rich text formatting support
- ✅ Emoji reactions
- ✅ Threaded discussions
- ✅ Mobile-responsive design

Your comment system is now powered by GitHub Discussions! 🎉
