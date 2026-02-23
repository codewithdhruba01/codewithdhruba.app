import HoverInfo from '../ui/HoverInfo';
import ReactIcon from '../svgs/ReactIcon';
import TypeScript from '../svgs/TypeScript';
import TailwindCss from '../svgs/TailwindCss';
import NextJs from '../svgs/NextJs';

export const AboutContent = () => {
    return (
        <div className="md:col-span-2 flex flex-col gap-8 mt-6" data-aos="fade-up">
            <h1 className="text-6xl font-bold font-excon md:text-7xl mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400">
                About <span className="text-[#00DC82]">Me</span>
            </h1>
            <p className="text-[#A3A3A3] font-satoshi text-lg leading-relaxed">
                I am a <HoverInfo
                    trigger={<span className="text-white font-bold">Frontend Developer</span>}
                    title="Frontend Developer"
                    description="Specializing in building responsive, accessible, and high-performance web interfaces using modern technologies."
                /> with a strong focus on building modern,
                visually appealing, and user-centric web applications. My journey into development
                is fueled by curiosity about how technology can solve real-world problems and a
                constant desire to learn and grow. I enjoy crafting pixel-perfect user interfaces and building scalable,
                maintainable frontend architectures. With hands-on experience in modern
                tools and frameworks like{' '}
                <HoverInfo
                    trigger={<span className="text-white font-bold text-lg">React</span>}
                    title="React"
                    description="The library for web and native user interfaces. I use it to build component-based architecture."
                    joinedDate="May 2013"
                    icon={ReactIcon}
                />,{' '}
                <HoverInfo
                    trigger={<span className="text-white font-bold">TypeScript</span>}
                    title="TypeScript"
                    description="TypeScript is a strongly typed programming language that builds on JavaScript."
                    joinedDate="Oct 2012"
                    icon={TypeScript}
                />,{' '}
                <HoverInfo
                    trigger={<span className="text-white font-bold">Tailwind CSS</span>}
                    title="Tailwind CSS"
                    description="A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup."
                    joinedDate="Nov 2017"
                    icon={TailwindCss}
                />{' '}and{' '}
                <HoverInfo
                    trigger={<span className="text-white font-bold">Next.js</span>}
                    title="Next.js"
                    description="The React Framework for the Web. Used for server-side rendering and static site generation."
                    joinedDate="Oct 2016"
                    icon={NextJs}
                />{' '}I
                create responsive, accessible, and performance-optimized web applications.
            </p>
            <p className="text-[#A3A3A3] font-satoshi text-lg leading-relaxed">
                Beyond writing code, I care deeply about delivering great user experiences,
                <span className="text-white"> writing clean and reusable code, and collaborating effectively within a team. </span>
                I’m always eager to explore new technologies and apply them to meaningful projects.
            </p>
            <p className="text-[#A3A3A3] font-satoshi text-lg leading-relaxed">
                I am seeking opportunities where I can contribute my skills to impactful products
                while continuing to evolve as a developer and professional.
            </p>

            {/* Education Section */}
            <div>
                <h2 className="text-3xl font-bold mb-3 font-synonym">Education</h2>
                <ul className="space-y-2">
                    <li>
                        <strong className="text-[#949494] font-outfit">
                            Bachelor of Computer Application
                        </strong>
                        <br />
                        <div className="font-satoshi text-[#A3A3A3]">
                            Swami Vivekananda University Kolkata{' '}
                            <span className="text-[#00DC82] font-satoshi">
                                ( 2023 - Present )
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};
