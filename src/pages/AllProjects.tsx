import { useEffect, useState } from 'react';
import { Github, Globe } from 'lucide-react';

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
    title: 'MultiCalc - Calculator',
    description:
      'A comprehensive calculator website with multiple calculator types and a beautiful UI.',
    image: '/project/multicalc1.png',
    github: 'https://github.com/codewithdhruba01/MultiCalc',
    demo: 'https://multicalculat.netlify.app/',
    tags: ['React', 'TypeScript', 'Node.js', 'Full Stack'],
  },
  {
    title: 'Outfit Wallpaper Generator',
    description:
      'Outfit Wallpaper Generator is a modern, interactive web application.',
    image: '/project/wallpaperapp.png',
    github: 'https://github.com/codewithdhruba01/OutfitWallpaper',
    demo: 'https://outfitwallpaper.netlify.app/',
    tags: ['React', 'TypeScript', 'Frontend'],
  },
  {
    title: 'GitHub Pro Tools',
    description:
      'Advanced GitHub tools for developers follower analytics, README designer, comparison, and documentation.',
    image: '/project/githubprotool.png',
    github: 'https://github.com/codewithdhruba01/GithubProtools',
    demo: 'https://githubprotools.vercel.app/',
    tags: ['React', 'Next.js', 'REST API', 'Frontend'],
  },

  {
    id: 1,
    title: 'Vercual Assistence',
    description:
      'A web-based voice assistant designed to provide an interactive user experience.',
    image: '/project/vercual-ass-project.jpg',
    github: 'https://github.com/codewithdhruba01/Virtual-Assistant-Application',
    demo: 'https://codewithdhruba01.github.io/Virtual-Assistant-Application/',
    tags: ['Bot Development', 'Full Stack'],
  },

  {
    id: 2,
    title: 'ComfortPG-Website',
    description: 'A modern, responsive Paying Guest accommodation website',
    image: '/project/comfortpg.png',
    github: 'https://github.com/codewithdhruba01/ComfortPG_Website',
    demo: 'https://comfort-pg.vercel.app/',
    tags: ['Frontend', 'Next JS', 'Type Script'],
  },

  {
    id: 3,
    title: 'Skill Progress',
    description:
      'Skillber is a simple and extensible CLI tool built with TypeScript.',
    image: '/project/skillsber.jpg',
    github: 'https://github.com/codewithdhruba01/Skillber',
    demo: 'https://github.com/codewithdhruba01/Skillber',
    tags: ['Frontend'],
  },
  {
    id: 4,
    title: 'Weather Forecast App',
    description:
      'A modern weather web app using OpenWeatherMap API with weekly forecast.',
    image: '/project/weather.jpg',
    github: 'https://github.com/codewithdhruba01/realtimeWeather',
    demo: 'https://codewithdhruba01.github.io/realtimeWeather/',
    tags: ['Frontend', 'API'],
  },
  {
    id: 5,
    title: 'College Fee Payment Portal',
    description:
      'A simple and responsive College Fee Payment Portal built using HTML, CSS, and JavaScript.',
    image: '/project/collegepayment.png',
    github: 'https://github.com/codewithdhruba01/fPortalcollege',
    demo: 'https://codewithdhruba01.github.io/fPortalcollege/',
    tags: ['Frontend'],
  },
  {
    id: 6,
    title: 'TerminalV1',
    description: 'This project simulates a Linux terminal interface.',
    image: '/project/terminal.jpg',
    github: 'https://github.com/codewithdhruba01/TerminalV1',
    demo: 'https://terminalv1.netlify.app/',
    tags: ['Utility'],
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
    title: 'My Portfolio',
    description: 'A modern Portfolio web app using Typescript.',
    image: '/project/portfolio.jpg',
    demo: 'https://codewithdhruba.netlify.app/',
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

  const initialCount = 6;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [selectedCategory, showAll]);

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((project) => project.tags.includes(selectedCategory));

  const visibleProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, initialCount);

  const showToggleBtn = filteredProjects.length > initialCount;

  return (
    <div className="min-h-screen bg-neutral-950 text-white px-4 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p className="mb-10"></p>
          <h1 className="text-4xl sm:text-5xl font-bold font-excon mb-4">
            Featured Projects
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto font-poppins">
            A showcase of my best work across various technologies and domains.
            Each project represents a unique challenge and different aspects of
            my skills.
          </p>
        </div>

        <div className="border-t border-gray-700 max-w-3xl mx-auto mb-12"></div>

        {/* Category */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setShowAll(false);
                setLoading(true);
              }}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                selectedCategory === category
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
                  className="bg-neutral-900 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 group border border-[#222]"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition group-hover:scale-105 duration-300 rounded-t-2xl"
                  />
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs mb-4">
                      {project.tags?.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="bg-green-900/30 text-green-400 px-2 py-1 rounded-full"
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
                          className="flex items-center gap-1 px-3 py-1.5 rounded-md text-sm bg-[#292929] hover:bg-[#3a3a3a] text-white transition"
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
                          className="flex items-center gap-1 px-3 py-1.5 rounded-md text-sm bg-green-700 hover:bg-green-600 text-white transition"
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

        {/* Toggle Button */}
        {showToggleBtn && !loading && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => {
                setLoading(true);
                setShowAll(!showAll);
              }}
              className="px-6 py-3 bg-gradient-to-r from-green-700 to-green-900 text-white font-semibold rounded-full hover:scale-105 transition"
            >
              {showAll ? 'Show Less' : 'See More Projects'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProjects;
