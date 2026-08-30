import { useParams, Link } from 'react-router-dom';
import { projects } from '../constants/projects';
import ScrollReveal from '../components/ui/ScrollReveal';
import { lazy, Suspense, useMemo } from 'react';
import { Loader2 } from 'lucide-react';

const mdxModules = import.meta.glob('../content/projects/*.mdx');

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  const MdxContent = useMemo(() => {
    const path = `../content/projects/${slug}.mdx`;
    if (mdxModules[path]) {
      return lazy(mdxModules[path] as any);
    }
    return null;
  }, [slug]);

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
                  Live
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
          {project.image && (
            <div className="mb-12 p-1.5 md:p-2.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
              <div className="rounded-xl overflow-hidden border border-white/10 relative bg-black/50">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          )}
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          {MdxContent ? (
            <Suspense fallback={<div className="flex items-center justify-center py-12"><Loader2 className="animate-spin text-neutral-500" /></div>}>
              <div className="mdx-content-container max-w-none">
                <MdxContent 
                  components={{
                    h2: (props: any) => <h2 className="text-2xl md:text-3xl font-bold font-bricolage text-neutral-200 mb-6 border-b border-neutral-800/50 pb-3 mt-12" {...props} />,
                    h3: (props: any) => <h3 className="text-xl font-bold font-bricolage text-neutral-200 mt-8 mb-4" {...props} />,
                    p: (props: any) => <p className="text-[#909092] leading-relaxed text-[1rem] font-hanken mb-4" {...props} />,
                    ul: (props: any) => <ul className="list-disc list-outside ml-5 space-y-3 mb-12 marker:text-[#909092] [&>li::before]:hidden" {...props} />,
                    li: (props: any) => <li className="text-[#909092] leading-relaxed text-[1rem] font-hanken" {...props} />,
                    strong: (props: any) => <strong className="text-white font-medium" {...props} />,
                    a: (props: any) => <a className="text-[#00DC82] hover:text-[#00b368] transition-colors" {...props} />
                  }} 
                />
              </div>
            </Suspense>
          ) : (
            <p className="text-[#909092] font-hanken">Project details coming soon.</p>
          )}
        </ScrollReveal>
      </div>
    </div>
  );
};

export default ProjectDetail;
