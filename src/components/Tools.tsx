import { Settings, CodeXml, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const GetInTouch = () => {
  return (
    <section id="get-in-touch" className="py-20 bg-neutral-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white text-center font-excon">
            Development
          </h2>
          <p className="text-lg text-neutral-400 font-outfit text-center">
            Tools
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-4">
          {/* Tools & Gears */}
          <Link
            to="/gears"
            className="group flex items-center justify-between w-full p-5 rounded-xl border border-neutral-800 bg-[#101010] transition-all duration-300 hover:bg-neutral-900"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="min-w-10 min-h-10 w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center shrink-0">
                <Settings className="w-5 h-5 text-green-400" />
              </div>

              <div className="min-w-0">
                <h3 className="text-neutral-100 font-semibold font-outfit whitespace-nowrap">
                  Tools & Gears
                </h3>
                <p className="text-sm text-neutral-400 font-poppins leading-snug break-words">
                  Productivity tools and gears that power my workflow.
                </p>
              </div>
            </div>

            <ArrowRight className="w-5 h-5 text-green-400 opacity-0 transform -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0" />
          </Link>

          <Link
            to="/extensions"
            className="group flex items-center justify-between w-full p-5 rounded-xl border border-neutral-800 bg-[#101010] transition-all duration-300 hover:bg-neutral-900"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="min-w-10 min-h-10 w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center shrink-0">
                <CodeXml className="w-5 h-5 text-green-400" />
              </div>

              <div className="min-w-0">
                <h3 className="text-neutral-100 font-semibold font-outfit whitespace-nowrap">
                  VS Code
                </h3>
                <p className="text-sm text-neutral-400 font-poppins leading-snug break-words">
                  My essential VS Code extensions for daily development.
                </p>
              </div>
            </div>

            <ArrowRight className="w-5 h-5 text-green-400 opacity-0 transform -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
