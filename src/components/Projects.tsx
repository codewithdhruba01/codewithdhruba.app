import { Link } from 'react-router-dom';
import { SectionButton } from './ui/SectionButton';
import ScrollReveal from './ui/ScrollReveal';
import { projects } from '../constants/projects';

const Projects = () => {
  const featuredProjects = projects.slice(0, 2);

  return (
    <section id="projects" className="pt-1 pb-6 md:pb-8 bg-[#100F0F]">
      <div className="max-w-3xl mx-auto w-full px-6">
        <ScrollReveal className="mb-8">
          <h4 className="text-2xl md:text-2xl font-extrabold text-neutral-200 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 text-left font-hanken">
            Projects
          </h4>
        </ScrollReveal>

        <div className="flex flex-col gap-1">
          {featuredProjects.map((project, index) => (
            <ScrollReveal
              key={index}
              delay={index * 0.15}
              className="group"
            >
              <Link
                to={`/projects/${project.slug}`}
                className="block outline-none p-4 -mx-4 rounded-2xl hover:bg-[#1c1c1c] transition-colors duration-300"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-1 md:gap-4 mb-2 md:mb-1">
                  <h3 className="text-xl font-semibold font-hanken text-neutral-200 group-hover:text-white transition-colors duration-200">
                    {project.title.split(' - ')[0]}
                  </h3>
                  <span className="text-neutral-500 text-sm md:text-base font-hanken">
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

        <div className="text-center mt-12">
          <SectionButton to="/projects" text="View All Projects" icon={null} />
        </div>
      </div>
    </section>
  );
};

export default Projects;
