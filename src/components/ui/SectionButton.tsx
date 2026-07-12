import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SectionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    to?: string;
    onClick?: () => void;
    className?: string;
    icon?: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
}

export const SectionButton = ({
    text,
    to,
    onClick,
    className,
    icon = <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />,
    type = 'button',
    ...props
}: SectionButtonProps) => {
    const baseClasses = "inline-flex items-center gap-2 px-4 py-2.5 bg-[#121214] border border-neutral-800/80 rounded-xl text-[#d3d1d1] hover:border-neutral-700 hover:bg-neutral-900 transition-all duration-200 group shadow-lg shadow-black/20 text-sm font-bold font-outfit";

    const content = (
        <>
            {text}
            {icon}
        </>
    );

    if (to) {
        return (
            <Link to={to} className={cn(baseClasses, className)} {...(props as any)}>
                {content}
            </Link>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            className={cn(baseClasses, className)}
            {...props}
        >
            {content}
        </button>
    );
};
