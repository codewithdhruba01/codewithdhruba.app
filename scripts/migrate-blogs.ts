import fs from 'fs';
import path from 'path';
import TurndownService from 'turndown';

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
});

// Using __dirname substitute since it's an ES module or run via tsx
const dataDir = path.resolve(process.cwd(), 'src/data/blogs');
const contentDir = path.resolve(process.cwd(), 'src/content/blog');

if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true });
}

const tsFiles = fs.readdirSync(dataDir).filter(f => f.endsWith('.ts') && f !== 'index.ts');

let consolidatedExports = '';
let indexMap = '';

for (const file of tsFiles) {
  const filePath = path.join(dataDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Extract the HTML content using regex
  // The content field is usually `content: \` ... \`,` or similar
  const contentMatch = content.match(/content:\s*`([\s\S]*?)`,/);

  if (contentMatch && contentMatch[1]) {
    const rawHtml = contentMatch[1];
    let mdxContent = turndownService.turndown(rawHtml);
    
    // Write MDX
    const mdxPath = path.join(contentDir, file.replace('.ts', '.mdx'));
    fs.writeFileSync(mdxPath, mdxContent);
    console.log(`Generated ${mdxPath}`);

    // Remove content property from TS object
    content = content.replace(/content:\s*`([\s\S]*?)`,/, '');
  }
  
  consolidatedExports += content + '\n\n';
}

const indexContent = consolidatedExports + 
`export const blogPostsData = {
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
`;

fs.writeFileSync(path.join(dataDir, 'index.ts'), indexContent);

// Delete the old individual files
for (const file of tsFiles) {
  fs.unlinkSync(path.join(dataDir, file));
  console.log(`Deleted ${file}`);
}
