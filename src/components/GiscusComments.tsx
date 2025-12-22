import Giscus from '@giscus/react';
import { useEffect, useState } from 'react';
import './ui/giscus-comments.css';

interface GiscusCommentsProps {
  slug: string;
}

const GiscusComments = ({ slug }: GiscusCommentsProps) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    console.log('🗨️ GiscusComments component loaded for slug:', slug);

    // Check for theme preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setTheme('dark');
    } else {
      setTheme('light');
    }

    console.log('🎨 Giscus theme set to:', theme);

    // Listen for theme changes
    const handleThemeChange = (e: MediaQueryListEvent) => {
      const newTheme = e.matches ? 'dark' : 'light';
      setTheme(newTheme);
      console.log('🎨 Giscus theme changed to:', newTheme);
    };

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleThemeChange);

    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', handleThemeChange);
    };
  }, [slug, theme]);

  // Giscus loading will be detected by the timeout in useEffect

  return (
    <div className="mt-16 pt-8 border-t border-gray-800">



      <div className="giscus-wrapper">
        <Giscus
          id="comments"
          repo="codewithdhruba01/codewithdhruba.app"
          repoId="R_kgDOO78xow"
          category="Blog Comments"
          categoryId="DIC_kwDOO78xo84C0Eyx"
          mapping="specific"
          term={`blog-{${slug}}`}
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="bottom"
          theme="preferred_color_scheme"
          lang="en"
          loading="lazy"
        />

      </div>
    </div>
  );
};

export default GiscusComments;
