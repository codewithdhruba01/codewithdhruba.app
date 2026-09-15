import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useUIStore from '../../store/useUIStore';
import useAppStore from '../../store/useAppStore';
import ThemeSwitch from '../common/ThemeSwitch';

const Navbar = () => {
  const location = useLocation();
  const { isMobileMenuOpen, toggleMobileMenu, setMobileMenuOpen, setCommandPaletteOpen } = useUIStore();
  const { setActiveLink } = useAppStore();

  const isBlogContentPage = (location.pathname.startsWith('/blog/') && location.pathname !== '/blog') || location.pathname.startsWith('/thoughts/');

  // Play click audio sound from public/Audio/
  const playClickSound = () => {
    const audio = new Audio('/Audio/link_sound.mp3');
    audio.volume = 0.1; // Lower volume for a very soft and pleasant click
    audio.play().catch((err) => console.log('Audio play blocked or failed:', err));
  };

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
    { href: '/', text: 'Home' },
    { href: '/experience', text: 'Work' },
    { href: '/blog', text: 'Blog' },
    { href: '/projects', text: 'Projects' },
    { href: '/photos', text: 'Gallery' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md transition-colors duration-200">
        <div className="max-w-3xl mx-auto w-full px-6">
          <div className="flex justify-between items-center h-16">
            {/* Left: Logo & Links */}
            <div className="flex items-center gap-8">
              <div className="flex-shrink-0">
                <Link to="/" onClick={playClickSound}>
                  <img src="/assets/logo.png" alt="Logo" className="h-9 w-auto" />
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-1 font-outfit text-sm">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => {
                      setActiveLink(link.href);
                      playClickSound();
                    }}
                    className="px-3 py-1.5 rounded-md transition-all duration-300 font-medium text-muted-foreground hover:text-foreground"
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Side: Search, ThemeSwitch & Mobile Menu Trigger */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Desktop Search Button */}
              <div className="hidden md:flex items-center">
                <button
                  onClick={() => {
                    setCommandPaletteOpen(true);
                    playClickSound();
                  }}
                  className="pl-3.5 pr-1.5 py-1 rounded-xl bg-card border border-border hover:bg-accent transition-all duration-200 flex items-center gap-3 text-sm font-outfit shadow-sm"
                  title="Search (Ctrl+K)"
                >
                  <span className="text-muted-foreground">Search</span>
                  <span className="bg-muted text-muted-foreground text-[11px] px-2 py-0.5 rounded-md font-sans border border-border/40">
                    Ctrl+K
                  </span>
                </button>
              </div>

              {/* Theme Toggle Button */}
              <ThemeSwitch />

              {/* Mobile menu button (remains in the top navbar) */}
              <div className="md:hidden">
                <button
                  onClick={() => {
                    toggleMobileMenu();
                    playClickSound();
                  }}
                  className="p-1.5 rounded-lg text-foreground hover:text-foreground/80 focus:outline-none transition-transform duration-300 ease-in-out"
                  aria-label="Toggle Menu"
                >
                  <i
                    className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl transition-transform duration-300 ease-in-out ${
                      isMobileMenuOpen ? 'rotate-90' : 'rotate-0'
                    }`}
                  ></i>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Dropdown (from top navbar) */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-b border-border/40 ${
              isMobileMenuOpen ? 'max-h-96 opacity-100 py-3' : 'max-h-0 opacity-0 py-0'
            }`}
          >
            <div className="px-2 space-y-1">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => {
                    setActiveLink(link.href);
                    setMobileMenuOpen(false);
                    playClickSound();
                  }}
                  className={`block px-3 py-2 rounded-md transition-all font-hind duration-300 transform text-muted-foreground hover:text-foreground hover:bg-accent ${
                    isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                  }`}
                  style={{
                    transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms',
                  }}
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Floating Search Bar (Clean search-only pill) */}
      {!isBlogContentPage && (
        <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 bg-card/95 border border-border backdrop-blur-md rounded-xl shadow-2xl px-3 py-1.5 text-xs font-outfit select-none pointer-events-auto">
          <button
            onClick={() => {
              setCommandPaletteOpen(true);
              playClickSound();
            }}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <span className="text-muted-foreground font-medium">Search...</span>
            <span className="bg-muted text-muted-foreground text-[10px] px-1.5 py-0.5 rounded-md font-sans border border-border/40">
              Ctrl+K
            </span>
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
