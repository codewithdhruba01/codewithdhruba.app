import { useEffect, useState } from 'react';
import { SectionButton } from '../components/ui/SectionButton';
import ScrollReveal from '../components/ui/ScrollReveal';
import CategorySelector from '../components/ui/CategorySelector';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projects } from '../constants/projects';

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

const SkeletonListItem = () => (
  <div className="animate-pulse flex flex-col gap-2 py-2">
    <div className="flex justify-between items-baseline gap-4">
      <div className="h-5 bg-[#1b1b1c] rounded w-1/3" />
      <div className="h-4 bg-[#1b1b1c] rounded w-16" />
    </div>
    <div className="h-4 bg-[#222] rounded w-full" />
    <div className="h-4 bg-[#222] rounded w-5/6" />
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

  const initialCount = 6;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
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
    <div className="min-h-screen bg-[#100F0F] text-white pt-28 md:pt-36 pb-16">
      <div className="max-w-3xl mx-auto w-full px-6">
        <ScrollReveal>
          <div className="text-left mb-10">
            <h2 className="text-3xl md:text-4xl font-semibold font-bricolage mb-3 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-300">
              Projects
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

        <ScrollReveal delay={0.15}>
          <div className="flex items-center justify-between border-b border-neutral-900/60 pb-4 mb-8 mt-6">
            <p className="text-xl font-bold text-neutral-300 font-outfit">
              All Projects
            </p>
          </div>
        </ScrollReveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory + '-' + (showAll ? 'all' : 'sliced') + '-' + loading}
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {loading ? (
              <div className="flex flex-col gap-1">
                {Array(showAll ? filteredProjects.length : initialCount)
                  .fill(0)
                  .map((_, i) => <SkeletonListItem key={i} />)}
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                {visibleProjects.map((project, idx) => (
                  <ScrollReveal key={idx} delay={idx * 0.05} className="group">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="block outline-none p-4 -mx-4 rounded-2xl hover:bg-[#1c1c1c] transition-colors duration-300"
                    >
                      <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-1 md:gap-4 mb-2 md:mb-1">
                        <h3 className="text-xl font-medium font-synonym text-neutral-200 group-hover:text-white transition-colors duration-200">
                          {project.title.split(' - ')[0]}
                        </h3>
                        <span className="text-neutral-500 text-sm md:text-base font-hanken whitespace-nowrap">
                          {project.date}
                        </span>
                      </div>
                      <p className="text-[#909092] leading-relaxed text-[0.95rem] font-hanken">
                        {project.description}
                      </p>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {showToggleBtn && !loading && (
          <ScrollReveal delay={0.2} className="flex justify-center mt-12">
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
  );
};

export default AllProjects;
