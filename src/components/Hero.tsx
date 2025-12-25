import { Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TextGenerateEffect } from '../components/ui/text-generate-effect';
import { ImageCarousel } from '../components/ui/image-carousel';
import {
  GithubIcon,
  LinkedinIcon,
  XIcon,
  InstagramIcon,
  DailydotdevIcon,
  CodepenIcon,
  NewsIcon,
} from '../components/icons/SocialIcons';

const Hero = () => {
  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/assets/Dhrubaraj_Resume.pdf';
    link.download = 'Dhrubaraj_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="home"
      className="
        relative bg-[#0A0A0A] flex items-center overflow-hidden
        pt-24 md:pt-28 pb-12 md:pb-16
      "
      data-aos="fade-up"
    >

      <div
        className="
          relative z-10 max-w-7xl mx-auto w-full px-6
          grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center
        "
      >
        {/* IMAGE CAROUSEL */}
        <div className="order-1 md:order-2 flex justify-center md:justify-end mt-4 md:mt-0">
          <ImageCarousel
            images={[
              "/assets/image2.png",
              "/assets/image2.png",
              "/assets/image1.png",
              "/assets/image2.png",
              "/assets/image2.png",
            ]}
            className="w-full max-w-sm md:max-w-md"
          />
        </div>

        {/* LEFT CONTENT */}
        <div className="order-2 md:order-1 mt-6 md:mt-12">
          <h1 className="font-bold text-white text-4xl font-outfit sm:text-5xl lg:text-5xl leading-tight">
            Frontend engineer, technical writer <br />& open-source Contributor
          </h1>

          <div className="mt-8 text-gray-400 font-synonym text-lg max-w-xl">
            <TextGenerateEffect
              words="I'm Dhrubaraj Pati, a Frontend developer passionate about building scalable web applications, crafting clean user experiences, and contributing to meaningful open-source projects."
              className="[&>div]:justify-start"
            />
          </div>

          <div className="mt-7 flex flex-wrap gap-x-4 gap-y-2 text-gray-300 text-base">
            <a
              href="https://github.com/codewithdhruba01"
              className="group flex items-center gap-2 font-bold text-gray-300"
            >
              <GithubIcon size="18" className="group-hover:fill-white transition-all duration-300 ease-in-out" />
              GitHub
            </a>

            <a
              href="https://x.com/codewithdhruba"
              className="group flex items-center gap-2 font-bold text-gray-300"
            >
              <XIcon size="18" className="group-hover:fill-white transition-all duration-300 ease-in-out" />
              X
            </a>

            <a
              href="https://www.linkedin.com/in/dhrubaraj-pati/"
              className="group flex items-center gap-2 font-bold text-gray-300"
            >
              <LinkedinIcon size="18" className="group-hover:fill-white transition-all duration-300 ease-in-out" />
              LinkedIn
            </a>

            <a
              href="https://www.instagram.com/dhrubaraj_pati/"
              className="group flex items-center gap-2 font-bold text-gray-300"
            >
              <InstagramIcon size="18" className="group-hover:stroke-white transition-all duration-300 ease-in-out" />
              Instagram
            </a>

            <a
              href="https://app.daily.dev/codewithdhruba"
              className="group flex items-center gap-2 font-bold text-gray-300"
            >
              <DailydotdevIcon size="18" className="group-hover:fill-white transition-all duration-300 ease-in-out" />
              Daily.dev
            </a>

            <a
              href="https://forem.com/codewithdhruba"
              className="group flex items-center gap-2 font-bold text-gray-300"
            >
              <NewsIcon size="18" className="group-hover:fill-white transition-all duration-300 ease-in-out" />
              Forem
            </a>

            <a
              href="#"
              className="group flex items-center gap-2 font-bold text-gray-300"
            >
              <CodepenIcon size="18" className="group-hover:stroke-white transition-all duration-300 ease-in-out" />
              Codepen
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
