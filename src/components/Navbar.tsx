import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/#home', text: 'Home' },
    { href: '/#about', text: 'About' },
    { href: '/#education', text: 'Education' },
    { href: '/#skills', text: 'Skills' },
    { href: '/#projects', text: 'Projects' },
    { href: '/#contributions', text: 'Contributions' },
    { href: '/#blog', text: 'Blog' },
    { href: '/#contact', text: 'Contact' }
  ];

  return (
    <nav className="fixed w-full z-50 bg-[#0A0A0A]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <a href="/#about">
              <img
                src="/logo/logo.png"
                alt="Logo"
                className="h-10 w-auto"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-white hover:text-[#00DC82] px-3 py-2 transition-colors"
                >
                  {link.text}
                </a>
              ))}
            </div>
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
                className="text-white hover:text-[#00DC82] block px-3 py-2 transition-colors"
                onClick={() => setIsOpen(false)}
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