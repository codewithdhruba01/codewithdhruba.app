import Giscus from '@giscus/react';
import { useEffect, useState, memo } from 'react';
import './ui/giscus-comments.css';

interface GiscusCommentsProps {
  slug: string;
}

const GiscusComments = ({ slug }: GiscusCommentsProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    console.log('🗨️ GiscusComments component loaded for slug:', slug);

    // Set loaded state after a brief delay to prevent initial loading issues
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [slug]);

  if (!isLoaded) {
    return null;
  }

  return (
    <div className="mt-16 pt-8 border-t border-gray-800">
      <div className="giscus-wrapper">
        <Giscus
          key={`giscus-${slug}`} // Force re-mount only when slug changes
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
          loading="eager" // Changed from lazy to eager to prevent loading delays
        />
      </div>
    </div>
  );
};

export default memo(GiscusComments);
