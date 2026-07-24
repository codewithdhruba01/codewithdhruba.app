import { useEffect, useState } from 'react';
import { Github, Globe, LayoutGrid, List } from 'lucide-react';
import { SectionButton } from '../components/ui/SectionButton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip';
import ScrollReveal from '../components/ui/ScrollReveal';
import CategorySelector from '../components/ui/CategorySelector';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

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
    title: 'GitHub Developer Tools',
    description:
      'Advanced GitHub tools for developers follower analytics, README designer, comparison, and documentation.',
    image: '/project/GithubDevloperTools-cover.png',
    github: 'https://github.com/codewithdhruba01/GithubProtools',
    demo: 'https://githubprotools.vercel.app/',
    tags: ['React', 'Next.js', 'REST API', 'TypeScript', 'Frontend', 'Shadcn', 'Vercel', 'Node.js'],
  },
  {
    id: 3,
    title: 'Outfit Wallpaper Generator',
    description:
      'Outfit Wallpaper Generator is a sleek and interactive tool for creating personalized phone wallpapers in your preferred colors, offering both gradient and solid options.',
    image: '/project/wallpaperapp.png',
    github: 'https://github.com/codewithdhruba01/OutfitWallpaper',
    demo: 'https://outfitwallpaper.vercel.app/',
    tags: ['React', 'Tailwind CSS', 'TypeScript', 'Node.js', 'Vercel', 'Frontend'],
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
    image: '/project/colorkit.png',
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
    title: 'College Fee Payment Portal',
    description:
      'A simple and responsive College Fee Payment Portal built using HTML, CSS, and JavaScript.',
    image: '/project/collegepayment.png',
    github: 'https://github.com/codewithdhruba01/fPortalcollege',
    demo: 'https://codewithdhruba01.github.io/fPortalcollege/',
    tags: ['Html', 'CSS', 'JavaScript', 'Frontend'],
  },
  {
    id: 11,
    title: 'Face Recognition Real-Time',
    description:
      'Real-time Face Attendance System using OpenCV for recognition.',
    image: '/project/facesystem.jpg',
    github: 'https://github.com/codewithdhruba01/FaceRecognitionRealTime',
    tags: ['Python', 'OpenCV', 'cvzone', 'NumPy', 'AI/ML', 'ML'],
  },
  {
    id: 12,
    title: 'ComfortPG-Website',
    description: 'A modern, responsive Paying Guest accommodation website',
    image: '/project/comfortpg.png',
    github: 'https://github.com/codewithdhruba01/ComfortPG_Website',
    demo: 'https://comfort-pg.vercel.app/',
    tags: ['React', 'Tailwind CSS', 'Node.js', 'Motion', 'Frontend', 'TypeScript', 'Vercel'],
  },
];

const getProjectSubtitle = (project: typeof projects[0]) => {
  if (project.title.includes('MultiCalc')) return 'Calculator Application';
  if (project.title.includes('Outfit Wallpaper')) return 'Wallpaper Generator Tool';
  if (project.title.includes('GitHub Developer')) return 'Developer Pro Tools Suite';
  if (project.title.includes('Dictionary')) return 'Dictionary & Vocabulary WebApp';
  if (project.title.includes('Typing Master')) return 'Typing Speed Accuracy App';
  if (project.title.includes('IP Address')) return 'Real-time IP Tracker & Map';
  if (project.title.includes('ColorKit')) return 'Palette Extractor & Theory Tool';
  if (project.title.includes('EmojiHub')) return 'Emoji Search and Copy Engine';
  if (project.title.includes('FlipClock')) return 'Aesthetic Flip Clock Focus Tool';
  if (project.title.includes('College Fee')) return 'Fee Payment Portal Concept';
  if (project.title.includes('Face Recognition')) return 'Real-time Attendance ML Engine';
  if (project.title.includes('ComfortPG')) return 'Paying Guest Booking Portal';

  const categoryTag = project.tags.find(tag => categories.includes(tag)) || 'Web';
  return `${categoryTag} Application`;
};

const SkeletonCard = () => (
  <div className="animate-pulse bg-[#111111] rounded-lg p-5 border border-neutral-800 space-y-4">
    <div className="h-40 bg-[#1b1b1c] rounded-md" />
    <div className="h-4 bg-[#222] rounded w-2/3" />
    <div className="h-3 bg-[#222] rounded w-full" />
    <div className="h-3 bg-[#222] rounded w-5/6" />
    <div className="flex gap-2">
      <div className="h-6 w-16 bg-[#1b1b1c] rounded-full" />
      <div className="h-6 w-20 bg-[#1b1b1c] rounded-full" />
    </div>
  </div>
);

const SkeletonListItem = () => (
  <div className="animate-pulse flex items-center justify-between py-3 border-b border-neutral-900/40 last:border-0 pb-4">
    <div className="flex items-center gap-4 w-full">
      <div className="w-16 h-10 sm:w-20 sm:h-12 bg-[#1b1b1c] rounded-md shrink-0" />
      <div className="flex flex-col gap-2 w-1/2">
        <div className="h-4 bg-[#222] rounded w-1/3" />
        <div className="h-3 bg-[#1b1b1c] rounded w-2/3" />
      </div>
    </div>
    <div className="flex gap-3 shrink-0">
      <div className="h-8 w-8 bg-[#1b1b1c] rounded-full" />
      <div className="h-8 w-8 bg-[#1b1b1c] rounded-full" />
    </div>
  </div>
);

const calculateProjectCategoryCounts = () => {
  const counts: Record<string, number> = {};

  projects.forEach(project => {
    project.tags.forEach(tag => {
      if (categories.includes(tag)) {
        counts[tag] = (counts[tag] || 0) + 1;
      }
    });
  });

  return [
    { name: 'All', count: projects.length },
    ...categories.filter(c => c !== 'All').map(name => ({
      name,
      count: counts[name] || 0
    }))
  ];
};

const projectTags = calculateProjectCategoryCounts();

const AllProjects = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');

  const initialCount = 6;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [selectedCategory, showAll, viewMode]);

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
      <div className="min-h-screen bg-[#0A0A0A] text-white pt-28 md:pt-36 pb-16">
        <div className="max-w-3xl mx-auto w-full px-6">
          <ScrollReveal>
            <div className="text-left mb-10">
              <h2 className="text-3xl md:text-4xl font-bold font-outfit mb-3 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-300">
                Featured Projects
              </h2>
              <p className="text-[#909092] mt-2 font-poppins text-sm md:text-base">
                A showcase of featured projects, built to solve real-world problems and explore new technologies.
              </p>
            </div>
          </ScrollReveal>

          <CategorySelector
            tags={projectTags}
            selectedCategory={selectedCategory}
            onSelectCategory={(category) => {
              setSelectedCategory(category);
              setShowAll(false);
              setLoading(true);
            }}
          />

          {/* Subheader and Switcher Row */}
          <ScrollReveal delay={0.15}>
            <div className="flex items-center justify-between border-b border-neutral-900/60 pb-4 mb-6">
              <p className="text-xl font-bold text-neutral-300 font-outfit">
                All Projects
              </p>

              {/* Layout Switch Toggle */}
              <div className="flex justify-end select-none">
                <div className="flex items-center bg-[#121214]/80 border border-neutral-800/40 p-1.5 rounded-2xl relative h-10 w-20">
                  {/* Slider background */}
                  <motion.div
                    className="absolute top-1 bottom-1 bg-white rounded-xl z-0"
                    initial={false}
                    animate={{
                      left: viewMode === 'card' ? '6px' : '42px',
                      width: '32px',
                    }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  />

                  {/* Grid/Card button */}
                  <button
                    onClick={() => {
                      if (viewMode !== 'card') {
                        setViewMode('card');
                        setLoading(true);
                      }
                    }}
                    className="relative z-10 w-8 h-8 flex items-center justify-center rounded-xl focus:outline-none transition-colors"
                  >
                    <LayoutGrid
                      className={cn(
                        "w-4 h-4 transition-colors duration-200",
                        viewMode === 'card' ? "text-[#0A0A0A]" : "text-neutral-500 hover:text-neutral-300"
                      )}
                    />
                  </button>

                  {/* List button */}
                  <button
                    onClick={() => {
                      if (viewMode !== 'list') {
                        setViewMode('list');
                        setLoading(true);
                      }
                    }}
                    className="relative z-10 w-8 h-8 flex items-center justify-center rounded-xl focus:outline-none transition-colors"
                  >
                    <List
                      className={cn(
                        "w-4 h-4 transition-colors duration-200",
                        viewMode === 'list' ? "text-[#0A0A0A]" : "text-neutral-500 hover:text-neutral-300"
                      )}
                    />
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* AnimatePresence for blur transitions */}
          <AnimatePresence mode="wait">
            <motion.div
              key={viewMode + '-' + selectedCategory + '-' + (showAll ? 'all' : 'sliced') + '-' + loading}
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {loading ? (
                viewMode === 'card' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {Array(showAll ? filteredProjects.length : initialCount)
                      .fill(0)
                      .map((_, i) => <SkeletonCard key={i} />)}
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {Array(showAll ? filteredProjects.length : initialCount)
                      .fill(0)
                      .map((_, i) => <SkeletonListItem key={i} />)}
                  </div>
                )
              ) : viewMode === 'card' ? (
                /* Card / Grid View */
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {visibleProjects.map((project, idx) => (
                    <ScrollReveal key={idx} delay={idx * 0.03}>
                      <div className="group bg-[#111111] rounded-lg cursor-default border border-neutral-800 h-full flex flex-col justify-between">
                        <div>
                          {/* Image with smooth zoom and gradient */}
                          <div className="relative overflow-hidden h-48 rounded-t-lg">
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
                              <h3 className="text-xl font-bold font-synonym text-[#CDCBCD]">
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
                            <p className="text-[#909092] mb-4 leading-relaxed text-sm font-poppins">
                              {project.description}
                            </p>
                          </div>
                        </div>

                        {/* Tech Stack */}
                        <div className="px-6 pb-6 mt-auto">
                          {(() => {
                            const techStack = project.tags?.filter(tag => !categories.includes(tag)) || [];
                            return (
                              <div className="flex items-center gap-3 select-none">
                                <p className="text-[#909092] text-xs font-outfit uppercase tracking-wider shrink-0">Technologies :</p>
                                <div className="flex items-center gap-1.5 overflow-visible">
                                  {techStack.slice(0, 4).map((tech, tagIndex) => {
                                    const Icon = iconMap[tech];
                                    return (
                                      <TooltipProvider key={tagIndex}>
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
                                  {techStack.length > 4 && (
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <div
                                            className="w-5 h-5 flex items-center justify-center transition-all duration-300 hover:scale-125 cursor-pointer"
                                          >
                                            <span className="text-[10px] font-semibold text-neutral-400 hover:text-neutral-200">+{techStack.length - 4}</span>
                                          </div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>{techStack.slice(4).join(', ')}</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  )}
                                </div>
                              </div>
                            );
                          })()}
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              ) : (
                /* List View */
                <div className="flex flex-col gap-4">
                  {visibleProjects.map((project, idx) => (
                    <ScrollReveal key={idx} delay={idx * 0.03}>
                      <div className="group flex items-center justify-between py-3 border-b border-neutral-900/40 last:border-0 pb-4">
                        <div className="flex items-center gap-4">
                          {/* Thumbnail */}
                          <div className="relative w-16 h-10 sm:w-20 sm:h-12 rounded-lg overflow-hidden border border-neutral-850 bg-neutral-950 shrink-0">
                            {/* Gradient Background under image */}
                            <div className="absolute inset-0 opacity-20 bg-[url('/assets/noise.svg')] z-10"></div>
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>

                          {/* Info details */}
                          <div className="flex flex-col">
                            <h3 className="text-base sm:text-lg font-bold font-outfit text-neutral-200 group-hover:text-white transition-colors leading-snug">
                              {project.title}
                            </h3>
                            <p className="text-neutral-500 text-xs sm:text-sm font-poppins mt-0.5">
                              {getProjectSubtitle(project)}
                            </p>
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-3 shrink-0 ml-4">
                          {project.demo && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <a
                                    href={project.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-neutral-500 hover:text-white transition-colors p-1"
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
                                    className="text-neutral-500 hover:text-white transition-colors p-1"
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
                    </ScrollReveal>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Button */}
          {showToggleBtn && !loading && (
            <ScrollReveal delay={0.2} className="flex justify-center mt-10">
              <div>
                <SectionButton
                  onClick={() => {
                    setLoading(true);
                    setShowAll(!showAll);
                  }}
                  text={showAll ? 'Show Less' : 'See More Projects'}
                />
              </div>
            </ScrollReveal>
          )}
        </div>
      </div>
    </>
  );
};

export default AllProjects;
