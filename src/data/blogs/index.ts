import { gettingStartedWithReactTypescript } from './getting-started-with-react-typescript';
import { buildingMyFirstWebsiteWithReactAndTailwind } from './building-my-first-website-with-react-and-tailwind';
import { chromeKeyboardShortcuts } from './chrome-keyboard-shortcuts';
import { essentialLinuxCommands } from './essential-linux-commands';
import { openweatherApiGuide } from './openweather-api-guide';
import { howNextAuthWorks } from './how-nextauth-works';
import { essentialToolsForNextJsAndReact } from './essential-tools-for-nextjs-and-react';

export const blogPostsData = {
  'essential-tools-for-nextjs-and-react': essentialToolsForNextJsAndReact,
  'getting-started-with-react-typescript': gettingStartedWithReactTypescript,
  'building-my-first-website-with-react-and-tailwind': buildingMyFirstWebsiteWithReactAndTailwind,
  'chrome-keyboard-shortcuts': chromeKeyboardShortcuts,
  'essential-linux-commands': essentialLinuxCommands,
  'openweather-api-guide': openweatherApiGuide,
  'how-nextauth-works': howNextAuthWorks,
};

export type BlogPostKey = keyof typeof blogPostsData;
export type BlogPost = typeof blogPostsData[BlogPostKey];
