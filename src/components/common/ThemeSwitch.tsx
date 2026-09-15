import React from 'react';
import { Sun, Moon } from 'lucide-react';
import useThemeStore from '../../store/useThemeStore';

interface ThemeSwitchProps {
  className?: string;
}

export const ThemeSwitch: React.FC<ThemeSwitchProps> = ({ className = '' }) => {
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={(e) => toggleTheme(e)}
      className={`relative p-2 rounded-xl border border-border bg-card hover:bg-accent text-muted-foreground hover:text-foreground transition-all duration-200 flex items-center justify-center cursor-pointer select-none focus:outline-none focus-visible:ring-1 focus-visible:ring-ring ${className}`}
      title={isDark ? 'Switch to Light mode' : 'Switch to Dark mode'}
      aria-label={isDark ? 'Switch to Light mode' : 'Switch to Dark mode'}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {/* Sun Icon for Dark Mode (click to turn Light) */}
        <Sun
          className={`w-4 h-4 transition-all duration-300 absolute ${
            isDark
              ? 'rotate-0 scale-100 opacity-100'
              : '-rotate-90 scale-0 opacity-0'
          }`}
        />
        {/* Moon Icon for Light Mode (click to turn Dark) */}
        <Moon
          className={`w-4 h-4 transition-all duration-300 absolute ${
            isDark
              ? 'rotate-90 scale-0 opacity-0'
              : 'rotate-0 scale-100 opacity-100'
          }`}
        />
      </div>
    </button>
  );
};

export default ThemeSwitch;
