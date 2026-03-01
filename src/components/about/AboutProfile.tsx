import { useState } from 'react';
import { Mail, Github, Twitter, Linkedin } from 'lucide-react';

export const AboutProfile = () => {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <div
            className="bg-[#101010] border border-neutral-800 rounded-2xl p-6 flex flex-col items-center shadow-lg mt-6 h-fit md:sticky md:top-32"
            data-aos="zoom-in"
        >
            <div className="relative w-full rounded-xl mb-6 overflow-hidden">
                {/* Gradient Placeholder with Noise */}
                <div
                    className={`absolute inset-0 z-10 transition-opacity duration-700 ${imageLoaded ? 'opacity-0' : 'opacity-100'
                        } bg-gradient-to-br from-emerald-900/40 via-neutral-900 to-black`}
                >
                    <div className="absolute inset-0 opacity-20 bg-[url('/assets/noise.svg')]"></div>
                </div>

                <img
                    src="/assets/profilepic.jpeg"
                    alt="Profile"
                    className={`w-full object-cover transition-all duration-500 ${imageLoaded ? 'blur-0' : 'blur-md'
                        }`}
                    onLoad={() => setImageLoaded(true)}
                />
            </div>
            <h2 className="text-xl font-semibold font-synonym">Dhrubaraj Pati</h2>
            <p className="text-[#00DC82] mb-4 font-outfit">Frontend Developer</p>
            <div className="flex flex-wrap gap-2 mb-4 justify-center font-supreme">
                {[
                    'HTML',
                    'CSS',
                    'JavaScript',
                    'Tailwind CSS',
                    'React',
                    'Next.js',
                    'Node.js',
                    'Front-End Development',
                ].map((tag) => (
                    <span
                        key={tag}
                        className="bg-[#222] text-sm px-3 py-1 rounded-full text-[#00DC82]"
                    >
                        {tag}
                    </span>
                ))}
            </div>
            <div className="flex flex-col gap-2 text-sm w-full">
                <a
                    href="mailto:pati.dhrubaraj@outlook.com"
                    className="flex items-center gap-2 hover:text-[#00DC82] font-satoshi"
                >
                    <Mail size={16} /> pati.dhrubaraj@outlook.com
                </a>
                <a
                    href="https://github.com/codewithdhruba01"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-[#00DC82] font-satoshi"
                >
                    <Github size={16} /> github.com/codewithdhruba01
                </a>
                <a
                    href="https://x.com/codewithdhruba"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-[#00DC82] font-satoshi"
                >
                    <Twitter size={16} /> @codewithdhruba
                </a>
                <a
                    href="https://www.linkedin.com/in/dhrubaraj-pati/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-[#00DC82] font-satoshi"
                >
                    <Linkedin size={16} />
                    @dhrubaraj-pati
                </a>
            </div>
        </div>
    );
};
