import {
  GithubIcon,
  LinkedinIcon,
  XIcon,
  InstagramIcon,
  ThreadsIcon,
  BlueskyLine,
} from '../icons/SocialIcons';

const Footer = () => {
  return (
    <footer className="bg-neutral-950 pt-20 pb-8 relative">
      {/* Top Gradient Line: Fade from transparent to #333333 to transparent */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#333333] to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
          <div className="col-span-1 md:col-span-6">
            <div>
              <h2 className="text-white text-xl font-bold flex items-center space-x-2 mb-2">
                <img src="/logo/logo.png" alt="Logo" className="h-9 w-8" />
                <span className="h-8 w-8 text-3xl font-outfit text-[#FFFFFF]">
                  hrubaraj
                </span>
              </h2>
            </div>
            <p className="text-[#737373] mb-6 max-w-md font-poppins">
              Crafting modern web experiences with code, creativity,
              and a commitment to turning ideas into impactful solutions.
            </p>

            {/* Spotify Widget */}
            <a
              href="https://open.spotify.com/playlist/7vcmvUAHBN1KU4KUQqDP03?si=03momC0tQ_a1SSmzOlE7-A" // Placeholder Playlist URL
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 mb-6 group w-fit"
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                {/* Spinning Vinyl Effect / Icon */}
                <div className="absolute inset-0 bg-[#1DB954] rounded-full opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
                  alt="Spotify"
                  className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="flex items-center gap-1.5 text-sm font-medium font-outfit">
                <span className="text-gray-300 group-hover:text-[#1DB954] transition-colors">
                  My Ordinary Life
                </span>
                <span className="text-gray-600">—</span>
                <span className="text-[#737373] group-hover:text-[#FFFFFF] transition-colors">
                  Everyday Feelings
                </span>
              </div>
            </a>

            {/* Social Icons */}
            <div className="flex space-x-2">
              <a
                href="https://github.com/codewithdhruba01"
                className="group p-2 rounded-lg transition-all duration-300 ease-in-out hover:bg-gray-800/50"
              >
                <GithubIcon size="20" className="group-hover:stroke-white transition-all duration-300 ease-in-out" />
              </a>

              <a
                href="https://www.linkedin.com/in/dhrubaraj-pati/"
                className="group p-2 rounded-lg transition-all duration-300 ease-in-out hover:bg-gray-800/50"
              >
                <LinkedinIcon size="22" className="group-hover:fill-white transition-colors duration-300" />
              </a>

              <a
                href="https://x.com/codewithdhruba"
                className="group p-2 rounded-lg transition-all duration-300 ease-in-out hover:bg-gray-800/50"
              >
                <XIcon size="20" className="group-hover:fill-white transition-colors duration-300" />
              </a>

              <a
                href="https://www.instagram.com/dhrubaraj_pati/"
                className="group p-2 rounded-lg transition-all duration-300 ease-in-out hover:bg-gray-800/50"
              >
                <InstagramIcon size="20" className="group-hover:stroke-white transition-all duration-300 ease-in-out" />
              </a>

              <a
                href="https://www.threads.com/@dhrubaraj_pati"
                className="group p-2 rounded-lg transition-all duration-300 ease-in-out hover:bg-gray-800/50"
              >
                <ThreadsIcon size="20" className="group-hover:fill-white transition-colors duration-300" />
              </a>

              <a
                href="https://bsky.app/profile/dhrubaraj.bsky.social"
                className="group p-2 rounded-lg transition-all duration-300 ease-in-out hover:bg-gray-800/50"
              >
                <BlueskyLine size="20" className="group-hover:fill-white transition-colors duration-300" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 md:col-span-3">
            <h3 className="text-lg font-bold font-outfit text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-1">
              <li>
                <a href="/#projects" className="text-[#A3A3A3] hover:text-green-400 transition-colors font-outfit">
                  Project
                </a>
              </li>
              <li>
                <a href="/#education" className="text-[#A3A3A3] hover:text-green-400 transition-colors font-outfit">
                  Education
                </a>
              </li>
              <li>
                <a href="/#skills" className="text-[#A3A3A3] hover:text-green-400 transition-colors font-outfit">
                  Skills
                </a>
              </li>
              <li>
                <a href="/#contributions" className="text-[#A3A3A3] hover:text-green-400 transition-colors font-outfit">
                  GitHub Activity
                </a>
              </li>
            </ul>
          </div>

          {/* Pages */}
          <div className="col-span-1 md:col-span-3">
            <h3 className="text-lg font-bold font-outfit text-white mb-4">
              Pages
            </h3>
            <ul className="space-y-1">
              <li><a href="/about" className="text-[#A3A3A3] hover:text-green-400 transition-colors font-outfit">About</a></li>
              <li><a href="/projects" className="text-[#A3A3A3] hover:text-green-400 transition-colors font-outfit">Projects</a></li>
              <li><a href="/all-posts" className="text-[#A3A3A3] hover:text-green-400 transition-colors font-outfit">Blogs</a></li>
              <li><a href="/certificates" className="text-[#A3A3A3] hover:text-green-400 transition-colors font-outfit">Achievements</a></li>
              <li><a href="/contact" className="text-[#A3A3A3] hover:text-green-400 transition-colors font-outfit">Contact Us</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 relative flex flex-col justify-between items-center">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#333333] to-transparent"></div>
          <p className="text-[#737373] text-sm mb-4 md:mb-0 font-satoshi">
            © 2026. All rights reserved.
          </p>
          <p className="text-[#737373] text-sm flex items-center font-satoshi">
            Design & Developed by Dhrubaraj Pati
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
