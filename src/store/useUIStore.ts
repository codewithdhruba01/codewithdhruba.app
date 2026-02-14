
import { create } from 'zustand';

interface UIState {
    isMobileMenuOpen: boolean;
    isCommandPaletteOpen: boolean;
    toggleMobileMenu: () => void;
    setMobileMenuOpen: (isOpen: boolean) => void;
    toggleCommandPalette: () => void;
    setCommandPaletteOpen: (isOpen: boolean) => void;
}

const useUIStore = create<UIState>((set) => ({
    isMobileMenuOpen: false,
    isCommandPaletteOpen: false,
    toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
    setMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
    toggleCommandPalette: () => set((state) => ({ isCommandPaletteOpen: !state.isCommandPaletteOpen })),
    setCommandPaletteOpen: (isOpen) => set({ isCommandPaletteOpen: isOpen }),
}));

export default useUIStore;
