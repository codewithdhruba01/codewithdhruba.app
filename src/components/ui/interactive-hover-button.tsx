import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "../../lib/utils";

interface InteractiveHoverButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string;
    circleClassName?: string;
}

export const InteractiveHoverButton = React.forwardRef<
    HTMLButtonElement,
    InteractiveHoverButtonProps
>(({ text = "Button", className, circleClassName, children, ...props }, ref) => {
    return (
        <button
            ref={ref}
            className={cn(
                "group relative w-auto cursor-pointer overflow-hidden rounded-full border bg-background py-2 px-6 text-center font-semibold",
                className
            )}
            {...props}
        >
            {/* Background Layer: Expansion Circle */}
            <div className={cn(
                "absolute left-[22px] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#00DC82] transition-all duration-500 ease-in-out group-hover:left-1/2 group-hover:scale-[100.8] group-hover:-translate-x-1/2",
                circleClassName
            )}></div>

            {/* Width Spacer: Ensures the button is wide enough for the hover content */}
            <div className="invisible flex items-center justify-center gap-1.5">
                <span className="inline-block">{children || text}</span>
                <ArrowRight size={16} />
            </div>

            {/* Default State: Content that slides out on hover */}
            <div className="absolute inset-0 z-10 flex items-center justify-center gap-1.5 transition-all duration-500 ease-in-out group-hover:translate-x-12 group-hover:opacity-0 pl-[18px]">
                <span className="inline-block">
                    {children || text}
                </span>
            </div>

            {/* Hover State: Absolute container for perfect centering */}
            <div className="absolute inset-0 z-20 flex items-center justify-center gap-2 opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-100">
                <span className="text-black">{children || text}</span>
                <ArrowRight size={16} className="text-black" />
            </div>
        </button>
    );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";
