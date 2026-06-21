import ScrollReveal from './ui/ScrollReveal';

// Import SVG icons from the components/svgs folder
import TypeScript from './svgs/TypeScript';
import JavaScript from './svgs/JavaScript';
import { Python } from './svgs/Python';
import { Php } from './svgs/Php';
import { Java } from './svgs/Java';
import ReactIcon from './svgs/ReactIcon';
import NextJs from './svgs/NextJs';
import TailwindCss from './svgs/TailwindCss';
import Shadcn from './svgs/Shadcn';
import Motion from './svgs/Motion';
import NodeJs from './svgs/NodeJs';
import Bun from './svgs/Bun';
import { MySQL } from './svgs/MySQL';
import MongoDB from './svgs/MongoDB';
import Figma from './svgs/Figma';
import Html from './svgs/Html';
import CSS from './svgs/CSS';
import BootStrap from './svgs/BootStrap';
import Postman from './svgs/Postman';
import { VisualStudioCode } from './svgs/VisualStudioCode';
import Vercel from './svgs/Vercel';
import ExpressJs from './svgs/ExpressJs';
import AWS from './svgs/AWS';
import { FastAPI } from './svgs/FastAPI';
import ThreeJs from './svgs/ThreeJs';
import { Linux } from './svgs/Linux';

const Skills = () => {
  // A comprehensive, beautifully ordered tech stack array matching your reference image with official URLs
  const techStack = [
    // Programming Languages
    { name: 'TypeScript', icon: TypeScript, href: 'https://www.typescriptlang.org/' },
    { name: 'JavaScript', icon: JavaScript, href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
    { name: 'Python', icon: Python, href: 'https://www.python.org/' },
    { name: 'PHP', icon: Php, href: 'https://www.php.net/' },
    { name: 'Java', icon: Java, href: 'https://www.oracle.com/java/' },
    // Frontend
    { name: 'React', icon: ReactIcon, href: 'https://react.dev/' },
    { name: 'Next.js', icon: NextJs, href: 'https://nextjs.org/' },
    { name: 'Tailwind CSS', icon: TailwindCss, href: 'https://tailwindcss.com/' },
    { name: 'shadcn/ui', icon: Shadcn, href: 'https://ui.shadcn.com/' },
    { name: 'Motion', icon: Motion, href: 'https://motion.dev/' },
    // Backend & DB
    { name: 'Node.js', icon: NodeJs, href: 'https://nodejs.org/' },
    { name: 'Bun', icon: Bun, href: 'https://bun.sh/' },
    { name: 'MySQL', icon: MySQL, href: 'https://www.mysql.com/' },
    { name: 'MongoDB', icon: MongoDB, href: 'https://www.mongodb.com/' },
    // Tools & Ecosystem
    { name: 'Git', href: 'https://git-scm.com/' }, // No icon in folder, will render as text-only pill
    { name: 'Docker', href: 'https://www.docker.com/' }, // No icon in folder, will render as text-only pill
    { name: 'Figma', icon: Figma, href: 'https://www.figma.com/' },
    // Extended core tech stack
    { name: 'Express.js', icon: ExpressJs, href: 'https://expressjs.com/' },
    { name: 'AWS', icon: AWS, href: 'https://aws.amazon.com/' },
    { name: 'FastAPI', icon: FastAPI, href: 'https://fastapi.tiangolo.com/' },
    { name: 'Three.js', icon: ThreeJs, href: 'https://threejs.org/' },
    { name: 'HTML', icon: Html, href: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
    { name: 'CSS', icon: CSS, href: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
    { name: 'Bootstrap', icon: BootStrap, href: 'https://getbootstrap.com/' },
    { name: 'Postman', icon: Postman, href: 'https://www.postman.com/' },
    { name: 'VS Code', icon: VisualStudioCode, href: 'https://code.visualstudio.com/' },
    { name: 'Linux', icon: Linux, href: 'https://www.linux.org/' },
    { name: 'Vercel', icon: Vercel, href: 'https://vercel.com/' },
  ];

  return (
    <section id="skills" className="pt-8 pb-8 bg-[#0A0A0A]">
      <div className="max-w-3xl mx-auto w-full px-6">
        <ScrollReveal className="mb-8">
          <p className="text-lg text-neutral-400 font-outfit text-left">
            Latest
          </p>
          <h2 className="text-3xl font-extrabold font-bricolage text-neutral-200 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 text-left">
            Tech Stack
          </h2>
        </ScrollReveal>

        <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-start items-center">
          {techStack.map((tech, idx) => {
            const IconComponent = tech.icon;
            return (
              <ScrollReveal
                key={idx}
                delay={idx * 0.012}
              >
                <a
                  href={tech.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-2.5 py-1 bg-[#111112]/95 border border-neutral-800/80 rounded-full shadow-md shadow-black/10 cursor-pointer select-none transition-colors duration-200 hover:border-neutral-700/80 hover:bg-[#161618]/95"
                >
                  {IconComponent && <IconComponent className="w-3.5 h-3.5 shrink-0" />}
                  <span className="font-outfit font-medium text-[11px] sm:text-xs text-[#E4E4E7] tracking-wide">
                    {tech.name}
                  </span>
                </a>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
