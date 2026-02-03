import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Github, Globe } from 'lucide-react';

type Project = {
  title: string;
  description: string;
  image: string;
  github: string;
  demo: string;
  techStack: string[];
};

const Projects = () => {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => ({ ...prev, [index]: true }));
  };

  const projects: Project[] = [
    {
      title: 'MultiCalc - Calculator',
      description:
        'MultiCalc is a simple, fast, and user-friendly online calculator that makes everyday arithmetic easy and accessible for everyone.',
      image: '/project/multicalc1.png',
      github: 'https://github.com/codewithdhruba01/MultiCalc',
      demo: 'https://www.multicalc.site/',
      techStack: ['React', 'TypeScript', 'Node.js'],
    },
    {
      title: 'ColorKit WebApp',
      description:
        'A professional, feature-rich color picker and analysis tool Extract colors from images, generate color palettes, analyze accessibility.',
      image: '/project/colorkit-cover.png',
      github: 'https://github.com/codewithdhruba01/ColorPicker',
      demo: 'https://colorskit.vercel.app/',
      techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Notion'],
    },
    {
      title: 'GitHub Developer Tools',
      description:
        'Advanced GitHub tools for developers follower analytics, README designer, comparison, and documentation.',
      image: '/project/GithubDevloperTools-cover.png',
      github: 'https://github.com/codewithdhruba01/GithubProtools',
      demo: 'https://githubprotools.vercel.app/',
      techStack: ['React', 'Next.js', 'REST API'],
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

      <section id="projects" className="pt-1 pb-10 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl font-bold mb-4 text-center font-excon text-neutral-200 bg-clip-text font-excon text-transparent bg-gradient-to-b from-white to-neutral-400"
            data-aos="fade-up"
          >
            Latest <span className="text-[#00DC82]">Projects</span>
          </h2>
          <div
            className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#00DC82] to-transparent mx-auto mt-2 mb-12"
            data-aos="fade-up"
          />

          <div className="grid md:grid-cols-3 gap-8" data-aos="fade-up">
            {projects.map((project, index) => (
              <div
                key={index}
                onClick={() => setSelectedProject(project)}
                className="group bg-[#111111] rounded-lg overflow-hidden cursor-pointer border border-neutral-800"
                data-aos="fade-up"
                data-aos-delay={index * 100} /// staggered animation
              >
                {/* Image with smooth zoom */}
                <div className="relative overflow-hidden h-48">
                  {/* Gradient Placeholder with Noise */}
                  <div
                    className={`absolute inset-0 z-10 transition-opacity duration-700 ${loadedImages[index] ? 'opacity-0' : 'opacity-100'
                      } ${['bg-gradient-to-br from-blue-900/40 via-neutral-900 to-black',
                        'bg-gradient-to-br from-emerald-900/40 via-neutral-900 to-black',
                        'bg-gradient-to-br from-purple-900/40 via-neutral-900 to-black'][index % 3]}`}
                  >
                    <div className="absolute inset-0 opacity-20 bg-[url('/assets/noise.svg')]"></div>
                  </div>

                  <img
                    src={project.image}
                    alt={project.title}
                    className={`w-full h-full object-cover transition-all duration-500 hover:scale-110 ${loadedImages[index] ? 'blur-0' : 'blur-md'
                      }`}
                    onLoad={() => handleImageLoad(index)}
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 font-synonym">
                    {project.title}
                  </h3>
                  <p className="text-neutral-400 mb-4 leading-relaxed text-sm font-poppins">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs rounded-full bg-[#1f1f1f] text-[#00DC82] border border-[#00DC82]/40"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex space-x-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-poppins bg-[#292929] hover:bg-[#3a3a3a] text-white transition-colors duration-300 ease-in-out"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-poppins bg-green-700 hover:bg-green-600 text-white transition-colors duration-300 ease-in-out"
                    >
                      <Globe className="w-4 h-4" />
                      Live
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
              className="inline-flex items-center justify-center font-bold font-outfit px-8 py-3 border border-[#00DC82] text-[#00DC82] rounded-lg hover:bg-[#00DC82] hover:text-black transition-all duration-500 ease-in-out"
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
              <h3 className="text-2xl font-bold mb-2 text-white font-synonym">
                {selectedProject.title}
              </h3>
              <p className="text-neutral-500 mb-4 font-poppins text-sm">
                {selectedProject.description}
              </p>

              {/* Tech Stack in Modal */}
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedProject.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs rounded-full bg-[#1f1f1f] text-[#00DC82] border border-[#00DC82]/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-[#f8f8f8] text-[#faf9fa] rounded hover:bg-[#ffffff] hover:text-black transition-all duration-300 ease-in-out font-semibold"
                >
                  <i className="fab fa-github mr-2"></i>
                  GitHub
                </a>
                <a
                  href={selectedProject.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center font-poppins px-4 py-2 border border-[#00DC82] text-[#00DC82] rounded hover:bg-[#00DC82] hover:text-black transition-all duration-300 ease-in-out font-semibold"
                >
                  <i className="fa-solid fa-globe mr-2"></i>
                  Live
                </a>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="mt-4 inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#222] text-gray-300 hover:bg-red-500 hover:text-white transition-all duration-300 ease-in-out"
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
