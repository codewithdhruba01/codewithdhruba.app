import { Settings, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollReveal from './ui/ScrollReveal';
import BrandCursorIcon from './svgs/BrandCursorIcon';

const GetInTouch = () => {
  return (
    <section id="development" className="pt-4 pb-8 bg-neutral-950">
      <div className="max-w-3xl mx-auto w-full px-6">
        {/* Heading */}
        <ScrollReveal className="mb-8">
          <h4 className="text-2xl md:text-2xl font-extrabold text-neutral-200 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 text-left font-hanken">
            Development
          </h4>
        </ScrollReveal>

        {/* Cards */}
        <div className="flex flex-col gap-4">
          {/* Tools & Gears */}
          <ScrollReveal delay={0.1}>
            <Link
              to="/gears"
              className="group flex items-center justify-between w-full p-5 rounded-xl border border-neutral-800 bg-[#101010] transition-all duration-300 hover:bg-neutral-900"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="min-w-10 min-h-10 w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center shrink-0">
                  <Settings className="w-5 h-5 text-white" />
                </div>

                <div className="min-w-0">
                  <h3 className="text-neutral-100 font-semibold font-outfit whitespace-nowrap">
                    Tools & Gears
                  </h3>
                  <p className="text-sm text-[#909092] font-poppins leading-snug break-words">
                    Productivity tools and gears that power my workflow.
                  </p>
                </div>
              </div>

              <ArrowRight className="w-5 h-5 text-gray-400 opacity-0 transform -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0" />
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <Link
              to="/extensions"
              className="group flex items-center justify-between w-full p-5 rounded-xl border border-neutral-800 bg-[#101010] transition-all duration-300 hover:bg-neutral-900"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="min-w-10 min-h-10 w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center shrink-0">
                  <BrandCursorIcon size={20} className="text-white" />
                </div>

                <div className="min-w-0">
                  <h3 className="text-neutral-100 font-semibold font-outfit whitespace-nowrap">
                    VS Code
                  </h3>
                  <p className="text-sm text-[#909092] font-poppins leading-snug break-words">
                    My essential VS Code extensions for daily development.
                  </p>
                </div>
              </div>

              <ArrowRight className="w-5 h-5 text-gray-400 opacity-0 transform -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0" />
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
