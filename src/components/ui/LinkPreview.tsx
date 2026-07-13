import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

interface LinkPreviewProps {
  children: React.ReactNode;
  to: string;
  imageSrc: string;
  className?: string;
  width?: number;
  height?: number;
  onHoverChange?: (hovered: boolean) => void;
}

export const LinkPreview: React.FC<LinkPreviewProps> = ({
  children,
  to,
  imageSrc,
  className,
  width = 240,
  height = 135, // 16:9 aspect ratio
  onHoverChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLAnchorElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Smooth mouse-tracking configuration using framer-motion springs
  const springConfig = { stiffness: 120, damping: 15, mass: 0.2 };
  const x = useMotionValue(0);
  const translateX = useSpring(x, springConfig);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMouseEnter = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY,
        left: rect.left + rect.width / 2 + window.scrollX,
      });
      x.set(0); // Reset spring value on enter
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
      const offsetFromCenter = relativeX - rect.width / 2;
      // Subtly shift preview image horizontally (factor of 0.3)
      x.set(offsetFromCenter * 0.3);
    }
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
    if (onHoverChange) {
      onHoverChange(false);
    }
  };

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
                  transform: 'translate(-50%, 0%)', // Center horizontally, place below target
                  pointerEvents: 'none',
                  zIndex: 99999,
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: -22, scale: 0.85, rotate: -2 }}
                  animate={{
                    opacity: 1,
                    y: -12, // Offset trigger's padding-bottom to keep a tight gap
                    scale: 1,
                    rotate: 0,
                    transition: {
                      type: 'spring',
                      stiffness: 260,
                      damping: 20,
                    },
                  }}
                  exit={{
                    opacity: 0,
                    y: -18,
                    scale: 0.85,
                    rotate: 1.5,
                    transition: {
                      duration: 0.15,
                    },
                  }}
                  style={{
                    x: translateX,
                  }}
                  className="bg-[#0A0A0B]/90 border border-neutral-800/80 p-1.5 rounded-xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] backdrop-blur-md"
                >
                  <div
                    style={{
                      width: `${width}px`,
                      height: `${height}px`,
                    }}
                    className="relative overflow-hidden rounded-lg"
                  >
                    <img
                      src={imageSrc}
                      alt="Blog Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};
