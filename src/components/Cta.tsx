import { useState, useEffect } from 'react';
import Cal, { getCalApi } from '@calcom/embed-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { GoogleMeet } from './svgs/GoogleMeet';
import { SectionButton } from './ui/SectionButton';
import ScrollReveal from './ui/ScrollReveal';

import useThemeStore from '../store/useThemeStore';

const Cta = () => {
  const [showCal, setShowCal] = useState(false);
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal('ui', { theme: theme, hideEventTypeDetails: false, layout: 'month_view' });
    })();
  }, [theme]);

  return (
    <section id="get-in-touch" className="pt-2 pb-16 md:pt-4 md:pb-20 bg-background">
      <div className="max-w-3xl mx-auto w-full px-6">
        <div className="pt-0">
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-muted/70 dark:bg-muted/30 backdrop-blur-2xl border border-border/60 dark:border-border/40 p-1 sm:p-2.5 shadow-xl mx-auto w-full">
              
              <div className="relative rounded-xl sm:rounded-2xl border border-border/60 dark:border-border/30 bg-card/80 dark:bg-card/40 px-3 py-5 sm:px-8 sm:py-8 flex flex-col items-center text-center overflow-hidden">
                
                <div className="relative z-10 flex flex-col items-center">
                  <h2 className="text-lg sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground font-bricolage leading-tight">
                    Working on something?
                    <span className="block text-muted-foreground mt-1.5">Let's build it.</span>
                  </h2>
                  
                  <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 mt-6 w-full">
                    <motion.button
                      onClick={() => setShowCal(true)}
                      initial="initial"
                      whileHover="hover"
                      whileTap={["tap", "hover"]}
                      variants={{
                        hover: { scale: 1.02 },
                        tap: { scale: 0.98 }
                      }}
                      className="group relative flex items-center px-3.5 py-1.5 sm:px-5 sm:py-2 bg-card border border-border rounded-xl hover:bg-accent transition-all duration-300 shadow-sm overflow-hidden cursor-pointer"
                    >
                      <div className="flex items-center shrink-0">
                        <img
                          src="/assets/avaterlogo.png"
                          alt="Avatar"
                          className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover border border-border shadow-sm"
                        />
                      </div>

                      <motion.div
                        className="flex items-center overflow-hidden h-5 sm:h-6"
                        variants={{
                          initial: { width: 0, opacity: 0, marginLeft: 0 },
                          hover: { width: "auto", opacity: 1, marginLeft: 8 }
                        }}
                        transition={{ duration: 0.4, ease: "circOut" }}
                      >
                        <div className="flex items-center gap-1.5">
                          <Plus className="text-muted-foreground w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0" strokeWidth={3} />
                          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-muted flex items-center justify-center border border-border">
                            <GoogleMeet className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          </div>
                        </div>
                      </motion.div>

                      <span className="text-foreground font-outfit font-bold text-xs sm:text-sm whitespace-nowrap transition-colors duration-300 ml-2">
                        Book a Free Call
                      </span>
                    </motion.button>

                    <SectionButton to="/contact" text="Contact Us" icon={null} className="px-3.5 py-1.5 sm:px-4 sm:py-2.5 text-xs sm:text-sm" />
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <AnimatePresence>
        {showCal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCal(false)}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-8 pointer-events-none"
            >
              <div className="relative w-full max-w-4xl h-[75vh] bg-card/95 backdrop-blur-2xl border border-border rounded-[2rem] shadow-2xl overflow-hidden pointer-events-auto flex flex-col">
                <div className="flex items-center justify-between px-8 py-6 border-b border-border">
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-bold font-bricolage text-foreground">
                      Schedule your Free Call
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowCal(false)}
                    className="p-2 rounded-full bg-muted border border-border text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-300 group cursor-pointer"
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
                    config={{ layout: 'month_view', theme: theme }}
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

export default Cta;
