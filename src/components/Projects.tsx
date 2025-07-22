import { useState } from 'react';
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      title: 'MultiCalc - Calculator',
      description: 'A comprehensive calculator website with multiple calculator types and a beautiful UI.',
      image: '/blog/thumbnails/calculator.png',
      github: 'https://github.com/codewithdhruba01/MultiCalc',
      demo: 'https://multicalculat.netlify.app/',
    },
    {
      title: 'Outfit Wallpaper Generator',
      description: 'Outfit Wallpaper Generator is a modern, interactive web application.',
      image: '/blog/thumbnails/outfitWallpaper.jpg',
      github: 'https://github.com/codewithdhruba01/OutfitWallpaper',
      demo: 'https://outfitwallpaper.netlify.app/',
    },
    {
      title: 'ComfortPG-Website',
      description: 'A modern, responsive Paying Guest accommodation website built with React, TypeScript, and Tailwind CSS.',
      image: '/blog/thumbnails/pg-website.jpg',
      github: 'https://github.com/codewithdhruba01/ComfortPG_Website',
      demo: 'https://comfort-pg.vercel.app/',
    },
  ];

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>

      <section id="projects" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center" data-aos="fade-up">
            Latest <span className="text-[#00DC82]">Projects</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                onClick={() => setSelectedProject(project)}
                className="bg-[#111111] rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-neutral-400 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex space-x-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text hover:text-[#757475] transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <i className="fab fa-github text-xl"></i>
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text hover:text-[#00DC82] transition-colors"
                      onClick={(e) => e.stopPropagation()}
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

        {/* Modal Overlay */}
        {selectedProject && (
          <div
            className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex flex-col items-center justify-center z-50"
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="bg-[#111111] rounded-lg max-w-lg w-[90%] md:w-full p-6 relative transform transition-all duration-300 ease-out scale-95 opacity-0 animate-fadeIn"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-48 md:h-64 object-cover rounded mb-4"
              />
              <h3 className="text-2xl font-bold mb-2 text-white">
                {selectedProject.title}
              </h3>
              <p className="text-neutral-500 mb-4">{selectedProject.description}</p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-[#f8f8f8] text-[#faf9fa] rounded hover:bg-[#ffffff] hover:text-black transition-all"
                >
                  <i className="fab fa-github mr-2"></i>
                  GitHub
                </a>
                <a
                  href={selectedProject.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-[#00DC82] text-[#00DC82] rounded hover:bg-[#00DC82] hover:text-black transition-all"
                >
                  <i className="fa-solid fa-square-arrow-up-right mr-2"></i>
                  Live Demo
                </a>
              </div>
            </div>

            {/* Centered Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="mt-4 inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#222] text-gray-300 hover:bg-red-500 hover:text-white transition-all"
            >
              <i className="fas fa-times text-lg"></i>
            </button>
          </div>
        )}
      </section>
    </>
  );
};

export default Projects;
