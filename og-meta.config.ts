/**
 * Central SEO/OG metadata config for all pages and blog posts.
 * Used by: server-side (api/og for crawlers) + client-side (SEO component)
 */

const SITE_URL = 'https://codewithdhruba.in';

export type PageMeta = {
  title: string;
  description: string;
  image: string;
};

const staticPages: Record<string, PageMeta> = {
  '/': {
    title: 'Dhrubaraj Pati - Full Stack Web Developer',
    description:
      "I'm a Full Stack web developer and open source contributor. I love building products to solve real-world problems. Explore my work.",
    image: '/meta/home.jpeg',
  },
  '/about': {
    title: 'About - My Story & Life',
    description:
      'Get to know me a Full Stack Developer and Open Source Contributor. Explore my background, technical journey, development philosophy, and the tools I use to build for the web.',
    image: '/meta/about.jpeg',
  },
  '/projects': {
    title: 'Projects - My Work & Projects',
    description: 'Discover my projects and work across different technologies and domains. From web apps to mobile solutions.',
    image: '/meta/project.png',
  },
  '/all-posts': {
    title: 'Blog - Thoughts, Publications & Journey',
    description:
      'Exploring the art of engineering, the craft of code, and building impactful tech.',
    image: '/meta/blog.png',
  },
  '/contact': {
    title: 'Contact - Collaborations & Opportunities',
    description: 'Get in touch with me for collaborations, projects, or opportunities.',
    image: '/meta/contact.png',
  },
  '/resume': {
    title: 'Resume - Journey of a Developer',
    description: 'View Dhrubaraj Pati\'s professional resume and CV. Technical skills, experience, and qualifications.',
    image: '/meta/resume.png',
  },
  '/experience': {
    title: 'Work Experience - Professional Journey',
    description: 'Explore my professional work experience across different companies and roles in software development.',
    image: '/meta/experience.png',
  },
  '/certificates': {
    title: 'Certificates - Proof of Skills',
    description: 'Certifications and achievements.',
    image: '/meta/certificates.png',
  },
  '/photos': {
    title: 'Photos - A Glimpse of My Life',
    description: 'Explore my photo gallery.',
    image: '/meta/photo.png',
  },
  '/gears': {
    title: 'Gears - My Setup & Tools',
    description: 'Tools and gears for development.',
    image: '/meta/gears.png',
  },
  '/extensions': {
    title: 'Extensions - My Daily use VS Code Extensions',
    description: 'Browser extensions and dev tools recommendations.',
    image: '/meta/extensions.png',
  },
  '/bucket-list': {
    title: 'Bucket List - Travel & Tour',
    description: 'Goals and bucket list.',
    image: '/meta/bucketlist.png',
  },
};

const blogMeta: Record<string, PageMeta> = {
  'the-unspoken-reality-of-tier-3-colleges': {
    title: "The Unspoken Reality of Tier 3 Colleges: A Student's Perspective | Dhrubaraj Pati",
    description:
      "An honest, first-hand perspective on the challenges, misconceptions, and realities faced by students in Tier 3 engineering colleges, and how to build a successful career anyway.",
    image: '/blog/tair3.png',
  },
  'rag-ai-chatbot': {
    title: 'How I Built a RAG-based AI Chatbot | Dhrubaraj Pati',
    description:
      'Learn how to build a personalized AI chatbot using RAG, LangChain, and local LLMs.',
    image: '/meta/ragCover.jpg',
  },
  'how-nextauth-works': {
    title: 'How NextAuth.js Works | Dhrubaraj Pati',
    description:
      'NextAuth.js - complete open-source authentication solution for Next.js applications.',
    image: '/meta/blog6.jpg',
  },
  'getting-started-with-react-typescript': {
    title: 'Getting Started with React and TypeScript | Dhrubaraj Pati',
    description:
      'Set up React with TypeScript and best practices for type safety.',
    image: '/meta/blog2.jpg',
  },
  'chrome-keyboard-shortcuts': {
    title: '10 Chrome Keyboard Shortcuts | Dhrubaraj Pati',
    description:
      'Useful Chrome keyboard shortcuts to browse faster and increase productivity.',
    image: '/blog/chrome_shortcuts.png',
  },
  'openweather-api-guide': {
    title: 'OpenWeather API Guide | Dhrubaraj Pati',
    description:
      'Master OpenWeather API with production-ready patterns and implementations.',
    image: '/blog/OpenWeather.png',
  },
  'building-my-first-website-with-react-and-tailwind': {
    title: 'Building My Portfolio from Scratch | Dhrubaraj Pati',
    description:
      'Build a Portfolio website with React and Tailwind CSS - setup to responsive design.',
    image: '/meta/blog3.jpg',
  },
  'essential-linux-commands': {
    title: 'Essential Linux Commands | Dhrubaraj Pati',
    description:
      'Essential Linux commands every beginner and intermediate user must know.',
    image: '/blog/linux_commands.png',
  },
  'essential-tools-for-nextjs-and-react': {
    title: 'Essential Tools for Next.js & React | Dhrubaraj Pati',
    description:
      'Best UI libraries, icons, and utilities for Next.js and React development.',
    image: '/meta/blog7.jpg',
  },
};

import { bookThoughtsData } from './src/data/thoughts';

export function getMetaForPath(pathname: string): PageMeta | null {
  const path = pathname.replace(/\/$/, '') || '/';
  if (staticPages[path]) return staticPages[path];

  const blogMatch = path.match(/^\/blog\/(.+)$/);
  if (blogMatch) return blogMeta[blogMatch[1]] || null;

  const thoughtsMatch = path.match(/^\/thoughts\/(.+)$/);
  if (thoughtsMatch) {
    const slug = thoughtsMatch[1];
    const book = bookThoughtsData[slug as keyof typeof bookThoughtsData];
    if (book) {
      return {
        title: `${book.title} | Book Thoughts | Dhrubaraj Pati`,
        description: book.description
          ? book.description.substring(0, 150) + '...'
          : `My key takeaways, notes, and personal thoughts on ${book.title} by ${book.author}.`,
        image: book.coverUrl,
      };
    }
  }

  return null;
}

export function toAbsoluteUrl(path: string): string {
  if (path.startsWith('http')) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : '/' + path}`;
}
