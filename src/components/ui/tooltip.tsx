import React, { createContext, useContext, useState } from 'react';
import { cn } from '../../lib/utils';

const TooltipContext = createContext<{ open: boolean; setOpen: (o: boolean) => void } | null>(null);

export const TooltipProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>;

export const Tooltip = ({ children }: { children: React.ReactNode }) => {
    const [open, setOpen] = useState(false);
    return (
        <TooltipContext.Provider value={{ open, setOpen }}>
            <div
                className="relative flex items-center justify-center"
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
            >
                {children}
            </div>
        </TooltipContext.Provider>
    );
};

export const TooltipTrigger = ({ children }: { children: React.ReactNode; asChild?: boolean }) => {
    return <>{children}</>;
};

export const TooltipContent = ({ children, side = 'top' }: { children: React.ReactNode; side?: 'top' | 'bottom' | 'left' | 'right' }) => {
    const context = useContext(TooltipContext);
    if (!context?.open) return null;

    const sideClasses = {
        top: "bottom-full mb-4",
        bottom: "top-full mt-4",
        left: "right-full mr-4",
        right: "left-full ml-4",
    };

    const arrowClasses = {
        top: "-bottom-1 left-1/2 -translate-x-1/2",
        bottom: "-top-1 left-1/2 -translate-x-1/2",
        left: "-right-1 top-1/2 -translate-y-1/2",
        right: "-left-1 top-1/2 -translate-y-1/2",
    };

    return (
        <div
            className={cn(
                "absolute px-3 py-1.5 bg-white text-black text-xs font-semibold rounded-md shadow-xl whitespace-nowrap z-50 animate-in fade-in zoom-in-95 duration-200",
                sideClasses[side]
            )}
        >
            {children}
            <div className={cn("absolute w-2 h-2 bg-white rotate-45", arrowClasses[side])} />
        </div>
    );
};
