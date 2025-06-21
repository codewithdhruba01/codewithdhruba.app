const Projects = () => {
  const projects = [
    {
      title: 'Vercual Assistence',
      description: 'A web-based voice assistant designed to provide an interactive user experience.',
      image: '/blog/thumbnails/vercual-ass-project.jpg',
      github: 'https://github.com/codewithdhruba01/Virtual-Assistant-Application',
      demo: 'https://codewithdhruba01.github.io/Virtual-Assistant-Application/'
    },
    {
      title: 'Outfit Wallpaper Generator',
      description: 'Outfit Wallpaper Generator is a modern, interactive web application that allows users to create personalized phone wallpapers',
      image: '/blog/thumbnails/outfitapp.png',
      github: 'https://github.com/codewithdhruba01/OutfitWallpaper',
      demo: 'https://outfitwallpaper.netlify.app/'
    },
    {
      title: 'Notes App',
      description: 'A lightweight, responsive note-taking app with Classic UI/UX',
      image: '/blog/thumbnails/noteapp.png',
      github: 'https://github.com/codewithdhruba01/Znote',
      demo: 'https://codewithdhruba01.github.io/Znote/'
    }
  ];

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 
          className="text-4xl font-bold mb-12 text-center"
          data-aos="fade-up"
        >
          Projects
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="bg-[#111111] rounded-lg overflow-hidden"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex space-x-4">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text hover:text-[#3C3D37] transition-colors"   //text-3xl hover:text-[#0065F8] transition-colors 00DC82
                  >
                    <i className="fab fa-github text-xl"></i>
                  </a>
                  <a 
                    href={project.demo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text hover:text-[#00DC82] transition-colors"
                  >
                    <i className="fa-solid fa-square-arrow-up-right text-xl"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;