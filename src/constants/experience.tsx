
import React from 'react';
import { FastAPI } from '../components/svgs/FastAPI';
import TailwindCss from '../components/svgs/TailwindCss';
import TypeScript from '../components/svgs/TypeScript';
import ReactIcon from '../components/svgs/ReactIcon';
import NodeJs from '../components/svgs/NodeJs';
import MDXIcon from '../components/svgs/MDXIcon';
import Html from '../components/svgs/Html';
import CSS from '../components/svgs/CSS';
import JavaScript from '../components/svgs/JavaScript';
import Postman from '../components/svgs/Postman';
import { MySQL } from '../components/svgs/MySQL';
import Shadcn from '../components/svgs/Shadcn';
import { Php } from '../components/svgs/Php';
import { AmazonWebServices } from '../components/svgs/AmazonWebServices';
import { Python } from '../components/svgs/Python';
import { Github } from 'lucide-react';

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

export const experiences: ExperienceInterface[] = [
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
