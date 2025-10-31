import { Settings, CodeXml, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const GetInTouch = () => {
  return (
    <section id="get-in-touch" className="py-20 bg-neutral-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white items-center text-center font-excon">
            Development
          </h2>
          <p className="text-lg text-neutral-400 font-outfit text-center">
            Tools
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-4">
          {/* Email Card */}
          <Link
            to="/gears"
            className="group flex items-center justify-between w-full p-5 rounded-xl border border-neutral-800 bg-[#101010] transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-neutral-800 rounded-md flex items-center justify-center">
                <Settings className="w-4 h-4 text-green-400" />
              </div>
              <div>
                <h3 className="text-neutral-100 font-semibold font-outfit">
                  Tools & Gears
                </h3>
                <p className="text-sm text-neutral-400 font-poppins">
                  Productivity tools and gears that power my workflow.
                </p>
              </div>
            </div>

            <ArrowRight className="w-5 h-5 text-green-400 opacity-0 transform -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </Link>

          <Link
            to="/extensions"
            className="group flex items-center justify-between w-full p-5 rounded-xl border border-neutral-800 bg-[#101010] transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-neutral-800 rounded-md flex items-center justify-center">
                <CodeXml className="w-4 h-4 text-green-400" />
              </div>
              <div>
                <h3 className="text-neutral-100 font-semibold font-outfit">VS Code</h3>
                <p className="text-sm text-neutral-400 font-poppins">
                  My essential VS Code extensions for daily development.
                </p>
              </div>
            </div>

            <ArrowRight className="w-5 h-5 text-green-400 opacity-0 transform -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
