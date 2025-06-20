// import React from 'react';

const Skills = () => {
  const skills = [
    { name: 'Java', icon: 'fab fa-java' },
    { name: 'C', icon: 'fab fa-cuttlefish' },
    { name: 'Python', icon: 'fab fa-python' },
    { name: 'HTML', icon: 'fab fa-html5' },
    { name: 'CSS', icon: 'fab fa-css3-alt' },
    { name: 'JavaScript', icon: 'fab fa-js' },
    { name: 'React', icon: 'fab fa-react' },
    { name: 'Node.js', icon: 'fab fa-node-js' },
    { name: 'Git', icon: 'fab fa-git-alt' },
    { name: 'Github', icon: 'fa-brands fa-github' },
  ];

  return (
    <section id="skills" className="py-20 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 
          className="text-4xl font-bold mb-12 text-center"
          data-aos="fade-up"
        >
          Skills
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <div 
              key={index}
              className="flex flex-col items-center p-6 bg-[#0A0A0A] rounded-lg hover:bg-[#00DC82]/10 transition-colors"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <i className={`${skill.icon} text-4xl mb-4 text-[#00DC82]`}></i>
              <span className="text-lg">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;