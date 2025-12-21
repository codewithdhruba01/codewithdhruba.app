import Giscus from '@giscus/react';
import { useEffect, useState } from 'react';

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

      <style dangerouslySetInnerHTML={{
        __html: `
          .giscus-wrapper {
            margin-top: 2rem;
          }

          /* Custom styling for Giscus */
          .giscus-frame {
            border-radius: 8px !important;
            border: 1px solid rgb(55, 65, 81) !important;
          }

          /* Dark theme adjustments */
          .giscus {
            --color-border-default: rgb(55, 65, 81);
            --color-border-muted: rgb(75, 85, 99);
            --color-canvas-default: rgb(17, 24, 39);
            --color-canvas-overlay: rgb(31, 41, 55);
            --color-canvas-subtle: rgb(17, 24, 39);
          }

          /* Light theme adjustments */
          .giscus[data-theme="light"] {
            --color-border-default: rgb(229, 231, 235);
            --color-border-muted: rgb(209, 213, 219);
            --color-canvas-default: rgb(255, 255, 255);
            --color-canvas-overlay: rgb(249, 250, 251);
            --color-canvas-subtle: rgb(243, 244, 246);
          }
        `
      }} />
    </div>
  );
};

export default GiscusComments;
