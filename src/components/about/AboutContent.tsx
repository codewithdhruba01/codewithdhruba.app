import { useState } from 'react';
import HoverInfo from '../ui/HoverInfo';
import ReactIcon from '../svgs/ReactIcon';
import TypeScript from '../svgs/TypeScript';
import TailwindCss from '../svgs/TailwindCss';
import NextJs from '../svgs/NextJs';
import { Link } from 'react-router-dom';
import { ArrowRight, Sun, Moon } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent } from '../ui/tooltip';

export const AboutContent = () => {
    const [isLightMode, setIsLightMode] = useState(false);

    return (
        <div className="flex flex-col mt-6">
            {/* Banner Image Card with Premium Cross-fade Animation */}
            <div className="relative w-full rounded-2xl overflow-hidden border border-neutral-800 shadow-xl mb-8 group bg-[#101010]">
                {/* Dark Banner */}
                <img 
                    src="/assets/Aboutbanner.png" 
                    alt="About Banner Dark" 
                    className={`w-full h-auto object-cover transition-all duration-700 ease-in-out group-hover:scale-[1.03] ${
                        isLightMode ? 'opacity-0 pointer-events-none' : 'opacity-100'
                    }`}
                    loading="lazy"
                />
                {/* Light Banner */}
                <img 
                    src="/assets/Aboutbannerlight.png" 
                    alt="About Banner Light" 
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-[1.03] ${
                        isLightMode ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>

            <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl md:text-4xl font-bold font-excon bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-300">
                    About <span className="text-[#00DC82]">Me</span>
                </h1>
                <Tooltip>
                    <TooltipTrigger>
                        <button
                            onClick={() => setIsLightMode(!isLightMode)}
                            className="p-2.5 rounded-xl bg-[#111111] border border-neutral-800 text-white hover:border-neutral-700 hover:bg-[#161616] active:scale-95 transition-all duration-300 shadow-md shadow-black/20 flex items-center justify-center group"
                            aria-label="Toggle Banner Theme"
                        >
                            {isLightMode ? (
                                <Moon className="w-5 h-5 text-white transition-transform duration-500 group-hover:rotate-12" />
                            ) : (
                                <Sun className="w-5 h-5 text-white transition-transform duration-500 group-hover:rotate-45" />
                            )}
                        </button>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                        {isLightMode ? "Switch to Dark Mode" : "Switch to Light Mode"}
                    </TooltipContent>
                </Tooltip>
            </div>
            <div className="flex flex-col gap-6">
                <p className="text-[#909092] font-satoshi text-lg leading-relaxed">
                I am a <HoverInfo
                    trigger={<span className="text-[#b5b5b6] font-bold">Frontend Developer</span>}
                    title="Frontend Developer"
                    description="Specializing in building responsive, accessible, and high-performance web interfaces using modern technologies."
                /> with a strong focus on building modern,
                visually appealing, and user-centric web applications. My journey into development
                is fueled by curiosity about how technology can solve real-world problems and a
                constant desire to learn and grow.. I enjoy crafting pixel-perfect user interfaces and building scalable,
                maintainable frontend architectures. With hands-on experience in modern
                tools and frameworks like{' '}
                <HoverInfo
                    trigger={<span className="text-[#b5b5b6] font-bold text-lg">React</span>}
                    title="React"
                    description="The library for web and native user interfaces. I use it to build component-based architecture."
                    joinedDate="May 2013"
                    icon={ReactIcon}
                />,{' '}
                <HoverInfo
                    trigger={<span className="text-[#b5b5b6] font-bold">TypeScript</span>}
                    title="TypeScript"
                    description="TypeScript is a strongly typed programming language that builds on JavaScript."
                    joinedDate="Oct 2012"
                    icon={TypeScript}
                />,{' '}
                <HoverInfo
                    trigger={<span className="text-[#b5b5b6] font-bold">Tailwind CSS</span>}
                    title="Tailwind CSS"
                    description="A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup."
                    joinedDate="Nov 2017"
                    icon={TailwindCss}
                />{' '}and{' '}
                <HoverInfo
                    trigger={<span className="text-[#b5b5b6] font-bold">Next.js</span>}
                    title="Next.js"
                    description="The React Framework for the Web. Used for server-side rendering and static site generation."
                    joinedDate="Oct 2016"
                    icon={NextJs}
                />{' '}I
                create responsive, accessible, and performance-optimized web applications.
            </p>
            <p className="text-[#909092] font-satoshi text-lg leading-relaxed">
                Beyond writing code, I care deeply about delivering great user experiences,
                <span className="text-[#b5b5b6]"> writing clean and reusable code, and collaborating effectively within a team. </span>
                I’m always eager to explore new technologies and apply them to meaningful projects.
            </p>
            <p className="text-[#909092] font-satoshi text-lg leading-relaxed">
                I am seeking opportunities where I can contribute my skills to impactful products
                while continuing to evolve as a developer and professional.
            </p>

            {/* Bucket List Link */}
            <div className="mt-4">
                <Link
                    to="/bucket-list"
                    className="inline-flex items-center gap-3 px-6 py-3 bg-[#111111] border border-[#2d2e2d] rounded-xl text-[#909092] hover:border-[#A3A3A3]/50 hover:bg-[#1a1a1a] transition-all duration-300 group shadow-lg shadow-black/20"
                >
                    <span className="text-lg font-bold font-outfit">View My Bucket List</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
            </div>
        </div>
    );
};
