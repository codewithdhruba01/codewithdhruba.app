import ScrollReveal from './ui/ScrollReveal';

const Skills = () => {
  const sections = [
    {
      title: 'Programming Languages',
      skills: [
        'C Programming',
        'Python Programming',
        'Java Programming',
        'JavaScript',
        'TypeScript',
      ],
    },
    {
      title: 'Frontend Development',
      skills: [
        'HTML',
        'CSS',
        'Tailwind CSS',
        'Bootstrap',
        'Material UI',
        'JavaScript',
        'TypeScript',
        'Node.js',
        'REST APIs',
        'Next.js',
      ],
    },
    {
      title: 'Development Tools',
      skills: [
        'Git',
        'GitHub',
        'Visual Studio Code',
        'Pycharm',
        'intellij',
        'Notion',
        'Postman',
        'Figma',
        'Jira',
        'Vite',
        'npm',
      ],
    },
    {
      title: 'Other Skills',
      skills: [
        'Problem Solving',
        'Competitive Programming',
        'Data Structures and Algorithms',
        'Web Development',
        'Software Development',
        'UI/UX Design',
      ],
    },
  ];

  return (
      <section id="skills" className="pt-8 pb-8 bg-neutral-950">
        <div className="max-w-4xl mx-auto w-full px-6">
          <ScrollReveal className="mb-8">
            <p className="text-lg text-neutral-400 font-outfit text-left">
              Latest
            </p>
            <h2 className="text-3xl font-bold text-neutral-200 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 text-left font-excon">
              Tech Stack
            </h2>
          </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section, idx) => (
            <ScrollReveal
              key={idx}
              delay={idx * 0.1}
              className="h-full"
            >
              <div
                className="bg-[#111111] border border-[#272727] rounded-lg p-6 h-full"
              >
                <h3 className="text-lg font-excon text-neutral-300 mb-4">
                  {section.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {section.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="bg-[#1c1d1ce0] text-[#00DC82] px-3 py-1 rounded-full text-sm font-poppins"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
