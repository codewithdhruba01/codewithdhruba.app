import {
  Github,
  Twitter,
  Linkedin,
  Instagram,
  Download,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { BackgroundLines } from '../components/ui/background-lines';

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
      className="relative min-h-screen bg-[#0A0A0A] flex items-center overflow-hidden"
    >
      {/* Background */}
      <BackgroundLines
        className="absolute inset-0"
        svgOptions={{ duration: 14 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* ================= LEFT CONTENT ================= */}
        <div data-aos="fade-up">
          <h1 className="font-bold text-white text-4xl font-outfit sm:text-5xl lg:text-6xl leading-tight">
            Software engineer, technical writer <br />
            & open-source Contributor
          </h1>

          <p className="mt-6 text-gray-400 font-synonym font-semibold text-lg max-w-xl">
            I'm{' '}
            <span className="text-white font-synonym font-bold">
              Dhrubaraj
            </span>
            , a full stack developer passionate about building scalable web
            applications, crafting clean user experiences, and contributing to
            meaningful open-source projects.
          </p>

          {/* SOCIAL LINKS */}
          <div className="mt-8 flex flex-wrap gap-6 text-gray-300 text-sm">
            <a
              href="https://github.com/codewithdhruba01"
              target="_blank"
              className="flex items-center gap-2 hover:text-white"
            >
              <Github size={18} /> GitHub
            </a>

            <a
              href="https://x.com/codewithdhruba"
              target="_blank"
              className="flex items-center gap-2 hover:text-white"
            >
              <Twitter size={18} /> Twitter
            </a>

            <a
              href="https://www.linkedin.com/in/dhrubaraj-pati/"
              target="_blank"
              className="flex items-center gap-2 hover:text-white"
            >
              <Linkedin size={18} /> LinkedIn
            </a>

            <a
              href="https://www.instagram.com/dhrubaraj_pati/"
              target="_blank"
              className="flex items-center gap-2 hover:text-white"
            >
              <Instagram size={18} /> Instagram
            </a>
          </div>

          {/* BUTTONS */}
          <div className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={handleDownloadCV}
              className="flex items-center gap-2 bg-[#00DC82] text-black font-semibold px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-[#00DC82]/70 transition"
            >
              <Download size={18} />
              Download CV
            </button>

            <Link
              to="/about"
              className="flex items-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-lg hover:bg-[#00DC82]/90 transition"
            >
              About Me
            </Link>
          </div>
        </div>

        {/* ================= RIGHT VISUAL (PHOTO INSIDE BOX) ================= */}
        <div className="hidden md:flex justify-center items-center">
          <div className="relative w-80 h-80">

            {/* OUTLINE BOXES */}
            <div className="absolute inset-0 rounded-xl border border-[#00DC82]/40" />
            <div className="absolute inset-6 rounded-xl border border-[#00DC82]/25" />
            <div className="absolute inset-12 rounded-xl border border-[#00DC82]/15" />

            {/* PROFILE IMAGE */}
            <img
              src="/assets/cover-image.png"
              alt="Dhrubaraj"
              className="
                absolute inset-[3.5rem]
                w-[calc(100%-7rem)]
                h-[calc(100%-7rem)]
                object-cover
                rounded-xl
                grayscale
                hover:grayscale-0
                transition duration-500
              "
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
