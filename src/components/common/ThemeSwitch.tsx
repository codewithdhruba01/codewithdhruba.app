import React from 'react';
import { Sun, Moon } from 'lucide-react';
import useThemeStore from '../../store/useThemeStore';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '../ui/tooltip';

interface ThemeSwitchProps {
  className?: string;
}

export const ThemeSwitch: React.FC<ThemeSwitchProps> = ({ className = '' }) => {
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === 'dark';

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={(e) => toggleTheme(e)}
            className={`relative p-2 rounded-lg bg-transparent text-muted-foreground hover:bg-accent transition-all duration-200 flex items-center justify-center cursor-pointer select-none outline-none focus:outline-none focus:ring-0 ${className}`}
            aria-label={isDark ? 'Switch to Light mode' : 'Switch to Dark mode'}
          >
            <div className="relative w-4 h-4 flex items-center justify-center">
              {/* Sun Icon for Dark Mode (click to turn Light) */}
              <Sun
                className={`w-5 h-5 transition-all duration-300 absolute ${
                  isDark
                    ? 'rotate-0 scale-100 opacity-100'
                    : '-rotate-90 scale-0 opacity-0'
                }`}
              />
              {/* Moon Icon for Light Mode (click to turn Dark) */}
              <Moon
                className={`w-5 h-5 transition-all duration-300 absolute ${
                  isDark
                    ? 'rotate-90 scale-0 opacity-0'
                    : 'rotate-0 scale-100 opacity-100'
                }`}
              />
            </div>
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          {isDark ? 'Switch to Light mode' : 'Switch to Dark mode'}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ThemeSwitch;
