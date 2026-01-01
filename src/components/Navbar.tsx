import { useState, useEffect } from 'react';
import CommandPalette from './CommandPalette';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('/#home');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Keyboard shortcut for command palette
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        setIsCommandPaletteOpen(true);
      }
      if (event.key === 'Escape') {
        setIsCommandPaletteOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { href: '/about', text: 'About' },
    { href: '/projects', text: 'Projects' },
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
                className={`px-4 py-2 rounded-full transition-all duration-300 ${activeLink === link.href
                  ? 'bg-[#00DC82]/20 text-[#00DC82]'
                  : 'text-gray-300 hover:bg-[#00DC82]/20 hover:text-[#00DC82]'
                  }`}
              >
                {link.text}
              </a>
            ))}
          </div>

          {/* Search Button - Right Side */}
          <div className="hidden md:flex">
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
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
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-[#00DC82] focus:outline-none"
            >
              <i
                className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-2xl`}
              ></i>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => {
                  setActiveLink(link.href);
                  setIsOpen(false);
                }}
                className={`block px-3 py-2 rounded-md transition-all font-hind duration-300 ${activeLink === link.href
                  ? 'bg-[#00DC82]/20 text-[#00DC82]'
                  : 'text-white hover:bg-[#00DC82]/20 hover:text-[#00DC82]'
                  }`}
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
        onClose={() => setIsCommandPaletteOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
