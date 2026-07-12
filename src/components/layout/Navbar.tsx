import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useUIStore from '../../store/useUIStore';
import useAppStore from '../../store/useAppStore';

const Navbar = () => {
  const { isMobileMenuOpen, toggleMobileMenu, setMobileMenuOpen, setCommandPaletteOpen } = useUIStore();
  const { activeLink, setActiveLink } = useAppStore();

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
    { href: '/all-posts', text: 'Blog' },
    { href: '/projects', text: 'Projects' },
    { href: '/photos', text: 'Photos' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#0A0A0A]/80 backdrop-blur-md">
        <div className="max-w-4xl mx-auto w-full px-6">
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
                    className={`px-3 py-1.5 rounded-md transition-all duration-300 font-medium ${activeLink === link.href
                      ? 'text-[#f4f4f4]'
                      : 'text-[#909092] hover:text-[#f4f4f4]'
                      }`}
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Side: Search & Mobile Menu Trigger */}
            <div className="flex items-center gap-4">
              {/* Desktop Search Button */}
              <div className="hidden md:flex items-center">
                <button
                  onClick={() => {
                    setCommandPaletteOpen(true);
                    playClickSound();
                  }}
                  className="pl-3.5 pr-1.5 py-1 rounded-xl bg-[#121214] border border-neutral-800/80 hover:bg-neutral-900 hover:border-neutral-700 transition-all duration-200 flex items-center gap-3 text-sm font-outfit"
                  title="Search (Ctrl+K)"
                >
                  <span className="text-[#909092]">Search</span>
                  <span className="bg-[#202022] text-[#909092] text-[11px] px-2 py-0.5 rounded-md font-sans">
                    Ctrl+K
                  </span>
                </button>
              </div>

              {/* Mobile menu button (remains in the top navbar) */}
              <div className="md:hidden">
                <button
                  onClick={() => {
                    toggleMobileMenu();
                    playClickSound();
                  }}
                  className="text-white hover:text-[#f4f4f4] focus:outline-none transition-transform duration-300 ease-in-out"
                  aria-label="Toggle Menu"
                >
                  <i
                    className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'rotate-90' : 'rotate-0'
                      }`}
                  ></i>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Dropdown (from top navbar) */}
          <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => {
                    setActiveLink(link.href);
                    setMobileMenuOpen(false);
                    playClickSound();
                  }}
                  className={`block px-3 py-2 rounded-md transition-all font-hind duration-300 transform hover:text-[#f4f4f4] ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'} ${activeLink === link.href ? 'text-[#f4f4f4]' : 'text-[#909092]'}`}
                  style={{
                    transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms'
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
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center bg-[#121214]/90 border border-neutral-800/80 backdrop-blur-md rounded-xl shadow-2xl px-3.5 py-1.5 text-xs font-outfit select-none pointer-events-auto">
        <button
          onClick={() => {
            setCommandPaletteOpen(true);
            playClickSound();
          }}
          className="flex items-center gap-2.5 text-[#909092] hover:text-white transition-colors duration-200"
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
          <span className="text-[#909092] font-medium">Search...</span>
          <span className="bg-[#202022] text-[#909092] text-[10px] px-1.5 py-0.5 rounded-md font-sans">
            Ctrl+K
          </span>
        </button>
      </div>
    </>
  );
};

export default Navbar;
