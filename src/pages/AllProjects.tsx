import { useEffect, useState } from 'react';
import { Github, Globe } from 'lucide-react';
import { FancyButton } from '../components/ui/FancyButton';

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
    tags: ['React', 'TypeScript', 'Node.js', 'Full Stack'],
  },
  {
    id: 2,
    title: 'Outfit Wallpaper Generator',
    description:
      'Outfit Wallpaper Generator is a sleek and interactive tool for creating personalized phone wallpapers in your preferred colors, offering both gradient and solid options.',
    image: '/project/wallpaperapp.png',
    github: 'https://github.com/codewithdhruba01/OutfitWallpaper',
    demo: 'https://outfitwallpaper.vercel.app/',
    tags: ['React', 'Tailwind CSS', 'TypeScript', 'Frontend'],
  },
  {
    id: 3,
    title: 'GitHub Developer Tools',
    description:
      'Advanced GitHub tools for developers follower analytics, README designer, comparison, and documentation.',
    image: '/project/GithubDevloperTools-cover.png',
    github: 'https://github.com/codewithdhruba01/GithubProtools',
    demo: 'https://githubprotools.vercel.app/',
    tags: ['React', 'Next.js', 'REST API', 'Frontend'],
  },

  {
    id: 4,
    title: 'Dictionary - WebApp',
    description:
      'A beautifully designed dictionary web app that allows you to look up any English word and explore rich details such as meanings, pronunciations, usage examples, synonyms, and much more.',
    image: '/project/Dictionary-cover.png',
    github: 'https://github.com/codewithdhruba01/Dictionary_Website',
    demo: 'https://dictionary-website-silk.vercel.app/',
    tags: ['Next.js', 'Tailwind CSS', 'Frontend'],
  },
  {
    id: 2,
    title: 'Typing Master',
    description:
      'A modern, feature-rich typing test application. Test your typing speed and accuracy with customizable settings, real-time statistics, and professional-grade performance tracking.',
    image: '/project/typingmaster-cover.png',
    github: 'https://github.com/codewithdhruba01/TypeMaster',
    demo: 'https://type-master-iota-three.vercel.app/',
    tags: ['React', 'Tailwind CSS', 'Frontend'],
  },
  {
    id: 3,
    title: 'IP Address Tracker',
    description:
      'A beautiful, modern web application for tracking and locating IP addresses in real-time with an interactive map interface.',
    image: '/project/IPAddressTracker.png',
    github: 'https://github.com/codewithdhruba01/IP-AddressTracker',
    demo: 'https://ip-tracker-cyan-nu.vercel.app/',
    tags: ['React.js', 'Tailwind CSS', 'Frontend'],
  },
  {
    id: 4,
    title: 'ColorKit WebApp',
    description:
      'A professional, feature-rich color picker and analysis tool Extract colors from images, generate color palettes, analyze accessibility, and explore color theory with an elegant, animated interface.',
    image: '/project/colorkit-cover.png',
    github: 'https://github.com/codewithdhruba01/ColorPicker',
    demo: 'https://colorskit.vercel.app/',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Notion'],
  },
  {
    id: 5,
    title: 'EmojiHub WebApp',
    description:
      'A beautiful and fully functional emoji search-and-copy application featuring smooth animations, intuitive interactions, and a modern, polished interface.',
    image: '/project/emojihub-cover.png',
    github: 'https://github.com/codewithdhruba01/EmojiHub',
    demo: 'https://emojihub.vercel.app/',
    tags: ['Next.js', 'Tailwind CSS', 'Frontend'],
  },
  {
    id: 6,
    title: 'FlipClock - Aesthetic Clock',
    description:
      'A modern, minimal digital clock with an elegant flip animation and a clutter-free interface designed to enhance focus, relaxation, and mindfulness.',
    image: '/project/flipclock-cover.png',
    github: 'https://github.com/codewithdhruba01/FlipClock',
    demo: 'https://flip-clocks.vercel.app/',
    tags: ['Next.js', 'Tailwind CSS', 'shadcn', 'Frontend'],
  },
  {
    id: 7,
    title: 'E-Wallet Web App',
    description:
      'An interactive and responsive E-Wallet user interface built using HTML, CSS, and JavaScript.',
    image: '/project/e-wallet.jpg',
    github: 'https://github.com/codewithdhruba01/E-Wallet',
    demo: 'https://codewithdhruba01.github.io/E-Wallet/',
    tags: ['Frontend'],
  },
  {
    id: 8,
    title: 'College Fee Payment Portal',
    description:
      'A simple and responsive College Fee Payment Portal built using HTML, CSS, and JavaScript.',
    image: '/project/collegepayment.png',
    github: 'https://github.com/codewithdhruba01/fPortalcollege',
    demo: 'https://codewithdhruba01.github.io/fPortalcollege/',
    tags: ['Frontend'],
  },
  {
    id: 9,
    title: 'Notes App',
    description:
      'A lightweight, responsive note-taking app with Classic UI/UX.',
    image: '/project/zNote.jpg',
    github: 'https://github.com/codewithdhruba01/Znote',
    demo: 'https://codewithdhruba01.github.io/Znote/',
    tags: ['Full Stack'],
  },
  {
    id: 10,
    title: 'Face Recognition Real-Time',
    description:
      'Real-time Face Attendance System using OpenCV for recognition.',
    image: '/project/facesystem.jpg',
    github: 'https://github.com/codewithdhruba01/FaceRecognitionRealTime',
    tags: ['AI/ML'],
  },
  {
    id: 11,
    title: 'Tic Tac Toe Game',
    description:
      'Visually appealing Tic Tac Toe Game built using HTML, CSS, JS.',
    image: '/project/game-project.jpg',
    github: 'https://github.com/codewithdhruba01/tic-tac-toe-game',
    demo: 'https://codewithdhruba01.github.io/tic-tac-toe-game/',
    tags: ['Game'],
  },
  {
    id: 12,
    title: 'Skill Progress',
    description:
      'Skillber is a simple and extensible CLI tool built with TypeScript.',
    image: '/project/skillsber.jpg',
    github: 'https://github.com/codewithdhruba01/Skillber',
    tags: ['HTML', 'CSS', 'Frontend'],
  },
  {
    id: 13,
    title: 'Vercual Assistence',
    description:
      'A web-based voice assistant designed to provide an interactive user experience.',
    image: '/project/vercual-ass-project.jpg',
    github: 'https://github.com/codewithdhruba01/Virtual-Assistant-Application',
    demo: 'https://codewithdhruba01.github.io/Virtual-Assistant-Application/',
    tags: ['Bot Development', 'Full Stack'],
  },
  {
    id: 14,
    title: 'ComfortPG-Website',
    description: 'A modern, responsive Paying Guest accommodation website',
    image: '/project/comfortpg.png',
    github: 'https://github.com/codewithdhruba01/ComfortPG_Website',
    demo: 'https://comfort-pg.vercel.app/',
    tags: ['Frontend', 'Next JS', 'Type Script'],
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
          <p className="text-gray-400 max-w-2xl mx-auto font-poppins">
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
                className="group bg-[#111111] rounded-lg overflow-hidden cursor-pointer border border-neutral-800"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className={`w-full h-48 object-cover transition-all duration-500 hover:scale-110 ${loadedImages[project.id] ? 'blur-0' : 'blur-md'
                    }`}
                  onLoad={() => handleImageLoad(project.id)}
                />
                <div className="p-5">
                  <h3 className="text-xl font-bold font-synonym mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 font-poppins">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs mb-4">
                    {project.tags?.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-green-900/30 text-green-400 px-2 py-1 rounded-full font-poppins"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-1.5 font-poppins rounded-md text-sm bg-[#292929] hover:bg-[#3a3a3a] text-white transition"
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 font-poppins px-3 py-1.5 rounded-md text-sm bg-green-700 hover:bg-green-600 text-white transition"
                      >
                        <Globe className="w-4 h-4" />
                        Live
                      </a>
                    )}
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
  );
};

export default AllProjects;
