// import { useEffect, useState } from 'react';
// import { FaArrowUp} from 'react-icons/fa6';
// import { Github, Heart, Twitter, Linkedin } from 'lucide-react'

// const Footer = () => {
//   const [showButton, setShowButton] = useState(false);

//   useEffect(() => {
//     const toggleVisibility = () => {
//       setShowButton(window.scrollY > 300);
//     };
//     window.addEventListener('scroll', toggleVisibility);
//     return () => window.removeEventListener('scroll', toggleVisibility);
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return (
//     <>
//       <footer className="bg-black text-gray-400">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
//           {/* Left */}
//           <div>
//             <h2 className="text-white text-xl font-bold flex items-center space-x-2 mb-2">
//               {/* Your Logo */}
//               <img src="/logo/logo.png" alt="Logo" className="h-8 w-8" />
//               <span  className="h-6 w-6 text-2xl font-outfit">hrubaraj</span>
//             </h2>
//             <p className=" text-gray-400 font-outfit">Discovering the frontiers of coding, algorithms, and AI with hands-on projects, clear guides, and a commitment to making complex concepts accessible to everyone.</p>
//           </div>

//           {/* Center */}
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <h3 className="text-white font-bold mb-2 text-base">Links</h3>
//               <ul className="space-y-1">
//                 <li><a href="/about" className="hover:text-[#00DC82] font-satoshi text-base">About Us</a></li>
//                 <li><a href="/#projects" className="hover:text-[#00DC82] font-satoshi text-base">Project</a></li>
//                 <li><a href="/#education" className="hover:text-[#00DC82] font-satoshi text-base">Education</a></li>
//                 <li><a href="/#blog" className="hover:text-[#00DC82] font-satoshi text-base">Blogs</a></li>
//                 <li><a href="/certificates" className="hover:text-[#00DC82] font-satoshi text-base">Certificates</a></li>
//                 <li><a href="/#contact" className="hover:text-[#00DC82] font-satoshi text-base">Contact Us</a></li>
//                 <li><a href="/#contributions" className="hover:text-[#00DC82] font-satoshi text-base">GitHub Contributions</a></li>
//               </ul>
//             </div>
//           </div>

//           {/* Right */}
//           <div>
//             <h3 className="text-white font-bold mb-2">Connect Me</h3>
//             <div className="flex space-x-4">
//               <a href="https://x.com/codewithdhruba" className="text-muted-foreground hover:text-foreground">
//                 <Twitter className="h-6 w-6 hover:text-[#00CAFF]" />
//                 <span className="sr-only">Twitter</span>
//               </a>
//               <a href="https://www.linkedin.com/in/dhrubaraj-pati/" className="text-muted-foreground hover:text-foreground">
//                 <Linkedin className="h-6 w-6 hover:text-[#0065F8]" />
//                 <span className="sr-only">Linkedin</span>
//               </a>
//               <a href="https://github.com/codewithdhruba01" className="text-muted-foreground hover:text-foreground">
//                 <Github className="h-6 w-6 hover:text-[#ffffff]" />
//                 <span className="sr-only">GitHub</span>
//               </a>
//             </div>
//           </div>
//         </div>
        

//         {/* Bottom */}
//         <div className="border-t border-gray-800 py-7">
//           <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 font-sans">
//             <p className="font-semibold font-synonym">
//               © 2025 Dhrubaraj Pati All rights reserved.
//             </p>
//             <p className="text-sm text-muted-foreground flex items-center mt-2 md:mt-0 font-satoshi">
//             Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> <span className="text-[#b5b6b8] font-outfit">Dhrubaraj Pati</span>
//           </p>
//           </div>
//         </div>
//       </footer>

//       {/* Back to Top Button */}
//       <button
//         onClick={scrollToTop}
//         className={`fixed bottom-5 right-6 z-50 p-3 rounded-full bg-[#139713b4]  text-white shadow-md hover:bg-[#206320b4] transition-transform duration-300 ${
//           showButton ? 'opacity-100' : 'opacity-0 pointer-events-none'
//         }`}
//         aria-label="Back to Top"
//       >
//         <FaArrowUp />
//       </button>
//     </>
//   );
// };

// export default Footer;


import { Github, Linkedin, Twitter, Heart, Coffee } from 'lucide-react';

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
