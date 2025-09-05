import { useEffect, useState } from 'react';
import { FaArrowUp} from 'react-icons/fa6';
import { Github, Heart, Twitter, Linkedin } from 'lucide-react'

const Footer = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setShowButton(window.scrollY > 300);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="bg-black text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left */}
          <div>
            <h2 className="text-white text-xl font-bold flex items-center space-x-2 mb-2">
              {/* Your Logo */}
              <img src="/logo/logo.png" alt="Logo" className="h-8 w-8" />
              <span  className="h-6 w-6 text-2xl font-outfit">hrubaraj</span>
            </h2>
            <p className=" text-gray-400 font-outfit">Discovering the frontiers of coding, algorithms, and AI with hands-on projects, clear guides, and a commitment to making complex concepts accessible to everyone.</p>
          </div>

          {/* Center */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-white font-bold mb-2 text-base">Links</h3>
              <ul className="space-y-1">
                <li><a href="/about" className="hover:text-[#00DC82] font-satoshi text-base">About Us</a></li>
                <li><a href="/#projects" className="hover:text-[#00DC82] font-satoshi text-base">Project</a></li>
                <li><a href="/#education" className="hover:text-[#00DC82] font-satoshi text-base">Education</a></li>
                <li><a href="/#blog" className="hover:text-[#00DC82] font-satoshi text-base">Blogs</a></li>
                <li><a href="/certificates" className="hover:text-[#00DC82] font-satoshi text-base">Certificates</a></li>
                <li><a href="/#contact" className="hover:text-[#00DC82] font-satoshi text-base">Contact Us</a></li>
                <li><a href="/#contributions" className="hover:text-[#00DC82] font-satoshi text-base">GitHub Contributions</a></li>
              </ul>
            </div>
          </div>

          {/* Right */}
          <div>
            <h3 className="text-white font-bold mb-2">Connect Me</h3>
            <div className="flex space-x-4">
              <a href="https://x.com/codewithdhruba" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-6 w-6 hover:text-[#00CAFF]" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://www.linkedin.com/in/dhrubaraj-pati/" className="text-muted-foreground hover:text-foreground">
                <Linkedin className="h-6 w-6 hover:text-[#0065F8]" />
                <span className="sr-only">Linkedin</span>
              </a>
              <a href="https://github.com/codewithdhruba01" className="text-muted-foreground hover:text-foreground">
                <Github className="h-6 w-6 hover:text-[#ffffff]" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>
        </div>
        

        {/* Bottom */}
        <div className="border-t border-gray-800 py-7">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 font-sans">
            <p className="font-semibold font-synonym">
              © 2025 Dhrubaraj Pati All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground flex items-center mt-2 md:mt-0 font-satoshi">
            Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> <span className="text-[#b5b6b8] font-outfit">Dhrubaraj Pati</span>
          </p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-5 right-6 z-50 p-3 rounded-full bg-[#139713b4]  text-white shadow-md hover:bg-[#206320b4] transition-transform duration-300 ${
          showButton ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-label="Back to Top"
      >
        <FaArrowUp />
      </button>
    </>
  );
};

export default Footer;
