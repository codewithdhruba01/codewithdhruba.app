import { useState, useEffect } from 'react';

interface ImageCarouselProps {
  images: string[];
  className?: string;
}

export const ImageCarousel = ({ images, className = '' }: ImageCarouselProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const getIndicatorColor = (index: number) => {
    const colors = [
      { active: 'bg-red-500', hover: 'hover:bg-red-400', glow: 'shadow-red-500/30' },
      { active: 'bg-green-500', hover: 'hover:bg-green-400', glow: 'shadow-green-500/30' },
      { active: 'bg-yellow-500', hover: 'hover:bg-yellow-400', glow: 'shadow-yellow-500/30' }
    ];
    return colors[index % 3];
  };

  return (
    <div className={`relative w-full max-w-md mx-auto ${className}`}>
      <div className="relative w-64 h-64 mx-auto">
        {images.map((image, index) => {
          const offsetX = (index - 2) * 15;
          const offsetY = Math.abs(index - 2) * 8;
          const rotation = (index - 2) * 3;

          const entranceDelay = index * 150;

          return (
            <div
              key={index}
              className="absolute w-48 h-48 rounded-2xl overflow-hidden border-2 cursor-pointer group"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) translate(${offsetX}px, ${offsetY}px) rotate(${rotation}deg) ${isVisible ? 'scale(1)' : 'scale(0.8)'}`,
                zIndex: hoveredIndex === index ? 20 : 10 - Math.abs(index - 2),
                borderColor: hoveredIndex === index ? '#00DC82' : 'rgba(0, 220, 130, 0.3)',
                boxShadow: hoveredIndex === index
                  ? '0 25px 50px rgba(0, 220, 130, 0.4), 0 0 30px rgba(0, 220, 130, 0.3)'
                  : '0 10px 20px rgba(0, 0, 0, 0.4)',
                transition: `all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform ${isVisible ? '0.8s' : '0s'} cubic-bezier(0.25, 0.46, 0.45, 0.94) ${entranceDelay}ms`,
                opacity: isVisible ? 1 : 0
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className="absolute inset-0 rounded-2xl transition-all duration-700 ease-out"
                style={{
                  background: hoveredIndex === index
                    ? 'linear-gradient(135deg, rgba(0, 220, 130, 0.2) 0%, rgba(0, 220, 130, 0.05) 50%, transparent 100%)'
                    : 'transparent'
                }}
              />

              {hoveredIndex === index && (
                <>
                  <div className="absolute top-4 right-4 w-2 h-2 bg-[#00DC82] rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '2s' }} />
                  <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-[#00DC82] rounded-full animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '2.5s' }} />
                  <div className="absolute top-8 left-8 w-1 h-1 bg-[#00DC82] rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }} />
                </>
              )}

              <img
                src={image}
                alt={`Portfolio image ${index + 1}`}
                className="w-full h-full object-cover transition-all duration-700 ease-out"
                style={{
                  transform: hoveredIndex === index ? 'scale(1.08) rotate(-1deg)' : 'scale(1) rotate(0deg)',
                  filter: hoveredIndex === index ? 'brightness(1.1) contrast(1.05)' : 'brightness(1) contrast(1)'
                }}
                draggable={false}
              />

              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-500 ease-out ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  backdropFilter: hoveredIndex === index ? 'blur(1px)' : 'none'
                }}
              >
                <div
                  className="absolute bottom-4 left-4 right-4 transform transition-all duration-500 ease-out"
                  style={{
                    transform: hoveredIndex === index ? 'translateY(0)' : 'translateY(10px)'
                  }}
                >
                  <p className="text-white text-sm font-semibold tracking-wide">Image {index + 1}</p>
                  <p className="text-gray-200 text-xs mt-1 opacity-90">codewithdhruba</p>
                  <div className="w-8 h-0.5 bg-[#00DC82] mt-2 rounded-full transform transition-all duration-500 ease-out"
                    style={{ transform: hoveredIndex === index ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left' }} />
                </div>
              </div>

              <div
                className="absolute inset-0 rounded-2xl border-2 transition-all duration-500 ease-out"
                style={{
                  borderColor: hoveredIndex === index ? '#00DC82' : 'transparent',
                  boxShadow: hoveredIndex === index ? 'inset 0 0 20px rgba(0, 220, 130, 0.3)' : 'none'
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Navigation indicator */}
      <div className="flex justify-center mt-8 space-x-3">
        {images.map((_, index) => {
          const colors = getIndicatorColor(index);
          return (
            <button
              key={index}
              onClick={() => setHoveredIndex(hoveredIndex === index ? null : index)}
              className={`relative transition-all duration-500 ease-out rounded-full flex items-center justify-center group ${hoveredIndex === index
                ? `w-8 h-8 ${colors.active} scale-110 shadow-lg ${colors.glow}`
                : `w-6 h-6 bg-gray-600 ${colors.hover} hover:scale-105`
                }`}
              style={{
                transitionDelay: `${index * 50}ms`
              }}
            >
              {hoveredIndex === index && (
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              )}
              <div className={`absolute inset-0 rounded-full transition-all duration-500 ease-out ${hoveredIndex === index ? `${colors.active}/20 scale-150 opacity-100` : 'opacity-0 scale-100'
                }`} />
            </button>
          );
        })}
      </div>

      <div className="text-center mt-6">
        <p className={`text-gray-400 text-sm transition-all duration-700 ease-out ${isVisible ? 'opacity-70 transform translate-y-0' : 'opacity-0 transform translate-y-4'
          }`}>
          Hover over images to explore
        </p>
        <div className={`w-24 h-0.5 bg-gradient-to-r from-transparent via-[#00DC82] to-transparent mx-auto mt-2 transition-all duration-1000 ease-out ${isVisible ? 'opacity-60' : 'opacity-0'
          }`} style={{ transitionDelay: '500ms' }} />
      </div>
    </div>
  );
};
