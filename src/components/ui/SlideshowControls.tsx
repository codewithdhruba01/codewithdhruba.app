import React from 'react';

interface SlideshowControlsProps {
    isPlaying: boolean;
    setIsPlaying: (playing: boolean) => void;
    currentIndex: number;
    setCurrentIndex: (index: number) => void;
    totalPhotos: number;
    playClickSound: () => void;
}

const SlideshowControls: React.FC<SlideshowControlsProps> = ({
    isPlaying,
    setIsPlaying,
    currentIndex,
    setCurrentIndex,
    totalPhotos,
    playClickSound,
}) => {
    const getIndicators = () => {
        const total = totalPhotos;
        if (total <= 6) {
            return Array.from({ length: total }, (_, i) => ({
                index: i,
                isActive: i === currentIndex
            }));
        }

        let start = 0;
        if (currentIndex < 3) {
            start = 0;
        } else if (currentIndex >= total - 3) {
            start = total - 6;
        } else {
            start = currentIndex - 2;
        }

        return Array.from({ length: 6 }, (_, i) => {
            const idx = start + i;
            return {
                index: idx,
                isActive: idx === currentIndex
            };
        });
    };

    return (
        <div className="flex items-center justify-center gap-3 mt-6 select-none font-outfit">
            {/* Play/Pause Button */}
            <button
                onClick={() => {
                    setIsPlaying(!isPlaying);
                    playClickSound();
                }}
                className="w-10 h-10 rounded-full bg-[#1c1c1e] hover:bg-[#2c2c2e] border border-neutral-800/40 flex items-center justify-center transition-colors duration-200 shadow-md group"
                aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
            >
                {isPlaying ? (
                    // Pause Icon (||)
                    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#a1a1a5] group-hover:text-white transition-colors duration-200">
                        <rect width="3.5" height="14" rx="1.75" fill="currentColor" />
                        <rect x="8.5" width="3.5" height="14" rx="1.75" fill="currentColor" />
                    </svg>
                ) : (
                    // Play Icon (▶)
                    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#a1a1a5] group-hover:text-white transition-colors duration-200 translate-x-[1px]">
                        <path d="M11.5 7L1 13V1L11.5 7Z" fill="currentColor" />
                    </svg>
                )}
            </button>

            {/* Indicators Pill Container */}
            <div className="flex items-center gap-3 px-5 py-3.5 bg-[#1c1c1e] border border-neutral-800/40 rounded-full shadow-md">
                {getIndicators().map((indicator) => {
                    if (indicator.isActive) {
                        return (
                            <div
                                key={indicator.index}
                                onClick={() => {
                                    setCurrentIndex(indicator.index);
                                    playClickSound();
                                }}
                                className="w-12 h-2.5 rounded-full bg-[#2c2c2e] overflow-hidden cursor-pointer relative"
                            >
                                <div
                                    key={`${indicator.index}-${isPlaying}`}
                                    className={`h-full bg-[#a1a1a5] rounded-full ${isPlaying ? 'animate-progress-fill' : ''}`}
                                    style={!isPlaying ? { width: '50%' } : undefined}
                                />
                            </div>
                        );
                    } else {
                        return (
                            <button
                                key={indicator.index}
                                onClick={() => {
                                    setCurrentIndex(indicator.index);
                                    playClickSound();
                                }}
                                className="w-2.5 h-2.5 rounded-full bg-[#3a3a3c] hover:bg-[#5a5a5c] transition-colors duration-200"
                                aria-label={`Go to slide ${indicator.index + 1}`}
                            />
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default SlideshowControls;
