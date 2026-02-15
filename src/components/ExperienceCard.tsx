

import { Tooltip, TooltipContent, TooltipTrigger } from '../components/ui/tooltip';
import { Github, Globe, Linkedin, Twitter, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';
import Skill from '../components/common/Skill';
import { ExperienceInterface } from '../constants/experience';

const parseDescription = (text: string): string => {
    return text.replace(/\*(.*?)\*/g, '<b>$1</b>');
};

interface ExperienceCardProps {
    experience: ExperienceInterface;
    isOpen: boolean;
    onClick: () => void;
    transparentOnOpen?: boolean;
    alwaysOpen?: boolean;
}

export function ExperienceCard({ experience, isOpen, onClick, transparentOnOpen = false, alwaysOpen = false }: ExperienceCardProps) {
    const isExpanded = alwaysOpen || isOpen;

    return (
        <div
            className={cn(
                "flex flex-col gap-0 transition-all duration-300 group",
                isExpanded && !transparentOnOpen
                    ? "bg-[#111111]/50 border border-white/5 rounded-2xl"
                    : "bg-transparent border border-transparent"
            )}
        >
            {/* Company Header - Always Visible */}
            <div className="flex flex-col p-4 sm:p-6 gap-4">
                <div className="flex flex-col sm:flex-row items-start justify-between gap-2 sm:gap-4">
                    {/* Left Side: Logo & Info */}
                    <div className="flex items-start gap-3 sm:gap-4 w-full sm:w-auto">
                        <img
                            src={experience.image}
                            alt={experience.company}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-md object-cover bg-neutral-900 border border-neutral-800 shrink-0"
                        />
                        <div className="flex flex-col gap-1 sm:gap-0 w-full">
                            <div className="flex flex-wrap items-center gap-2">
                                <h3 className={cn(
                                    "text-base sm:text-lg font-bold font-outfit text-white leading-tight",
                                    experience.isBlur && "blur-[6px] select-none opacity-80"
                                )}>
                                    {experience.company}
                                </h3>

                                {/* Social Links */}
                                <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                                    {experience.website && (
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <a href={experience.website} target="_blank" className="p-1 text-neutral-500 hover:text-white transition-colors block" rel="noreferrer">
                                                    <Globe className="w-3.5 h-3.5" />
                                                </a>
                                            </TooltipTrigger>
                                            <TooltipContent>Visit Website</TooltipContent>
                                        </Tooltip>
                                    )}
                                    {experience.x && (
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <a href={experience.x} target="_blank" className="p-1 text-neutral-500 hover:text-white transition-colors block" rel="noreferrer">
                                                    <Twitter className="w-3.5 h-3.5" />
                                                </a>
                                            </TooltipTrigger>
                                            <TooltipContent>Follow on X</TooltipContent>
                                        </Tooltip>
                                    )}
                                    {experience.linkedin && (
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <a href={experience.linkedin} target="_blank" className="p-1 text-neutral-500 hover:text-white transition-colors block" rel="noreferrer">
                                                    <Linkedin className="w-3.5 h-3.5" />
                                                </a>
                                            </TooltipTrigger>
                                            <TooltipContent>Connect on LinkedIn</TooltipContent>
                                        </Tooltip>
                                    )}
                                    {experience.github && (
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <a href={experience.github} target="_blank" className="p-1 text-neutral-500 hover:text-white transition-colors block" rel="noreferrer">
                                                    <Github className="w-3.5 h-3.5" />
                                                </a>
                                            </TooltipTrigger>
                                            <TooltipContent>View GitHub</TooltipContent>
                                        </Tooltip>
                                    )}
                                </div>

                                {experience.isCurrent && (
                                    <div className="flex items-center gap-1 rounded-md bg-[#022c1b] px-2 py-0.5 text-[10px] font-outfit text-[#ffffff] font-semibold ml-1 border border-black shadow-[0_0_10px_-3px_rgba(0,220,130,0.3)]">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#00DC82] animate-pulse"></div>
                                        Working
                                    </div>
                                )}

                                {!alwaysOpen && (
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <div
                                                onClick={onClick}
                                                className="ml-0 w-6 h-6 flex items-center justify-center rounded-lg border border-transparent bg-transparent hover:bg-[#161616] hover:border-[#222] transition-all duration-300 cursor-pointer"
                                            >
                                                <ChevronDown className={cn(
                                                    "w-3.5 h-3.5 text-neutral-500 transition-transform duration-300",
                                                    isExpanded ? "rotate-180" : ""
                                                )} />
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            {isExpanded ? "Collapse" : "Expand"}
                                        </TooltipContent>
                                    </Tooltip>
                                )}
                            </div>
                            <p className="text-neutral-400 font-outfit font-semibold text-sm sm:text-base leading-snug">{experience.position}</p>
                        </div>
                    </div>

                    {/* Right Side: Date & Location */}
                    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start w-full sm:w-auto text-neutral-500 text-xs sm:text-sm font-medium shrink-0 pl-[52px] sm:pl-0 mt-1 sm:mt-0">
                        <p>
                            {experience.startDate} - {experience.isCurrent ? 'Present' : experience.endDate}
                        </p>
                        <p className="text-neutral-600">{experience.location}</p>
                    </div>
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
                    <div className="p-4 sm:p-6 pt-0 sm:pt-0 flex flex-col gap-4 sm:gap-6">
                        {/* Technologies */}
                        <div>
                            <h4 className="text-sm font-synonym font-semibold text-neutral-200 mb-2 sm:mb-3">Technologies & Tools</h4>
                            <div className="flex flex-wrap gap-1.5 sm:gap-2 text-white font-synonym ">
                                {experience.technologies.map((technology, techIndex: number) => (
                                    <Skill
                                        key={techIndex}
                                        name={technology.name}
                                        href={technology.href}
                                    >
                                        {technology.icon}
                                    </Skill>
                                ))}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="text-neutral-400 flex flex-col gap-2 text-sm sm:text-base font-satoshi leading-relaxed">
                            {experience.description.map(
                                (description: string, descIndex: number) => (
                                    <p
                                        key={descIndex}
                                        dangerouslySetInnerHTML={{
                                            __html: `• ${parseDescription(description)}`,
                                        }}
                                    />
                                ),
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
