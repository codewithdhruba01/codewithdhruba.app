import { useEffect, useState } from 'react';
import { Github, Globe } from 'lucide-react';
import { FancyButton } from '../components/ui/FancyButton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip';

// Import SVG Icons
import ReactIcon from '../components/svgs/ReactIcon';
import TypeScript from '../components/svgs/TypeScript';
import NodeJs from '../components/svgs/NodeJs';
import NextJs from '../components/svgs/NextJs';
import TailwindCss from '../components/svgs/TailwindCss';
import Postman from '../components/svgs/Postman';
import MDXIcon from '../components/svgs/MDXIcon';
import Motion from '../components/svgs/Motion';
import Shadcn from '../components/svgs/Shadcn';
import Vercel from '../components/svgs/Vercel';
import CSS from '../components/svgs/CSS';
import Html from '../components/svgs/Html';
import JavaScript from '../components/svgs/JavaScript';

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
  'CSS': CSS,
  'Html': Html,
  'JavaScript': JavaScript,
};

const categories = [
  'All',
  'Full Stack',
  'Frontend',
  'Mobile App',
  'Bot Development',
  'Game',
  'Utility',
  'AI/ML',
];

const projects = [
  {
    id: 1,
    title: 'MultiCalc - Calculator',
    description:
      'MultiCalc is a simple, fast, and user-friendly online calculator that makes everyday arithmetic easy and accessible for everyone.',
    image: '/project/multicalc1.png',
    github: 'https://github.com/codewithdhruba01/MultiCalc',
    demo: 'https://www.multicalc.site/',
    tags: ['React', 'TypeScript', 'Node.js', 'Full Stack', 'MDX', 'Motion', 'Vercel'],
  },
  {
    id: 2,
    title: 'Outfit Wallpaper Generator',
    description:
      'Outfit Wallpaper Generator is a sleek and interactive tool for creating personalized phone wallpapers in your preferred colors, offering both gradient and solid options.',
    image: '/project/wallpaperapp.png',
    github: 'https://github.com/codewithdhruba01/OutfitWallpaper',
    demo: 'https://outfitwallpaper.vercel.app/',
    tags: ['React', 'Tailwind CSS', 'TypeScript', 'Node.js', 'Vercel', 'Frontend'],
  },
  {
    id: 3,
    title: 'GitHub Developer Tools',
    description:
      'Advanced GitHub tools for developers follower analytics, README designer, comparison, and documentation.',
    image: '/project/GithubDevloperTools-cover.png',
    github: 'https://github.com/codewithdhruba01/GithubProtools',
    demo: 'https://githubprotools.vercel.app/',
    tags: ['React', 'Next.js', 'REST API', 'TypeScript', 'Frontend', 'Shadcn', 'Vercel', 'Node.js'],
  },

  {
    id: 4,
    title: 'Dictionary - WebApp',
    description:
      'A beautifully designed dictionary web app that allows you to look up any English word and explore rich details such as meanings, pronunciations, usage examples, synonyms, and much more.',
    image: '/project/Dictionary-cover.png',
    github: 'https://github.com/codewithdhruba01/Dictionary_Website',
    demo: 'https://dictionary-website-silk.vercel.app/',
    tags: ['React', 'Tailwind CSS', 'TypeScript', 'Node.js', 'Vercel', 'Motion', 'Frontend'],
  },
  {
    id: 5,
    title: 'Typing Master',
    description:
      'A modern, feature-rich typing test application. Test your typing speed and accuracy with customizable settings, real-time statistics, and professional-grade performance tracking.',
    image: '/project/typingmaster-cover.png',
    github: 'https://github.com/codewithdhruba01/TypeMaster',
    demo: 'https://type-master-iota-three.vercel.app/',
    tags: ['React', 'Tailwind CSS', 'TypeScript', 'Motion', 'Node.js', 'Vercel', 'Frontend'],
  },
  {
    id: 6,
    title: 'IP Address Tracker',
    description:
      'A beautiful, modern web application for tracking and locating IP addresses in real-time with an interactive map interface.',
    image: '/project/IPAddressTracker.png',
    github: 'https://github.com/codewithdhruba01/IP-AddressTracker',
    demo: 'https://ip-tracker-cyan-nu.vercel.app/',
    tags: ['React', 'Tailwind CSS', 'TypeScript', 'Node.js', 'Vercel', 'Frontend'],
  },
  {
    id: 7,
    title: 'ColorKit WebApp',
    description:
      'A professional, feature-rich color picker and analysis tool Extract colors from images, generate color palettes, analyze accessibility, and explore color theory with an elegant, animated interface.',
    image: '/project/colorkit-cover.png',
    github: 'https://github.com/codewithdhruba01/ColorPicker',
    demo: 'https://colorskit.vercel.app/',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Motion', 'Shadcn', 'Vercel', 'Node.js'],
  },
  {
    id: 8,
    title: 'EmojiHub WebApp',
    description:
      'A beautiful and fully functional emoji search-and-copy application featuring smooth animations, intuitive interactions, and a modern, polished interface.',
    image: '/project/emojihub-cover.png',
    github: 'https://github.com/codewithdhruba01/EmojiHub',
    demo: 'https://emojihub.vercel.app/',
    tags: ['React', 'Tailwind CSS', 'TypeScript', 'Motion', 'Node.js', 'Vercel', 'Frontend'],
  },
  {
    id: 9,
    title: 'FlipClock - Aesthetic Clock',
    description:
      'A modern, minimal digital clock with an elegant flip animation and a clutter-free interface designed to enhance focus, relaxation, and mindfulness.',
    image: '/project/flipclock-cover.png',
    github: 'https://github.com/codewithdhruba01/FlipClock',
    demo: 'https://flip-clocks.vercel.app/',
    tags: ['Next.js', 'Tailwind CSS', 'TypeScript', 'REST API', 'Motion', 'Shadcn', 'Node.js', 'Vercel', 'Frontend'],
  },
  {
    id: 10,
    title: 'E-Wallet Web App',
    description:
      'An interactive and responsive E-Wallet user interface built using HTML, CSS, and JavaScript.',
    image: '/project/e-wallet.jpg',
    github: 'https://github.com/codewithdhruba01/E-Wallet',
    demo: 'https://codewithdhruba01.github.io/E-Wallet/',
    tags: ['Html', 'CSS', 'JavaScript', 'MDX', 'Frontend'],
  },
  {
    id: 11,
    title: 'College Fee Payment Portal',
    description:
      'A simple and responsive College Fee Payment Portal built using HTML, CSS, and JavaScript.',
    image: '/project/collegepayment.png',
    github: 'https://github.com/codewithdhruba01/fPortalcollege',
    demo: 'https://codewithdhruba01.github.io/fPortalcollege/',
    tags: ['Html', 'CSS', 'JavaScript', 'Frontend'],
  },
  {
    id: 12,
    title: 'Notes App',
    description:
      'A lightweight, responsive note-taking app with Classic UI/UX.',
    image: '/project/zNote.jpg',
    github: 'https://github.com/codewithdhruba01/Znote',
    demo: 'https://codewithdhruba01.github.io/Znote/',
    tags: ['Html', 'CSS', 'JavaScript', 'Full Stack'],
  },
  {
    id: 13,
    title: 'Face Recognition Real-Time',
    description:
      'Real-time Face Attendance System using OpenCV for recognition.',
    image: '/project/facesystem.jpg',
    github: 'https://github.com/codewithdhruba01/FaceRecognitionRealTime',
    tags: ['Python', 'OpenCV', 'cvzone', 'NumPy', 'AI/ML', 'ML'],
  },
  {
    id: 14,
    title: 'Tic Tac Toe Game',
    description:
      'Visually appealing Tic Tac Toe Game built using HTML, CSS, JS.',
    image: '/project/game-project.jpg',
    github: 'https://github.com/codewithdhruba01/tic-tac-toe-game',
    demo: 'https://codewithdhruba01.github.io/tic-tac-toe-game/',
    tags: ['Html', 'CSS', 'JavaScript', 'Game'],
  },
  {
    id: 15,
    title: 'Skill Progress',
    description:
      'Skillber is a simple and extensible CLI tool built with TypeScript.',
    image: '/project/skillsber.jpg',
    github: 'https://github.com/codewithdhruba01/Skillber',
    tags: ['Html', 'CSS', 'JavaScript', 'Frontend'],
  },
  {
    id: 16,
    title: 'Vercual Assistence',
    description:
      'A web-based voice assistant designed to provide an interactive user experience.',
    image: '/project/vercual-ass-project.jpg',
    github: 'https://github.com/codewithdhruba01/Virtual-Assistant-Application',
    demo: 'https://codewithdhruba01.github.io/Virtual-Assistant-Application/',
    tags: ['Html', 'CSS', 'JavaScript', 'Bot Development', 'Full Stack'],
  },
  {
    id: 17,
    title: 'ComfortPG-Website',
    description: 'A modern, responsive Paying Guest accommodation website',
    image: '/project/comfortpg.png',
    github: 'https://github.com/codewithdhruba01/ComfortPG_Website',
    demo: 'https://comfort-pg.vercel.app/',
    tags: ['React', 'Tailwind CSS', 'Node.js', 'Motion', 'Frontend', 'TypeScript', 'Vercel'],
  },
];

const SkeletonCard = () => (
  <div className="animate-pulse bg-[#1a1a1a] rounded-2xl p-5 space-y-4">
    <div className="h-40 bg-[#333] rounded-xl" />
    <div className="h-4 bg-[#444] rounded w-2/3" />
    <div className="h-3 bg-[#444] rounded w-full" />
    <div className="h-3 bg-[#444] rounded w-5/6" />
    <div className="flex gap-2">
      <div className="h-6 w-16 bg-[#333] rounded-full" />
      <div className="h-6 w-20 bg-[#333] rounded-full" />
    </div>
    <div className="h-5 w-16 bg-[#444] rounded" />
  </div>
);

const AllProjects = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

  const initialCount = 6;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [selectedCategory, showAll]);

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((project) => project.tags.includes(selectedCategory));

  const handleImageLoad = (projectId: number) => {
    setLoadedImages(prev => ({ ...prev, [projectId]: true }));
  };

  const visibleProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, initialCount);

  const showToggleBtn = filteredProjects.length > initialCount;

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
      <div
        className="min-h-screen bg-neutral-950 text-white px-4 py-20"
        data-aos="fade-up"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="mb-10"></p>
            <h1 className="text-4xl sm:text-5xl font-bold font-excon mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400">
              Featured Projects
            </h1>
            <p className="text-[#A3A3A3] max-w-2xl mx-auto font-poppins">
              A showcase of my best work across various technologies and domains.
              Each project represents a unique challenge and different aspects of
              my skills.
            </p>
          </div>

          <div className="border-t border-gray-700 max-w-3xl mx-auto mb-12"></div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center font-outfit gap-3 mb-10">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setShowAll(false);
                  setLoading(true);
                }}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${selectedCategory === category
                  ? 'bg-gradient-to-r from-green-600 to-green-900 text-white'
                  : 'bg-[#1A1A1A] text-gray-300 hover:bg-[#333]'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {loading
              ? Array(showAll ? filteredProjects.length : initialCount)
                .fill(0)
                .map((_, i) => <SkeletonCard key={i} />)
              : visibleProjects.map((project, idx) => (
                <div
                  key={idx}
                  className="group bg-[#111111] rounded-lg cursor-default border border-neutral-800"
                >
                  {/* Image with smooth zoom and gradient */}
                  <div className="relative overflow-hidden h-48 rounded-t-lg">
                    {/* Gradient Placeholder with Noise */}
                    <div
                      className={`absolute inset-0 z-10 transition-opacity duration-700 ${loadedImages[project.id] ? 'opacity-0' : 'opacity-100'
                        } ${['bg-gradient-to-br from-blue-900/40 via-neutral-900 to-black',
                          'bg-gradient-to-br from-emerald-900/40 via-neutral-900 to-black',
                          'bg-gradient-to-br from-purple-900/40 via-neutral-900 to-black'][idx % 3]}`}
                    >
                      <div className="absolute inset-0 opacity-20 bg-[url('/assets/noise.svg')]"></div>
                    </div>

                    <img
                      src={project.image}
                      alt={project.title}
                      className={`w-full h-full object-cover transition-all duration-500 hover:scale-110 ${loadedImages[project.id] ? 'blur-0' : 'blur-md'
                        }`}
                      onLoad={() => handleImageLoad(project.id)}
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-bold font-synonym text-white">
                        {project.title}
                      </h3>
                      <div className="flex gap-3">
                        {project.demo && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <a
                                  href={project.demo}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-neutral-400 hover:text-[#00DC82] transition-colors"
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
                        )}

                        {project.github && (
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
                        )}
                      </div>
                    </div>
                    <p className="text-neutral-400 mb-4 leading-relaxed text-sm font-poppins">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-col gap-2 mb-2">
                      <p className="text-neutral-500 text-sm font-outfit">Technologies :</p>
                      <div className="flex flex-wrap gap-1">
                        {project.tags?.filter(tag => !categories.includes(tag)).map((tag, tagIndex) => {
                          const Icon = iconMap[tag];
                          return (
                            <TooltipProvider key={tagIndex}>
                              <Tooltip>
                                <TooltipTrigger>
                                  {Icon ? (
                                    <div
                                      className={`flex items-center justify-center w-6 h-6 rounded-lg text-neutral-400 hover:text-white transition-all duration-300 hover:scale-110 cursor-pointer group/icon ${tag === 'MDX' ? '[&>svg]:w-7 [&>svg]:h-7' : '[&>svg]:w-5 [&>svg]:h-5'}`}
                                    >
                                      <Icon />
                                    </div>
                                  ) : (
                                    <span
                                      className="px-2 py-1 text-xs rounded-full bg-[#1f1f1f] text-[#00DC82] border border-[#00DC82]/40"
                                    >
                                      {tag}
                                    </span>
                                  )}
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{tag}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Button */}
          {showToggleBtn && !loading && (
            <div className="flex justify-center mt-10">
              <FancyButton
                onClick={() => {
                  setLoading(true);
                  setShowAll(!showAll);
                }}
                text={showAll ? 'Show Less' : 'See More Projects'}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllProjects;
