import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ReadingProgressPillProps {
  postTitle: string;
  isHidden?: boolean;
}

export default function ReadingProgressPill({ postTitle, isHidden = false }: ReadingProgressPillProps) {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeHeading, setActiveHeading] = useState<string>('');
  const activeHeadingIndexRef = useRef<number>(-1);
  const [direction, setDirection] = useState<'up' | 'down'>('down');
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      // 1. Calculate Scroll Progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      let progress = 0;
      if (totalHeight > 0) {
        progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }

      // 2. Find Active Heading
      const headings = Array.from(document.querySelectorAll('.prose h2, .prose h3, .book-content h3, .book-content h4'));
      let currentActiveIndex = -1;
      let currentActiveText = '';
      const triggerTop = 150; // offset in pixels from viewport top

      for (let i = 0; i < headings.length; i++) {
        const rect = headings[i].getBoundingClientRect();
        if (rect.top <= triggerTop) {
          currentActiveIndex = i;
          currentActiveText = headings[i].textContent || '';
        } else {
          break;
        }
      }

      setActiveHeading(currentActiveText);

      // Update direction and index ref
      if (currentActiveIndex !== activeHeadingIndexRef.current) {
        setDirection(currentActiveIndex > activeHeadingIndexRef.current ? 'down' : 'up');
        activeHeadingIndexRef.current = currentActiveIndex;
      }

      setIsVisible(window.scrollY > 200 && progress < 99);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial call
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [postTitle]);

  const truncateText = (text: string, maxLength: number = 30) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const displayTitle = activeHeading || postTitle;

  return (
    <AnimatePresence>
      {isVisible && !isHidden && (
        <motion.div
          initial={{ opacity: 0, y: 55, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 55, x: '-50%' }}
          transition={{ type: 'spring', damping: 26, stiffness: 210 }}
          className="fixed bottom-8 left-1/2 z-50 flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#141416]/95 backdrop-blur-md border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.6)] w-[283px]"
        >
          {/* White Dot on the left */}
          <span className="w-2 h-2 rounded-full bg-white shrink-0 block" />

          {/* Dynamic Title Indicator Wrapper with hidden overflow and fixed height for ticker effect */}
          <div className="relative overflow-hidden h-5 flex-grow select-none ml-1 pr-2">
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.span
                key={displayTitle}
                custom={direction}
                variants={{
                  initial: (dir: 'up' | 'down') => ({
                    y: dir === 'down' ? 20 : -20,
                    opacity: 0
                  }),
                  animate: {
                    y: 0,
                    opacity: 1
                  },
                  exit: (dir: 'up' | 'down') => ({
                    y: dir === 'down' ? -20 : 20,
                    opacity: 0
                  })
                }}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="absolute text-sm text-neutral-200 font-medium font-poppins truncate w-full tracking-wide text-left block"
              >
                {truncateText(displayTitle, 24)}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Circular Progress Tracker Button */}
          <button
            onClick={scrollToTop}
            className="relative flex items-center justify-center w-8 h-8 rounded-full bg-transparent hover:bg-white/5 border-none transition-all duration-200 shrink-0 cursor-pointer"
            title="Scroll to Top"
          >
            <svg className="w-7 h-7 transform -rotate-90" viewBox="0 0 24 24">
              {/* Track */}
              <circle
                cx="12"
                cy="12"
                r="10.2"
                className="stroke-white/10"
                strokeWidth="3"
                fill="transparent"
              />
              {/* Progress */}
              <circle
                cx="12"
                cy="12"
                r="10.2"
                className="stroke-white transition-all duration-300 ease-out"
                strokeWidth="3"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 10.2}
                strokeDashoffset={2 * Math.PI * 10.2 - (scrollProgress / 100) * (2 * Math.PI * 10.2)}
                strokeLinecap="round"
              />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
