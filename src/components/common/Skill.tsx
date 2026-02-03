import React from 'react';

interface SkillProps {
    name: string;
    href?: string;
    children?: React.ReactNode;
}

const Skill = ({ name, href, children }: SkillProps) => {
    const content = (
        <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-[#111] border border-neutral-700 border-dashed rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold text-neutral-200 hover:text-white hover:border-neutral-500 hover:bg-[#161616] transition-all cursor-default group shadow-sm">
            {children && <span className="text-neutral-400 group-hover:text-white transition-colors [&>svg]:w-3.5 [&>svg]:h-3.5 sm:[&>svg]:w-4 sm:[&>svg]:h-4">{children}</span>}
            <span>{name}</span>
        </div>
    );

    if (href) {
        return <a href={href} target="_blank" rel="noreferrer" className="block outline-none cursor-pointer">{content}</a>;
    }
    return content;
};
export default Skill;
