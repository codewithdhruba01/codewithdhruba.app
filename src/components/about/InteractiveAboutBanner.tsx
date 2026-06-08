import React, { useRef } from 'react';
import { motion } from 'framer-motion';

interface InteractiveAboutBannerProps {
  isLightMode: boolean;
}

export const InteractiveAboutBanner: React.FC<InteractiveAboutBannerProps> = ({ isLightMode }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const cards = [
    {
      id: 'workspace',
      src: '/assets/photo2.jpeg',
      title: 'Coding Station',
      alt: 'Workstation',
      initialRotation: -6,
      defaultPosition: { left: '4%', top: '14%' },
      zIndex: 10,
    },
    {
      id: 'avatar',
      src: '/assets/photo3.jpeg',
      title: 'It\'s me',
      alt: 'Avatar',
      initialRotation: -3,
      defaultPosition: { left: '26%', top: '8%' },
      zIndex: 30,
    },
    {
      id: 'explore-laptop',
      src: '/assets/photo4.jpeg',
      title: 'Kolkata Vibes',
      alt: 'Kolkata',
      initialRotation: 4,
      defaultPosition: { left: '49%', top: '19%' },
      zIndex: 20,
    },
    {
      id: 'explore-boat',
      src: '/assets/photo1.jpeg',
      title: 'My Desk Setup',
      alt: 'Desk',
      initialRotation: 6,
      defaultPosition: { left: '72%', top: '10%' },
      zIndex: 10,
    },
  ];

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[260px] sm:h-[320px] md:h-[360px] rounded-2xl overflow-hidden border transition-all duration-700 mb-8 select-none ${isLightMode
        ? 'bg-[#F2F2F4] border-neutral-200 shadow-inner'
        : 'bg-[#0F0F11] border-neutral-800/80 shadow-2xl shadow-black/40'
        }`}
      style={{
        backgroundImage: isLightMode
          ? `linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
             linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)`
          : `linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
             linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
        backgroundSize: '18px 18px',
      }}
    >
      {/* Subtle guide text */}
      <div className={`absolute bottom-3 left-4 text-[10px] font-mono tracking-wider transition-colors duration-500 uppercase ${isLightMode ? 'text-neutral-400' : 'text-neutral-600'
        }`}>
        📌 Drag cards to rearrange
      </div>

      {cards.map((card) => (
        <motion.div
          key={card.id}
          drag
          dragConstraints={containerRef}
          dragElastic={0.1}
          dragMomentum={false}
          whileDrag={{ scale: 1.05, zIndex: 50, cursor: 'grabbing' }}
          whileHover={{ scale: 1.03, y: -5, rotate: card.initialRotation * 0.5, zIndex: 40 }}
          initial={{ rotate: card.initialRotation, x: 0, y: 0 }}
          className={`absolute w-[22%] min-w-[95px] sm:min-w-[130px] max-w-[200px] p-2 pb-4 sm:p-3 sm:pb-6 rounded-lg shadow-lg cursor-grab transition-colors duration-500 ${isLightMode
            ? 'bg-white border border-neutral-200/80 text-neutral-800'
            : 'bg-[#1C1C1E] border border-neutral-800 text-neutral-200'
            }`}
          style={{
            left: card.defaultPosition.left,
            top: card.defaultPosition.top,
            zIndex: card.zIndex,
          }}
        >
          {/* Push Pin */}
          <div className="absolute top-1 sm:top-1.5 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
            {/* Pin head */}
            <div className={`w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full shadow-md ${card.id === 'avatar' ? 'bg-red-500' : card.id === 'workspace' ? 'bg-blue-500' : 'bg-green-500'
              }`} />
            {/* Pin shadow/metal */}
            <div className="w-[1.5px] h-2 bg-neutral-400 opacity-60" />
          </div>

          {/* Polaroid Image Box */}
          <div className="aspect-square w-full overflow-hidden rounded bg-neutral-900 border border-neutral-800 mt-2 sm:mt-3">
            <img
              src={card.src}
              alt={card.alt}
              className="w-full h-full object-cover pointer-events-none select-none"
              draggable="false"
            />
          </div>

          {/* Caption */}
          <p className="text-center font-synonym italic text-xs sm:text-sm mt-3 select-none">
            {card.title}
          </p>
        </motion.div>
      ))}
    </div>
  );
};
