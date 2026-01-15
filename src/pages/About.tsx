import { Mail, Github, Twitter, Linkedin } from 'lucide-react';
import { useState } from 'react';

export default function AboutMe() {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section
      id="about"
      className="min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center justify-center px-4 py-20"
      data-aos="fade-up"
    >
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
        {/* Left Profile Card */}
        <div
          className="bg-[#101010] border border-neutral-800 rounded-2xl p-6 flex flex-col items-center shadow-lg mt-6"
          data-aos="zoom-in"
        >
          <img
            src="/assets/profilepic.jpeg"
            alt="Profile"
            className={`rounded-xl mb-6 w-full object-cover transition-all duration-500 ${
              imageLoaded ? 'blur-0' : 'blur-md'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
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

        {/* Right About Me Section */}
        <div className="md:col-span-2 flex flex-col gap-8 mt-6" data-aos="fade-up">
          <h1 className="text-6xl font-bold font-excon md:text-7xl mb-4">
            About <span className="text-[#00DC82]">Me</span>
          </h1>
          <p className="text-gray-400 font-satoshi text-xl leading-relaxed">
            I am a passionate <span className="text-white font-bold">Frontend Developer</span> with a strong focus on building modern,
            visually appealing, and user-centric web applications. My journey into development
            is fueled by curiosity about how technology can solve real-world problems and a
            constant desire to learn and grow. I enjoy crafting pixel-perfect user interfaces and building scalable,
            maintainable frontend architectures. With hands-on experience in modern
            tools and frameworks like <span className="text-white font-bold">React, TypeScript, Tailwind CSS and Next.js </span>
            I create responsive, accessible, and performance-optimized web applications.
          </p>
          <p className="text-gray-400 font-satoshi text-xl leading-relaxed">
            Beyond writing code, I care deeply about delivering great user experiences,
            <span className="text-white font-bold"> writing clean and reusable code, and collaborating effectively within a team. </span>
            I’m always eager to explore new technologies and apply them to meaningful projects.
          </p>
          <p className="text-gray-400 font-satoshi text-xl leading-relaxed">
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
                <div className="font-satoshi text-gray-400">
                  Swami Vivekananda University Kolkata{' '}
                  <span className="text-[#00DC82] font-satoshi">
                    ( 2023 - Present )
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
