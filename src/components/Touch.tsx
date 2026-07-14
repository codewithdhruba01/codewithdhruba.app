import { useState, useEffect } from 'react';
import Cal, { getCalApi } from '@calcom/embed-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { GoogleMeet } from './svgs/GoogleMeet';
import { SectionButton } from './ui/SectionButton';
import ScrollReveal from './ui/ScrollReveal';

const GetInTouch = () => {
  const [showCal, setShowCal] = useState(false);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal('ui', { theme: 'dark', hideEventTypeDetails: false, layout: 'month_view' });
    })();
  }, []);

  return (
    <section id="get-in-touch" className="pt-2 pb-16 md:pt-4 md:pb-20 bg-[#0A0A0A]">
      <div className="max-w-3xl mx-auto w-full px-6">
        <div className="pt-0">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-bricolage leading-none">
              Working on something?
              <span className="block text-neutral-500 mt-2">Let's build it.</span>
            </h2>
            <p className="mt-4 text-neutral-400 font-supreme text-base sm:text-lg max-w-lg leading-relaxed">
              Open to freelance projects, full-time roles, and interesting conversations.
            </p>
            <div className="flex flex-wrap items-center gap-6 mt-8">
              {/* Interactive Book a free call button from Contact page - Adjusted height */}
              <motion.button
                onClick={() => setShowCal(true)}
                initial="initial"
                whileHover="hover"
                whileTap={["tap", "hover"]}
                variants={{
                  hover: { scale: 1.02 },
                  tap: { scale: 0.98 }
                }}
                className="group relative flex items-center px-5 py-2 bg-[#111111] border border-[#2d2e2d] rounded-xl hover:border-[#A3A3A3]/50 transition-all duration-300 shadow-xl overflow-hidden cursor-pointer"
              >
                {/* Avatar - Always visible */}
                <div className="flex items-center shrink-0">
                  <img
                    src="/assets/avaterlogo.png"
                    alt="Avatar"
                    className="w-6 h-6 rounded-full object-cover border border-neutral-700 shadow-lg shadow-black/40"
                  />
                </div>

                {/* Plus + Google Meet - Reveal on hover */}
                <motion.div
                  className="flex items-center overflow-hidden h-6"
                  variants={{
                    initial: { width: 0, opacity: 0, marginLeft: 0 },
                    hover: { width: "auto", opacity: 1, marginLeft: 8 }
                  }}
                  transition={{ duration: 0.4, ease: "circOut" }}
                >
                  <div className="flex items-center gap-1.5">
                    <Plus className="text-neutral-500 w-3 h-3 shrink-0" strokeWidth={3} />
                    <div className="w-6 h-6 rounded-full bg-neutral-800 flex items-center justify-center border border-neutral-700/50">
                      <GoogleMeet className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </motion.div>

                {/* Always visible text */}
                <span className="text-[#d3d1d1] group-hover:text-white font-outfit font-bold text-sm whitespace-nowrap transition-colors duration-300 ml-2">
                  Book a Free Call
                </span>
              </motion.button>

              {/* Contact Us button matching the "Show all blogs" style */}
              <SectionButton to="/contact" text="Contact Us" />
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Popup Card Scheduler */}
      <AnimatePresence>
        {showCal && (
          <>
            {/* Full-screen Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCal(false)}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm cursor-pointer"
            />

            {/* Premium Glassmorphism Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-8 pointer-events-none"
            >
              <div className="relative w-full max-w-4xl h-[75vh] bg-[#111111]/95 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden pointer-events-auto flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-8 py-6 border-b border-white/5">
                  <div className="flex items-center gap-3">

                    <h3 className="text-2xl font-bold font-bricolage text-white">
                      Schedule your Free Call
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowCal(false)}
                    className="p-2 rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 group cursor-pointer"
                  >
                    <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                  </button>
                </div>

                {/* Cal Embed Container */}
                <div className="flex-1 w-full overflow-hidden p-2">
                  <Cal
                    namespace="30min"
                    calLink="dhrubaraj-pati-7zugw9/30min"
                    style={{ width: "100%", height: "100%", overflow: "scroll" }}
                    config={{ layout: 'month_view', theme: 'dark' }}
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GetInTouch;
