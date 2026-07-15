import fs from 'fs';
import path from 'path';
import { blogPostsData } from '../src/data/blogs';

const SITE_URL = 'https://codewithdhruba.in';
const FEED_PATH = path.join(process.cwd(), 'public', 'feed.xml');

// Helper to escape XML special characters
function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

function generateRssFeed() {
  const lastBuildDate = new Date().toUTCString();

  let itemsXml = '';

  // Sort blog posts by date descending
  const posts = Object.entries(blogPostsData).map(([slug, post]) => ({
    slug,
    ...post,
    // Parse date safely
    parsedDate: new Date(post.date),
  })).sort((a, b) => b.parsedDate.getTime() - a.parsedDate.getTime());

  for (const post of posts) {
    const postUrl = `${SITE_URL}/blog/${post.slug}`;
    const pubDate = post.parsedDate.toUTCString();

    // Limit description length or clean HTML
    const cleanDesc = post.content
      .replace(/<[^>]*>/g, '') // remove HTML tags
      .substring(0, 200)
      .trim() + '...';

    itemsXml += `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${cleanDesc}]]></description>
      <category>${escapeXml(post.category)}</category>
      <dc:creator>${escapeXml(post.author)}</dc:creator>
    </item>`;
  }

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Dhrubaraj Pati - Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Exploring the art of engineering, the craft of code, and building impactful tech.</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    ${itemsXml}
  </channel>
</rss>`;

  fs.writeFileSync(FEED_PATH, rssFeed.trim());
  console.log(`\n✅ RSS Feed successfully generated at ${FEED_PATH}\n`);
}

generateRssFeed();
