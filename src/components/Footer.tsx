import { Github, Linkedin, Twitter, Coffee } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div>
           <h2 className="text-white text-xl font-bold flex items-center space-x-2 mb-2">
            {/* Your Logo */}
              <img src="/logo/logo.png" alt="Logo" className="h-9 w-8" />
             <span  className="h-8 w-8 text-3xl font-outfit text-neutral-200">hrubaraj</span>
           </h2>
           </div>
            <p className="text-gray-400 mb-6 max-w-md font-supreme">
              Discovering the frontiers of coding, algorithms, and AI with hands-on projects, clear guides, and a commitment to making complex concepts accessible to everyone.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/codewithdhruba01" className="p-2 bg-gray-800 hover:bg-gray-200 rounded-lg transition-colors">
                <Github className="w-5 h-5 text-gray-200 hover:text-black" />
              </a>
              <a href="https://www.linkedin.com/in/dhrubaraj-pati/" className="p-2 bg-gray-800 hover:bg-[#0162fe] rounded-lg transition-colors">
                <Linkedin className="w-5 h-5 text-gray-400 hover:text-white" />
              </a>
              <a href="https://x.com/codewithdhruba" className="p-2 bg-gray-800 hover:bg-[#007eb8] rounded-lg transition-colors">
                <Twitter className="w-5 h-5 text-gray-400 hover:text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-1">
              <li><a href="#projects" className="text-gray-400 hover:text-green-400 transition-colors font-poppins">Project</a></li>
              <li><a href="#education" className="text-gray-400 hover:text-green-400 transition-colors font-poppins">Education</a></li>
              <li><a href="#skills" className="text-gray-400 hover:text-green-400 transition-colors font-poppins">Skills</a></li>
              <li><a href="#contributions" className="text-gray-400 hover:text-green-400 transition-colors font-poppins">GitHub Activity</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-4">Pages</h3>
            <ul className="space-y-1">
              <li><a href="/about" className="text-gray-400 hover:text-green-400 transition-colors font-poppins">About</a></li>
              <li><a href="/projects" className="text-gray-400 hover:text-green-400 transition-colors font-poppins">Projects</a></li>
              <li><a href="/blog" className="text-gray-400 hover:text-green-400 transition-colors font-poppins">Blogs</a></li>
              <li><a href="/certificates" className="text-gray-400 hover:text-green-400 transition-colors font-poppins">Achievements</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-green-400 transition-colors font-poppins">Contact Us</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col  justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0 font-satoshi">
            © 2025. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm flex items-center font-satoshi">
            Design & Developed by <Coffee className="w-4 h-4 mx-1 text-[#fcda03]" />Dhrubaraj Pati
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
