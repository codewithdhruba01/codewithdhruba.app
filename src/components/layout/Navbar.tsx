import { useEffect } from 'react';
import CommandPalette from '../CommandPalette';
import useUIStore from '../../store/useUIStore';
import useAppStore from '../../store/useAppStore';

const Navbar = () => {
  const { isMobileMenuOpen, toggleMobileMenu, setMobileMenuOpen, isCommandPaletteOpen, setCommandPaletteOpen } = useUIStore();
  const { activeLink, setActiveLink } = useAppStore();

  // Keyboard shortcut for command palette
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        setCommandPaletteOpen(true);
      }
      if (event.key === 'Escape') {
        setCommandPaletteOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleLocationChange = () => {
      setActiveLink(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);

    handleLocationChange();

    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const navLinks = [
    { href: '/about', text: 'About' },
    { href: '/projects', text: 'Projects' },
    { href: '/photos', text: 'Photos' },
    { href: '/all-posts', text: 'Blog' },
    { href: '/certificates', text: 'Certificates' },
    { href: '/contact', text: 'Contact' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-[#0A0A0A]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/">
              <img src="/logo/logo.png" alt="Logo" className="h-10 w-auto" />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex mx-auto space-x-2 font-hind">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setActiveLink(link.href)}
                className={`px-3 py-1.5 rounded-md transition-all duration-300 ${activeLink === link.href
                  ? 'bg-[#00DC82]/20 text-[#ffffff]'
                  : 'text-[#E5E5E5] hover:bg-[#00DC82]/20 hover:text-[#00DC82]'
                  }`}
              >
                {link.text}
              </a>
            ))}
          </div>

          {/* Search Button - Right Side */}
          <div className="hidden md:flex">
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="px-3 py-1.5 rounded-full bg-neutral-800/50 border border-neutral-700 text-neutral-300 hover:bg-neutral-700/50 hover:border-neutral-600 transition-all duration-200 flex items-center gap-2 text-sm"
              title="Search (Ctrl+K)"
            >
              <span>Search</span>
              <span className="text-neutral-500 text-xs bg-neutral-700/50 px-1.5 py-0.5 rounded border border-neutral-600/50">
                Ctrl+K
              </span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white hover:text-[#00DC82] focus:outline-none transition-transform duration-300 ease-in-out"
            >
              <i
                className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'rotate-90' : 'rotate-0'
                  }`}
              ></i>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => {
                  setActiveLink(link.href);
                  setMobileMenuOpen(false);
                }}
                className={`block px-3 py-2 rounded-md transition-all font-hind duration-300 transform ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                  }`}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms'
                }}
              >
                {link.text}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onNavigate={setActiveLink}
      />
    </nav>
  );
};

export default Navbar;
