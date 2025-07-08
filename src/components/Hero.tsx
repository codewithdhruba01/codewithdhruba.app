import { Github, Twitter, Linkedin, Instagram, User, Download } from 'lucide-react'
import { Link } from 'react-router-dom'

const Hero = () => {
  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/blog/thumbnails/Dhrubaraj-Resume.pdf'; // Path to your CV file
    link.download = 'dhrubaraj_resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 px-4 bg-[#0A0A0A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Profile Image */}
        <div data-aos="fade-up">
          <img
            src="/blog/thumbnails/hero-cover.png"
            alt="Dhrubaraj"
            className="w-40 h-40 mx-auto mb-6 rounded-full object-cover border-4 border-[#28ad28] shadow-md"
          />
        </div>

        {/* Name Heading */}
        <h1 
          className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 text-white font-sans"
          data-aos="fade-up"
        >
          Hi, I'm <span className="text-[#00DC82] font-sans">Dhrubaraj</span>
        </h1>

        {/* New Subtitle */}
        <p
          className="text-lg md:text-3xl text-neutral-300 max-w-3xl mx-auto mb-6 font-sans"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          Empowering ideas into reality through clean code, creative design, and unwavering passion for technology.
        </p>

        {/* Description */}
        <p 
          className="text-base md:text-xl text-neutral-400 max-w-6xl md:max-w-6xl lg:max-w-5xl xl:max-w-4xl mb-10 font-sans"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          A Full Stack Developer crafts seamless digital experiences, blending front-end creativity with back-end logic, mastering diverse technologies to build robust, user-friendly, and efficient web applications from start to finish.
        </p>

        {/* Social + Button */}
        <div 
          className="flex flex-col items-center space-y-6"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <div>
            <div className="flex space-x-4" data-aos="fade-up">
              <a href="https://x.com/codewithdhruba" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-9 w-9 text-[#00CAFF] hover:text-[#215b69] transition-transform hover:scale-110" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://www.linkedin.com/in/dhrubaraj-pati/" className="text-muted-foreground hover:text-foreground">
                <Linkedin className="h-9 w-9 text-[#2455be] hover:text-[#5093f7] transition-transform hover:scale-110" />
                <span className="sr-only">Linkedin</span>
              </a>
              <a href="https://www.instagram.com/dhrubaraj_pati/" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-10 w-8 text-[#E4405F] hover:text-[#812737] transition-transform hover:scale-110" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://github.com/codewithdhruba01" className="text-muted-foreground hover:text-foreground">
                <Github className="h-9 w-9 hover:text-[#a7a6a6] transition-transform hover:scale-110" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>

           {/* Buttons: Download CV + About Me */}
          <div className="flex flex-wrap justify-center gap-4">
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
