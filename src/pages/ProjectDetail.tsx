import { useParams, Link } from 'react-router-dom';
import { projects } from '../constants/projects';
import ScrollReveal from '../components/ui/ScrollReveal';

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
import { Python } from '../components/svgs/Python';
import Figma from '../components/svgs/Figma';
import ExpressJs from '../components/svgs/ExpressJs';

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
  'Python': Python,
  'Figma': Figma,
  'Express.js': ExpressJs,
};

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
            Back to projects
          </Link>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-2 md:gap-4 mb-4">
            <h1 className="text-4xl md:text-4xl font-bold font-bricolage text-neutral-200 tracking-tight">
              {project.title.split(' - ')[0]}
            </h1>
            <span className="text-[#737373] text-sm md:text-base font-hanken">
              {project.date}
            </span>
          </div>

          {(project.demo || project.github) && (
            <div className="flex items-center gap-4 mb-10">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#909092] hover:text-white transition-colors text-sm font-hanken"
                >
                  live
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#909092] hover:text-white transition-colors text-sm font-hanken"
                >
                  Github
                </a>
              )}
            </div>
          )}
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div 
            className="text-[#909092] leading-relaxed text-[1rem] font-hanken mb-8"
            dangerouslySetInnerHTML={{ __html: project.longDescription || project.description }}
          />

          {project.image && (
            <div className="mb-8 p-1.5 md:p-2.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
              <div className="rounded-xl overflow-hidden border border-white/10 relative bg-black/50">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-12">
            {project.tags.map((tag, index) => {
              const Icon = iconMap[tag];
              return (
                <div 
                  key={index} 
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-transparent border border-neutral-800 text-xs font-medium text-neutral-300 transition-colors hover:bg-neutral-900"
                >
                  {Icon && (
                    <div className="w-3.5 h-3.5 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
                      <Icon />
                    </div>
                  )}
                  <span>{tag}</span>
                </div>
              );
            })}
          </div>
        </ScrollReveal>

        {(project.features?.length ? project.features.length > 0 : false) || project.featuresHtml ? (
          <ScrollReveal delay={0.25}>
            <h2 className="text-2xl md:text-3xl font-bold font-bricolage text-neutral-200 mb-6 border-b border-neutral-800/50 pb-3 flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
              Key Features
            </h2>
            {project.featuresHtml ? (
              <div className="mb-12" dangerouslySetInnerHTML={{ __html: project.featuresHtml }} />
            ) : (
              <ul className="list-disc list-outside ml-5 text-[#909092] leading-relaxed text-[1rem] font-hanken space-y-3 mb-12">
                {project.features?.map((feature, idx) => (
                  <li key={idx}>
                    <strong className="text-white font-medium">{feature.title}</strong>: <span dangerouslySetInnerHTML={{ __html: feature.description }} />
                  </li>
                ))}
              </ul>
            )}
          </ScrollReveal>
        ) : null}

        {(project.reflections || project.reflectionsHtml) && (
          <ScrollReveal delay={0.3}>
            <h2 className="text-2xl md:text-3xl font-bold font-bricolage text-neutral-200 mb-6 border-b border-neutral-800/50 pb-3">
              Reflections on the Project
            </h2>
            {project.reflectionsHtml ? (
              <div className="text-[#909092] leading-relaxed text-[1rem] font-hanken" dangerouslySetInnerHTML={{ __html: project.reflectionsHtml }} />
            ) : (
              <p className="text-[#909092] leading-relaxed text-[1rem] font-hanken">
                {project.reflections}
              </p>
            )}
          </ScrollReveal>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
