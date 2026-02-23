import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SectionButtonProps {
    text: string;
    to?: string;
    onClick?: () => void;
    className?: string;
    icon?: React.ReactNode;
}

export const SectionButton = ({
    text,
    to,
    onClick,
    className,
    icon = <ArrowRight size={18} className="ml-2" />
}: SectionButtonProps) => {
    const baseClasses = "inline-flex items-center justify-center font-bold font-outfit px-8 py-3 border border-[#00DC82] text-[#00DC82] rounded-lg hover:bg-[#00DC82] hover:text-black transition-all duration-500 ease-in-out group";

    const content = (
        <>
            {text}
            <span className="transition-transform duration-300 group-hover:translate-x-1">
                {icon}
            </span>
        </>
    );

    if (to) {
        return (
            <Link to={to} className={cn(baseClasses, className)}>
                {content}
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={cn(baseClasses, className)}>
            {content}
        </button>
    );
};
