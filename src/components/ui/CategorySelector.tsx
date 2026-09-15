import React, { useRef, useState } from 'react';
import ScrollReveal from './ScrollReveal';

interface CategoryTag {
  name: string;
  count: number;
}

interface CategorySelectorProps {
  tags: CategoryTag[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  delay?: number;
  align?: 'start' | 'center';
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  tags,
  selectedCategory,
  onSelectCategory,
  delay = 0.1,
  align = 'start',
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDown(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeftState(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1.5;
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeftState - walk;
    }
  };

  const playClickSound = () => {
    const audio = new Audio('/Audio/mouse-click.mp3');
    audio.volume = 0.2;
    audio.play().catch((err) => console.log('Audio play blocked or failed:', err));
  };

  return (
    <ScrollReveal delay={delay}>
      <div className="mt-10 mb-6 relative">
        {/* Left & Right Fade Overlays for scrolling (both mobile and desktop) */}
        <div className="absolute -left-6 top-0 bottom-2 w-6 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
        <div className="absolute -right-6 top-0 bottom-2 w-12 bg-gradient-to-l from-background via-background/85 to-transparent pointer-events-none z-10" />

        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] gap-2.5 items-center pb-2 -mx-6 px-6 cursor-grab active:cursor-grabbing select-none ${
            align === 'center' ? 'justify-start sm:justify-center' : 'justify-start'
          }`}
        >
          {tags.map((tag, i) => {
            const isActive = selectedCategory === tag.name;
            return (
              <button
                key={i}
                onClick={() => {
                  onSelectCategory(tag.name);
                  playClickSound();
                }}
                className={`pl-3 pr-2 py-1 text-xs rounded-full font-outfit transition-all duration-200 flex items-center gap-1.5 border whitespace-nowrap shrink-0 ${isActive
                  ? 'bg-foreground text-background border-transparent font-medium shadow-sm'
                  : 'bg-card border-border hover:bg-accent text-muted-foreground hover:text-foreground'
                  }`}
              >
                <span>{tag.name}</span>
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded-full font-sans font-medium transition-all duration-200 ${isActive
                    ? 'bg-background/20 text-background'
                    : 'bg-muted text-muted-foreground'
                    }`}
                >
                  {tag.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </ScrollReveal>
  );
};

export default CategorySelector;
