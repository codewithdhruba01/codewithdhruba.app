import ScrollReveal from '../ui/ScrollReveal';
import { Tooltip, TooltipTrigger, TooltipContent } from '../ui/tooltip';

export const AboutWorkspace = () => {
    return (
        <div className="mt-0 border-t border-neutral-900 pt-6">
            <ScrollReveal>
                <h2 className="text-3xl font-bold font-excon mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-300 text-left">
                    Workspace
                </h2>
            </ScrollReveal>

            {/* Photo Card */}
            <ScrollReveal delay={0.1}>
                <div className="relative w-full rounded-2xl overflow-hidden border border-none shadow-xl mb-6 md:mb-12 group bg-[#101010]">
                    <img
                        src="/assets/workspace.jpeg"
                        alt="Workspace Setup"
                        className="w-full h-auto max-h-[480px] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
                </div>
            </ScrollReveal>

            {/* Workspace details */}
            <div className="flex flex-col gap-8 md:gap-12 mt-6 md:mt-8">
                {/* Workstation Category */}
                <ScrollReveal delay={0.15}>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-10 py-6 text-left">
                        <div className="md:col-span-1 flex items-center md:items-start gap-4 text-xs font-semibold uppercase tracking-widest text-[#909092] font-mono">
                            <span>Workstation</span>
                            <div className="hidden md:block h-[1px] flex-1 bg-neutral-800/80 mt-2"></div>
                        </div>
                        <div className="md:col-span-3 flex flex-col gap-8">
                            <div className="flex flex-col gap-1 group/title w-fit cursor-default">
                                <div className="flex items-center gap-2.5">
                                    <h4 className="text-lg md:text-xl font-bold font-outfit text-white">MacBook 13"</h4>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <a
                                                href="https://www.apple.com/macbook-pro/"
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
                                <p className="text-xs font-mono text-[#00DC82] mt-0.5">M1 2023, 8GB Memory, 256GB SSD</p>
                                <p className="text-neutral-400 font-satoshi text-sm md:text-base leading-relaxed mt-2">
                                    My ultimate powerhouse and absolute daily driver. The exceptional efficiency and outstanding performance of this machine enable me to build, compile, and design complex software without breaking a sweat.
                                </p>
                            </div>

                            <div className="flex flex-col gap-1 group/title w-fit cursor-default">
                                <div className="flex items-center gap-2.5">
                                    <h4 className="text-lg md:text-xl font-bold font-outfit text-white">Infinix InBook X1 14"</h4>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <a
                                                href="https://www.infinixmobility.com/"
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
                                <p className="text-xs font-mono text-[#00DC82] mt-0.5">Intel i5 10th Gen, 8GB RAM, 512GB SSD</p>
                                <p className="text-neutral-400 font-satoshi text-sm md:text-base leading-relaxed mt-2">
                                    This is my secondary system, which I mostly use for testing, running lightweight tools, or as a reliable backup machine.
                                </p>
                            </div>

                            <div className="flex flex-col gap-1 group/title w-fit cursor-default">
                                <div className="flex items-center gap-2.5">
                                    <h4 className="text-lg md:text-xl font-bold font-outfit text-white">BenQ™ 2K</h4>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <a
                                                href="https://www.benq.com/"
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
                                <p className="text-xs font-mono text-[#00DC82] mt-0.5">27 Inch Monitor</p>
                                <p className="text-neutral-400 font-satoshi text-sm md:text-base leading-relaxed mt-2">
                                    This is my secondary display. Mounted on a solid ergonomic arm, it provides the perfect vertical or horizontal layout for referencing documentation, tracking logs, and multitasking.
                                </p>
                            </div>

                            <div className="flex flex-col gap-1 group/title w-fit cursor-default">
                                <div className="flex items-center gap-2.5">
                                    <h4 className="text-lg md:text-xl font-bold font-outfit text-white">HP M270</h4>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <a
                                                href="https://www.hp.com/"
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
                                <p className="text-xs font-mono text-[#00DC82] mt-0.5">Gaming Mouse</p>
                                <p className="text-neutral-400 font-satoshi text-sm md:text-base leading-relaxed mt-2">
                                    This is my primary mouse. It has a highly ergonomic shape that fits perfectly in the hand, offering smooth tracking and precise control that keeps my daily workflows seamless.
                                </p>
                            </div>

                            <div className="flex flex-col gap-1 group/title w-fit cursor-default">
                                <div className="flex items-center gap-2.5">
                                    <h4 className="text-lg md:text-xl font-bold font-outfit text-white">Mester Keyboard</h4>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <a
                                                href="https://epomaker.com/"
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
                                <p className="text-xs font-mono text-[#00DC82] mt-0.5">Primary Keyboard • Mechanical Tactile Switches</p>
                                <p className="text-neutral-400 font-satoshi text-sm md:text-base leading-relaxed mt-2">
                                    This is my primary keyboard. The satisfying tactile feedback and highly responsive layout make writing code and long typing sessions incredibly comfortable and enjoyable.
                                </p>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Furniture Category */}
                <ScrollReveal delay={0.2}>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-10 py-6 border-t border-neutral-900 text-left">
                        <div className="md:col-span-1 flex items-center md:items-start gap-4 text-xs font-semibold uppercase tracking-widest text-[#909092] font-mono">
                            <span>Furniture</span>
                            <div className="hidden md:block h-[1px] flex-1 bg-neutral-800/80 mt-2"></div>
                        </div>
                        <div className="md:col-span-3 flex flex-col gap-8">
                            <div className="flex flex-col gap-1 group/title w-fit cursor-default">
                                <div className="flex items-center gap-2.5">
                                    <h4 className="text-lg md:text-xl font-bold font-outfit text-white">Engineered Wood Office Desk</h4>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <a
                                                href="https://amzn.in/d/0h3ilZMp"
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
                                <p className="text-xs font-mono text-[#00DC82] mt-0.5">120cm x 80cm</p>
                                <p className="text-neutral-400 font-satoshi text-sm md:text-base leading-relaxed mt-2">
                                    This spacious engineered wood desk is the anchor of my workspace. It offers ample surface area for my dual-screen setup and accessories while maintaining a clean, minimalist aesthetic.
                                </p>
                            </div>

                            <div className="flex flex-col gap-1 group/title w-fit cursor-default">
                                <div className="flex items-center gap-2.5">
                                    <h4 className="text-lg md:text-xl font-bold font-outfit text-white">Green Soul Ergonomic Chair</h4>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <a
                                                href="https://www.greensoul.online/"
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
                                <p className="text-neutral-400 font-satoshi text-sm md:text-base leading-relaxed mt-2">
                                    An incredibly comfortable and highly supportive ergonomic chair where I spend most of my day sitting, learning, and coding.
                                </p>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Accessories Category */}
                <ScrollReveal delay={0.25}>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-10 py-6 border-t border-neutral-900 text-left">
                        <div className="md:col-span-1 flex items-center md:items-start gap-4 text-xs font-semibold uppercase tracking-widest text-[#909092] font-mono">
                            <span>Accessories</span>
                            <div className="hidden md:block h-[1px] flex-1 bg-neutral-800/80 mt-2"></div>
                        </div>
                        <div className="md:col-span-3 flex flex-col gap-8">
                            <div className="flex flex-col gap-1 group/title w-fit cursor-default">
                                <div className="flex items-center gap-2.5">
                                    <h4 className="text-lg md:text-xl font-bold font-outfit text-white">Soundcore Anker H30i</h4>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <a
                                                href="https://www.soundcore.com/"
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
                                <p className="text-neutral-400 font-satoshi text-sm md:text-base leading-relaxed mt-2">
                                    Lightweight wireless headphones with long battery life, perfect for block-out focus sessions.
                                </p>
                            </div>
                            <div className="flex flex-col gap-1 group/title w-fit cursor-default">
                                <div className="flex items-center gap-2.5">
                                    <h4 className="text-lg md:text-xl font-bold font-outfit text-white">AKR 1740</h4>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <a
                                                href="https://www.google.com/search?q=AKR+1740+Desk+Lamp"
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
                                <p className="text-xs font-mono text-[#00DC82] mt-0.5">Desk Lamp</p>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </div>
    );
};
