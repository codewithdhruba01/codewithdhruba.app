import {
  Github,
  Twitter,
  Linkedin,
  Instagram,
  User,
  Download,
} from 'lucide-react';
import { Link } from 'react-router-dom';

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
      className="min-h-screen flex items-center justify-center pt-16 px-4 bg-[#0A0A0A]"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div data-aos="fade-up">
          <img
            src="/assets/cover-image.png"
            alt="Dhrubaraj"
            className="w-40 h-40 mx-auto mb-6 rounded-full object-cover border-4 border-[#28ad28] shadow-md transition-shadow duration-300 hover:shadow-[0_0_20px_#00DC82]"
          />
        </div>

        <h1
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 text-white font-synonym"
          data-aos="fade-up"
        >
          Hi, I'm <span className="text-[#209620] font-synonym">Dhrubaraj</span>
        </h1>

        <p
          className="text-xl md:text-xl text-gray-700 dark:text-gray-500 mb-8  font-satoshi"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          A Full Stack Developer crafts seamless digital experiences, blending
          front-end creativity with back-end logic, mastering diverse
          technologies to build robust, user-friendly, and efficient web
          applications from start to finish.
        </p>

        <p
          className="text-base md:text-base text-neutral-500 max-w-6xl md:max-w-6xl lg:max-w-5xl xl:max-w-4xl mb-10 font-outfit"
          data-aos="fade-up"
          data-aos-delay="200"
        ></p>

        <div
          className="flex flex-col items-center space-y-6"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <div className="flex space-x-6">
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
                  className={`p-3 rounded-full border border-gray-500 text-gray-400 transition-all duration-300 hover:bg-white/10 hover:scale-110 ${color}`}
                >
                  <Icon className="h-6 w-6" />
                </div>

                <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-sm text-black bg-white rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                  {label}

                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-4 border-transparent border-t-white"></span>
                </span>
              </a>
            ))}
          </div>

          <div className="flex flex-wrap justify-center font-outfit gap-4">
            <button
              onClick={handleDownloadCV}
              className="group flex items-center space-x-2 bg-[#00DC82] hover:bg-[#fff]/90 text-black font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-[#00DC82]/80"
            >
              <span>Download CV</span>
              <Download className="h-6 w-6 text-[#000000] font-bold transition-transform hover:scale-110" />
            </button>

            <Link
              to="/about"
              className="group flex items-center space-x-2 bg-white text-black hover:bg-[#00DC82]/90 font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-white/50"
            >
              <span>About Me</span>
              <User className="h-6 w-6 text-[#000000] transition-transform hover:scale-110" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
