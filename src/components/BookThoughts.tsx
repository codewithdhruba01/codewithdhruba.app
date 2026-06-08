import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Undo2,
  Plus,
  Minus,
  Settings,
  RotateCcw,
} from 'lucide-react';
import { bookThoughtsData } from '../data/thoughts';
import ReadingProgressPill from './ui/ReadingProgressPill';

const BookThoughts = () => {
  const { slug } = useParams();
  const thought = slug ? bookThoughtsData[slug as keyof typeof bookThoughtsData] : null;

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
      <div className="pt-28 md:pt-36 pb-16 min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center">
        <h3 className="text-2xl sm:text-4xl font-bold text-white mb-4">Thoughts Not Found</h3>
        <Link to="/" className="text-[#00DC82] hover:underline font-hanken">
          Back to Home
        </Link>
      </div>
    );
  }

  // Calculate grouped notes for beautiful presentation (like Habit 1 heading groups)
  interface GroupedNoteItem {
    subheading?: string;
    text: string;
  }
  interface GroupedNote {
    heading: string | null;
    items: GroupedNoteItem[];
  }
  const groupedNotes: GroupedNote[] = [];

  thought.notes.forEach(note => {
    const parts = note.split(' — ');
    if (parts.length > 1) {
      const heading = parts[0];
      const rest = parts.slice(1).join(' — ');
      const subParts = rest.split(': ');
      let subheading: string | undefined;
      let text = rest;

      if (subParts.length > 1 && subParts[0].length < 40) {
        subheading = subParts[0];
        text = subParts.slice(1).join(': ');
      }

      const existing = groupedNotes.find(g => g.heading === heading);
      if (existing) {
        existing.items.push({ subheading, text });
      } else {
        groupedNotes.push({ heading, items: [{ subheading, text }] });
      }
    } else {
      const colonParts = note.split(': ');
      if (colonParts.length > 1 && colonParts[0].length < 45) {
        groupedNotes.push({
          heading: null,
          items: [{ subheading: colonParts[0], text: colonParts.slice(1).join(': ') }]
        });
      } else {
        groupedNotes.push({
          heading: null,
          items: [{ text: note }]
        });
      }
    }
  });

  const renderItemText = (text: string) => {
    if (text.includes('\n')) {
      const lines = text.split('\n');
      return (
        <div className="space-y-3 mt-2 w-full">
          {lines.map((line, idx) => {
            const trimmed = line.trim();
            if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
              const content = trimmed.substring(2);
              const colonIndex = content.indexOf(':');
              if (colonIndex !== -1 && colonIndex < 25) {
                const prefix = content.substring(0, colonIndex);
                const rest = content.substring(colonIndex + 1);
                return (
                  <div key={idx} className="flex items-start pl-6 text-[0.95em] text-white/80 leading-relaxed">
                    <span className="mr-2.5 select-none font-bold text-[10px] text-white mt-[4px]">•</span>
                    <span>
                      <strong className="text-white font-semibold">{prefix}:</strong>
                      {rest}
                    </span>
                  </div>
                );
              }
              return (
                <div key={idx} className="flex items-start pl-6 text-[0.95em] text-white/80 leading-relaxed">
                  <span className="mr-2.5 select-none font-bold text-[10px] text-white mt-[4px]">•</span>
                  <span>{content}</span>
                </div>
              );
            }

            return (
              <p key={idx} className="text-[1em] text-white/85 leading-relaxed">
                {line}
              </p>
            );
          })}
        </div>
      );
    }

    return <span>{text}</span>;
  };

  return (
    <>
      <article className="pt-28 md:pt-36 pb-16 min-h-screen bg-[#0A0A0A] book-content">
        <div className="max-w-3xl mx-auto w-full px-6" style={{ fontSize: `${fontSize}%` }}>
          {/* Back Button */}
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center text-gray-400 hover:text-white transition font-hanken"
            >
              <Undo2 className="h-4 w-4 mr-2" />
              Back to Bookshelf
            </Link>
          </div>

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

          {/* Book Summary / Short Story / Description */}
          <div className="mb-12">
            <h3 className="text-base md:text-sm font-bold uppercase tracking-[0.2em] text-white/75 mb-6 flex items-center gap-4">
              <span>Overview</span>
              <span className="flex-1 h-[1px] bg-white/10"></span>
            </h3>
            <p className="text-[15.5px] text-white/60 leading-relaxed font-poppins">
              {thought.description}
            </p>
          </div>

          {/* Book Notes */}
          <div className="mb-12">
            <h3 className="text-base md:text-sm font-bold uppercase tracking-[0.2em] text-white/45 mb-6 flex items-center gap-4">
              <span>Notes</span>
              <span className="flex-1 h-[1px] bg-white/10"></span>
            </h3>

            <div className="space-y-8">
              {groupedNotes.map((group, gIdx) => (
                <div key={gIdx} className="space-y-4">
                  {group.heading && (
                    <h4
                      className="text-[1.25em] font-semibold text-white flex items-center gap-3"
                      style={{ fontFamily: "'Instrument Serif', serif" }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: thought.accentColor }} />
                      {group.heading}
                    </h4>
                  )}
                  <ul className={`space-y-4 ${group.heading ? 'pl-5 border-l border-white/5' : ''}`}>
                    {group.items.map((item, idx) => (
                      <li key={idx} className="flex flex-col items-start text-[14.5px] text-white/85 leading-relaxed font-poppins">
                        <div className="flex items-start w-full">
                          {!group.heading && (
                            <span
                              className="mr-4 mt-2 select-none font-black text-xs shrink-0 animate-pulse"
                              style={{ color: thought.accentColor }}
                            >
                              •
                            </span>
                          )}
                          <span>
                            {item.subheading && (
                              <strong className="text-white/90 font-semibold mr-1">{item.subheading}:</strong>
                            )}
                            {!item.text.includes('\n') && item.text}
                          </span>
                        </div>
                        {item.text.includes('\n') && renderItemText(item.text)}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Final Thoughts */}
          <div className="mb-16">
            <h3 className="text-base md:text-sm font-bold uppercase tracking-[0.2em] text-white/45 mb-6 flex items-center gap-4">
              <span>Final Thoughts</span>
              <span className="flex-1 h-[1px] bg-white/10"></span>
            </h3>

            <div className="flex items-start gap-4">
              <span
                className="text-[3.5em] leading-none select-none -mt-3 shrink-0 font-serif font-extrabold"
                style={{ color: thought.accentColor }}
              >
                “
              </span>
              <p className="text-[15.5px] text-white/60 leading-relaxed font-poppins pt-2">
                {thought.finalThoughts}
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* Side Zoom Panel for Font Size */}
      <div className="hidden md:block fixed right-6 top-1/2 -translate-y-1/2 z-40">
        <div className="flex flex-col items-center gap-3 rounded-2xl bg-black/20 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.3)] px-3 py-4 hover:bg-black/30 transition-all duration-300">
          <button
            onClick={zoomIn}
            disabled={fontSize >= 150}
            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/15 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200 hover:scale-105"
            title="Zoom In"
          >
            <Plus className="w-5 h-5 text-white" />
          </button>
          <div className="text-xs text-white/90 font-medium select-none px-2 py-1 bg-white/5 rounded-lg min-w-[44px] text-center">
            {getFontSizeInPx()}px
          </div>
          <button
            onClick={zoomOut}
            disabled={fontSize <= 80}
            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/15 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200 hover:scale-105"
            title="Zoom Out"
          >
            <Minus className="w-5 h-5 text-white" />
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
            className={`fixed bottom-0 left-0 right-0 z-50 md:hidden bg-neutral-950/95 backdrop-blur-xl border-t border-white/10 rounded-t-3xl shadow-[0_0_60px_rgba(0,0,0,0.8)] transform transition-all duration-300 ease-out pb-12 ${
              isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
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
            <div className="px-6 pb-6">
              <h3 className="text-lg font-semibold text-white font-synonym text-center">Font Size</h3>
            </div>
            <div className="px-6 pb-4 space-y-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">{getFontSizeInPx()}px</div>
                <div className="text-sm text-white/60">Current font size</div>
              </div>
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={zoomOut}
                  disabled={fontSize <= 80}
                  className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center"
                >
                  <Minus className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={resetZoom}
                  className="px-6 py-2.5 bg-[#111111] border border-[#2d2e2d] rounded-xl text-[#d3d1d1] flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
                <button
                  onClick={zoomIn}
                  disabled={fontSize >= 150}
                  className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center"
                >
                  <Plus className="w-5 h-5 text-white" />
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
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider-thumb accent-[#00DC82]"
                  style={{
                    background: `linear-gradient(to right,
                      #00DC82 0%,
                      #00DC82 ${((getFontSizeInPx() - 12) / 12) * 100}%,
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
