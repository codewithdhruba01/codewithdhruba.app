import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

interface LinkPreviewProps {
  children: React.ReactNode;
  to: string;
  imageSrc: string;
  title?: string;
  date?: string;
  className?: string;
  width?: number;
  height?: number;
  onHoverChange?: (hovered: boolean) => void;
}

export const LinkPreview: React.FC<LinkPreviewProps> = ({
  children,
  to,
  imageSrc,
  title,
  date,
  className,
  width = 260,
  height = 146,
  onHoverChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLAnchorElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Smooth mouse-tracking configuration using framer-motion springs
  const springConfig = { stiffness: 220, damping: 22, mass: 0.25 };
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const translateX = useSpring(x, springConfig);
  const translateY = useSpring(y, springConfig);

  // Organic slight tilt on mouse movement centered around -1.5deg (matching screenshot)
  const rotateSpring = useSpring(
    useTransform(x, [-120, 120], [-3, 0]),
    springConfig
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Close smoothly if user scrolls or resizes
  useEffect(() => {
    if (!isOpen) return;
    const handleScrollOrResize = () => setIsOpen(false);
    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [isOpen]);

  const handleMouseEnter = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      // Center directly over the hovered card ("blog card ke upar")
      setCoords({
        top: rect.top + rect.height / 2 + window.scrollY,
        left: rect.left + rect.width / 2 + window.scrollX,
      });

      const relativeX = event.clientX - rect.left;
      const offsetFromCenterX = relativeX - rect.width / 2;
      x.set(offsetFromCenterX * 0.2);

      const relativeY = event.clientY - rect.top;
      const offsetFromCenterY = relativeY - rect.height / 2;
      y.set(offsetFromCenterY * 0.15);
    }
    setIsOpen(true);
    if (onHoverChange) {
      onHoverChange(true);
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const relativeX = event.clientX - rect.left;
      const offsetFromCenterX = relativeX - rect.width / 2;
      x.set(offsetFromCenterX * 0.2);

      const relativeY = event.clientY - rect.top;
      const offsetFromCenterY = relativeY - rect.height / 2;
      y.set(offsetFromCenterY * 0.15);
    }
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
    if (onHoverChange) {
      onHoverChange(false);
    }
  };

  // Format date to 4-digit year like in screenshot (e.g., '2026') or fallback to full date string
  const displayDate = date ? date.match(/\b(20\d\d)\b/)?.[1] || date : '';

  return (
    <>
      {/* Hidden preloaded image tag for browser caching */}
      {isMounted && (
        <div className="hidden">
          <img src={imageSrc} alt="" aria-hidden="true" />
        </div>
      )}

      <Link
        ref={triggerRef}
        to={to}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn("relative inline-block w-full", className)}
      >
        {children}
      </Link>

      {isMounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: `${coords.top}px`,
                  left: `${coords.left}px`,
                  transform: 'translate(-50%, -50%)', // Center directly over the hovered card
                  pointerEvents: 'none',
                  zIndex: 99999,
                }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.88, y: 10 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: {
                      type: 'spring',
                      stiffness: 280,
                      damping: 22,
                      mass: 0.35,
                    },
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.88,
                    y: 8,
                    transition: {
                      duration: 0.15,
                      ease: 'easeOut',
                    },
                  }}
                  style={{
                    x: translateX,
                    y: translateY,
                    rotate: rotateSpring,
                  }}
                  className="bg-neutral-900/95 dark:bg-[#121215]/95 border border-white/10 dark:border-white/10 p-2 rounded-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.85)] backdrop-blur-xl pointer-events-none select-none"
                >
                  {/* Screenshot Image Preview Container */}
                  <div
                    style={{
                      width: `${width}px`,
                      height: `${height}px`,
                    }}
                    className="relative overflow-hidden rounded-lg bg-black/60 border border-white/10"
                  >
                    <img
                      src={imageSrc}
                      alt={title || "Blog Preview"}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  {/* Screenshot-Style Bottom Info Bar: Serif Title + Year */}
                  {(title || displayDate) && (
                    <div
                      style={{ maxWidth: `${width}px` }}
                      className="flex items-center justify-between gap-2.5 pt-2 px-0.5 pb-0.5"
                    >
                      {title && (
                        <span className="font-instrument italic text-white text-[13.5px] leading-tight tracking-normal truncate flex-1 min-w-0 mr-1.5">
                          {title}
                        </span>
                      )}
                      {displayDate && (
                        <span className="text-zinc-400 text-[11px] font-sans font-medium tabular-nums shrink-0">
                          {displayDate}
                        </span>
                      )}
                    </div>
                  )}
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};
