import Giscus from '@giscus/react';
import { useEffect, useState, memo } from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import './giscus-comments.css';

interface GiscusCommentsProps {
  slug: string;
}

const GiscusComments = ({ slug }: GiscusCommentsProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    console.log('🗨️ GiscusComments component loaded for slug:', slug);

    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [slug]);

  if (!isLoaded) {
    return null;
  }

  const giscusTheme = theme === 'dark' ? 'transparent_dark' : 'light';

  return (
    <div className="mt-6 pt-4">
      <h4 className="text-xl md:text-2xl font-semibold text-foreground mb-6 font-hanken">
        Comments
      </h4>
      <div className="giscus-wrapper">
        <Giscus
          key={`giscus-${slug}-${giscusTheme}`}
          id="comments"
          repo="codewithdhruba01/codewithdhruba.app"
          repoId="R_kgDOO78xow"
          category="Blog Comments"
          categoryId="DIC_kwDOO78xo84C0Eyx"
          mapping="specific"
          term={`blog-{${slug}}`}
          emitMetadata="0"
          inputPosition="bottom"
          theme={giscusTheme}
          lang="en"
          loading="eager"
        />
      </div>
    </div>
  );
};

export default memo(GiscusComments);
