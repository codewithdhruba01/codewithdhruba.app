import React from 'react';
import { cn } from '../../lib/utils';

interface SkillProps {
    name: string;
    href?: string;
    children?: React.ReactNode;
    size?: 'sm' | 'md';
}

const Skill = ({ name, href, children, size = 'md' }: SkillProps) => {
    const isSm = size === 'sm';

    const content = (
        <div className={cn(
            "flex items-center bg-[#111] border border-neutral-800/80 border-dashed text-neutral-200 hover:text-white hover:border-neutral-500 hover:bg-[#161616] transition-all cursor-default group shadow-sm",
            isSm 
                ? "gap-1.5 px-2 py-0.5 rounded text-[10px] font-medium h-[22px] shrink-0"
                : "gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold"
        )}>
            {children && (
                <span className={cn(
                    "text-neutral-400 group-hover:text-white transition-colors flex items-center justify-center shrink-0",
                    isSm 
                        ? "[&>svg]:w-3 [&>svg]:h-3"
                        : "[&>svg]:w-3.5 [&>svg]:h-3.5 sm:[&>svg]:w-4 sm:[&>svg]:h-4"
                )}>
                    {children}
                </span>
            )}
            <span className="leading-none">{name}</span>
        </div>
    );

    if (href) {
        return <a href={href} target="_blank" rel="noreferrer" className="block outline-none cursor-pointer">{content}</a>;
    }
    return content;
};

export default Skill;
