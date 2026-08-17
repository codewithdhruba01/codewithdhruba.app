import { Link } from 'react-router-dom';
import { AboutContent } from '../components/about/AboutContent';
import { AboutWorkspace } from '../components/about/AboutWorkspace';
import Skills from '../components/about/Skills';
import ScrollReveal from '../components/ui/ScrollReveal';

export default function AboutMe() {
  return (
    <section
      id="about"
      className="min-h-screen bg-[#100F0F] text-white pt-28 md:pt-36 pb-16"
    >
      <div className="max-w-3xl mx-auto w-full px-6 flex flex-col gap-6 md:gap-10">
        <ScrollReveal delay={0.1}>
          <AboutContent />
        </ScrollReveal>
      </div>

      {/* Skills Section */}
      <Skills />

      <div className="max-w-3xl mx-auto w-full px-6 flex flex-col gap-6 md:gap-10">
        {/* Workspace Section */}
        <AboutWorkspace />

      </div>
    </section>
  );
}
