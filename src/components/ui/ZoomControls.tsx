import React, { useState, useEffect } from 'react';
import { Plus, Minus, Settings, RotateCcw } from 'lucide-react';

interface ZoomControlsProps {
  fontSize: number;
  setFontSize: React.Dispatch<React.SetStateAction<number>>;
  isMobileSheetOpen: boolean;
  setIsMobileSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ZoomControls: React.FC<ZoomControlsProps> = ({
  fontSize,
  setFontSize,
  isMobileSheetOpen,
  setIsMobileSheetOpen,
}) => {
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
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

  const getFontSizeInPx = () => {
    return Math.round((fontSize / 100) * 16);
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(event.target.value);
    const percentage = (newSize / 16) * 100;
    setFontSize(Math.max(80, Math.min(150, percentage)));
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

  // Gesture handling functions
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

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault(); // Prevent scrolling
    handleDragMove(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  // Mouse event handlers (for desktop testing)
  const handleMouseDown = (e: React.MouseEvent) => {
    handleDragStart(e.clientY);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
      handleDragMove(e.clientY);
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      handleDragEnd();
    }
  };

  // Add global mouse event listeners when dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none';
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
    };
  }, [isDragging, dragStartY]);

  // Keyboard shortcuts for zoom
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === '=') {
        event.preventDefault();
        zoomIn();
      }
      if ((event.ctrlKey || event.metaKey) && event.key === '-') {
        event.preventDefault();
        zoomOut();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fontSize]);

  return (
    <>
      {/* Desktop Zoom Controls - Side Panel */}
      <div className="hidden md:block fixed right-6 top-1/2 -translate-y-1/2 z-40">
        <div className="flex flex-col items-center gap-3
                  rounded-2xl
                  bg-black/20
                  backdrop-blur-xl
                  border border-white/10
                  shadow-[0_0_40px_rgba(0,0,0,0.3)]
                  px-3 py-4
                  hover:bg-black/30
                  transition-all duration-300">

          {/* Zoom In */}
          <button
            onClick={zoomIn}
            disabled={fontSize >= 150}
            className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-150 cursor-pointer ${fontSize >= 150
              ? 'border-[#2d2e2d] bg-[#161617] text-[#a0a0a5]/40 opacity-40 cursor-not-allowed'
              : 'border-[#2d2e2d] bg-gradient-to-b from-[#252526] to-[#161617] text-[#a0a0a5] hover:text-white shadow-[0_3px_0_#000000,_inset_0_1px_0_rgba(255,255,255,0.1)] hover:-translate-y-[1px] hover:shadow-[0_4px_0_#000000,_inset_0_1px_0_rgba(255,255,255,0.15)] active:translate-y-[1px] active:shadow-[0_1px_0_#000000]'
              }`}
            title="Zoom In (Ctrl/Cmd + =)"
          >
            <Plus className="w-5 h-5" />
          </button>

          {/* Font Size Indicator */}
          <div className="text-xs font-bold select-none px-2.5 py-1.5 border border-neutral-950 bg-gradient-to-b from-[#0d0d0e] to-[#161617] text-white rounded-xl min-w-[44px] text-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]">
            {getFontSizeInPx()}px
          </div>

          {/* Zoom Out */}
          <button
            onClick={zoomOut}
            disabled={fontSize <= 80}
            className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-150 cursor-pointer ${fontSize <= 80
              ? 'border-[#2d2e2d] bg-[#161617] text-[#a0a0a5]/40 opacity-40 cursor-not-allowed'
              : 'border-[#2d2e2d] bg-gradient-to-b from-[#252526] to-[#161617] text-[#a0a0a5] hover:text-white shadow-[0_3px_0_#000000,_inset_0_1px_0_rgba(255,255,255,0.1)] hover:-translate-y-[1px] hover:shadow-[0_4px_0_#000000,_inset_0_1px_0_rgba(255,255,255,0.15)] active:translate-y-[1px] active:shadow-[0_1px_0_#000000]'
              }`}
            title="Zoom Out (Ctrl/Cmd + -)"
          >
            <Minus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Zoom Controls - Floating Settings Button */}
      <div className="md:hidden fixed right-4 top-20 z-40">
        <button
          onClick={handleOpenSheet}
          className="w-14 h-14 rounded-full
                   bg-black/40 backdrop-blur-xl
                   border border-white/20
                   shadow-[0_0_30px_rgba(0,0,0,0.4)]
                   flex items-center justify-center
                   hover:bg-black/60
                   transition-all duration-300
                   hover:scale-105"
          title="Font Size Settings"
        >
          <Settings className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Mobile Bottom Sheet */}
      {isMobileSheetOpen && (
        <>
          {/* Backdrop */}
          <div
            className={`fixed inset-0 z-50 md:hidden transition-all duration-300
                        ${isAnimating
                ? 'bg-black/50 backdrop-blur-sm opacity-100'
                : 'bg-black/0 backdrop-blur-none opacity-0'
              }`}
            onClick={handleCloseSheet}
          />

          {/* Bottom Sheet */}
          <div
            className={`fixed bottom-0 left-0 right-0 z-50 md:hidden
                        bg-neutral-950/95 backdrop-blur-xl
                        border-t border-white/10
                        rounded-t-3xl
                        shadow-[0_0_60px_rgba(0,0,0,0.8)]
                        transform transition-all duration-300 ease-out
                        ${isAnimating
                ? 'translate-y-0 opacity-100'
                : 'translate-y-full opacity-0'
              }`}
            style={{
              transform: isAnimating
                ? `translateY(${currentTranslateY}px)`
                : 'translateY(100%)'
            }}
          >

            {/* Drag Handle */}
            <div
              className="flex justify-center pt-4 pb-2 cursor-grab active:cursor-grabbing touch-none select-none"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
            >
              <div className={`w-16 h-1.5 bg-white/20 rounded-full transition-transform duration-200
                            ${isDragging ? 'scale-110' : 'scale-100'}`}></div>
            </div>

            {/* Content */}
            <div className="px-6 pb-8 space-y-6">

              {/* Current Font Size Display */}
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">
                  {getFontSizeInPx()}px
                </div>
                <div className="text-sm text-white/60 font-satoshi">
                  Current font size
                </div>
              </div>

              {/* Quick Controls */}
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
                  className="px-6 py-2.5 border border-[#2d2e2d] bg-gradient-to-b from-[#252526] to-[#161617] text-[#a0a0a5] hover:text-white shadow-[0_3px_0_#000000,_inset_0_1px_0_rgba(255,255,255,0.1)] hover:-translate-y-[1px] hover:shadow-[0_4px_0_#000000,_inset_0_1px_0_rgba(255,255,255,0.15)] active:translate-y-[1px] active:shadow-[0_1px_0_#000000] rounded-xl text-sm font-bold flex items-center gap-2 transition-all duration-150 group"
                >
                  <RotateCcw className="w-4 h-4 group-hover:rotate-[-45deg] transition-transform duration-300" />
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
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-white/60">
                  <span>Small</span>
                  <span>Large</span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="24"
                  value={getFontSizeInPx()}
                  onChange={handleSliderChange}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer
                           slider-thumb accent-white"
                  style={{
                    background: `linear-gradient(to right,
                      #ffffff 0%,
                      #ffffff ${(getFontSizeInPx() - 12) / (24 - 12) * 100}%,
                      rgba(255,255,255,0.2) ${(getFontSizeInPx() - 12) / (24 - 12) * 100}%,
                      rgba(255,255,255,0.2) 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-white/40">
                  <span>12px</span>
                  <span>24px</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ZoomControls;
