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

        {/* Bucket List Link */}
        <ScrollReveal delay={0.2} className="flex justify-center mt-2">
          <Link
            to="/bucket-list"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#1A1919] border border-neutral-800 rounded-xl text-neutral-300 hover:border-neutral-700 hover:bg-[#222121] transition-all duration-300 group shadow-lg shadow-black/20 text-xs font-semibold font-outfit"
          >
            <span>View My Bucket List</span>

          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
