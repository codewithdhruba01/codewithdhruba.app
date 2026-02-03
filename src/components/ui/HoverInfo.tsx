import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { CalendarDays } from 'lucide-react';

interface HoverInfoProps {
    trigger: React.ReactNode;
    title: string;
    description: string;
    joinedDate?: string; // Optional "Joined" date like the screenshot
    icon?: React.ElementType; // Optional icon component
}

const HoverInfo: React.FC<HoverInfoProps> = ({
    trigger,
    title,
    description,
    joinedDate = 'December 2021', // Default matching the screenshot vibe
    icon: Icon
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });
    const triggerRef = useRef<HTMLSpanElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleInteraction = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            // Position clearly below the text with some gap (12px)
            // Center horizontally relative to trigger
            setCoords({
                top: rect.bottom + 12,
                left: rect.left + (rect.width / 2)
            });
        }
        setIsVisible(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsVisible(false);
        }, 150); // Small delay to allow moving to card if needed
    };

    return (
        <>
            <span
                ref={triggerRef}
                className="cursor-pointer underline decoration-neutral-500 decoration-dotted underline-offset-4 hover:decoration-white hover:text-white transition-colors duration-300"
                onMouseEnter={handleInteraction}
                onClick={handleInteraction}
                onMouseLeave={handleMouseLeave}
            >
                {trigger}
            </span>

            {isVisible && createPortal(
                <div
                    className="fixed z-50 animate-in fade-in zoom-in-95 duration-200"
                    style={{
                        top: `${coords.top}px`,
                        left: `${coords.left}px`,
                        transform: 'translate(-50%, 0)' // Center horizontally, hang downwards
                    }}
                    onMouseEnter={() => {
                        if (timeoutRef.current) clearTimeout(timeoutRef.current);
                        setIsVisible(true);
                    }}
                    onMouseLeave={handleMouseLeave}
                >
                    {/* Hover Card Content - Responsive Width */}
                    <div className="bg-[#09090b] border border-neutral-800 rounded-xl p-3 sm:p-4 w-[260px] sm:w-[320px] shadow-2xl relative">

                        {/* Header / Title */}
                        <div className="mb-2 flex items-center gap-2">
                            {Icon && <Icon className="w-4 h-4 text-white" />}
                            <h4 className="font-bold text-white text-sm sm:text-base">@{title.replace(/\s+/g, '').toLowerCase()}</h4>
                        </div>

                        {/* Description */}
                        <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 font-sans">
                            {description}
                        </p>

                        {/* Footer / Meta */}
                        <div className="flex items-center gap-2 text-[10px] sm:text-xs text-neutral-500 font-sans">
                            <CalendarDays className="w-3 h-3 sm:w-[14px] sm:h-[14px]" />
                            <span>Joined {joinedDate}</span>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
};

export default HoverInfo;
