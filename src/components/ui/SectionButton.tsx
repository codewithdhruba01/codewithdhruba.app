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
    const baseClasses = "inline-flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-xl text-foreground hover:bg-accent transition-all duration-200 group shadow-sm text-sm font-bold font-outfit cursor-pointer";

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
