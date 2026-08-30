export const buildingMyFirstWebsiteWithReactAndTailwind = {
  title: 'Building My portfolio Website from Scratch',
  date: 'December 29, 2025',
  author: 'Dhrubaraj Pati',
  category: 'Web Development',
  readTime: '8 min read',
  image: '/blog/blog3.png',
  tags: ['React', 'Tailwind CSS', 'TypeScript', 'Portfolio', 'GitHub API', 'AOS'],
  
};


export const chromeKeyboardShortcuts = {
  title: '10 Chrome Keyboard Shortcuts to Boost Your Productivity',
  date: 'October 6, 2025',
  author: 'Dhrubaraj Pati',
  category: 'Productivity',
  readTime: '15 min read',
  
  image: '/blog/chrome_shortcuts.png',
  tags: [
    'Chrome',
    'Productivity',
    'Keyboard Shortcuts',
    'Time Management',
    'Browsing Tips',
  ],
};


export const essentialLinuxCommands = {
  title:
    'Essential Linux Commands: A Comprehensive Guide (50 Commands with Examples)',
  date: 'Dec 8, 2025',
  author: 'Dhrubaraj Pati',
  category: 'Linux',
  readTime: '10 min read',
  
  image: '/blog/linux_commands.png',
  tags: [
    'Linux',
    'Commands',
    'CLI',
    'System Administration',
    'Terminal Guide',
  ],
};


export const essentialToolsForNextJsAndReact = {
  title: 'Essential Tools & Components for Your Next.js/React Projects',
  date: 'February 11, 2026',
  author: 'Dhrubaraj Pati',
  category: 'Resources',
  readTime: '15 min read',
  
  image: '/blog/blog7.png',
  tags: ['Resources', 'React', 'Next.js', 'UI/UX', 'Tools'],
};


export const gettingStartedWithReactTypescript = {
  title: 'Getting Started with React and TypeScript: A Complete Developer\'s Guide',
  date: 'March 15, 2025',
  author: 'Dhrubaraj Pati',
  category: 'Development',
  readTime: '12 min read',
  image: '/blog/blog2.png',
  tags: ['React', 'TypeScript', 'Web Development', 'JavaScript', 'Frontend'],
};


export const howNextAuthWorks = {
  title: 'How NextAuth.js Works',
  date: 'January 31, 2026',
  author: 'Dhrubaraj Pati',
  category: 'Web Development',
  readTime: '10 min read',
  image: '/blog/blog6.png',
  tags: ['Next.js', 'NextAuth.js', 'Authentication', 'React', 'Security'],
  
};


export const howToWorkWithMcpServer = {
  title: 'How to Work MCP Server',
  description: 'A deep dive into the MCP Server, how it connects AI models with external tools, and build your own MCP server.',
  date: 'August 1, 2026',
  author: 'Dhrubaraj Pati',
  category: 'Development',
  readTime: '12 min read',
  image: '/blog/mcp.png',
  tags: ['MCP', 'AI', 'Architecture', 'Backend'],
  
};


export const openweatherApiGuide = {
  title:
    'The Ultimate Guide to OpenWeather API: From Zero to Production in 2025',
  date: 'October 8, 2025',
  author: 'Dhrubaraj Pati',
  category: 'API',
  readTime: '15 min read',
  image: '/blog/OpenWeather.png',
  tags: [
    'OpenWeather',
    'API',
    'Web Development',
    'Weather App',
    'JavaScript',
    'Beginner Guide',
  ],
};


export const ragAiChatbot = {
    title: 'How I Built a RAG-based AI Chatbot from My Personal Data',
    date: 'March 07, 2026',
    author: 'Dhrubaraj Pati',
    category: 'AI & Machine Learning',
    readTime: '12 min read',
    image: '/blog/ragCover.png',
    tags: ['RAG', 'AI', 'LangChain', 'Python', 'LLM', 'Ollama', 'Vector Database'],
    
};


export const theUnspokenRealityOfTier3Colleges = {
  title: "The Unspoken Reality of Tier 3 Colleges: A Student's Perspective",
  date: 'June 23, 2026',
  author: 'Dhrubaraj Pati',
  category: 'College Life',
  readTime: '6 min read',
  image: '/blog/tair3.png',
  tags: [
    'College Life',
    'Career Advice',
    'Student Perspective',
    'Engineering',
    'Mindset',
    'Self Improvement',
  ],
  
};


export const blogPostsData = {
  'how-to-work-with-mcp-server': howToWorkWithMcpServer,
  'the-unspoken-reality-of-tier-3-colleges': theUnspokenRealityOfTier3Colleges,
  'rag-ai-chatbot': ragAiChatbot,
  'essential-tools-for-nextjs-and-react': essentialToolsForNextJsAndReact,
  'how-nextauth-works': howNextAuthWorks,
  'getting-started-with-react-typescript': gettingStartedWithReactTypescript,
  'building-my-first-website-with-react-and-tailwind': buildingMyFirstWebsiteWithReactAndTailwind,
  'chrome-keyboard-shortcuts': chromeKeyboardShortcuts,
  'essential-linux-commands': essentialLinuxCommands,
  'openweather-api-guide': openweatherApiGuide,
};

export type BlogPostKey = keyof typeof blogPostsData;
export type BlogPost = typeof blogPostsData[BlogPostKey];
