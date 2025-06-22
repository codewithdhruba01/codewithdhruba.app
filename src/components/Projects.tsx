import { useNavigate } from 'react-router-dom';

type Project = {
  title: string;
  description: string;
  image: string;
  github: string;
  demo: string;
};

const Projects = () => {
  const navigate = useNavigate();

  const projects: Project[] = [
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
      image: '/blog/thumbnails/outfitWallpaper.jpg',
      github: 'https://github.com/codewithdhruba01/OutfitWallpaper',
      demo: 'https://outfitwallpaper.netlify.app/'
    },
    {
      title: 'Notes App',
      description: 'A lightweight, responsive note-taking app with Classic UI/UX',
      image: '/blog/thumbnails/zNote.jpg',
      github: 'https://github.com/codewithdhruba01/Znote',
      demo: 'https://codewithdhruba01.github.io/Znote/'
    }
  ];

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-12 text-center" data-aos="fade-up">
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
                    className="text hover:text-[#6e5494] transition-colors"
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

        {/* View All Projects Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/projects')}
            className="inline-flex items-center justify-center px-8 py-3 border border-[#00DC82] text-[#00DC82] rounded-lg hover:bg-[#00DC82] hover:text-black transition-all duration-300"
          >
            View All Projects
             <i className="fas fa-arrow-right ml-2"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;





// <Link 
//             to="/all-posts"
//             className="inline-flex items-center justify-center px-8 py-3 border border-[#00DC82] text-[#00DC82] rounded-lg hover:bg-[#00DC82] hover:text-black transition-all duration-300"
//           >
//             View All Posts
//             <i className="fas fa-arrow-right ml-2"></i>
//           </Link>
