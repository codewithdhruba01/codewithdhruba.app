import { AboutProfile } from '../components/about/AboutProfile';
import { AboutContent } from '../components/about/AboutContent';
import ScrollReveal from '../components/ui/ScrollReveal';

export default function AboutMe() {
  return (
    <section
      id="about"
      className="min-h-screen bg-[#0A0A0A] text-white pt-28 md:pt-36 pb-16"
    >
      <div className="max-w-4xl mx-auto w-full px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="flex flex-col gap-6 md:sticky md:top-32 h-fit">
          <ScrollReveal>
            <AboutProfile />
          </ScrollReveal>
          
          {/* Education Section */}
          <ScrollReveal delay={0.15}>
            <div className="bg-[#101010] border border-neutral-800 rounded-2xl p-6 shadow-lg text-left">
               <h3 className="text-lg font-semibold mb-3 font-synonym text-[#f4f4f4]">Education</h3>
               <div className="flex flex-col gap-1.5">
                   <strong className="text-[#00DC82] font-outfit text-sm font-semibold leading-snug">
                       Bachelor of Computer Application
                   </strong>
                   <span className="font-satoshi text-[#909092] text-xs">
                       Swami Vivekananda University Kolkata
                   </span>
                   <span className="text-[#909092]/80 font-satoshi text-[11px] mt-0.5">
                       2023 - Present
                   </span>
                </div>
            </div>
          </ScrollReveal>
        </div>
        <ScrollReveal delay={0.1} className="md:col-span-2">
          <AboutContent />
        </ScrollReveal>
      </div>
    </section>
  );
}
