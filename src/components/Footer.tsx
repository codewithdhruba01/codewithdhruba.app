import React from 'react';

const Footer = () => {
  return (
    <footer className="py-8 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 mb-4 md:mb-0">
            © 2024 Xanmoy. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="https://github.com/xanmoy" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#00DC82] transition-colors">
              <i className="fab fa-github text-xl"></i>
            </a>
            <a href="https://linkedin.com/in/xanmoy" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#00DC82] transition-colors">
              <i className="fab fa-linkedin text-xl"></i>
            </a>
            <a href="https://twitter.com/xanmoy" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#00DC82] transition-colors">
              <i className="fab fa-twitter text-xl"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;