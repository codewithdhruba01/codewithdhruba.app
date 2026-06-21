import { useState } from 'react';
import HoverInfo from '../ui/HoverInfo';
import ReactIcon from '../svgs/ReactIcon';
import TypeScript from '../svgs/TypeScript';
import TailwindCss from '../svgs/TailwindCss';
import NextJs from '../svgs/NextJs';
import { Sun, Moon } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent } from '../ui/tooltip';
import { InteractiveAboutBanner } from './InteractiveAboutBanner';

export const AboutContent = () => {
    const [isLightMode, setIsLightMode] = useState(false);

    // Play click audio sound from public/Audio/
    const playClickSound = () => {
        const audio = new Audio('/Audio/public_audio_toggle-on.MP3');
        audio.volume = 0.1; // Lower volume for a very soft and pleasant click
        audio.play().catch((err) => console.log('Audio play blocked or failed:', err));
    };

    return (
        <div className="flex flex-col mt-6">
            {/* Interactive Polaroid Pin-Board Banner */}
            <InteractiveAboutBanner isLightMode={isLightMode} />

            <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl md:text-4xl font-extrabold font-bricolage bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-300">
                    About <span className="text-[#00DC82]">Me</span>
                </h1>
                <Tooltip>
                    <TooltipTrigger>
                        <button
                            onClick={() => {
                                setIsLightMode(!isLightMode);
                                playClickSound();
                            }}
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
                <p className="text-neutral-400 font-satoshi text-sm md:text-base leading-relaxed">
                    I am a <HoverInfo
                        trigger={<span className="text-[#b5b5b6] font-bold">Frontend Developer</span>}
                        title="Frontend Developer"
                        description="Specializing in building responsive, accessible, and high-performance web interfaces using modern technologies."
                    />{' '}with a strong focus on building modern,
                    visually appealing, and user-centric web applications. My journey into development
                    is fueled by curiosity about how technology can solve real-world problems and a
                    constant desire to learn and grow.. I enjoy crafting pixel-perfect user interfaces and building scalable,
                    maintainable frontend architectures. With hands-on experience in modern
                    tools and frameworks like{' '}
                    <HoverInfo
                        trigger={<span className="text-[#b5b5b6] font-bold text-base">React</span>}
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
                <p className="text-neutral-400 font-satoshi text-sm md:text-base leading-relaxed">
                    Beyond writing code, I care deeply about delivering great user experiences,
                    <span className="text-[#b5b5b6]"> writing clean and reusable code, and collaborating effectively within a team. </span>
                    I’m always eager to explore new technologies and apply them to meaningful projects.
                </p>
                <p className="text-neutral-400 font-satoshi text-sm md:text-base leading-relaxed">
                    I am seeking opportunities where I can contribute my skills to impactful products
                    while continuing to evolve as a developer and professional.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-10 py-6 text-left">
                <div className="md:col-span-1 flex items-center md:items-start gap-4 text-xs font-semibold uppercase tracking-widest text-[#909092] font-mono">
                    <span>Education</span>
                    <div className="hidden md:block h-[1px] flex-1 bg-neutral-800/80 mt-2"></div>
                </div>
                <div className="md:col-span-3 flex flex-col gap-8">
                    <div className="flex flex-col gap-1 group/title w-fit cursor-default">
                        <div className="flex items-center gap-2.5">
                            <h4 className="text-lg md:text-xl font-bold font-outfit text-white">Bachelors of Computer Application</h4>
                            <Tooltip>
                                <TooltipTrigger>
                                    <a
                                        href="https://swamivivekanandauniversity.ac.in/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-neutral-700 bg-transparent opacity-0 -translate-x-1.5 scale-90 group-hover/title:opacity-100 group-hover/title:translate-x-0 group-hover/title:scale-100 hover:border-neutral-500 transition-all duration-300 ease-out select-none cursor-pointer"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                                    </a>
                                </TooltipTrigger>
                                <TooltipContent side="top">
                                    <span className="text-xs font-mono">Link</span>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                        <p className="text-xs font-mono text-[#00DC82] mt-0.5">Swami Vivekananda University (2023-2027)</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
