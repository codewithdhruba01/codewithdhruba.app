import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('/#home'); // default active link

  const navLinks = [
    { href: '/#home', text: 'Home' },
    { href: '/#projects', text: 'Projects' },
    { href: '/#education', text: 'Education' },
    { href: '/#skills', text: 'Skills' },
    { href: '/#contributions', text: 'Contributions' },
    { href: '/#blog', text: 'Blog' },
    { href: '/#contact', text: 'Contact' }
  ];

  return (
    <nav className="fixed w-full z-50 bg-[#0A0A0A]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/#home">
              <img
                src="/logo/logo.png"
                alt="Logo"
                className="h-10 w-auto"
              />
            </a>
          </div>

          {/* Centered Desktop Navigation */}
          <div className="hidden md:flex mx-auto space-x-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setActiveLink(link.href)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  activeLink === link.href
                    ? 'bg-[#00DC82]/20 text-[#00DC82]'
                    : 'text-white hover:bg-[#00DC82]/20 hover:text-[#00DC82]'
                }`}
              >
                {link.text}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-[#00DC82] focus:outline-none"
            >
              <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
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
                className={`block px-3 py-2 rounded-md transition-all duration-300 ${
                  activeLink === link.href
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
    </nav>
  );
};

export default Navbar;