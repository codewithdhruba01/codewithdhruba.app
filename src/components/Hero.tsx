import {
  Github,
  Twitter,
  Linkedin,
  Instagram,
  Download,
} from "lucide-react";
import { Link } from "react-router-dom";
import { BackgroundLines } from "../components/ui/background-lines";

const Hero = () => {
  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = "/assets/Dhrubaraj_s_CV.pdf";
    link.download = "Dhrubaraj_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen bg-[#0A0A0A] flex items-start md:items-center overflow-hidden"
    >
      {/* Background */}
      <BackgroundLines
        className="absolute inset-0"
        svgOptions={{ duration: 14 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12 md:gap-16 items-center">

        {/* ================= RIGHT VISUAL (IMAGE) ================= */}
        <div className="order-1 md:order-2 flex justify-center md:justify-end mt-12 md:mt-0">
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80">

            {/* OUTLINE BOXES */}
            <div className="absolute inset-0 rounded-xl border border-[#00DC82]/40" />
            <div className="absolute inset-4 rounded-xl border border-[#00DC82]/25" />
            <div className="absolute inset-8 rounded-xl border border-[#00DC82]/15" />

            {/* PROFILE IMAGE */}
            <img
              src="/assets/cover-image.png"
              alt="Dhrubaraj"
              className="
                absolute inset-10
                w-[calc(100%-5rem)]
                h-[calc(100%-5rem)]
                object-cover
                rounded-xl
              "
            />
          </div>
        </div>

        {/* ================= LEFT CONTENT ================= */}
        <div className="order-2 md:order-1 mt-6 md:mt-0">
          <h1 className="font-bold text-white text-4xl font-outfit sm:text-5xl lg:text-6xl leading-tight">
            Software engineer, technical writer <br />
            & open-source Contributor
          </h1>

          <p className="mt-5 text-gray-400 font-synonym font-semibold text-lg max-w-xl">
            I'm{" "}
            <span className="text-white font-synonym font-bold">
              Dhrubaraj
            </span>
            , a full stack developer passionate about building scalable web
            applications, crafting clean user experiences, and contributing to
            meaningful open-source projects.
          </p>

          {/* SOCIAL LINKS */}
          <div className="mt-7 flex flex-wrap gap-6 text-gray-300 text-sm">
            <a href="https://github.com/codewithdhruba01" className="flex items-center gap-2 hover:text-white">
              <Github size={18} /> GitHub
            </a>
            <a href="https://x.com/codewithdhruba" className="flex items-center gap-2 hover:text-white">
              <Twitter size={18} /> Twitter
            </a>
            <a href="https://www.linkedin.com/in/dhrubaraj-pati/" className="flex items-center gap-2 hover:text-white">
              <Linkedin size={18} /> LinkedIn
            </a>
            <a href="https://www.instagram.com/dhrubaraj_pati/" className="flex items-center gap-2 hover:text-white">
              <Instagram size={18} /> Instagram
            </a>
          </div>

          {/* BUTTONS */}
          <div className="mt-8 flex flex-wrap gap-4">
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

      </div>
    </section>
  );
};

export default Hero;
