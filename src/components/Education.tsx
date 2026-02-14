import React, { useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Github, Globe, Linkedin, Twitter, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';
import Skill from './common/Skill';

// Import SVG Icons
import { FastAPI } from './svgs/FastAPI';
import TailwindCss from './svgs/TailwindCss';
import TypeScript from './svgs/TypeScript';
import ReactIcon from './svgs/ReactIcon';
import NodeJs from './svgs/NodeJs';
import MDXIcon from './svgs/MDXIcon';
import Html from './svgs/Html';
import CSS from './svgs/CSS';
import JavaScript from './svgs/JavaScript';
import Postman from './svgs/Postman';
import { MySQL } from './svgs/MySQL';
import Shadcn from './svgs/Shadcn';
import { Php } from './svgs/Php';
import { AmazonWebServices } from './svgs/AmazonWebServices';
import { Python } from './svgs/Python';

// --- Types ---
export interface ExperienceInterface {
  company: string;
  image: string;
  isBlur?: boolean;
  website?: string;
  x?: string;
  linkedin?: string;
  github?: string;
  isCurrent?: boolean;
  position: string;
  startDate: string;
  endDate?: string;
  location: string;
  technologies: { name: string; href?: string; icon: React.ReactNode }[];
  description: string[];
}

// --- Components ---

const parseDescription = (text: string): string => {
  return text.replace(/\*(.*?)\*/g, '<b>$1</b>');
};

interface ExperienceCardProps {
  experience: ExperienceInterface;
  isOpen: boolean;
  onClick: () => void;
}

function ExperienceCard({ experience, isOpen, onClick }: ExperienceCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-0 transition-all duration-300 group",
        isOpen
          ? "bg-transparent"
          : "bg-transparent"
      )}
    >
      {/* Company Header - Always Visible */}
      <div className="flex flex-col p-4 sm:p-6 gap-4">
        <div className="flex items-start justify-between gap-4">
          {/* Left Side: Logo & Info */}
          <div className="flex items-start gap-4">
            <img
              src={experience.image}
              alt={experience.company}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-md object-cover bg-neutral-900 border border-neutral-800"
            />
            <div className="flex flex-col gap-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className={cn(
                  "text-base sm:text-lg font-bold font-outfit text-white leading-tight",
                  experience.isBlur && "blur-[6px] select-none opacity-80"
                )}>
                  {experience.company}
                </h3>

                {/* Social Links */}
                <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                  {experience.website && (
                    <Tooltip>
                      <TooltipTrigger>
                        <a href={experience.website} target="_blank" className="p-1 text-neutral-500 hover:text-white transition-colors block" rel="noreferrer">
                          <Globe className="w-3.5 h-3.5" />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>Visit Website</TooltipContent>
                    </Tooltip>
                  )}
                  {experience.x && (
                    <Tooltip>
                      <TooltipTrigger>
                        <a href={experience.x} target="_blank" className="p-1 text-neutral-500 hover:text-white transition-colors block" rel="noreferrer">
                          <Twitter className="w-3.5 h-3.5" />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>Follow on X</TooltipContent>
                    </Tooltip>
                  )}
                  {experience.linkedin && (
                    <Tooltip>
                      <TooltipTrigger>
                        <a href={experience.linkedin} target="_blank" className="p-1 text-neutral-500 hover:text-white transition-colors block" rel="noreferrer">
                          <Linkedin className="w-3.5 h-3.5" />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>Connect on LinkedIn</TooltipContent>
                    </Tooltip>
                  )}
                  {experience.github && (
                    <Tooltip>
                      <TooltipTrigger>
                        <a href={experience.github} target="_blank" className="p-1 text-neutral-500 hover:text-white transition-colors block" rel="noreferrer">
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>View GitHub</TooltipContent>
                    </Tooltip>
                  )}
                </div>

                {experience.isCurrent && (
                  <div className="flex items-center gap-1 rounded-md bg-[#022c1b] px-2 py-0.5 text-[10px] font-outfit text-[#ffffff] font-semibold ml-1 border border-black shadow-[0_0_10px_-3px_rgba(0,220,130,0.3)]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00DC82] animate-pulse"></div>
                    Working
                  </div>
                )}

                <Tooltip>
                  <TooltipTrigger>
                    <div
                      onClick={onClick}
                      className="ml-0 w-6 h-6 flex items-center justify-center rounded-lg border border-transparent bg-transparent hover:bg-[#161616] hover:border-[#222] transition-all duration-300 cursor-pointer"
                    >
                      <ChevronDown className={cn(
                        "w-3.5 h-3.5 text-neutral-500 transition-transform duration-300",
                        isOpen ? "rotate-180" : ""
                      )} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    {isOpen ? "Collapse" : "Expand"}
                  </TooltipContent>
                </Tooltip>
              </div>
              <p className="text-neutral-400 font-outfit font-semibold text-sm sm:text-base">{experience.position}</p>
            </div>
          </div>

          {/* Right Side: Date & Location */}
          <div className="text-neutral-500 text-xs sm:text-sm flex flex-col items-end text-right font-medium shrink-0">
            <p>
              {experience.startDate} - {experience.isCurrent ? 'Present' : experience.endDate}
            </p>
            <p className="hidden sm:block text-neutral-600">{experience.location}</p>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="p-6 pt-0 flex flex-col gap-6">
            {/* Technologies */}
            <div>
              <h4 className="text-sm font-synonym font-semibold text-neutral-200 mb-3">Technologies & Tools</h4>
              <div className="flex flex-wrap gap-2 text-white font-synonym ">
                {experience.technologies.map((technology, techIndex: number) => (
                  <Skill
                    key={techIndex}
                    name={technology.name}
                    href={technology.href}
                  >
                    {technology.icon}
                  </Skill>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="text-neutral-400 flex flex-col gap-2 text-sm sm:text-base font-satoshi leading-relaxed">
              {experience.description.map(
                (description: string, descIndex: number) => (
                  <p
                    key={descIndex}
                    dangerouslySetInnerHTML={{
                      __html: `• ${parseDescription(description)}`,
                    }}
                  />
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ExperienceListProps {
  experiences: ExperienceInterface[];
}

function ExperienceList({ experiences }: ExperienceListProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Default open first item

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (experiences.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-neutral-500">No work experiences found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-0">
      {experiences.map((experience: ExperienceInterface, index) => (
        <ExperienceCard
          key={index}
          experience={experience}
          isOpen={openIndex === index}
          onClick={() => handleToggle(index)}
        />
      ))}
    </div>

  );
}

const Experience = () => {
  const experiences: ExperienceInterface[] = [
    {
      company: 'SpacECE India Foundation',
      isBlur: true,
      location: 'Pune',
      position: 'Full Stack Developer (Intern)',
      startDate: 'Jan 2026',
      isCurrent: true,
      image: '/logo/SpacECE.jpg',
      website: 'https://www.spacece.in/',
      github: 'https://github.com/SpacECE-India-Foundation',
      description: [
        'Designed and developed: RESTful APIs to support dynamic frontend features and ensure smooth data flow across the application.',
        'Focusing on building secure, scalable, and performance-optimized solutions for production-level applications.',
        'Managed and optimized: MySQL databases, including schema design, queries, and performance tuning. Integrated services with frontend components to deliver seamless and responsive user experiences.',
        'Implemented: secure authentication, validation, and error-handling to ensure application reliability. Collaborated with cross-functional teams to understand requirements and deliver features aligned with organizational goals.',
      ],
      technologies: [
        { name: 'Php', icon: <Php /> },
        { name: 'JavaScript', icon: <JavaScript /> },
        { name: 'Python', icon: <Python /> },
        { name: 'MySQL', icon: <MySQL /> },
        { name: 'FastAPI', icon: <FastAPI /> },
        { name: 'Node.js', icon: <NodeJs /> },
        { name: 'Postman', icon: <Postman /> },
        { name: 'AWS', icon: <AmazonWebServices /> },
      ],
    },
    {
      company: 'Recode Hive',
      location: 'Australia (Remote)',
      position: 'Technical Writer',
      startDate: 'May 2025',
      endDate: 'Dec 2025',
      image: '/logo/Recodehive.png',
      website: 'https://recodehive.com/',
      github: 'https://github.com/recodehive',
      description: [
        'Authored and maintained product documentation, user guides, and tutorials, simplifying complex technical concepts into clear, accessible content.',
        'Collaborated with engineers to ensure accurate and up-to-date documentation.',
        'Collaborated with designers to improve user experience.',
        'Sponsorship: Recognized for quality contributions and received sponsorship from Recode Hive for consistent and impactful work.',
        'Participated: in issue tracking, pull requests, and code reviews following GitHub open-source workflows.'
      ],
      technologies: [
        { name: 'MDX', icon: <MDXIcon /> },
        { name: 'Python', icon: <Python /> },
        { name: 'React.Js', icon: <ReactIcon /> },
        { name: 'TypeScript', icon: <TypeScript /> },
        { name: 'Node.Js', icon: <NodeJs /> },
        { name: 'Tailwind CSS', icon: <TailwindCss /> },
        { name: 'Github', icon: <Github className="w-3 h-3 text-white-500" /> },
      ],
    },
    {
      company: 'Upwork',
      location: 'Remote',
      position: 'Freelance Engineer',
      startDate: '2025',
      isCurrent: true,
      image: '/logo/Upwork.jpeg',
      description: [
        'Built custom websites for small businesses, including e-commerce and portfolio sites.',
        'Implemented SEO best practices to improve visibility and performance.',
      ],
      technologies: [
        { name: 'React', icon: <ReactIcon /> },
        { name: 'HTML5', icon: <Html /> },
        { name: 'CSS3', icon: <CSS /> },
        { name: 'JavaScript', icon: <JavaScript /> },
        { name: 'TypeScript', icon: <TypeScript /> },
        { name: 'Node.Js', icon: <NodeJs /> },
        { name: 'Tailwind CSS', icon: <TailwindCss /> },
        { name: 'Shadcn', icon: <Shadcn /> },
      ],
    },
  ];

  return (
    <section id="experience" className="pt-8 pb-8 bg-[#0A0A0A]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-lg text-neutral-400 font-outfit text-center">
            Featured
          </p>
          <h2 className="text-3xl font-bold text-neutral-200 bg-clip-text font-excon text-transparent bg-gradient-to-b from-white to-neutral-400 text-center font-excon">
            Experience
          </h2>

        </div>

        <TooltipProvider>
          <div data-aos="fade-up" data-aos-delay="100">
            <ExperienceList experiences={experiences} />
          </div>
        </TooltipProvider>
      </div>
    </section>
  );
};

export default Experience;
