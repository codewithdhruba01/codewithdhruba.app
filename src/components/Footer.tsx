// import React from 'react';

const Footer = () => {
  return (
    <footer className="py-8 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 mb-4 md:mb-0">
            © 2025 Dhrubaraj Pati. All rights reserved.
          </p>
          
          <div className="flex space-x-6">
            <a href="https://github.com/codewithdhruba01" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#3C3D37] transition-colors">
              <i className="fab fa-github text-xl"></i>
            </a>
            <a href="https://www.linkedin.com/in/dhrubaraj-pati/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#0065F8] transition-colors">
              <i className="fab fa-linkedin-in text-xl"></i>
            </a>
            <a href="https://x.com/codewithdhruba" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#F1EFEC] transition-colors">
              <i className="fab fa-x text-xl"></i>
            </a>
            <a href="https://www.instagram.com/dhrubaraj_pati/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#E53888] transition-colors">
              <i className="fab fa-instagram text-xl"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;