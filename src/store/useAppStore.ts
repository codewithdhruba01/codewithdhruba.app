
import { create } from 'zustand';

interface AppState {
    activeLink: string;
    setActiveLink: (link: string) => void;
}

const useAppStore = create<AppState>((set) => ({
    activeLink: window.location.pathname,
    setActiveLink: (link) => set({ activeLink: link }),
}));

export default useAppStore;
