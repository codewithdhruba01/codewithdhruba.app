import VisitorCounter from '../components/VisitorCounter';
import { AboutProfile } from '../components/about/AboutProfile';
import { AboutContent } from '../components/about/AboutContent';

export default function AboutMe() {
  return (
    <section
      id="about"
      className="min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center justify-center px-4 py-20"
      data-aos="fade-up"
    >
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
        <AboutProfile />
        <AboutContent />
      </div>
      <VisitorCounter className="pt-20 pb-10 w-full" />
    </section>
  );
}
