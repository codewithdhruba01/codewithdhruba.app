const Education = () => {
  const education = [
    {
      year: '2023 - 2027',
      degree: 'Computer Science and Engineering',
      institution: 'Swami Vivekananda University, Kolkata, West Bengal, India',
      description: "Currently pursuing my bachelor's degree with a focus on computer science fundamentals and modern web technologies.",
    },
    {
      year: '2020 - 2022',
      degree: 'Higher Secondary Education',
      institution: 'West Bengal Council of Higher Secondary Education',
      description: 'Completed My higher secondary education with Computer Application.',
    },
     
    {
      year: '2020',
      degree: 'Secondary Education',
      institution: 'West Bengal Board of Secondary Education',
      description: 'Completed my secondary education in West Bengal Board of Secondary Education Board.',
    },
  ];

  const experience = [
    {
      year: '2025 - Present',
      title: 'Open Source Developer',
      company: 'Recode Hive, Australia',
      description: 'Developed responsive web pages using React and Tailwind CSS. Collaborated with designers to improve user experience.',
    },
    {
      year: '2025',
      title: 'Freelance Web Developer',
      company: 'Self-Employed',
      description: 'Built custom websites for small businesses, including e-commerce and portfolio sites. Implemented SEO best practices.',
    },
  ];

  return (
    <>
      {/* Education Section */}
      <section id="education" className="py-20 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl md:text-4xl font-bold mb-12 text-center font-synonym" data-aos="fade-up">
            Education
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#00DC82]/20"></div>
            <div className="flex flex-col space-y-16">
              {education.map((item, index) => (
                <div key={index} className="relative flex flex-col items-center" data-aos="fade-up">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#115036] border-2 border-white z-10">
                    
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14 22v-4a2 2 0 1 0-4 0v4" />
                      <path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2" />
                      <path d="M18 5v17" />
                      <path d="m4 6 8-4 8 4" />
                      <path d="M6 5v17" />
                      
                    </svg>
                  </div>
                  <div className="mt-6 w-full md:w-1/2 p-6 bg-[#111111] border border-gray-800 rounded-lg text-center">
                    <div className="text-neutral-400 text-sm mb-1">{item.year}</div>
                    <h3 className="text-xl font-bold text-neutral-300 font-outfit mb-2">{item.degree}</h3>
                    <div className="text-neutral-400 text-sm mb-2 font-extrabold font-outfit">{item.institution}</div>
                    <p className="text-neutral-400 text-sm font-satoshi">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl md:text-4xl font-bold mb-12 text-center font-synonym" data-aos="fade-up">
            Experience
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#00DC82]/20"></div>
            <div className="flex flex-col space-y-16">
              {experience.map((item, index) => (
                <div key={index} className="relative flex flex-col items-center" data-aos="fade-up">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#115036] border-2 border-white z-10">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
                      <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
                      <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
                      <path d="M10 6h4" />
                      <path d="M10 10h4" />
                      <path d="M10 14h4" />
                      <path d="M10 18h4" />
                    </svg>
                  </div>
                  <div className="mt-6 w-full md:w-1/2 p-6 bg-[#111111] border border-gray-800 rounded-lg text-center">
                    <div className="text-neutral-400 text-sm mb-1">{item.year}</div>
                    <h3 className="text-xl font-bold text-neutral-300 mb-2">{item.title}</h3>
                    <div className="text-neutral-400 mb-2">{item.company}</div>
                    <p className="text-neutral-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Education;
