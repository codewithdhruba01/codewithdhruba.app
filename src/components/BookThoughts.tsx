import { useEffect, useState, useMemo, lazy, Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Plus,
  Minus,
  Settings,
  RotateCcw,
  Loader2
} from 'lucide-react';
import { bookThoughtsData } from '../data/thoughts';

const mdxModules = import.meta.glob('../content/thoughts/*.mdx');
import ReadingProgressPill from './ui/ReadingProgressPill';

const BookThoughts = () => {
  const { slug } = useParams();
  const thought = slug ? bookThoughtsData[slug as keyof typeof bookThoughtsData] : null;

  const bookKeys = Object.keys(bookThoughtsData);
  const currentIndex = bookKeys.indexOf(slug as string);
  const nextBookKey = currentIndex !== -1 && currentIndex < bookKeys.length - 1 ? bookKeys[currentIndex + 1] : null;
  const prevBookKey = currentIndex > 0 ? bookKeys[currentIndex - 1] : null;

  const rightSideBook = nextBookKey
    ? { key: nextBookKey, type: 'Next' }
    : (prevBookKey ? { key: prevBookKey, type: 'Previous' } : null);

  const [fontSize, setFontSize] = useState<number>(100); // percentage
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // Gesture handling for bottom sheet
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStartY, setDragStartY] = useState<number>(0);
  const [currentTranslateY, setCurrentTranslateY] = useState<number>(0);

  const zoomIn = () => {
    setFontSize(prev => Math.min(prev + 10, 150)); // max 150%
  };

  const zoomOut = () => {
    setFontSize(prev => Math.max(prev - 10, 80)); // min 80%
  };

  const resetZoom = () => {
    setFontSize(100);
  };

  const handleOpenSheet = () => {
    setIsMobileSheetOpen(true);
    setCurrentTranslateY(0);
    setTimeout(() => setIsAnimating(true), 10);
  };

  const handleCloseSheet = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsMobileSheetOpen(false);
      setCurrentTranslateY(0);
    }, 300);
  };

  const getFontSizeInPx = () => {
    return Math.round((fontSize / 100) * 16);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pxValue = parseInt(e.target.value);
    const percentage = Math.round((pxValue / 16) * 100);
    setFontSize(percentage);
  };

  const handleDragStart = (clientY: number) => {
    setIsDragging(true);
    setDragStartY(clientY);
  };

  const handleDragMove = (clientY: number) => {
    if (!isDragging) return;
    const deltaY = clientY - dragStartY;
    if (deltaY > 0) {
      setCurrentTranslateY(deltaY);
    }
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const CLOSE_THRESHOLD = 100;
    if (currentTranslateY > CLOSE_THRESHOLD) {
      handleCloseSheet();
    } else {
      setCurrentTranslateY(0);
    }
  };

  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e: MouseEvent) => {
        e.preventDefault();
        handleDragMove(e.clientY);
      };
      const handleMouseUp = () => {
        handleDragEnd();
      };
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none';
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.userSelect = '';
      };
    }
  }, [isDragging]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!thought) {
    return (
      <div className="pt-28 md:pt-36 pb-16 min-h-screen bg-[#100F0F] flex flex-col items-center justify-center">
        <h3 className="text-2xl sm:text-4xl font-bold text-white mb-4">Thoughts Not Found</h3>
        <Link to="/" className="text-[#00DC82] hover:underline font-hanken">
          Back to Home
        </Link>
      </div>
    );
  }

  const MdxContent = useMemo(() => {
    const path = `../content/thoughts/${slug}.mdx`;
    if (mdxModules[path]) {
      return lazy(mdxModules[path] as any);
    }
    return null;
  }, [slug]);

  return (
    <>
      <article className="pt-28 md:pt-36 pb-16 min-h-screen bg-[#100F0F] book-content">
        <div className="max-w-3xl mx-auto w-full px-6" style={{ fontSize: `${fontSize}%` }}>
          {/* Book Info Section */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
            {/* Book Cover with custom accent glow */}
            <div
              className="w-[180px] aspect-[2/3] shrink-0 relative rounded-lg shadow-2xl overflow-hidden"
              style={{
                boxShadow: `0 10px 40px ${thought.accentColor}25`,
                border: `1px solid ${thought.accentColor}20`
              }}
            >
              <img
                src={thought.coverUrl}
                alt={thought.title}
                className="w-full h-full object-cover select-none pointer-events-none"
              />
            </div>

            {/* Title, Author, Overview */}
            <div className="flex-1 flex flex-col justify-center text-center md:text-left">
              <h1
                className="text-[2.2em] md:text-[3em] font-black text-white leading-[1.15] mb-2 tracking-tight"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {thought.title}
              </h1>
              <p
                className="text-[1.125em] text-white/50 mb-6 font-semibold font-hanken tracking-wide"
              >
                by {thought.author}
              </p>
            </div>
          </div>

          {MdxContent ? (
            <Suspense fallback={<div className="flex items-center justify-center py-12"><Loader2 className="animate-spin text-neutral-500" /></div>}>
              <div className="mdx-content-container max-w-none pb-12">
                <MdxContent 
                  components={{
                    h2: ({ children, ...props }: any) => {
                      // Final thoughts has that big quote mark. We can inject it if the heading is "Final Thoughts"
                      const isFinalThoughts = children === 'Final Thoughts';
                      return (
                        <h2 className="text-base md:text-sm font-bold uppercase tracking-[0.2em] text-white/45 mt-16 mb-6 flex items-center gap-4" {...props}>
                          <span className={children === 'Overview' ? 'text-white/75' : ''}>{children}</span>
                          <span className="flex-1 h-[1px] bg-white/10"></span>
                        </h2>
                      );
                    },
                    h3: ({ children, ...props }: any) => (
                      <h3
                        className="text-[1.25em] font-semibold text-white flex items-center gap-3 mt-8 mb-4"
                        style={{ fontFamily: "'Instrument Serif', serif" }}
                        {...props}
                      >
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: thought.accentColor }} />
                        {children}
                      </h3>
                    ),
                    p: ({ children, ...props }: any) => {
                      // To match the Final Thoughts quote mark style, we can check if it's the last element, but it's easier to just use standard p.
                      return <p className="text-[15.5px] text-white/60 leading-relaxed font-hanken mb-6" {...props}>{children}</p>;
                    },
                    ul: (props: any) => <ul className="space-y-4 pl-5 border-l border-white/5 mb-8" {...props} />,
                    li: ({ children, ...props }: any) => (
                      <li className="flex flex-col items-start text-[14.5px] text-white/85 leading-relaxed font-poppins" {...props}>
                        <div className="flex items-start w-full">
                          <span
                            className="mr-4 mt-2 select-none font-black text-xs shrink-0 animate-pulse"
                            style={{ color: thought.accentColor }}
                          >
                            •
                          </span>
                          <span>{children}</span>
                        </div>
                      </li>
                    ),
                    strong: (props: any) => <strong className="text-white/90 font-semibold mr-1" {...props} />,
                    a: (props: any) => <a className="text-[#00DC82] hover:text-[#00b368] transition-colors" {...props} />,
                    FinalThoughts: ({ children }: any) => (
                      <div className="flex items-start gap-4">
                        <span
                          className="text-[3.5em] leading-none select-none -mt-3 shrink-0 font-serif font-extrabold"
                          style={{ color: thought.accentColor }}
                        >
                          “
                        </span>
                        <div className="text-[15.5px] text-white/60 leading-relaxed font-hanken pt-2">
                          {children}
                        </div>
                      </div>
                    )
                  }} 
                />
              </div>
            </Suspense>
          ) : (
            <div className="py-12 text-center text-white/50 font-hanken">
              Notes coming soon.
            </div>
          )}

          {/* Bottom Navigation */}
          <div className="flex items-center justify-between mt-20 pt-8 border-t border-white/10 font-hanken">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1A1919] border border-neutral-800/80 rounded-lg text-neutral-300 hover:border-neutral-700 hover:bg-[#222121] transition-all duration-200 group shadow-md shadow-black/20 text-xs font-semibold font-hanken"
            >
              <ArrowLeft className="h-3.5 w-3.5 transform group-hover:-translate-x-1 transition-transform duration-200" />
              Back Bookshelf
            </Link>

            {rightSideBook && (
              <Link
                to={`/thoughts/${rightSideBook.key}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1A1919] border border-neutral-800/80 rounded-lg text-neutral-300 hover:border-neutral-700 hover:bg-[#222121] transition-all duration-200 group shadow-md shadow-black/20 text-xs font-semibold font-hanken"
              >
                {rightSideBook.type} Book
                <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            )}
          </div>
        </div>
      </article>

      {/* Side Zoom Panel for Font Size */}
      <div className="hidden md:block fixed right-6 top-1/2 -translate-y-1/2 z-40">
        <div className="flex flex-col items-center gap-3 rounded-2xl bg-[#100F0F] backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.3)] px-3 py-4 hover:bg-black/30 transition-all duration-300">
          <button
            onClick={zoomIn}
            disabled={fontSize >= 150}
            className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-150 cursor-pointer ${fontSize >= 150
              ? 'border-[#2d2e2d] bg-[#161617] text-[#a0a0a5]/40 opacity-40 cursor-not-allowed'
              : 'border-[#2d2e2d] bg-gradient-to-b from-[#252526] to-[#161617] text-[#a0a0a5] hover:text-white shadow-[0_3px_0_#000000,_inset_0_1px_0_rgba(255,255,255,0.1)] hover:-translate-y-[1px] hover:shadow-[0_4px_0_#000000,_inset_0_1px_0_rgba(255,255,255,0.15)] active:translate-y-[1px] active:shadow-[0_1px_0_#000000]'
              }`}
            title="Zoom In"
          >
            <Plus className="w-5 h-5" />
          </button>
          <div className="text-xs font-bold select-none px-2.5 py-1.5 border border-neutral-950 bg-gradient-to-b from-[#0d0d0e] to-[#161617] text-white rounded-xl min-w-[44px] text-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]">
            {getFontSizeInPx()}px
          </div>
          <button
            onClick={zoomOut}
            disabled={fontSize <= 80}
            className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-150 cursor-pointer ${fontSize <= 80
              ? 'border-[#2d2e2d] bg-[#161617] text-[#a0a0a5]/40 opacity-40 cursor-not-allowed'
              : 'border-[#2d2e2d] bg-gradient-to-b from-[#252526] to-[#161617] text-[#a0a0a5] hover:text-white shadow-[0_3px_0_#000000,_inset_0_1px_0_rgba(255,255,255,0.1)] hover:-translate-y-[1px] hover:shadow-[0_4px_0_#000000,_inset_0_1px_0_rgba(255,255,255,0.15)] active:translate-y-[1px] active:shadow-[0_1px_0_#000000]'
              }`}
            title="Zoom Out"
          >
            <Minus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Settings Button */}
      <div className="md:hidden fixed right-4 top-20 z-40">
        <button
          onClick={handleOpenSheet}
          className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-xl border border-white/20 shadow-[0_0_30px_rgba(0,0,0,0.4)] flex items-center justify-center hover:bg-black/60 transition-all duration-300 hover:scale-105"
          title="Font Size Settings"
        >
          <Settings className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Mobile Bottom Sheet */}
      {isMobileSheetOpen && (
        <>
          <div
            className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${isAnimating ? 'bg-black/50 backdrop-blur-sm opacity-100' : 'bg-black/0 backdrop-blur-none opacity-0'
              }`}
            onClick={handleCloseSheet}
          />
          <div
            className={`fixed bottom-0 left-0 right-0 z-50 md:hidden bg-neutral-950/95 backdrop-blur-xl border-t border-white/10 rounded-t-3xl shadow-[0_0_60px_rgba(0,0,0,0.8)] transform transition-all duration-300 ease-out pb-12 ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
              }`}
            style={{
              transform: isAnimating ? `translateY(${currentTranslateY}px)` : 'translateY(100%)'
            }}
          >
            <div
              className="flex justify-center pt-4 pb-2 cursor-grab active:cursor-grabbing touch-none select-none"
              onTouchStart={(e) => handleDragStart(e.touches[0].clientY)}
              onTouchMove={(e) => handleDragMove(e.touches[0].clientY)}
              onTouchEnd={handleDragEnd}
            >
              <div className="w-16 h-1.5 bg-white/20 rounded-full"></div>
            </div>

            <div className="px-6 pb-4 space-y-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">{getFontSizeInPx()}px</div>
                <div className="text-sm text-white/60">Current font size</div>
              </div>
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={zoomOut}
                  disabled={fontSize <= 80}
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-150 cursor-pointer ${fontSize <= 80
                    ? 'border-[#2d2e2d] bg-[#161617] text-[#a0a0a5]/40 opacity-40 cursor-not-allowed'
                    : 'border-[#2d2e2d] bg-gradient-to-b from-[#252526] to-[#161617] text-[#a0a0a5] hover:text-white shadow-[0_3px_0_#000000,_inset_0_1px_0_rgba(255,255,255,0.1)] hover:-translate-y-[1px] hover:shadow-[0_4px_0_#000000,_inset_0_1px_0_rgba(255,255,255,0.15)] active:translate-y-[1px] active:shadow-[0_1px_0_#000000]'
                    }`}
                >
                  <Minus className="w-5 h-5" />
                </button>
                <button
                  onClick={resetZoom}
                  className="px-6 py-2.5 border border-[#2d2e2d] bg-gradient-to-b from-[#252526] to-[#161617] text-[#a0a0a5] hover:text-white shadow-[0_3px_0_#000000,_inset_0_1px_0_rgba(255,255,255,0.1)] hover:-translate-y-[1px] hover:shadow-[0_4px_0_#000000,_inset_0_1px_0_rgba(255,255,255,0.15)] active:translate-y-[1px] active:shadow-[0_1px_0_#000000] rounded-xl text-sm font-bold flex items-center gap-2 transition-all duration-150"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
                <button
                  onClick={zoomIn}
                  disabled={fontSize >= 150}
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-150 cursor-pointer ${fontSize >= 150
                    ? 'border-[#2d2e2d] bg-[#161617] text-[#a0a0a5]/40 opacity-40 cursor-not-allowed'
                    : 'border-[#2d2e2d] bg-gradient-to-b from-[#252526] to-[#161617] text-[#a0a0a5] hover:text-white shadow-[0_3px_0_#000000,_inset_0_1px_0_rgba(255,255,255,0.1)] hover:-translate-y-[1px] hover:shadow-[0_4px_0_#000000,_inset_0_1px_0_rgba(255,255,255,0.15)] active:translate-y-[1px] active:shadow-[0_1px_0_#000000]'
                    }`}
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {/* Slider */}
              <div className="space-y-3 pt-2">
                <div className="flex justify-between text-xs text-white/60">
                  <span>Small (12px)</span>
                  <span>Large (24px)</span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="24"
                  value={getFontSizeInPx()}
                  onChange={handleSliderChange}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider-thumb accent-white"
                  style={{
                    background: `linear-gradient(to right,
                      #ffffff 0%,
                      #ffffff ${((getFontSizeInPx() - 12) / 12) * 100}%,
                      rgba(255, 255, 255, 0.2) ${((getFontSizeInPx() - 12) / 12) * 100}%,
                      rgba(255, 255, 255, 0.2) 100%)`
                  }}
                />
              </div>
            </div>
          </div>
        </>
      )}
      <ReadingProgressPill postTitle={thought.title} isHidden={isMobileSheetOpen} />
    </>
  );
};

export default BookThoughts;
