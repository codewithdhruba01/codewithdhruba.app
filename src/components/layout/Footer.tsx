import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  GithubIcon,
  LinkedinIcon,
  XIcon,
  InstagramIcon,
  ThreadsIcon,
  BlueskyLine,
  CodepenIcon,
} from '../icons/SocialIcons';
import { commentService } from '../../lib/supabase';

const getOrdinalSuffix = (n: number) => {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
};

const navigateLinks = [
  { name: 'Home', href: '/' },
  { name: 'Work', href: '/experience' },
  { name: 'Blog', href: '/blog' },
  { name: 'Resume', href: '/resume' },
  { name: 'Projects', href: '/projects' },
  { name: 'Gears', href: '/gears' },
  { name: 'Setup', href: '/extensions' },
  { name: 'Gallery', href: '/photos' },
  { name: 'Achievements', href: '/certificates' },
  { name: 'Bucket List', href: '/bucket-list' },
  { name: 'Contact', href: '/contact' },
  { name: 'RSS FEED', href: '/feed.xml' }
];

const socialLinks = [
  {
    href: 'https://x.com/codewithdhruba',
    icon: <XIcon size="18" className="fill-[#909092] group-hover:fill-white transition-colors duration-300" />
  },
  {
    href: 'https://www.linkedin.com/in/dhrubaraj-pati/',
    icon: <LinkedinIcon size="18" className="fill-[#909092] group-hover:fill-white transition-colors duration-300" />
  },
  {
    href: 'https://github.com/codewithdhruba01',
    icon: <GithubIcon size="18" className="stroke-[#909092] group-hover:stroke-white transition-all duration-300" />
  },
  {
    href: 'https://bsky.app/profile/dhrubaraj.bsky.social',
    icon: <BlueskyLine size="18" className="fill-[#909092] group-hover:fill-white transition-colors duration-300" />
  },
  {
    href: 'https://www.instagram.com/codewithdhruba/',
    icon: <InstagramIcon size="18" className="stroke-[#909092] group-hover:stroke-white transition-all duration-300" />
  },
  {
    href: 'https://www.threads.com/@codewithdhruba',
    icon: <ThreadsIcon size="18" className="fill-[#909092] group-hover:fill-white transition-colors duration-300" />
  },
  {
    href: 'https://codepen.io/codewithdhruba',
    icon: <CodepenIcon size="18" className="fill-[#909092] group-hover:fill-white transition-colors duration-300" />
  },
  {
    href: 'mailto:pati.dhrubaraj@outlook.com',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stroke-[#909092] group-hover:stroke-white transition-colors duration-300">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    )
  }
];

const Footer = () => {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  // Play click audio sound from public/Audio/
  const playClickSound = () => {
    const audio = new Audio('/Audio/link_sound.mp3');
    audio.volume = 0.1; // Lower volume for a very soft and pleasant click
    audio.play().catch((err) => console.log('Audio play blocked or failed:', err));
  };

  useEffect(() => {
    const handleVisitorCount = async () => {
      try {
        const hasVisited = localStorage.getItem('site_visited');

        if (!hasVisited) {
          // Increment the view count for the entire site
          await commentService.incrementBlogViews('site-total');
          localStorage.setItem('site_visited', 'true');
        }

        // Fetch the updated count
        const count = await commentService.getBlogViews('site-total');
        setVisitorCount(count);
      } catch (error) {
        console.warn('Error handling visitor count:', error);
      }
    };

    handleVisitorCount();
  }, []);
  return (
    <footer className="bg-neutral-950 pt-20 pb-16 relative">
      {/* Top Gradient Line: Fade from transparent to #333333 to transparent */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#333333] to-transparent"></div>

      <div className="max-w-3xl mx-auto w-full px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          {/* Left: NAVIGATE */}
          <div className="flex flex-col gap-4">
            <span className="text-[#f4f4f4] text-xs font-bold uppercase tracking-wider font-outfit">
              Navigate
            </span>
            <div className="flex flex-wrap gap-x-6 gap-y-3 max-w-md font-outfit text-sm">
              {navigateLinks.map((link) =>
                link.href.endsWith('.xml') ? (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClickSound}
                    className="text-[#909092] hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={playClickSound}
                    className="text-[#909092] hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                )
              )}
            </div>

            {/* Spotify Widget */}
            <a
              href="https://open.spotify.com/playlist/7vcmvUAHBN1KU4KUQqDP03?si=03momC0tQ_a1SSmzOlE7-A"
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClickSound}
              className="flex items-center gap-2.5 mt-4 group w-fit"
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
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
                <span className="text-[#909092] group-hover:text-[#f4f4f4] transition-colors">
                  Everyday Feelings
                </span>
              </div>
            </a>
          </div>

          {/* Right: CONNECT */}
          <div className="flex flex-col gap-4 text-left">
            <span className="text-[#f4f4f4] text-xs font-bold uppercase tracking-wider font-outfit">
              Connect
            </span>
            <div className="flex flex-wrap md:grid md:grid-cols-4 gap-2">
              {socialLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClickSound}
                  className="group w-10 h-10 border border-neutral-800 bg-[#101010]/30 hover:border-neutral-700/60 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-neutral-900/40"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 relative flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#333333] to-transparent"></div>
          <p className="text-[#737373] text-sm font-satoshi">
            © 2026 Dhrubaraj Pati. All rights reserved.
          </p>
          <p className="text-[#737373] text-sm font-satoshi">
            You're the{' '}
            {visitorCount !== null ? (
              <>
                <span className="text-white/90 font-medium">
                  {visitorCount.toLocaleString()}
                  <sup className="text-[10px] opacity-80 ml-0.5">
                    {getOrdinalSuffix(visitorCount)}
                  </sup>
                </span>
                {' '}visitor to my website.
              </>
            ) : (
              'Loading...'
            )}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
