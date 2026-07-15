import { useState } from 'react';
import { Github, Globe } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { SectionButton } from './ui/SectionButton';
import ScrollReveal from './ui/ScrollReveal';

// Import SVG Icons
import ReactIcon from './svgs/ReactIcon';
import TypeScript from './svgs/TypeScript';
import NodeJs from './svgs/NodeJs';
import NextJs from './svgs/NextJs';
import TailwindCss from './svgs/TailwindCss';
import Postman from './svgs/Postman';
import MDXIcon from './svgs/MDXIcon';
import Motion from './svgs/Motion';
import Shadcn from './svgs/Shadcn';
import Vercel from './svgs/Vercel';


const iconMap: Record<string, React.ElementType> = {
  'React': ReactIcon,
  'TypeScript': TypeScript,
  'Node.js': NodeJs,
  'Next.js': NextJs,
  'Tailwind CSS': TailwindCss,
  'REST API': Postman,
  'MDX': MDXIcon,
  'Motion': Motion,
  'Shadcn': Shadcn,
  'Vercel': Vercel,
};

type Project = {
  title: string;
  description: string;
  image: string;
  github: string;
  demo: string;
  techStack: string[];
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => ({ ...prev, [index]: true }));
  };

  const projects: Project[] = [
    {
      title: 'MultiCalc',
      description:
        'MultiCalc is a simple, fast, and user-friendly online calculator that makes everyday arithmetic easy and accessible for everyone.',
      image: '/project/multicalc1.png',
      github: 'https://github.com/codewithdhruba01/MultiCalc',
      demo: 'https://www.multicalc.site/',
      techStack: ['TypeScript', 'React', 'Tailwind CSS', 'Node.js', 'MDX', 'Motion', 'Vercel',],
    },
    {
      title: 'ColorKit WebApp',
      description:
        'A professional, feature-rich color picker and analysis tool Extract colors from images, generate color palettes, analyze accessibility.',
      image: '/project/colorkit-cover.png',
      github: 'https://github.com/codewithdhruba01/ColorPicker',
      demo: 'https://colorskit.vercel.app/',
      techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Motion', 'Shadcn', 'Vercel', 'Node.js'],
    },
    {
      title: 'GitHub Developer Tools',
      description:
        'Advanced GitHub tools for developers follower analytics, README designer, comparison, and documentation.',
      image: '/project/GithubDevloperTools-cover.png',
      github: 'https://github.com/codewithdhruba01/GithubProtools',
      demo: 'https://githubprotools.vercel.app/',
      techStack: ['TypeScript', 'Next.js', 'Tailwind CSS', 'REST API', 'Shadcn', 'Vercel', 'Node.js'],
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

      <section id="projects" className="pt-1 pb-6 md:pb-8 bg-neutral-950">
        <div className="max-w-3xl mx-auto w-full px-6">
          <ScrollReveal className="mb-8">
            <h4 className="text-2xl md:text-2xl font-extrabold text-neutral-200 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 text-left font-hanken">
              Projects
            </h4>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.slice(0, 2).map((project, index) => (
              <ScrollReveal
                key={index}
                delay={index * 0.15}
                className="h-full"
              >
                <div
                  onClick={() => setSelectedProject(project)}
                  className="group bg-[#111111] border border-zinc-800 rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 h-full"
                >
                  {/* Image with smooth zoom */}
                  <div className="relative w-full h-70 overflow-hidden bg-neutral-900">
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
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-bold font-synonym text-[#CDCBCD]">
                        {project.title}
                      </h3>
                      <div className="flex gap-3">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-neutral-400 hover:text-white transition-colors"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Globe className="w-5 h-5" />
                              </a>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>View Website</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-neutral-400 hover:text-white transition-colors"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Github className="w-5 h-5" />
                              </a>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>View GitHub</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                    <p className="text-[#909092] mb-4 leading-relaxed text-sm font-poppins">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex items-center gap-3 mb-2 select-none">
                      <p className="text-[#909092] text-xs font-outfit uppercase tracking-wider shrink-0">Technologies :</p>
                      <div className="flex items-center gap-1.5 overflow-visible">
                        {project.techStack.slice(0, 4).map((tech, i) => {
                          const Icon = iconMap[tech];
                          return (
                            <TooltipProvider key={i}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div
                                    className="w-5 h-5 flex items-center justify-center transition-all duration-300 hover:scale-125 cursor-pointer [&>svg]:w-[17px] [&>svg]:h-[17px] filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:brightness-110"
                                  >
                                    {Icon ? <Icon /> : <span className="text-[9px] font-bold text-neutral-400 hover:text-white">{tech.substring(0, 2)}</span>}
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{tech}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          );
                        })}
                        {project.techStack.length > 4 && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div
                                  className="w-5 h-5 flex items-center justify-center transition-all duration-300 hover:scale-125 cursor-pointer"
                                >
                                  <span className="text-[10px] font-semibold text-neutral-400 hover:text-neutral-200">+{project.techStack.length - 4}</span>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{project.techStack.slice(4).join(', ')}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="text-center mt-12">
            <SectionButton to="/projects" text="View All Projects" />
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
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 font-synonym">
                  {selectedProject.title}
                </h3>
                <div className="flex gap-4">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <a
                          href={selectedProject.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neutral-400 hover:text-white transition-colors"
                        >
                          <Globe className="w-6 h-6" />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View Website</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <a
                          href={selectedProject.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neutral-400 hover:text-white transition-colors"
                        >
                          <Github className="w-6 h-6" />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View GitHub</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <p className="text-neutral-500 mb-4 font-poppins text-sm">
                {selectedProject.description}
              </p>

              {/* Tech Stack in Modal */}
              <div className="flex flex-col gap-2 mb-4">
                <p className="text-neutral-500 text-sm font-outfit">Technologies :</p>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech, i) => {
                    const Icon = iconMap[tech];
                    return (
                      <TooltipProvider key={i}>
                        <Tooltip>
                          <TooltipTrigger>
                            {Icon ? (
                              <div
                                className="w-5 h-5 flex items-center justify-center transition-all duration-300 hover:scale-125 cursor-pointer [&>svg]:w-[17px] [&>svg]:h-[17px] filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:brightness-110"
                              >
                                <Icon />
                              </div>
                            ) : (
                              <span
                                className="px-3 py-1 text-xs rounded-full bg-[#1f1f1f] text-[#00DC82] border border-[#00DC82]/30"
                              >
                                {tech}
                              </span>
                            )}
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{tech}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    );
                  })}
                </div>
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
