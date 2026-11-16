import { Settings, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollReveal from './ui/ScrollReveal';
import BrandCursorIcon from './svgs/BrandCursorIcon';

const GetInTouch = () => {
  return (
    <section id="development" className="pt-4 pb-8 bg-background">
      <div className="max-w-[690px] mx-auto w-full px-6">
        {/* Heading */}
        <ScrollReveal className="mb-8">
          <h4 className="text-2xl md:text-2xl font-extrabold text-foreground text-left font-hanken">
            Development
          </h4>
        </ScrollReveal>

        {/* Cards */}
        <div className="flex flex-col gap-3 sm:gap-4">
          {/* Tools & Gears */}
          <ScrollReveal delay={0.1}>
            <Link
              to="/gears"
              className="group flex items-center justify-between w-full py-3.5 px-4 sm:p-5 rounded-xl border border-border bg-card transition-all duration-300 hover:bg-accent"
            >
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <div className="w-9 h-9 min-w-9 min-h-9 sm:w-10 sm:h-10 sm:min-w-10 sm:min-h-10 bg-muted rounded-lg flex items-center justify-center shrink-0">
                  <Settings className="w-[18px] h-[18px] sm:w-5 sm:h-5 text-foreground" />
                </div>

                <div className="min-w-0">
                  <h3 className="text-base sm:text-base font-semibold sm:font-medium font-hanken text-foreground whitespace-nowrap">
                    Tools & Gears
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground font-hanken leading-snug break-words mt-0.5">
                    Productivity tools and gears that power my workflow.
                  </p>
                </div>
              </div>

              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground opacity-0 transform -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0 ml-2" />
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <Link
              to="/extensions"
              className="group flex items-center justify-between w-full py-3.5 px-4 sm:p-5 rounded-xl border border-border bg-card transition-all duration-300 hover:bg-accent"
            >
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <div className="w-9 h-9 min-w-9 min-h-9 sm:w-10 sm:h-10 sm:min-w-10 sm:min-h-10 bg-muted rounded-lg flex items-center justify-center shrink-0">
                  <span className="sm:hidden">
                    <BrandCursorIcon size={18} className="text-foreground" />
                  </span>
                  <span className="hidden sm:inline">
                    <BrandCursorIcon size={20} className="text-foreground" />
                  </span>
                </div>

                <div className="min-w-0">
                  <h3 className="text-base sm:text-base font-semibold sm:font-medium font-hanken text-foreground whitespace-nowrap">
                    VS Code
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground font-hanken leading-snug break-words mt-0.5">
                    My essential VS Code extensions for daily development.
                  </p>
                </div>
              </div>

              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground opacity-0 transform -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0 ml-2" />
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
