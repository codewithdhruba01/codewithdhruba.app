// import React from 'react';

const Hero = () => {
  const handleDownloadCV = () => {
    // Replace 'resume.pdf' with your actual CV file name
    const link = document.createElement('a');
    link.href = '.\src\Assets\dhrubaraj_resume.pdf'; // Path to your CV file
    link.download = 'dhrubaraj_resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 px-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 
          className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6"
          data-aos="fade-up"
        >
          Hi, I'm <span className="text-[#00DC82]">Dhrubaraj</span>
        </h1>
        <p 
          className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-300"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          A Full Stack Developer crafts seamless digital experiences, blending front-end creativity with back-end logic, mastering diverse technologies to build robust, user-friendly, and efficient web applications from start to finish.
        </p>
        <div 
          className="flex flex-col items-center space-y-6"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <div className="flex justify-center space-x-6">
            <a href="https://github.com/codewithdhruba01" target="_blank" rel="noopener noreferrer" className="text-3xl hover:text-[#3C3D37] transition-colors">
              <i className="fa-brands fa-github fa-beat"></i>
            </a>
            <a href="https://www.linkedin.com/in/dhrubaraj-pati/" target="_blank" rel="noopener noreferrer" className="text-3xl hover:text-[#0065F8] transition-colors">
              <i className="fa-brands fa-linkedin fa-fade"></i>
            </a>
            <a href="https://www.instagram.com/dhrubaraj_pati/" target="_blank" rel="noopener noreferrer" className="text-3xl hover:text-[#E53888] transition-colors">
              <i className="fa-brands fa-instagram fa-beat-fade"></i>
            </a>
            <a href="https://x.com/codewithdhruba" target="_blank" rel="noopener noreferrer" className="text-3xl hover:text-[#F1EFEC] transition-colors">
              <i className="fa-solid fa-x fa-beat"></i>
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