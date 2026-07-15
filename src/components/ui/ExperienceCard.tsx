import React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ExperienceInterface } from '../../constants/experience';

const parseDescription = (text: string): string => {
    return text.replace(/\*(.*?)\*/g, '<b>$1</b>');
};

interface TechBadgeProps {
    name: string;
    children?: React.ReactNode;
}

const TechBadge = ({ name, children }: TechBadgeProps) => {
    return (
        <div className="group inline-flex items-center gap-0 rounded-md border border-dashed border-neutral-800 bg-neutral-900/40 px-2.5 py-1 text-xs font-medium text-neutral-300 outline-none transition-all duration-300 ease-out hover:scale-[1.03] hover:gap-1.5 hover:border-neutral-700 hover:bg-neutral-800/80 hover:text-white hover:shadow-sm">
            <span className="w-4 h-4 shrink-0 flex items-center justify-center [&>svg]:w-3.5 [&>svg]:h-3.5 [&>svg]:text-neutral-400 group-hover:[&>svg]:text-white [&>svg]:transition-colors">
                {children}
            </span>
            <span className="max-w-0 overflow-hidden opacity-0 whitespace-nowrap transition-all duration-300 ease-out group-hover:max-w-32 group-hover:opacity-100 group-hover:delay-150 leading-none">
                {name}
            </span>
        </div>
    );
};

interface ExperienceCardProps {
    experience: ExperienceInterface;
    isOpen: boolean;
    onClick: () => void;
    transparentOnOpen?: boolean;
    alwaysOpen?: boolean;
}

export function ExperienceCard({ experience, isOpen, onClick, alwaysOpen = false }: ExperienceCardProps) {
    const isExpanded = alwaysOpen || isOpen;

    return (
        <div className="flex flex-col py-2 sm:py-3 w-full transition-all duration-300">
            {/* Header info */}
            <div
                className={cn(
                    "flex flex-col gap-1 w-full group",
                    !alwaysOpen ? "cursor-pointer select-none" : ""
                )}
                onClick={alwaysOpen ? undefined : onClick}
            >
                <div className="flex items-center justify-between w-full">
                    {/* Left: Company name & Working badge & Chevron toggle */}
                    <div className="flex items-center gap-2">
                        <h3 className={cn(
                            "text-base sm:text-lg font-bold font-outfit text-white tracking-wide transition-colors",
                            experience.isBlur && "blur-[6px] select-none opacity-80"
                        )}>
                            {experience.company}
                        </h3>

                        {experience.isCurrent && (
                            <div className="inline-flex items-center gap-1 rounded-full border border-[#00DC82]/30 bg-[#00DC82]/10 px-2 py-0.5 text-[10px] font-outfit text-[#00DC82] font-semibold shadow-[0_0_10px_-3px_rgba(0,220,130,0.2)]">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#00DC82] animate-pulse"></span>
                                Working
                            </div>
                        )}

                        {/* Toggle Button for collapsible items on homepage */}
                        {!alwaysOpen && (
                            <div className={cn(
                                "flex items-center justify-center w-5 h-5 rounded transition-all duration-300 opacity-0 group-hover:opacity-100 text-neutral-200 hover:text-white",
                                isExpanded ? "rotate-90 text-white opacity-100" : ""
                            )}>
                                <ChevronRight className="w-4 h-4 shrink-0 transition-transform duration-300" strokeWidth={2.5} />
                            </div>
                        )}
                    </div>

                    {/* Right: Date Range (Desktop/Tablet) */}
                    <div className="hidden sm:block text-neutral-400 text-sm font-synonym font-medium text-right shrink-0">
                        {experience.startDate} – {experience.isCurrent ? 'Present' : experience.endDate}
                    </div>

                    {/* Right: Date Range (Mobile) */}
                    <div className="block sm:hidden text-neutral-400 text-xs font-synonym font-medium text-right shrink-0">
                        {experience.startDate} – {experience.isCurrent ? 'Present' : (experience.endDate || '').replace(/20\d{2}/, (match) => match.slice(-2))}
                    </div>
                </div>

                {/* Subtitle row */}
                <div className="flex items-center justify-between text-sm w-full mt-0.5">
                    <p className="text-neutral-400 font-bricolage font-medium text-sm sm:text-base leading-snug">
                        {experience.position}
                    </p>

                    {/* Location (Desktop) */}
                    <p className="hidden sm:block text-neutral-500 font-synonym text-sm">
                        {experience.location}
                    </p>

                    {/* Location (Mobile) */}
                    <p className="block sm:hidden text-neutral-500 font-synonym text-xs">
                        {experience.location.includes('(') ? experience.location.replace(/.*\((.*)\)/, '$1') : experience.location}
                    </p>
                </div>
            </div>

            {/* Expanded Content */}
            <div
                className={cn(
                    "grid transition-all duration-300 ease-in-out",
                    isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                )}
            >
                <div className="overflow-hidden">
                    <div className="mt-4 space-y-4 border-t border-neutral-900 pt-4">
                        {/* Technologies & Tools */}
                        <div>
                            <h4 className="text-xs font-outfit font-semibold text-neutral-400 uppercase tracking-wider mb-2.5">Technologies & Tools</h4>
                            <div className="flex flex-wrap gap-2 text-white font-synonym">
                                {experience.technologies.map((technology, techIndex: number) => (
                                    <TechBadge
                                        key={techIndex}
                                        name={technology.name}
                                    >
                                        {technology.icon}
                                    </TechBadge>
                                ))}
                            </div>
                        </div>

                        {/* Description / What I've Done */}
                        <div>
                            <h4 className="text-xs font-outfit font-semibold text-neutral-400 uppercase tracking-wider mb-2.5 mt-3">What I've done</h4>
                            <ul className="flex flex-col gap-2">
                                {experience.description.map((description: string, descIndex: number) => (
                                    <li key={descIndex} className="flex gap-2 items-start">
                                        <span className="text-neutral-500 shrink-0 select-none mt-1.5 text-xs">•</span>
                                        <span
                                            className="text-neutral-500 font-supreme text-sm sm:text-base leading-relaxed"
                                            dangerouslySetInnerHTML={{
                                                __html: parseDescription(description),
                                            }}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
