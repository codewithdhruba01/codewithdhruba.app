import { 
  FaJava, FaPython, FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGit, FaGithub 
} from 'react-icons/fa';
import { SiC } from 'react-icons/si';

const Skills = () => {
  const skills = [
    { name: 'Java', icon: <FaJava className="text-[#5382a1]" /> },
    { name: 'C', icon: <SiC className="text-white-500" /> },
    { name: 'Python', icon: <FaPython className="text-[#06663a]" /> },
    { name: 'HTML', icon: <FaHtml5 className="text-orange-600" /> },
    { name: 'CSS', icon: <FaCss3Alt className="text-blue-500" /> },
    { name: 'JavaScript', icon: <FaJs className="text-yellow-300" /> },
    { name: 'React', icon: <FaReact className="text-cyan-400 animate-spin-slow" /> },
    { name: 'Node.js', icon: <FaNodeJs className="text-green-500" /> },
    { name: 'Git', icon: <FaGit className="text-red-500" /> },
    { name: 'Github', icon: <FaGithub className="text-white" /> },
  ];

  return (
    <section id="skills" className="py-20 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 
          className="text-4xl font-bold mb-12 text-center text-white"
          data-aos="fade-up"
        >
          Skills
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <div 
              key={index}
              className="flex flex-col items-center p-6 bg-[#0A0A0A] rounded-xl hover:scale-105 transition-transform hover:shadow-lg"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="text-5xl mb-4">{skill.icon}</div>
              <span className="text-lg text-white">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
