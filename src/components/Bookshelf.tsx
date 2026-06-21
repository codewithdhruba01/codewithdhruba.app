import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollReveal from './ui/ScrollReveal';

interface Book {
  slug: string;
  title: string;
  author: string;
  coverUrl: string;
  spineColor: string;
  spineTextColor: string;
  progress: 'Read' | 'Currently Reading' | 'To Read';
  coverWidth: number;
  spineWidth: number;
  baseTilt: number;
  theme: 'dark' | 'light';
  category?: string;
}

// Helper to calculate tilt based on distance from active book
const calculateTilt = (idx: number, activeIdx: number, baseTilt: number) => {
  const dist = Math.abs(idx - activeIdx);
  const direction = idx < activeIdx ? -1 : 1;
  const factor = Math.max(0, 1.85 - dist * 0.26);
  const tiltAmount = Math.abs(baseTilt) * Math.max(0.7, 1 - dist * 0.04);
  const result = (tiltAmount + factor) * direction;
  return Math.min(Math.max(result, -3.4), 3.4);
};

// Helper to project 3D rotation dimensions onto 2D viewport
const calculateProjectedDimensions = (
  coverWidth: number,
  spineWidth: number,
  height: number,
  rotYDeg: number,
  rotZDeg: number,
  isManga: boolean
) => {
  const rotYRad = rotYDeg * (Math.PI / 180);
  const rotZRad = rotZDeg * (Math.PI / 180);
  const cosY = Math.cos(rotYRad);
  const sinY = Math.sin(rotYRad);
  const cosZ = Math.cos(rotZRad);
  const sinZ = Math.sin(rotZRad);

  const originX = isManga ? coverWidth : 0;
  const halfHeight = height / 2;
  const minZForCover = isManga ? coverWidth - spineWidth : 0;
  const maxZForCover = isManga ? coverWidth : spineWidth;

  // We project the 8 corners of the 3D book box to find the bounding box
  const corners = [
    // Spine plane (z = 0)
    { x: minZForCover, y: 0, z: 0 },
    { x: maxZForCover, y: 0, z: 0 },
    { x: minZForCover, y: height, z: 0 },
    { x: maxZForCover, y: height, z: 0 },
    // Cover plane (z = spineWidth)
    { x: 0, y: 0, z: spineWidth },
    { x: coverWidth, y: 0, z: spineWidth },
    { x: 0, y: height, z: spineWidth },
    { x: coverWidth, y: height, z: spineWidth },
  ];

  const projectedXs: number[] = [];
  corners.forEach(pt => {
    const dx = pt.x - originX;
    const dy = pt.y - halfHeight;
    const Vt = (dx * cosY + pt.z * sinY) * cosZ - dy * sinZ;
    projectedXs.push(Vt + originX);
  });

  const minX = Math.min(...projectedXs);
  const maxX = Math.max(...projectedXs);
  return {
    width: Math.max(maxX - minX, 10), // clamp width so it doesn't go negative or zero
    offsetX: -minX,
  };
};

const books: Book[] = [
  {
    slug: 'designing-data-intensive-applications',
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9781449373320-L.jpg',
    spineColor: '#fafaf9',
    spineTextColor: '#111111',
    progress: 'Read',
    coverWidth: 185,
    spineWidth: 32,
    baseTilt: 0.0,
    theme: 'light'
  },
  {
    slug: 'the-pragmatic-programmer',
    title: 'The Pragmatic Programmer',
    author: 'Andy Hunt & Dave Thomas',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780135957059-L.jpg',
    spineColor: '#0b1a30',
    spineTextColor: '#f3f4f6',
    progress: 'Read',
    coverWidth: 195,
    spineWidth: 28,
    baseTilt: 0.65,
    theme: 'dark'
  },
  {
    slug: 'the-art-of-seduction',
    title: 'The Art of Seduction',
    author: 'Robert Greene',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780142001196-L.jpg',
    spineColor: '#1c1917',
    spineTextColor: '#f43f5e',
    progress: 'Read',
    coverWidth: 160,
    spineWidth: 32,
    baseTilt: 1.15,
    theme: 'dark'
  },
  {
    slug: 'atomic-habits',
    title: 'Atomic Habits',
    author: 'James Clear',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg',
    spineColor: '#fcfcfc',
    spineTextColor: '#171717',
    progress: 'Read',
    coverWidth: 185,
    spineWidth: 30,
    baseTilt: 0.5,
    theme: 'light'
  },
  {
    slug: 'dont-make-me-think',
    title: 'Don\'t Make Me Think, Revisited',
    author: 'Steve Krug',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780321965516-L.jpg',
    spineColor: '#f97316',
    spineTextColor: '#ffffff',
    progress: 'Read',
    coverWidth: 165,
    spineWidth: 28,
    baseTilt: 0.8,
    theme: 'dark'
  },
  {
    slug: 'zero-to-one',
    title: 'Zero to One',
    author: 'Peter Thiel',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780804139298-L.jpg',
    spineColor: '#8faada',
    spineTextColor: '#102a5c',
    progress: 'Read',
    coverWidth: 175,
    spineWidth: 28,
    baseTilt: 0.4,
    theme: 'dark'
  },
  {
    slug: 'rich-dad-poor-dad',
    title: 'Rich Dad Poor Dad',
    author: 'Robert T. Kiyosaki',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9781612680194-L.jpg',
    spineColor: '#4a154b',
    spineTextColor: '#ffffff',
    progress: 'Read',
    coverWidth: 165,
    spineWidth: 24,
    baseTilt: 1.0,
    theme: 'dark'
  },
  {
    slug: 'a-little-life',
    title: 'A Little Life',
    author: 'Hanya Yanagihara',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780804172707-L.jpg',
    spineColor: '#111111',
    spineTextColor: '#ffffff',
    progress: 'Read',
    coverWidth: 185,
    spineWidth: 50,
    baseTilt: -0.6,
    theme: 'dark'
  },
  {
    slug: 'dopamine-detox',
    title: 'Dopamine Detox',
    author: 'Thibaut Meurisse',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9798525995178-L.jpg',
    spineColor: '#eab308',
    spineTextColor: '#1e293b',
    progress: 'Read',
    coverWidth: 170,
    spineWidth: 22,
    baseTilt: -0.3,
    theme: 'light'
  },
  {
    slug: 'the-7-habits-of-highly-effective-people',
    title: 'The 7 Habits of Highly Effective People',
    author: 'Stephen R. Covey',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780743269513-L.jpg',
    spineColor: '#f4f1ea',
    spineTextColor: '#3a3530',
    progress: 'Read',
    coverWidth: 170,
    spineWidth: 32,
    baseTilt: -0.15,
    theme: 'light'
  },
  {
    slug: 'cant-hurt-me',
    title: "Can't Hurt Me",
    author: 'David Goggins',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9781544512280-L.jpg',
    spineColor: '#171717',
    spineTextColor: '#ffffff',
    progress: 'Read',
    coverWidth: 170,
    spineWidth: 30,
    baseTilt: -0.35,
    theme: 'dark'
  },
  {
    slug: 'open-to-work',
    title: 'Open to Work: How to Get Ahead in the Age of AI',
    author: 'Ryan Roslansky & Aneesh Raman',
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/P/0063486466.01.LZZZZZZZ.jpg',
    spineColor: '#218ceb',
    spineTextColor: '#ffffff',
    progress: 'Read',
    coverWidth: 175,
    spineWidth: 26,
    baseTilt: -0.5,
    theme: 'dark'
  },
  {
    slug: 'the-subtle-art-of-not-giving-a-fck',
    title: 'The Subtle Art of Not Giving a F*ck',
    author: 'Mark Manson',
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/P/0062457713.01.LZZZZZZZ.jpg',
    spineColor: '#ff5f00',
    spineTextColor: '#000000',
    progress: 'Read',
    coverWidth: 170,
    spineWidth: 26,
    baseTilt: -0.4,
    theme: 'dark'
  }
];

const Bookshelf = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [tooltipText, setTooltipText] = useState<string>('');
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleBookClick = (idx: number, book: Book) => {
    if (idx === activeIndex) {
      navigate(`/thoughts/${book.slug}`);
    } else {
      setActiveIndex(idx);
      // Hide tooltip temporarily to avoid jumping
      setShowTooltip(false);
    }
  };

  const handleMouseEnter = (book: Book, e: React.MouseEvent) => {
    const phrases =
      book.progress === 'Read'
        ? ['Read my thoughts', 'Check my notes?', 'See my takeaways']
        : book.progress === 'Currently Reading'
          ? ['Currently reading', 'Writing my notes as you click', 'Hold on i am on it']
          : ["I didn't read it yet", 'Working on it', 'Trying to find time', 'I need to start this'];
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    setTooltipText(randomPhrase);
    setMousePos({ x: e.clientX, y: e.clientY });
    setShowTooltip(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <>
      <style>{`
        .bookshelf-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .bookshelf-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .book-container {
          transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .book-3d-inner {
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        /* Curvature gradients to make spines look rounded */
        .spine-shading {
          background: linear-gradient(
            to right,
            rgba(0, 0, 0, 0.4) 0%,
            rgba(255, 255, 255, 0.12) 10%,
            rgba(255, 255, 255, 0) 25%,
            rgba(0, 0, 0, 0) 75%,
            rgba(0, 0, 0, 0.2) 90%,
            rgba(0, 0, 0, 0.5) 100%
          );
        }
        .book-elements-dark {
          background: linear-gradient(
            90deg,
            rgba(0, 0, 0, 0.45) 0%,
            rgba(0, 0, 0, 0.1) 1.23%,
            rgba(255, 255, 255, 0.08) 2.5%,
            rgba(0, 0, 0, 0) 3.52%,
            rgba(0, 0, 0, 0) 100%
          );
        }
        .book-elements-light {
          background: linear-gradient(
            90deg,
            rgba(0, 0, 0, 0.2) 0%,
            rgba(0, 0, 0, 0.05) 1.66%,
            rgba(255, 255, 255, 0.15) 3.84%,
            rgba(0, 0, 0, 0) 6%,
            rgba(0, 0, 0, 0) 100%
          );
        }
        .book-elements-dark.manga {
          background: linear-gradient(
            270deg,
            rgba(0, 0, 0, 0.45) 0%,
            rgba(0, 0, 0, 0.1) 1.23%,
            rgba(255, 255, 255, 0.08) 2.5%,
            rgba(0, 0, 0, 0) 3.52%,
            rgba(0, 0, 0, 0) 100%
          );
        }
        .book-elements-light.manga {
          background: linear-gradient(
            270deg,
            rgba(0, 0, 0, 0.2) 0%,
            rgba(0, 0, 0, 0.05) 1.66%,
            rgba(255, 255, 255, 0.15) 3.84%,
            rgba(0, 0, 0, 0) 6%,
            rgba(0, 0, 0, 0) 100%
          );
        }
      `}</style>

      {/* Floating Tooltip/Pill with liquid glide transition */}
      {showTooltip && (
        <div
          className="fixed pointer-events-none z-[3200] opacity-100"
          style={{
            left: 0,
            top: 0,
            transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
            willChange: 'transform',
            transition: 'transform 0.28s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.18s ease',
          }}
        >
          <div className="px-3 py-1 bg-neutral-950/90 border border-neutral-800 backdrop-blur-sm text-[10px] font-bold tracking-wide uppercase text-neutral-200 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.5)] transform -translate-x-1/2 -translate-y-full -mt-4 whitespace-nowrap">
            {tooltipText}
          </div>
        </div>
      )}

      <section id="bookshelf-section" className="pt-1 pb-8 bg-neutral-950 overflow-hidden">
        <div className="max-w-4xl mx-auto w-full px-6">

          {/* Header */}
          <ScrollReveal className="mb-4">
            <p className="text-lg text-neutral-400 font-outfit text-left">
              Reading
            </p>
            <h2 className="text-3xl font-bold text-neutral-200 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 text-left font-excon">
              Bookshelf
            </h2>
            <p className="text-neutral-400 font-poppins text-sm text-left mt-2 max-w-xl leading-relaxed">
              An interactive shelf of books and manga that have shaped my thinking on software engineering, design, philosophy, and habits. Click a book to inspect it.
            </p>
          </ScrollReveal>

          {/* Bookshelf Visual */}
          <ScrollReveal delay={0.1} className="relative w-full mb-8 select-none">
            {/* Shelf backdrop shadow / light reflection */}
            <div className="absolute inset-x-0 bottom-4 h-32 bg-gradient-to-t from-neutral-950 to-transparent pointer-events-none opacity-40 z-0"></div>

            {/* Scrollable Viewport */}
            <div className="bookshelf-scrollbar overflow-x-auto overflow-y-visible flex items-end justify-start w-full px-4 pt-4 pb-4 min-h-[300px] relative z-10">
              <div className="flex items-end gap-[4px] w-max">
                {books.map((book, idx) => {
                  const isActive = activeIndex === idx;
                  const isManga = book.category === 'Manga & Storytelling';
                  const openness = isActive ? 1 : 0;
                  const baseTilt = book.baseTilt || 0;

                  const tilt = calculateTilt(idx, activeIndex, baseTilt);
                  const rotY = isManga ? -90 * (1 - openness) : 90 * (1 - openness);
                  const rotZ = tilt * (1 - openness);

                  const { width, offsetX } = calculateProjectedDimensions(
                    book.coverWidth,
                    book.spineWidth,
                    260, // height
                    rotY,
                    rotZ,
                    isManga
                  );

                  return (
                    <div
                      key={idx}
                      className="book-container shrink-0 cursor-pointer"
                      style={{
                        width: `${width}px`,
                        height: '260px',
                        zIndex: isActive ? 2 : 1,
                        perspective: '5000px',
                      }}
                      onClick={() => handleBookClick(idx, book)}
                      onPointerEnter={(e) => handleMouseEnter(book, e)}
                      onPointerLeave={handleMouseLeave}
                      onPointerMove={handleMouseMove}
                    >
                      <div
                        className="book-3d-inner relative"
                        style={{
                          width: `${book.coverWidth}px`,
                          height: '260px',
                          transformOrigin: isManga ? 'right center' : 'left center',
                          transform: `translateX(${offsetX}px) rotate(${rotZ}deg) rotateY(${rotY}deg)`,
                          transformStyle: 'preserve-3d',
                        }}
                      >
                        {/* Cover Face */}
                        <div
                          className="absolute inset-0 rounded-r-[3px] overflow-hidden bg-neutral-900"
                          style={{
                            width: `${book.coverWidth}px`,
                            height: '260px',
                            transform: `translateZ(${book.spineWidth}px)`,
                            backfaceVisibility: 'hidden',
                            boxShadow: isActive
                              ? '8px 12px 24px rgba(0, 0, 0, 0.6), inset -2px 0 8px rgba(255,255,255,0.05)'
                              : '2px 4px 8px rgba(0, 0, 0, 0.4)',
                          }}
                        >
                          <img
                            src={book.coverUrl}
                            alt={book.title}
                            className="w-full h-full object-cover select-none pointer-events-none"
                            loading="lazy"
                          />
                          {/* Book spine line shadow on the cover face */}
                          <div
                            className={`absolute inset-0 pointer-events-none ${book.theme === 'light' ? 'book-elements-light' : 'book-elements-dark'
                              } ${isManga ? 'manga' : ''}`}
                          />
                          {/* Hinge groove line */}
                          <div className={`absolute top-0 w-[3px] h-full bg-black/30 border-r border-white/5 pointer-events-none ${isManga ? 'right-0' : 'left-0'}`} />
                        </div>

                        {/* Spine Face */}
                        <div
                          className="absolute inset-y-0 flex flex-col justify-between select-none overflow-hidden"
                          style={{
                            width: `${book.spineWidth}px`,
                            height: '260px',
                            backgroundColor: book.spineColor,
                            color: book.spineTextColor,
                            left: isManga ? 'auto' : 0,
                            right: isManga ? 0 : 'auto',
                            transformOrigin: isManga ? 'right center' : 'left center',
                            transform: isManga ? 'rotateY(90deg)' : 'rotateY(-90deg)',
                            backfaceVisibility: 'hidden',
                          }}
                        >
                          {/* Texture shading to make the spine 3D */}
                          <div className="absolute inset-0 spine-shading pointer-events-none"></div>

                          {book.title === 'A Little Life' ? (
                            // Custom layout matching the reference image for A Little Life
                            <div className="w-full h-full flex flex-col justify-between items-center text-[#2d2e29] py-4">
                              {/* Parallel vertical columns for Author and Title */}
                              <div className="flex-1 flex flex-row justify-center items-start gap-3.5 w-full px-1 pt-1">
                                {/* Left Column: Author */}
                                <div
                                  className="font-serif text-[7.5px] text-white/95 font-black tracking-[0.12em] select-none text-center leading-tight"
                                  style={{
                                    writingMode: 'vertical-rl',
                                    textOrientation: 'upright',
                                    WebkitTextStroke: '0.4px rgba(255, 255, 255, 0.95)',
                                  }}
                                >
                                  HANYA YANAGIHARA
                                </div>

                                {/* Right Column: Title */}
                                <div
                                  className="font-serif text-[11px] text-white font-black tracking-[0.15em] select-none text-center leading-tight"
                                  style={{
                                    writingMode: 'vertical-rl',
                                    textOrientation: 'upright',
                                    textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                                    WebkitTextStroke: '0.7px white',
                                  }}
                                >
                                  A LITTLE LIFE
                                </div>
                              </div>

                              {/* Bottom Publisher Logo */}
                              <div className="w-full flex flex-col items-center gap-1 shrink-0 mt-auto">
                                {/* Anchor Books SVG Icon */}
                                <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] text-[#2d2e29]" fill="none" stroke="currentColor" strokeWidth="2">
                                  <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.2" />
                                  <line x1="12" y1="6.5" x2="12" y2="15.5" stroke="currentColor" strokeWidth="1.6" />
                                  <line x1="9.5" y1="9" x2="14.5" y2="9" stroke="currentColor" strokeWidth="1.4" />
                                  <circle cx="12" cy="5.5" r="1.2" stroke="currentColor" strokeWidth="1" />
                                  <path d="M8.5 13.5 C 8.5 16.5, 15.5 16.5, 15.5 13.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                                </svg>
                                <div className="text-[6px] font-bold tracking-[0.15em] text-[#2d2e29] uppercase leading-none font-sans text-center">
                                  Anchor<br />Books
                                </div>
                              </div>
                            </div>
                          ) : book.title === 'Zero to One' ? (
                            // Custom layout matching the reference image for Zero to One
                            <div className="w-full h-full flex flex-col justify-between items-center text-[#102a5c] py-3">
                              <div className="flex-1 flex flex-col items-center justify-start gap-2.5 mt-1">
                                <div className="flex flex-col items-center leading-none">
                                  <span className="font-sans font-black text-[#102a5c] text-[12px] tracking-[0.1em]">ZERO</span>
                                  <span className="font-serif italic text-[#102a5c] text-[10px] my-[1px]">to</span>
                                  <span className="font-sans font-black text-white text-[12px] tracking-[0.1em]" style={{ textShadow: '0 1px 1px rgba(0,0,0,0.1)' }}>ONE</span>
                                </div>
                                <span className="text-white/60 text-[8px] font-light">|</span>
                                <span
                                  className="font-serif text-[11px] text-[#102a5c] font-semibold whitespace-nowrap select-none tracking-wide"
                                  style={{
                                    writingMode: 'vertical-rl',
                                  }}
                                >
                                  Peter Thiel
                                </span>
                              </div>
                              <div className="w-full flex flex-col items-center gap-1 shrink-0 mt-auto px-1">
                                <div className="w-4/5 h-[1px] bg-white/50 mb-1.5" />
                                {/* Crown Business Sunrise SVG Icon */}
                                <svg viewBox="0 0 24 14" className="w-4 h-[10px] text-[#102a5c]" fill="currentColor">
                                  {/* Sun dome base */}
                                  <path d="M 6 12 A 6 6 0 0 1 18 12 Z" />
                                  {/* Rising Rays */}
                                  <line x1="12" y1="5.5" x2="12" y2="1.5" stroke="currentColor" strokeWidth="1.2" />
                                  <line x1="8.5" y1="7.5" x2="6" y2="5" stroke="currentColor" strokeWidth="1.2" />
                                  <line x1="15.5" y1="7.5" x2="18" y2="5" stroke="currentColor" strokeWidth="1.2" />
                                  <line x1="5.5" y1="11" x2="2.5" y2="10" stroke="currentColor" strokeWidth="1.2" />
                                  <line x1="18.5" y1="11" x2="21.5" y2="10" stroke="currentColor" strokeWidth="1.2" />
                                </svg>
                                <div className="text-[5px] font-bold tracking-[0.12em] text-[#102a5c] uppercase leading-[1.1] font-sans text-center mt-0.5">
                                  Crown<br />Business
                                </div>
                              </div>
                            </div>
                          ) : book.title === 'Atomic Habits' ? (
                            // Custom layout matching the reference image for Atomic Habits
                            <div className="w-full h-full flex flex-col justify-between items-center text-neutral-800 py-3">
                              {/* Top Tagline */}
                              <div
                                className="w-full text-center px-0.5 text-[6.5px] font-sans font-bold leading-tight tracking-wide text-neutral-600 select-none"
                                style={{
                                  writingMode: 'vertical-rl',
                                }}
                              >
                                Tiny Changes, Remarkable Results
                              </div>

                              {/* Middle Title with Hatch/Stripe Pattern */}
                              <div className="flex-1 flex flex-col items-center justify-center my-3">
                                <span
                                  className="font-sans font-black text-[13px] select-none tracking-widest uppercase mb-1"
                                  style={{
                                    writingMode: 'vertical-rl',
                                    backgroundImage: 'repeating-linear-gradient(0deg, #ab8953, #ab8953 2px, transparent 2px, transparent 4px)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    filter: 'drop-shadow(0px 0.5px 0.5px rgba(171, 137, 83, 0.3))',
                                  }}
                                >
                                  Atomic
                                </span>
                                <span
                                  className="font-sans font-black text-[13px] select-none tracking-widest uppercase"
                                  style={{
                                    writingMode: 'vertical-rl',
                                    backgroundImage: 'repeating-linear-gradient(0deg, #ab8953, #ab8953 2px, transparent 2px, transparent 4px)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    filter: 'drop-shadow(0px 0.5px 0.5px rgba(171, 137, 83, 0.3))',
                                  }}
                                >
                                  Habits
                                </span>
                              </div>

                              {/* Author and Publisher Logo */}
                              <div className="w-full flex flex-col items-center gap-1.5 shrink-0 mt-auto">
                                <span
                                  className="font-sans font-bold text-[8.5px] text-neutral-700 whitespace-nowrap select-none tracking-wider uppercase mb-1"
                                  style={{
                                    writingMode: 'vertical-rl',
                                  }}
                                >
                                  James Clear
                                </span>

                                {/* Avery Logo Symbol */}
                                <svg viewBox="0 0 24 24" className="w-[14px] h-[14px] text-neutral-700" fill="none" stroke="currentColor" strokeWidth="1.6">
                                  <path d="M 6 19 L 12 5 L 18 19" strokeLinecap="round" strokeLinejoin="round" />
                                  <circle cx="12" cy="13" r="3.5" stroke="currentColor" strokeWidth="1.2" />
                                </svg>

                                <div className="text-[5px] font-bold tracking-[0.2em] text-neutral-600 uppercase leading-none font-sans text-center">
                                  Avery
                                </div>
                              </div>
                            </div>
                          ) : book.title === 'The 7 Habits of Highly Effective People' ? (
                            // Custom layout matching the reference image for The 7 Habits
                            <div className="w-full h-full flex flex-col justify-between items-center text-neutral-800 py-3 font-serif bg-[#f4f1ea]">
                              {/* Top "THE 7 HABITS OF" section */}
                              <div className="w-full flex flex-col items-center justify-start leading-none pt-2 shrink-0">
                                <span className="font-sans font-extrabold text-[#3a3530] text-[6px] tracking-[0.1em] uppercase">THE</span>
                                <span className="font-serif font-black text-[#852a23] text-[20px] my-0.5 leading-none">7</span>
                                <span className="font-sans font-bold text-[#3a3530] text-[6px] tracking-[0.05em] uppercase leading-none">HABITS OF</span>
                              </div>

                              {/* Middle Title (Rotated / vertical text matching reference) */}
                              <div className="flex-1 flex items-center justify-center overflow-hidden my-3 w-full px-1">
                                <span
                                  className="font-serif font-bold text-[#3a3530] text-[11px] select-none text-center tracking-[0.05em] leading-tight"
                                  style={{
                                    writingMode: 'vertical-rl',
                                    maxWidth: '100%',
                                  }}
                                >
                                  HIGHLY EFFECTIVE PEOPLE
                                </span>
                              </div>

                              {/* Bottom: Stephen R. Covey + Fireside F logo */}
                              <div className="w-full flex flex-col items-center gap-2 shrink-0 mt-auto px-1">
                                <span
                                  className="font-sans font-bold text-[8.5px] text-[#1e6b54] select-none tracking-wider whitespace-nowrap mb-1"
                                  style={{
                                    writingMode: 'vertical-rl',
                                  }}
                                >
                                  Stephen R. Covey
                                </span>

                                <div className="w-4/5 h-[1.5px] bg-[#3a3530]/20" />

                                <div className="flex flex-col items-center justify-center border border-[#3a3530]/80 px-1 py-0.5 rounded-[1px] w-[13px] h-[17px] shrink-0 bg-white/20">
                                  <span className="font-serif font-extrabold text-[10px] text-[#3a3530] leading-none select-none">F</span>
                                </div>
                                <div className="text-[4.5px] font-bold tracking-[0.15em] text-[#3a3530] uppercase leading-none font-sans text-center">
                                  FIRESIDE
                                </div>
                            </div>
                          </div>
                        ) : book.slug === 'open-to-work' ? (
                            // Custom layout matching the reference image for Open to Work
                            <div className="w-full h-full flex flex-col justify-between items-center text-white py-3 relative bg-gradient-to-b from-[#1b7ed9] via-[#218ceb] to-[#4aa7fd]">
                              {/* Top Section: Author Names in Dark/Black Text (Rotated) */}
                              <div
                                className="flex flex-row justify-center items-start gap-[2px] text-center px-0.5 pt-1 text-[6.5px] font-sans font-extrabold leading-none text-[#1e293b]/90 select-none shrink-0"
                                style={{
                                  writingMode: 'vertical-rl',
                                  transform: 'rotate(180deg)',
                                }}
                              >
                                <span>RYAN ROSLANSKY</span>
                                <span>& ANEESH RAMAN</span>
                              </div>

                              {/* Middle Section: Title in White Bold Text (Upright Letters) */}
                              <div className="flex-1 flex items-center justify-center overflow-hidden my-2.5 w-full">
                                <span
                                  className="font-sans font-black text-white text-[9.5px] select-none text-center tracking-[0.08em] leading-none"
                                  style={{
                                    writingMode: 'vertical-rl',
                                    textOrientation: 'upright',
                                  }}
                                >
                                  OPENTOWORK
                                </span>
                              </div>

                              {/* Bottom Section: Harper Business Logo */}
                              <div className="w-full flex flex-col items-center gap-0.5 shrink-0 mt-auto px-1">
                                <div className="w-[12px] h-[14px] text-[#1e293b]/90 shrink-0 flex items-center justify-center">
                                  {/* Harper Collins style icon */}
                                  <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
                                    <path d="M19 12h-2v9H7v-9H5l7-7 7 7zm-5-3.5h-4v2h4v-2zm0 3.5h-4v2h4v-2zm0 3.5h-4v2h4v-2z" />
                                  </svg>
                                </div>
                                <div className="text-[4px] font-black tracking-[0.1em] text-[#1e293b]/90 uppercase leading-[1.1] font-sans text-center">
                                  Harper<br />Collins
                                </div>
                              </div>
                            </div>
                          ) : book.slug === 'designing-data-intensive-applications' ? (
                            // Custom layout matching the physical book for Designing Data-Intensive Applications
                            <div className="w-full h-full flex flex-col justify-between items-center text-black py-3 bg-[#fafaf9] border-x border-[#b83c24]/20 relative font-sans">
                              {/* Top colored accent band - O'Reilly style top accent */}
                              <div className="w-full h-[6px] bg-[#b83c24] shrink-0" />

                              {/* Middle Section: Title & Author (Rotated top-down) */}
                              <div className="flex-1 flex flex-col justify-center items-center overflow-hidden my-3 w-full px-1 gap-2">
                                <span
                                  className="font-sans font-black text-black text-[9.5px] select-none text-center tracking-[0.03em] leading-none"
                                  style={{
                                    writingMode: 'vertical-rl',
                                    transform: 'rotate(180deg)',
                                  }}
                                >
                                  Designing Data-Intensive Applications
                                </span>
                                <span
                                  className="font-sans font-medium text-neutral-500 text-[7px] select-none text-center leading-none"
                                  style={{
                                    writingMode: 'vertical-rl',
                                    transform: 'rotate(180deg)',
                                  }}
                                >
                                  Martin Kleppmann
                                </span>
                              </div>

                              {/* Bottom Section: Iconic Red O'Reilly "O" Logo */}
                              <div className="w-full flex flex-col items-center gap-0.5 shrink-0 mt-auto pb-1 px-1 select-none">
                                <div className="w-[12px] h-[12px] rounded-full border-[2.2px] border-[#e02020] shrink-0" />
                                <div className="text-[3.5px] font-black tracking-[0.05em] text-neutral-800 uppercase leading-none font-sans text-center">
                                  O'REILLY
                                </div>
                              </div>
                            </div>
                          ) : book.slug === 'the-pragmatic-programmer' ? (
                            // Custom layout matching the physical book for The Pragmatic Programmer
                            <div className="w-full h-full flex flex-col justify-between items-center text-white py-3 bg-[#0b1a30] relative font-sans">
                              {/* Top Section: Author Names in Grey/White */}
                              <div
                                className="flex flex-col items-center text-center pt-1 text-[7px] font-bold leading-tight text-neutral-400 select-none shrink-0"
                                style={{
                                  writingMode: 'vertical-rl',
                                  transform: 'rotate(180deg)',
                                }}
                              >
                                <span>THOMAS</span>
                                <span className="mx-0.5 text-neutral-600">•</span>
                                <span>HUNT</span>
                              </div>

                              {/* Middle Section: Two-Tone Title and Subtitle */}
                              <div className="flex-1 flex flex-col justify-center items-center overflow-hidden my-3 w-full px-1 gap-1">
                                <span
                                  className="font-sans font-extrabold text-white text-[9.5px] select-none text-center tracking-[0.04em] leading-none"
                                  style={{
                                    writingMode: 'vertical-rl',
                                    transform: 'rotate(180deg)',
                                  }}
                                >
                                  The Pragmatic
                                </span>
                                <span
                                  className="font-sans font-black text-[#eab308] text-[10px] select-none text-center tracking-[0.04em] leading-none mt-1"
                                  style={{
                                    writingMode: 'vertical-rl',
                                    transform: 'rotate(180deg)',
                                  }}
                                >
                                  Programmer
                                </span>
                                <span
                                  className="font-sans font-medium text-neutral-400 text-[5px] select-none text-center tracking-widest leading-none mt-1.5 uppercase"
                                  style={{
                                    writingMode: 'vertical-rl',
                                    transform: 'rotate(180deg)',
                                  }}
                                >
                                  20TH ANNIVERSARY
                                </span>
                              </div>

                              {/* Bottom Section: Addison-Wesley Logo */}
                              <div className="w-full flex flex-col items-center gap-0.5 shrink-0 mt-auto pb-1 px-1 select-none">
                                <div className="w-[12px] h-[12px] bg-[#e03a20] rounded-[1.5px] flex items-center justify-center p-[2px] shrink-0 shadow-sm">
                                  <svg viewBox="0 0 24 24" className="w-full h-full text-white" fill="currentColor">
                                    <path d="M12 2L2 22h20L12 2zm0 3.8L18.4 18H5.6L12 5.8z" />
                                  </svg>
                                </div>
                                <div className="text-[3px] font-black tracking-[0.05em] text-neutral-400 uppercase leading-none font-sans text-center mt-[1px]">
                                  Addison-Wesley
                                </div>
                              </div>
                            </div>
                          ) : book.slug === 'a-little-life' ? (
                            // Custom layout matching the physical book for A Little Life
                            <div className="w-full h-full flex flex-col justify-between items-center text-white py-3 bg-[#111111] relative font-serif">
                              {/* Top Section: Author Name in White Serif uppercase */}
                              <div
                                className="flex flex-col items-center text-center pt-1 text-[8.5px] font-medium tracking-[0.05em] text-neutral-300 select-none shrink-0"
                                style={{
                                  writingMode: 'vertical-rl',
                                  transform: 'rotate(180deg)',
                                }}
                              >
                                HANYA YANAGIHARA
                              </div>

                              {/* Middle Section: Title in Bold white Serif Font */}
                              <div className="flex-1 flex items-center justify-center overflow-hidden my-4 w-full">
                                <span
                                  className="font-serif font-bold text-white text-[13px] select-none text-center tracking-[0.08em] leading-none uppercase"
                                  style={{
                                    writingMode: 'vertical-rl',
                                    transform: 'rotate(180deg)',
                                  }}
                                >
                                  A Little Life
                                </span>
                              </div>

                              {/* Bottom Section: Iconic white Anchor logo */}
                              <div className="w-full flex flex-col items-center gap-0.5 shrink-0 mt-auto pb-1 px-1 select-none">
                                <div className="w-[14px] h-[14px] text-white/95 shrink-0 flex items-center justify-center">
                                  <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="5" r="3" />
                                    <line x1="12" y1="8" x2="12" y2="22" />
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <path d="M5 12a7 7 0 0014 0" />
                                  </svg>
                                </div>
                                <div className="text-[3px] font-black tracking-[0.05em] text-neutral-400 uppercase leading-none font-sans text-center mt-[1.5px]">
                                  ANCHOR
                                </div>
                              </div>
                            </div>
                          ) : book.slug === 'the-subtle-art-of-not-giving-a-fck' ? (
                            // Custom layout matching the physical book for The Subtle Art of Not Giving a F*ck
                            <div className="w-full h-full flex flex-col justify-between items-center text-black py-3 bg-[#ff5f00] relative font-sans">
                              {/* Top Section: Author Name in Bold Black/White */}
                              <div
                                className="flex flex-col items-center text-center pt-1 text-[7.5px] font-black leading-tight text-black select-none shrink-0"
                                style={{
                                  writingMode: 'vertical-rl',
                                  transform: 'rotate(180deg)',
                                }}
                              >
                                <span>MARK</span>
                                <span className="text-white mt-[1px]">MANSON</span>
                              </div>

                              {/* Middle Section: Title in Heavy Black Sans-Serif Font */}
                              <div className="flex-1 flex items-center justify-center overflow-hidden my-3 w-full">
                                <span
                                  className="font-sans font-black text-black text-[10.5px] select-none text-center tracking-[0.05em] leading-none"
                                  style={{
                                    writingMode: 'vertical-rl',
                                    transform: 'rotate(180deg)',
                                  }}
                                >
                                  THE SUBTLE ART OF NOT GIVING A F*CK
                                </span>
                              </div>

                              {/* Bottom Section: HarperOne */}
                              <div className="w-full flex flex-col items-center gap-0.5 shrink-0 mt-auto px-1">
                                <div className="text-[5.5px] font-black tracking-widest text-black uppercase leading-none font-sans text-center">
                                  HarperOne
                                </div>
                              </div>
                            </div>
                          ) : (
                            // Default layout for other books
                            <div className="w-full h-full flex flex-col justify-between py-4">
                              {/* Top accent */}
                              <div className="w-full text-center px-1 font-synonym text-[9px] uppercase tracking-widest opacity-60 font-semibold shrink-0">
                                {book.progress === 'Currently Reading' ? '•' : ''}
                              </div>

                              {/* Middle title (Rotated) */}
                              <div className="flex-1 flex items-center justify-center overflow-hidden w-full px-1">
                                <span
                                  className="font-outfit font-bold whitespace-nowrap text-[11px] select-none text-center"
                                  style={{
                                    writingMode: 'vertical-rl',
                                    transform: 'rotate(180deg)',
                                    letterSpacing: '0.05em',
                                    maxWidth: '100%',
                                  }}
                                >
                                  {book.title}
                                </span>
                              </div>

                              {/* Bottom Author */}
                              <div className="w-full text-center px-1 font-poppins text-[8px] opacity-75 shrink-0 truncate">
                                {book.author.split(' ').pop()}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Premium Metallic/Wooden Shelf Base - Subtle Line to maintain depth */}
            <div className="relative w-full h-[2px] bg-neutral-900 border-t border-neutral-800 rounded shadow-[0_4px_12px_rgba(0,0,0,0.5)] mt-[-2px] z-20">
              <div className="absolute inset-0 bg-neutral-900/60"></div>
            </div>
          </ScrollReveal>

        </div>
      </section>

    </>
  );
};

export default Bookshelf;
