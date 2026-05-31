import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sun, FileText } from 'lucide-react';
import {
  GithubIcon,
  LinkedinIcon,
  XIcon,
  LeetcodeIcon,
} from './icons/SocialIcons';
import { Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip';

import ScrollReveal from './ui/ScrollReveal';

const Hero = () => {
  const [githubFollowers, setGithubFollowers] = useState<number | null>(null);
  const [avatarBg, setAvatarBg] = useState<'black' | 'white' | 'sky'>(() => {
    const saved = localStorage.getItem('avatar_bg_theme');
    return (saved as 'black' | 'white' | 'sky') || 'black';
  });

  // Play click audio sound from public/Audio/
  const playClickSound = () => {
    const audio = new Audio('/Audio/public_audio_toggle-on.MP3');
    audio.volume = 0.1; // Lower volume for a very soft and pleasant click
    audio.play().catch((err) => console.log('Audio play blocked or failed:', err));
  };

  const handleThemeClick = () => {
    playClickSound();
    setAvatarBg((prev) => {
      const next = prev === 'black' ? 'white' : prev === 'white' ? 'sky' : 'black';
      localStorage.setItem('avatar_bg_theme', next);
      return next;
    });
  };

  useEffect(() => {
    // Fetch GitHub follower count dynamically using the configured GitHub username
    fetch('https://api.github.com/users/codewithdhruba01')
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.followers === 'number') {
          setGithubFollowers(data.followers);
        }
      })
      .catch((err) => console.error('Failed to fetch GitHub followers:', err));
  }, []);

  // Format the followers count nicely
  const formatFollowers = (count: number | null) => {
    if (count === null) return '2.2k'; // Fallback to 2.2k as seen in the reference screenshot
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <section
      id="home"
      className="relative bg-[#0A0A0A] pt-24 md:pt-28 pb-12 md:pb-16"
    >
      <ScrollReveal className="max-w-4xl mx-auto w-full px-6 flex flex-col">
        {/* Banner Image Container */}
        <div className="relative w-full rounded-2xl overflow-hidden aspect-[13/5] sm:aspect-[3/1] bg-neutral-900 border border-neutral-800">
          <img
            src="/assets/banner.jpg"
            alt="Mountain landscape banner"
            className="w-full h-full object-cover object-center brightness-[0.75]"
          />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <p className="font-serif italic text-white/95 text-center text-sm sm:text-base md:text-lg max-w-md md:max-w-xl leading-relaxed select-none drop-shadow-md">
              "First, solve the problem. Then, write the code."
            </p>
          </div>
        </div>

        {/* Avatar and GitHub Stats Overlap Row */}
        <div className="relative px-4 flex justify-between items-end -mt-10 sm:-mt-12 md:-mt-14 z-10">
          {/* Avatar */}
          <div className={`relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-[#0A0A0A] shadow-md transition-colors duration-300 ${avatarBg === 'black' ? 'bg-[#0A0A0A]' : avatarBg === 'white' ? 'bg-[#FAF9F6]' : 'bg-[#bae6fd]'
            }`}>
            <img
              src="/assets/my_avater.png"
              alt="Dhrubaraj Pati"
              className="w-full h-full object-cover"
            />
          </div>

          {/* GitHub followers badge */}
          <div className="pb-2 md:pb-4">
            <Tooltip>
              <TooltipTrigger>
                <a
                  href="https://github.com/codewithdhruba01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111111]/80 backdrop-blur-sm border border-neutral-800 text-neutral-300 hover:text-white text-xs font-medium transition duration-200 select-none shadow-sm cursor-pointer"
                >
                  <GithubIcon size="14" className="stroke-neutral-300 inline" />
                  <span>{formatFollowers(githubFollowers)}</span>
                </a>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Follow me!</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Personal Info and Social Icons Row */}
        <div className="mt-6 px-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Name and subtitle */}
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-neutral-200">
              Dhrubaraj Pati
            </h2>
            <p className="mt-1.5 font-mono text-xs md:text-sm text-neutral-500">
              engineer • developer • builder
            </p>
          </div>

          {/* Social Icons & Theme Toggle */}
          <div className="flex items-center gap-2">
            {/* GitHub Link */}
            <Tooltip>
              <TooltipTrigger>
                <a
                  href="https://github.com/codewithdhruba01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full border border-neutral-800 bg-[#111111]/50 hover:bg-neutral-800 text-neutral-400 hover:text-white transition duration-200 flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95"
                >
                  <GithubIcon size="16" className="stroke-current" />
                </a>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>GitHub</p>
              </TooltipContent>
            </Tooltip>

            {/* X / Twitter Link */}
            <Tooltip>
              <TooltipTrigger>
                <a
                  href="https://x.com/codewithdhruba"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full border border-neutral-800 bg-[#111111]/50 hover:bg-neutral-800 text-neutral-400 hover:text-white transition duration-200 flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95"
                >
                  <XIcon size="16" className="fill-current" />
                </a>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>X (Twitter)</p>
              </TooltipContent>
            </Tooltip>

            {/* LinkedIn Link */}
            <Tooltip>
              <TooltipTrigger>
                <a
                  href="https://www.linkedin.com/in/dhrubaraj-pati/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full border border-neutral-800 bg-[#111111]/50 hover:bg-neutral-800 text-neutral-400 hover:text-white transition duration-200 flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95"
                >
                  <LinkedinIcon size="16" className="fill-current" />
                </a>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>LinkedIn</p>
              </TooltipContent>
            </Tooltip>

            {/* Leetcode Link */}
            <Tooltip>
              <TooltipTrigger>
                <a
                  href="https://leetcode.com/u/codewithdhruba/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full border border-neutral-800 bg-[#111111]/50 hover:bg-neutral-800 text-neutral-400 hover:text-white transition duration-200 flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95"
                >
                  <LeetcodeIcon size="16" className="fill-current" />
                </a>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>LeetCode</p>
              </TooltipContent>
            </Tooltip>

            {/* Theme Toggle */}
            <Tooltip>
              <TooltipTrigger>
                <button
                  onClick={handleThemeClick}
                  className="p-2.5 rounded-full border border-neutral-800 bg-[#111111]/50 hover:bg-neutral-800 text-neutral-400 hover:text-white transition duration-200 flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 hover:rotate-45"
                >
                  <Sun className="w-4 h-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Change Avatar Theme</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Dashed Separator */}
        <hr className="my-6 border-t border-dashed border-neutral-800" />

        {/* Bio Section */}
        <div className="px-1">
          <h3 className="font-bold text-neutral-200 text-base sm:text-lg mb-3">
            I build from scratch.
          </h3>
          <p className="text-neutral-400 leading-relaxed text-base">
            I am a <strong className="text-neutral-200">22 Year Old Full-Stack Developer</strong> dedicated to building scalable, high-performance web applications with{' '}
            <a
              href="https://www.typescriptlang.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#171717] border border-neutral-800 text-neutral-200 hover:text-white transition duration-200 text-xs font-medium"
            >
              <svg viewBox="0 0 128 128" className="w-3 h-3">
                <path fill="#fff" d="M22.67 47h99.67v73.67H22.67z"></path>
                <path
                  fill="#007acc"
                  d="M1.5 63.91v62.5h125v-125H1.5zm100.73-5a15.56 15.56 0 017.82 4.5 20.58 20.58 0 013 4c0 .16-5.4 3.81-8.69 5.85-.12.08-.6-.44-1.13-1.23a7.09 7.09 0 00-5.87-3.53c-3.79-.26-6.23 1.73-6.21 5a4.58 4.58 0 00.54 2.34c.83 1.73 2.38 2.76 7.24 4.86 8.95 3.85 12.78 6.39 15.16 10 2.66 4 3.25 10.46 1.45 15.24-2 5.2-6.9 8.73-13.83 9.9a38.32 38.32 0 01-9.52-.1 23 23 0 01-12.72-6.63c-1.15-1.27-3.39-4.58-3.25-4.82a9.34 9.34 0 011.15-.73L82 101l3.59-2.08.75 1.11a16.78 16.78 0 004.74 4.54c4 2.1 9.46 1.81 12.16-.62a5.43 5.43 0 00.69-6.92c-1-1.39-3-2.56-8.59-5-6.45-2.78-9.23-4.5-11.77-7.24a16.48 16.48 0 01-3.43-6.25 25 25 0 01-.22-8c1.33-6.23 6-10.58 12.82-11.87a31.66 31.66 0 019.49.26zm-29.34 5.24v5.12H56.66v46.23H45.15V69.26H28.88v-5a49.19 49.19 0 01.12-5.17C29.08 59 39 59 51 59h21.83z"
                ></path>
              </svg>
              <span>TypeScript</span>
            </a>{' '}
            ,{' '}
            <a
              href="https://react.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#171717] border border-neutral-800 text-neutral-200 hover:text-white transition duration-200 text-xs font-medium"
            >
              <svg viewBox="0 0 128 128" className="w-3 h-3">
                <g fill="#61DAFB">
                  <circle cx="64" cy="64" r="11.4"></circle>
                  <path d="M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13.2-.2-22.5-6.6-26.1-1.9-1.1-4-1.6-6.4-1.6-7 0-15.9 5.2-24.9 13.9-9-8.7-17.9-13.9-24.9-13.9-2.4 0-4.5.5-6.4 1.6-6.4 3.7-8.7 13-6.6 26.1.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.4-6.9 2.3C8.2 50 1.4 56.6 1.4 64s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13.2.2 22.5 6.6 26.1 1.9 1.1 4 1.6 6.4 1.6 7.1 0 16-5.2 24.9-13.9 9 8.7 17.9 13.9 24.9 13.9 2.4 0 4.5-.5 6.4-1.6 6.4-3.7 8.7-13 6.6-26.1-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.4 6.9-2.3 12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8zM92.5 14.7c4.1 2.4 5.5 9.8 3.8 20.3-.3 2.1-.8 4.3-1.4 6.6-5.2-1.2-10.7-2-16.5-2.5-3.4-4.8-6.9-9.1-10.4-13 7.4-7.3 14.9-12.3 21-12.3 1.3 0 2.5.3 3.5.9zM81.3 74c-1.8 3.2-3.9 6.4-6.1 9.6-3.7.3-7.4.4-11.2.4-3.9 0-7.6-.1-11.2-.4-2.2-3.2-4.2-6.4-6-9.6-1.9-3.3-3.7-6.7-5.3-10 1.6-3.3 3.4-6.7 5.3-10 1.8-3.2 3.9-6.4 6.1-9.6 3.7-.3 7.4-.4 11.2-.4 3.9 0 7.6.1 11.2.4 2.2 3.2 4.2 6.4 6 9.6 1.9 3.3 3.7 6.7 5.3 10-1.7 3.3-3.4 6.6-5.3 10zm8.3-3.3c1.5 3.5 2.7 6.9 3.8 10.3-3.4.8-7 1.4-10.8 1.9 1.2-1.9 2.5-3.9 3.6-6 1.2-2.1 2.3-4.2 3.4-6.2zM64 97.8c-2.4-2.6-4.7-5.4-6.9-8.3 2.3.1 4.6.2 6.9.2 2.3 0 4.6-.1 6.9-.2-2.2 2.9-4.5 5.7-6.9 8.3zm-18.6-15c-3.8-.5-7.4-1.1-10.8-1.9 1.1-3.3 2.3-6.8 3.8-10.3 1.1 2 2.2 4.1 3.4 6.1 1.2 2.2 2.4 4.1 3.6 6.1zm-7-25.5c-1.5-3.5-2.7-6.9-3.8-10.3 3.4-.8 7-1.4 10.8-1.9-1.2 1.9-2.5 3.9-3.6 6-1.2 2.1-2.3 4.2-3.4 6.2zM64 30.2c2.4 2.6 4.7 5.4 6.9 8.3-2.3-.1-4.6-.2-6.9-.2-2.3 0-4.6.1-6.9.2 2.2-2.9 4.5-5.7 6.9-8.3zm22.2 21l-3.6-6c3.8.5 7.4 1.1 10.8 1.9-1.1 3.3-2.3 6.8-3.8 10.3-1.1-2.1-2.2-4.2-3.4-6.2zM31.7 35c-1.7-10.5-.3-17.9 3.8-20.3 1-.6 2.2-.9 3.5-.9 6 0 13.5 4.9 21 12.3-3.5 3.8-7 8.2-10.4 13-5.8.5-11.3 1.4-16.5 2.5-.6-2.3-1-4.5-1.4-6.6zM7 64c0-4.7 5.7-9.7 15.7-13.4 2-.8 4.2-1.5 6.4-2.1 1.6 5 3.6 10.3 6 15.6-2.4 5.3-4.5 10.5-6 15.5C15.3 75.6 7 69.6 7 64zm28.5 49.3c-4.1-2.4-5.5-9.8-3.8-20.3.3-2.1.8-4.3 1.4-6.6 5.2 1.2 10.7 2 16.5 2.5 3.4 4.8 6.9 9.1 10.4 13-7.4 7.3-14.9 12.3-21 12.3-1.3 0-2.5-.3-3.5-.9zM96.3 93c1.7 10.5.3 17.9-3.8 20.3-1 .6-2.2.9-3.5.9-6 0-13.5-4.9-21-12.3 3.5-3.8 7-8.2 10.4-13 5.8-.5 11.3-1.4 16.5-2.5.6 2.3 1 4.5 1.4 6.6zm9-15.6c-2 .8-4.2 1.5-6.4 2.1-1.6-5-3.6-10.3-6-15.6 2.4-5.3 4.5-10.5 6-15.5 13.8 4 22.1 10 22.1 15.6 0 4.7-5.8 9.7-15.7 13.4z"></path>
                </g>
              </svg>
              <span>React</span>
            </a>{' '}
            , and{' '}
            <a
              href="https://nextjs.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#171717] border border-neutral-800 text-neutral-200 hover:text-white transition duration-200 text-xs font-medium"
            >
              <svg viewBox="0 0 128 128" className="w-3 h-3 bg-white rounded-full">
                <circle cx="64" cy="64" r="64" fill="#000"></circle>
                <path
                  fill="url(#nextjs-gradient-a)"
                  d="M106.317 112.014 49.167 38.4H38.4v51.179h8.614v-40.24l52.54 67.884a64.216 64.216 0 0 0 6.763-5.209z"
                ></path>
                <path fill="url(#nextjs-gradient-b)" d="M81.778 38.4h8.533v51.2h-8.533z"></path>
                <defs>
                  <linearGradient
                    id="nextjs-gradient-a"
                    x1="109"
                    x2="144.5"
                    y1="116.5"
                    y2="160.5"
                    gradientTransform="scale(.71111)"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#fff"></stop>
                    <stop offset="1" stopColor="#fff" stopOpacity="0"></stop>
                  </linearGradient>
                  <linearGradient
                    id="nextjs-gradient-b"
                    x1="121"
                    x2="120.799"
                    y1="54"
                    y2="106.875"
                    gradientTransform="scale(.71111)"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#fff"></stop>
                    <stop offset="1" stopColor="#fff" stopOpacity="0"></stop>
                  </linearGradient>
                </defs>
              </svg>
              <span>Next.js</span>
            </a>{' '}
            . Guided by a user-first mindset, I translate complex engineering challenges into seamless, intuitive interfaces, write clean code, and contribute to impactful open-source projects. Always eager to push boundaries, I focus on delivering modern digital solutions that are robust, beautiful, and highly functional.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-3 mt-8 px-1">
          <Link
            to="/resume"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-neutral-800 bg-[#171717] hover:bg-neutral-800 text-neutral-200 hover:text-white font-medium text-xs transition-all duration-200 shadow-sm"
          >
            <FileText className="w-3.5 h-3.5" />
            Resume / CV
          </Link>
          <Link
            to="/about"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white hover:bg-neutral-200 text-black font-medium text-xs transition-all duration-200 shadow-sm"
          >
            <img src="/assets/my_avater.png" alt="Avatar" className="w-4 h-4 rounded-full object-cover" />
            About Me
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default Hero;
