import {
  Github,
  Twitter,
  Linkedin,
  Instagram,
  User,
  Download,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { BackgroundLines } from '../components/ui/background-lines';
import { TextGenerateEffect } from '../components/ui/text-generate-effect';

const description = `A Full Stack Developer crafts seamless digital experiences, blending front-end creativity with back-end logic, mastering diverse technologies to build robust, user-friendly, and efficient web applications from start to finish.`;

const Hero = () => {
  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/assets/Dhrubaraj_s_CV.pdf';
    link.download = 'Dhrubaraj_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="home"
      className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center pt-24 pb-16 px-4 bg-[#0A0A0A] overflow-hidden"
    >
      {/* Background Animation */}
      <BackgroundLines
        className="absolute inset-0"
        svgOptions={{ duration: 14 }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center px-2 sm:px-6 lg:px-8">
        {/* Hero Image */}
        <div className="relative w-fit mx-auto mb-6" data-aos="fade-up">
          <img
            src="/assets/cover-image.png"
            alt="Dhrubaraj"
            className="
              mx-auto object-cover rounded-full border-4 border-[#28ad28]
              shadow-md transition-shadow duration-300 hover:shadow-[0_0_20px_#00DC82]
              w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44
            "
          />

          {/* Open To Work Badge */}
          <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 group cursor-pointer select-none">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#202020] flex items-center justify-center shadow-lg group-hover:scale-110 transition-all">
              <div className="w-2.5 h-2.5 bg-[#ffffff] rounded-full"></div>
            </div>

            {/* Tooltip */}
            <div className="absolute top-1/2 left-full ml-2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
              <div className="bg-white text-black dark:bg-gray-900 dark:text-white text-xs px-2.5 py-1 rounded-md shadow-lg border border-gray-300 dark:border-gray-700 whitespace-nowrap">
                Open to Work
              </div>
              <div className="absolute left-[-3px] top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 bg-white dark:bg-gray-900 border-l border-t border-gray-300 dark:border-gray-700"></div>
            </div>
          </div>
        </div>

        {/* Heading */}
        <h1
          className="
            font-extrabold text-white font-synonym mb-4
            text-3xl sm:text-4xl md:text-6xl lg:text-7xl
          "
          data-aos="fade-up"
        >
          Hi, I'm <span className="text-[#209620]">Dhrubaraj</span>
        </h1>

        {/* Description */}
        <div
          className="max-w-2xl mx-auto mb-10 px-2"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          <TextGenerateEffect
            words={description}
            className="
              text-gray-300 dark:text-gray-400
              text-base sm:text-lg md:text-xl
              leading-relaxed
            "
            duration={0.3}
          />
        </div>

        {/* Social Links */}
        <div
          className="flex flex-col items-center space-y-6"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div className="flex space-x-5 sm:space-x-6">
            {[
              {
                href: 'https://x.com/codewithdhruba',
                icon: Twitter,
                label: 'Twitter',
                color: 'hover:text-[#00CAFF]',
              },
              {
                href: 'https://www.linkedin.com/in/dhrubaraj-pati/',
                icon: Linkedin,
                label: 'LinkedIn',
                color: 'hover:text-[#3396D3]',
              },
              {
                href: 'https://www.instagram.com/dhrubaraj_pati/',
                icon: Instagram,
                label: 'Instagram',
                color: 'hover:text-[#E4405F]',
              },
              {
                href: 'https://github.com/codewithdhruba01',
                icon: Github,
                label: 'GitHub',
                color: 'hover:text-[#a7a6a6]',
              },
            ].map(({ href, icon: Icon, label, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group"
              >
                <div
                  className={`p-3 rounded-full border-[2px] border-gray-500 text-gray-400 transition-all duration-300 hover:bg-white/10 hover:scale-110 ${color}`}
                >
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>

                {/* Tooltip */}
                <span className="absolute -top-9 sm:-top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs sm:text-sm text-black bg-white rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                  {label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-4 border-transparent border-t-white"></span>
                </span>
              </a>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-4 font-outfit">
            <button
              onClick={handleDownloadCV}
              className="
                group flex items-center space-x-2 bg-[#00DC82] text-black font-semibold
                py-2.5 px-5 sm:py-3 sm:px-6 rounded-lg transition-all duration-300
                hover:-translate-y-1 hover:shadow-lg hover:shadow-[#00DC82]/80
              "
            >
              <span>Download CV</span>
              <Download className="h-5 w-5 sm:h-6 sm:w-6 group-hover:scale-110 transition-transform" />
            </button>

            <Link
              to="/about"
              className="
                group flex items-center space-x-2 bg-white text-black font-semibold
                py-2.5 px-5 sm:py-3 sm:px-6 rounded-lg transition-all duration-300
                hover:-translate-y-1 hover:shadow-lg hover:shadow-white/50 hover:bg-[#00DC82]/90
              "
            >
              <span>About Me</span>
              <User className="h-5 w-5 sm:h-6 sm:w-6 group-hover:scale-110 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
