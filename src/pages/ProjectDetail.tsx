import { useParams, Link } from 'react-router-dom';
import { projects } from '../constants/projects';
import ScrollReveal from '../components/ui/ScrollReveal';

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#100F0F] text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Project not found</h2>
          <Link to="/projects" className="text-neutral-400 hover:text-white transition-colors">
            Return to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#100F0F] text-white pt-28 md:pt-36 pb-16">
      <div className="max-w-3xl mx-auto w-full px-6">
        <ScrollReveal>
          <Link
            to="/projects"
            className="inline-block text-[#909092] hover:text-white transition-colors text-sm font-hanken mb-12"
          >
            back to projects
          </Link>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-2 md:gap-4 mb-4">
            <h1 className="text-4xl md:text-5xl font-bold font-synonym text-white tracking-tight">
              {project.title.split(' - ')[0]}
            </h1>
            <span className="text-[#737373] text-sm md:text-base font-hanken">
              {project.date}
            </span>
          </div>

          {(project.demo || project.github) && (
            <div className="mb-10">
              <a
                href={project.demo || project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#909092] hover:text-white transition-colors text-sm font-hanken"
              >
                live
              </a>
            </div>
          )}
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-[#909092] leading-relaxed text-[1rem] font-hanken mb-8">
            {project.longDescription || project.description}
          </p>

          {project.image && (
            <div className="mb-8 rounded-xl overflow-hidden border border-neutral-800 bg-[#111]">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity" 
              />
            </div>
          )}

          <div className="flex flex-wrap gap-2 text-[#909092] text-sm font-hanken mb-12">
            {project.tags.map((tag, index) => (
              <span key={index}>{tag.toLowerCase()}</span>
            ))}
          </div>
        </ScrollReveal>

        {project.reflections && (
          <ScrollReveal delay={0.3}>
            <h2 className="text-2xl md:text-3xl font-medium font-synonym text-white mb-4">
              Reflections
            </h2>
            <p className="text-[#909092] leading-relaxed text-[1rem] font-hanken">
              {project.reflections}
            </p>
          </ScrollReveal>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
