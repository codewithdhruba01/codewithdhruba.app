import { useParams, Link } from 'react-router-dom';
import { projects } from '../constants/projects';
import ScrollReveal from '../components/ui/ScrollReveal';
import { useMemo } from 'react';

const mdxModules = import.meta.glob('../content/projects/*.mdx', { eager: true });

const firstHeadingBySlug: Record<string, string> = {
  'college-fee-payment': 'Reflections',
  'clearbg': 'Key Features',
  'colorkit-webapp': 'Key Features',
  'comfortpg-website': 'Reflections',
  'cutting-mat-generator': 'Key Features',
  'dictionary-webapp': 'Key Features',
  'emojihub-webapp': 'Key Features',
  'face-recognition-realtime': 'Features',
  'flipclock': 'Key Features',
  'github-developer-tools': 'Key Features',
  'ip-address-tracker': 'Reflections',
  'multicalc': 'Key Features',
  'outfit-wallpaper-generator': 'Key Features',
  'typing-master': 'Key Features',
  'xmedia': 'Key Features',
};

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  const MdxContent = useMemo(() => {
    const path = `../content/projects/${slug}.mdx`;
    if (mdxModules[path]) {
      return (mdxModules[path] as any).default;
    }
    return null;
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Project not found</h2>
          <Link to="/projects" className="text-muted-foreground hover:text-foreground transition-colors">
            Return to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pt-20 md:pt-28 pb-16">
      <div className="max-w-3xl mx-auto w-full px-6">
        <ScrollReveal>
          <Link
            to="/projects"
            className="inline-block text-muted-foreground hover:text-foreground transition-colors text-sm font-hanken mb-12"
          >
            Back to projects
          </Link>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-2 md:gap-4 mb-4">
            <h1 className="text-4xl md:text-4xl font-bold font-bricolage text-foreground tracking-tight">
              {project.title.split(' - ')[0]}
            </h1>
            <span className="text-muted-foreground text-sm md:text-base font-hanken">
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
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm font-hanken"
                >
                  Live
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm font-hanken"
                >
                  Github
                </a>
              )}
            </div>
          )}
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          {MdxContent ? (
            <div className="mdx-content-container max-w-none">
              <MdxContent
                components={{
                  h2: (props: any) => {
                    const headingText = Array.isArray(props.children) ? props.children.join('') : String(props.children);
                    const expectedFirstHeading = project?.slug ? firstHeadingBySlug[project.slug] || 'Key Features' : 'Key Features';
                    const isFirstHeading = headingText.includes(expectedFirstHeading);

                    return (
                      <>
                        {isFirstHeading && project?.image && (
                          <div className="mb-12 p-1.5 md:p-2.5 rounded-2xl bg-card border border-border backdrop-blur-md shadow-2xl mt-8">
                            <div className="rounded-xl overflow-hidden border border-border relative bg-muted/40">
                              <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity"
                                fetchPriority="high"
                                loading="eager"
                                decoding="async"
                              />
                            </div>
                          </div>
                        )}
                        <h2 className="text-2xl md:text-3xl font-bold font-bricolage text-foreground mb-6 border-b border-border pb-3 mt-12" {...props} />
                      </>
                    );
                  },
                  h3: (props: any) => <h3 className="text-xl font-bold font-bricolage text-foreground mt-8 mb-4" {...props} />,
                  p: (props: any) => <p className="text-muted-foreground leading-relaxed text-[1rem] font-hanken mb-4" {...props} />,
                  ul: (props: any) => <ul className="list-disc list-outside ml-5 space-y-3 mb-12 marker:text-muted-foreground [&>li::before]:hidden" {...props} />,
                  li: (props: any) => <li className="text-muted-foreground leading-relaxed text-[1rem] font-hanken" {...props} />,
                  strong: (props: any) => <strong className="text-foreground font-medium" {...props} />,
                  a: (props: any) => <a className="text-[#00DC82] hover:underline transition-colors" {...props} />
                }}
              />
            </div>
          ) : (
            <p className="text-muted-foreground font-hanken">Project details coming soon.</p>
          )}
        </ScrollReveal>
      </div>
    </div>
  );
};

export default ProjectDetail;
