import { useState } from 'react';

const Experience = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const experience = [
    {
      year: '2025 - Present',
      title: 'Technical writer',
      company: 'Recode Hive, Australia (Remote)',
      description:
        'Authored and maintained product documentation, user guides, and tutorials, simplifying complex technical concepts into clear, accessible content. Collaborated with engineers to ensure accurate and up-to-date documentation & Collaborated with designers to improve user experience.',
    },
    {
      year: '2025-Present',
      title: 'Freelance Engineer',
      company: 'Self-Employed',
      description:
        'Built custom websites for small businesses, including e-commerce and portfolio sites. Implemented SEO best practices.',
    },
  ];

  return (
    <>
      {/* Experience Section */}
      <section id="experience" className="py-20 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-5xl md:text-4xl font-bold mb-12 text-center font-synonym"
            data-aos="fade-up"
          >
            Experience
          </h2>
          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#00DC82]/20 via-[#00DC82]/40 to-[#00DC82]/20"></div>

            <div className="space-y-20">
              {experience.map((item, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div
                    key={index}
                    className={`relative flex items-center ${
                      isEven ? 'justify-start' : 'justify-end'
                    }`}
                    data-aos="fade-up"
                    data-aos-delay={index * 200}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center group">
                      <div className={`w-4 h-4 bg-[#00DC82] rounded-full border-4 border-neutral-950 z-20 transition-all duration-500 ease-out ${
                        hoveredIndex === index ? 'scale-125 animate-pulse' : 'animate-pulse'
                      }`}></div>
                      <div className={`absolute w-8 h-8 bg-[#00DC82]/20 rounded-full transition-all duration-700 ease-out ${
                        hoveredIndex === index ? 'animate-ping scale-125' : 'animate-ping'
                      }`}></div>
                      {/* Extra glow on hover */}
                      <div className={`absolute w-12 h-12 bg-[#00DC82]/10 rounded-full transition-all duration-500 ease-out ${
                        hoveredIndex === index ? 'opacity-100 scale-110' : 'opacity-0 scale-100'
                      }`}></div>
                    </div>

                    {/* Content Card */}
                    <div
                      className={`group relative w-full md:w-5/12 p-6 bg-[#111111] border border-gray-800 rounded-lg shadow-lg hover:shadow-2xl hover:shadow-[#00DC82]/20 transition-all duration-700 ease-out hover:border-[#00DC82]/70 hover:scale-[1.02] hover:-translate-y-1 cursor-pointer overflow-hidden ${
                        isEven ? 'mr-8' : 'ml-8'
                      }`}
                      data-aos={isEven ? "fade-right" : "fade-left"}
                      data-aos-delay={index * 300}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      {/* Animated background gradient on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#00DC82]/5 via-transparent to-[#00DC82]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out rounded-lg"></div>

                      {/* Floating particles on hover */}
                      <div className="absolute top-3 right-3 w-2 h-2 bg-[#00DC82]/40 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-1000 ease-out group-hover:animate-ping"></div>
                      <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-[#00DC82]/30 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-1200 ease-out group-hover:animate-pulse"></div>

                      <div className="relative z-10">
                        <div className="text-[#00DC82] text-sm font-semibold mb-2 tracking-wide group-hover:text-[#00DC82] transition-colors duration-500 ease-out">
                          {item.year}
                        </div>
                        <h3 className="text-xl font-bold text-white font-outfit mb-2 group-hover:text-[#00DC82] transition-all duration-500 ease-out group-hover:translate-x-1">
                          {item.title}
                        </h3>
                        <div className="text-[#00DC82] text-sm mb-3 font-semibold group-hover:text-white transition-colors duration-500 ease-out">
                          {item.company}
                        </div>
                        <p className="text-neutral-400 text-sm leading-relaxed font-satoshi group-hover:text-neutral-300 transition-colors duration-500 ease-out group-hover:translate-x-0.5">
                          {item.description}
                        </p>
                      </div>

                      {/* Enhanced decorative corner accent */}
                      <div className="absolute top-4 right-4 w-3 h-3 border-t-2 border-r-2 border-[#00DC82]/30 group-hover:border-[#00DC82]/80 group-hover:w-4 group-hover:h-4 transition-all duration-500 ease-out"></div>

                      {/* Bottom accent line */}
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00DC82] to-transparent group-hover:w-full transition-all duration-700 ease-out"></div>
                    </div>

                    {/* Connecting Line */}
                    <div
                      className={`hidden md:block absolute top-6 ${
                        isEven ? 'left-1/2 ml-4' : 'right-1/2 mr-4'
                      } w-8 h-0.5 bg-gradient-to-r ${
                        isEven ? 'from-[#00DC82]/50' : 'from-[#00DC82]/50'
                      }`}
                    ></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Experience;
