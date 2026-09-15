import { create } from 'zustand';

type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  toggleTheme: (event?: React.MouseEvent) => void;
  setTheme: (theme: Theme) => void;
}

// Helper to update DOM and localStorage
const applyThemeToDOM = (theme: Theme) => {
  if (typeof window === 'undefined') return;
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  try {
    localStorage.setItem('theme', theme);
  } catch (e) {
    console.error('Failed to save theme to localStorage:', e);
  }
};

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'dark';
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch (e) {
    // ignore
  }
  return 'dark'; // baseline visual identity
};

const playToggleAudio = () => {
  try {
    const audio = new Audio('/Audio/public_audio_toggle-on.MP3');
    audio.volume = 0.15;
    audio.play().catch(() => {});
  } catch {
    // Audio playback not supported or blocked
  }
};

const useThemeStore = create<ThemeState>((set, get) => ({
  theme: getInitialTheme(),

  setTheme: (theme: Theme) => {
    applyThemeToDOM(theme);
    set({ theme });
  },

  toggleTheme: (event?: React.MouseEvent) => {
    const current = get().theme;
    const next: Theme = current === 'dark' ? 'light' : 'dark';

    playToggleAudio();

    // If startViewTransition is not supported, fallback gracefully
    if (typeof document === 'undefined' || !document.startViewTransition) {
      applyThemeToDOM(next);
      set({ theme: next });
      return;
    }

    // Circular ripple transition effect
    const x = event?.clientX ?? window.innerWidth / 2;
    const y = event?.clientY ?? window.innerHeight / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // Add class to disable CSS transitions globally during the view transition
    document.documentElement.classList.add('theme-transitioning');

    const transition = document.startViewTransition(() => {
      applyThemeToDOM(next);
      set({ theme: next });
    });

    transition.finished.finally(() => {
      document.documentElement.classList.remove('theme-transitioning');
    });

    transition.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 400,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            pseudoElement: '::view-transition-new(root)',
          }
        );
      })
      .catch(() => {
        // Fallback safely if animation fails
        applyThemeToDOM(next);
        set({ theme: next });
        document.documentElement.classList.remove('theme-transitioning');
      });
  },
}));

export { useThemeStore };
export default useThemeStore;
