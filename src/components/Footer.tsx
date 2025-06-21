const Footer = () => {
  return (
    <footer className="py-8 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 <span className="text-white font-semibold">Dhrubaraj Pati</span>. All rights reserved.
          </p>

          <div className="flex space-x-6 text-2xl">
            <a
              href="https://github.com/codewithdhruba01"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#6e5494] transition-transform transform hover:scale-110"
            >
              <i className="fab fa-github"></i>
            </a>

            <a
              href="https://www.linkedin.com/in/dhrubaraj-pati/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#0077B5] transition-transform transform hover:scale-110"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>

            <a
              href="https://x.com/codewithdhruba"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#1DA1F2] transition-transform transform hover:scale-110"
            >
              <i className="fab fa-x-twitter"></i> {/* Updated Font Awesome icon class */}
            </a>

            <a
              href="https://www.instagram.com/dhrubaraj_pati/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#E4405F] transition-transform transform hover:scale-110"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
