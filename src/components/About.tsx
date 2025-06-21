const About = () => {
  return (
    <section id="about" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 
          className="text-4xl font-bold mb-12 text-center"
          data-aos="fade-up"
        >
          About Me
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div 
            className="space-y-6"
            data-aos="fade-right"
          >
            <p className="text-lg text-gray-300">
              I'm a passionate Full Stack Developer based in India, with a strong focus on creating beautiful and functional web applications.
            </p>
            <p className="text-lg text-gray-300">
              Currently pursuing my BCA in Computer Science and Engineering, I love exploring new technologies and building innovative solutions.
            </p>
            <p className="text-lg text-gray-300">
              Beyond coding, I’m passionate about exploring cutting-edge technologies, actively contributing to open-source communities, and continuously learning about the latest innovations in web development to sharpen my skills and stay ahead in the tech world
            </p>
          </div>
          <div 
            className="relative"
            data-aos="fade-left"
          >
            <div className="w-full h-[400px] bg-gradient-to-r from-[#00DC8] to-[#00DC82]/50 rounded-lg">
              <img
                src="/blog/thumbnails/blog2.jpg"
                alt="Dhrubaraj"
                className="w-full h-full object-cover rounded-lg mix-blend-overlay"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;