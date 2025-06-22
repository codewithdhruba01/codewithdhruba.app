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
            className="w-40 h-40 mx-auto mb-6 rounded-full object-cover border-4 border-[#00DC82] shadow-md"
          />
        </div>

        {/* Name Heading */}
        <h1 
          className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 text-white"
          data-aos="fade-up"
        >
          Hi, I'm <span className="text-[#00DC82]">Dhrubaraj</span>
        </h1>

        {/* Description */}
        <p 
          className="text-base md:text-xl text-neutral-400 max-w-6xl md:max-w-6xl lg:max-w-5xl xl:max-w-4xl mb-10"
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
          <div className="flex justify-center space-x-6 text-white text-3xl">
            <a href="https://github.com/codewithdhruba01" target="_blank" rel="noopener noreferrer" className="hover:text-[#6e5494] transition-transform hover:scale-110">
              <i className="fa-brands fa-github fa-beat"></i>
            </a>
            <a href="https://www.linkedin.com/in/dhrubaraj-pati/" target="_blank" rel="noopener noreferrer" className="hover:text-[#0077B5] transition-transform hover:scale-110">
              <i className="fa-brands fa-linkedin fa-fade"></i>
            </a>
            <a href="https://www.instagram.com/dhrubaraj_pati/" target="_blank" rel="noopener noreferrer" className="hover:text-[#E4405F] transition-transform hover:scale-110">
              <i className="fa-brands fa-instagram fa-beat-fade"></i>
            </a>
            <a href="https://x.com/codewithdhruba" target="_blank" rel="noopener noreferrer" className="hover:text-[#1DA1F2] transition-transform hover:scale-110">
              <i className="fa-brands fa-x-twitter fa-beat"></i>
            </a>
          </div>

          <button
            onClick={handleDownloadCV}
            className="group flex items-center space-x-2 bg-[#00DC82] hover:bg-[#00DC82]/90 text-black font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-[#00DC82]/20"
          >
            <span>Download CV</span>
            <i className="fas fa-download group-hover:animate-bounce"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
