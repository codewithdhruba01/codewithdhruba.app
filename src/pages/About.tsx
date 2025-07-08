import {
  Mail,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";

export default function AboutMe() {
  return (
    <section
      id="about"
      className="min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center justify-center px-4 py-12 pt-[100px] md:pt-0"
      data-aos="fade-up"
    >
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Profile Card */}
        <div
          className="bg-[#111] rounded-2xl p-4 flex flex-col items-center shadow-lg"
          data-aos="zoom-in"
        >
          <img
            src="/blog/thumbnails/cover-image.jpg"
            alt="Profile"
            className="rounded-xl mb-4 w-full object-cover"
          />
          <h2 className="text-xl font-semibold">Dhrubaraj Pati</h2>
          <p className="text-[#00DC82] mb-4">Software Engineer</p>
          <div className="flex flex-wrap gap-2 mb-4 justify-center">
            {[
              "Operating System",
              "Front-End Development",
              "Python",
              "Full Stack Development",
              "Networking",
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
              className="flex items-center gap-2 hover:text-[#00DC82]"
            >
              <Mail size={16} /> pati.dhrubaraj@outlook.com
            </a>
            <a
              href="https://github.com/codewithdhruba01"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[#00DC82]"
            >
              <Github size={16} /> github.com/codewithdhruba01
            </a>
            <a
              href="https://x.com/codewithdhruba"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[#00DC82]"
            >
              <Twitter size={16} /> @codewithdhruba
            </a>
            <a
              href="https://www.linkedin.com/in/dhrubaraj-pati/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[#00DC82]"
            >
              <Linkedin size={16} />@dhrubaraj-pati
            </a>
          </div>
        </div>

        {/* Right About Me Section */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <h1 className="text-4xl font-bold">
            About <span className="text-[#00DC82]">Me</span>
          </h1>
          <p className="text-gray-400">
            I'm a passionate Full Stack Developer based in India, with a strong focus on creating beautiful and functional web applications.
            My journey as a developer is driven by a genuine curiosity about how technology shapes our lives and a deep commitment to building meaningful solutions.
            From designing pixel-perfect user interfaces to architecting scalable back-end systems, I find excitement in every part of the development process.
            On the front end, I specialize in creating responsive and accessible web applications using modern frameworks like React and Tailwind CSS.
          </p>
          <p className="text-gray-400">
            Currently pursuing my <strong>BCA in Computer Science and Engineering,</strong> I love exploring new technologies and building innovative solutions.
          </p>
          <p className="text-gray-400">
            Beyond coding, I'm passionate about exploring cutting-edge technologies, actively contributing to <strong>open-source communities</strong>,
            and continuously learning about the latest innovations in web development to sharpen my skills and stay ahead in the tech world.
          </p>

          {/* Education Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">Education</h2>
            <ul className="space-y-2">
              <li>
                <strong className="text-[#949494]">
                  Bachelor of Computer Application
                </strong>
                <br />
                Swami Vivekananda University Kolkata{" "}
                <span className="text-[#00DC82]">( 2023 - Present )</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
