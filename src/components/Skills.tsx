const Skills = () => {
  const sections = [
    {
      title: "Programming Languages",
      skills: [
        "C Programming",
        "Python Programming",
        "Java Programming",
        "JavaScript",
        "TypeScript",
        "C++ Programming",
      ],
    },
    {
      title: "Full Stack Development",
      skills: [
        "HTML",
        "CSS",
        "Tailwind CSS",
        "Bootstrap",
        "Material UI",
        "JavaScript",
        "TypeScript",
        "Node.js",
        "Vite",
        "REST APIs",
        "MongoDB",
      ],
    },
    {
      title: "Development Tools",
      skills: [
        "Git",
        "GitHub",
        "Visual Studio Code",
        "Pycharm",
        "intellij",
        "Eclipse",
        "Postman",
        "Figma",
        "Flaticon",
        "terminal",
        "npm",
      ],
    },
    {
      title: "Other Skills",
      skills: [
        "Problem Solving",
        "Competitive Programming",
        "Data Structures and Algorithms",
        "Web Development",
        "Software Development",
        "UI/UX Design",
        "Agile Methodologies",
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 bg-[#0c0c0c00]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-4xl font-bold mb-12 text-center text-white"
          data-aos="fade-up"
        >
          Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section, idx) => (
            <div
              key={idx}
              className="bg-[#181818] border border-[#2a2a2a] rounded-lg p-6"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <h3 className="text-lg font-semibold text-white mb-4">
                {section.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {section.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="bg-[#08350ee0] text-[#00DC82] px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
