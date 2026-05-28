import { useState } from 'react';
import { Link as LinkIcon, ChevronDown, ChevronUp } from 'lucide-react';
import ScrollReveal from '../components/ui/ScrollReveal';
import Sponsors from '../components/Sponsors';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip';

// Dynamic, premium issuer logo component with company asset support
const IssuerLogo = ({ issuer, logo }: { issuer: string; logo?: string }) => {
  const normalized = issuer.toLowerCase();

  if (logo) {
    return (
      <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800/80 flex items-center justify-center p-1.5 shrink-0 overflow-hidden group-hover:border-neutral-700 transition-all duration-300">
        <img
          src={logo}
          alt={issuer}
          className="w-full h-full object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            // Hide failed image
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
      </div>
    );
  }

  if (normalized.includes('google')) {
    return (
      <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800/80 flex items-center justify-center text-neutral-400 group-hover:text-blue-400 transition-colors duration-200 shrink-0">
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
          <path d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l2.427-2.334C17.955 2.192 15.34 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c6.478 0 10.793-4.537 10.793-10.986 0-.74-.08-1.3-.176-1.836h-10.62z" />
        </svg>
      </div>
    );
  }

  if (normalized.includes('udemy')) {
    return (
      <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800/80 flex items-center justify-center text-neutral-400 group-hover:text-red-400 transition-colors duration-200 shrink-0">
        <span className="font-outfit font-extrabold text-base text-red-500 leading-none">U</span>
      </div>
    );
  }

  if (normalized.includes('postman')) {
    return (
      <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800/80 flex items-center justify-center text-neutral-400 group-hover:text-orange-400 transition-colors duration-200 shrink-0">
        <span className="font-outfit font-extrabold text-base text-orange-500 leading-none">P</span>
      </div>
    );
  }

  if (normalized.includes('girlscript') || normalized.includes('gssoc')) {
    return (
      <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800/80 flex items-center justify-center text-neutral-400 group-hover:text-[#f05123] transition-colors duration-200 shrink-0">
        <span className="font-outfit font-extrabold text-base text-[#f05123] leading-none">G</span>
      </div>
    );
  }

  if (normalized.includes('hacktoberfest') || normalized.includes('hacktoberfast')) {
    return (
      <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800/80 flex items-center justify-center text-neutral-400 group-hover:text-rose-400 transition-colors duration-200 shrink-0">
        <span className="font-outfit font-extrabold text-base text-[#ff0a78] leading-none">H</span>
      </div>
    );
  }

  // General fallback - Verified badge
  return (
    <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800/80 flex items-center justify-center text-neutral-400 group-hover:text-[#00DC82] transition-colors duration-200 shrink-0">
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    </div>
  );
};

const Certificates = () => {
  const [visibleCertCount, setVisibleCertCount] = useState(3);
  const [visibleAchieveCount, setVisibleAchieveCount] = useState(3);

  const [expandedCertIndex, setExpandedCertIndex] = useState<number | null>(null);
  const [expandedAchieveIndex, setExpandedAchieveIndex] = useState<number | null>(null);

  const toggleCertExpand = (idx: number) => {
    setExpandedCertIndex(expandedCertIndex === idx ? null : idx);
  };

  const toggleAchieveExpand = (idx: number) => {
    setExpandedAchieveIndex(expandedAchieveIndex === idx ? null : idx);
  };

  const certificates = [
    {
      title: 'Complete Full-Stack Web Development',
      issuer: 'Udemy',
      date: '12.2022',
      href: 'https://www.udemy.com/certificate/UC-dcc34792-26f4-4e13-a573-023b6b988d1f/',
      logo: '/company/udemy.png',
      details: [
        'Completed comprehensive training on full-stack technologies including React, Node.js, Express, and MongoDB.',
        'Built real-world responsive applications integrating front-end styling with secure back-end API routing.',
        'Credential Verification ID: UC-dcc34792-26f4-4e13-a573-023b6b988d1f.'
      ]
    },
    {
      title: 'Postman API Fundamentals Student Expert',
      issuer: 'Postman',
      date: '06.2025',
      href: 'https://badges.parchment.com/public/assertions/wr0NTzwXSZiEuORGzNlwVg?utm_source=url_copy&identity__email=patidhrubaraj%40gmail.com',
      logo: '/company/postman.png',
      details: [
        'Mastered core API concepts: HTTP methods, response codes, query parameters, headers, and body structures.',
        'Acquired hand-on proficiency in designing, testing, and debugging RESTful APIs using the Postman client.',
        'Constructed automated API test collections with JavaScript script assertions.'
      ]
    },
    {
      title: 'Bootcamp for Instagram Clone',
      issuer: 'Google Developer Student Clubs',
      date: '12.2023',
      href: 'https://www.cert.devtown.in/verify/9E1pf',
      logo: '/company/GDC.png',
      details: [
        'Engineered a responsive pixel-perfect clone of Instagram’s user interface during a multi-week intensive bootcamp.',
        'Implemented custom React JSX components, responsive design grids, and dynamic user states.',
        'Recognized for exceptional UI implementation and strict adherence to modern clean code principles.'
      ]
    },
    {
      title: 'Acodemy Of Skill Development',
      issuer: 'Swami Vivekananda University',
      date: '08.2023',
      href: 'https://verify.svu.edu.in/',
      logo: '/company/SVU.png',
      details: [
        'Successfully completed deep-dive coursework in software structures and algorithmic problem solving.',
        'Developed production-grade database structures and efficient memory-mapped data handlers.',
        'Validated with credentials registered under SVU Acodemy.'
      ]
    },
  ];

  const achievements = [
    {
      title: 'Contributor',
      organization: 'Open Source Connect',
      date: '08.2025',
      href: 'https://github.com/codewithdhruba01',
      logo: '/company/OSC.png',
      details: [
        'Selected for the highly collaborative Open Source Connect India developer cohort.',
        'Contributed high-quality patches and features to production-level open-source infrastructure projects.',
        'Collaborated with senior industry developers to establish robust clean code practices.'
      ]
    },
    {
      title: 'Contributor',
      organization: 'GSSoC',
      date: '08.2025',
      href: 'https://gssoc.girlscript.tech/',
      logo: '/company/GSSoC.png',
      details: [
        'Participated as a key contributor in GirlScript Summer of Code 2025 (GSSoC \'25).',
        'Authored and shipped multiple merged Pull Requests for modern frontend and backend repositories.',
        'Ranked among active participants for consistent open-source contribution and community mentorship.'
      ]
    },
    {
      title: 'Contributor',
      organization: 'Hacktoberfest',
      date: '10.2025',
      href: 'https://hacktoberfest.com/',
      logo: '/company/hacktoberfast.png',
      details: [
        'Completed quality contributions for Hacktoberfest 2025 across multiple global open-source projects.',
        'Engaged in code reviews, resolved outstanding repository issues, and optimized static styles.',
        'Earned the official 2025 digital check and profile badge recognition.'
      ]
    },
    {
      title: 'Open Source Developer',
      organization: 'Recode Hive',
      date: 'Present',
      href: 'https://recodehive.com/',
      logo: '/company/Recodehive.png',
      details: [
        'Recognized for significant commits to Python Documentation and core repository structures.',
        'Authored learning paths and educational markdown tutorials for upcoming developers.',
        'Mentored global contributors on git workflows and branch tracking strategies.'
      ]
    },
  ];

  return (
    <div className="min-h-screen pt-28 md:pt-36 pb-6 bg-[#0A0A0A]">
      <div className="max-w-4xl mx-auto w-full px-6">


        {/* Certifications Section */}
        <div className="mb-16">
          <ScrollReveal>
            <h4 className="text-xl sm:text-2xl font-bold text-neutral-200 font-excon text-left border-b border-neutral-800/60 pb-3 mb-2 flex items-center gap-1.5">
              Certifications <span className="text-xs text-neutral-500 font-mono font-normal">[{certificates.length}]</span>
            </h4>
          </ScrollReveal>

          <div className="flex flex-col gap-2">
            {certificates.slice(0, visibleCertCount).map((cert, index) => {
              const isExpanded = expandedCertIndex === index;
              return (
                <ScrollReveal key={index} delay={index * 0.05}>
                  <div className="border-b border-neutral-900">
                    <div
                      onClick={() => toggleCertExpand(index)}
                      className="flex items-center gap-4 py-3.5 sm:py-4.5 px-3 -mx-3 rounded-2xl hover:bg-[#111112]/45 cursor-pointer group transition-all duration-300"
                    >
                      <IssuerLogo issuer={cert.issuer} logo={cert.logo} />
                      <div className="flex-1 min-w-0 flex flex-col gap-1">
                        <h3 className="text-sm sm:text-base font-semibold font-outfit text-neutral-300 group-hover:text-neutral-100 transition-colors duration-200 line-clamp-2">
                          {cert.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-neutral-500 font-poppins flex items-center flex-wrap gap-1.5">
                          <span className="text-neutral-400 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 inline-block"></span>
                            {cert.issuer}
                          </span>
                          <span className="text-neutral-700">|</span>
                          <span>{cert.date}</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 px-1">
                        {cert.href && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <a
                                  href={cert.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="p-2 rounded-xl bg-neutral-950/40 border border-neutral-800/60 text-neutral-500 hover:text-white hover:border-neutral-700/80 hover:bg-neutral-900/60 transition-all duration-300"
                                >
                                  <LinkIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                </a>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Verify Credentials</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                        <div className="text-neutral-600 group-hover:text-neutral-300 transition-colors duration-300 p-1">
                          {isExpanded ? (
                            <ChevronUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Expandable Details Block */}
                    {isExpanded && (
                      <div className="pl-14 pr-4 pb-4.5 pt-1.5 flex flex-col gap-2.5 animate-fadeIn">
                        <ul className="list-disc pl-4 space-y-2 text-xs sm:text-sm text-neutral-400 font-poppins leading-relaxed">
                          {cert.details.map((detail, dIdx) => (
                            <li key={dIdx} className="hover:text-neutral-200 transition-colors duration-150">
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Toggle Button styled like the standard buttons */}
          {certificates.length > 3 && (
            <ScrollReveal className="flex justify-center mt-6">
              <button
                onClick={() => setVisibleCertCount(visibleCertCount === 3 ? certificates.length : 3)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#111111] border border-[#2d2e2d] rounded-lg text-[#d3d1d1] hover:border-[#A3A3A3]/50 hover:bg-[#1a1a1a] active:scale-95 transition-all duration-300 group shadow-lg shadow-black/20 text-sm font-bold font-outfit"
              >
                <span>{visibleCertCount === 3 ? 'Show More' : 'Show Less'}</span>
                {visibleCertCount === 3 ? (
                  <ChevronDown className="w-4 h-4 text-neutral-400 group-hover:translate-y-0.5 transition-transform" />
                ) : (
                  <ChevronUp className="w-4 h-4 text-neutral-400 group-hover:-translate-y-0.5 transition-transform" />
                )}
              </button>
            </ScrollReveal>
          )}
        </div>

        {/* Achievements Section */}
        <div className="mb-6">
          <ScrollReveal>
            <h4 className="text-xl sm:text-2xl font-bold text-neutral-200 font-excon text-left border-b border-neutral-800/60 pb-3 mb-2 flex items-center gap-1.5">
              Contributions <span className="text-xs text-neutral-500 font-mono font-normal">[{achievements.length}]</span>
            </h4>
          </ScrollReveal>

          <div className="flex flex-col gap-2">
            {achievements.slice(0, visibleAchieveCount).map((achievement, index) => {
              const isExpanded = expandedAchieveIndex === index;
              return (
                <ScrollReveal key={index} delay={index * 0.05}>
                  <div className="border-b border-neutral-900">
                    <div
                      onClick={() => toggleAchieveExpand(index)}
                      className="flex items-center gap-4 py-3.5 sm:py-4.5 px-3 -mx-3 rounded-2xl hover:bg-[#111112]/45 cursor-pointer group transition-all duration-300"
                    >
                      <IssuerLogo issuer={achievement.organization} logo={achievement.logo} />
                      <div className="flex-1 min-w-0 flex flex-col gap-1">
                        <h3 className="text-sm sm:text-base font-semibold font-outfit text-neutral-300 group-hover:text-neutral-100 transition-colors duration-200 line-clamp-2">
                          {achievement.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-neutral-500 font-poppins flex items-center flex-wrap gap-1.5">
                          <span className="text-neutral-400 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 inline-block"></span>
                            {achievement.organization}
                          </span>
                          <span className="text-neutral-700">|</span>
                          <span>{achievement.date}</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 px-1">
                        {achievement.href && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <a
                                  href={achievement.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="p-2 rounded-xl bg-neutral-950/40 border border-neutral-800/60 text-neutral-500 hover:text-white hover:border-neutral-700/80 hover:bg-neutral-900/60 transition-all duration-300"
                                >
                                  <LinkIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                </a>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Verify Contribution</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                        <div className="text-neutral-600 group-hover:text-neutral-300 transition-colors duration-300 p-1">
                          {isExpanded ? (
                            <ChevronUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Expandable Details Block */}
                    {isExpanded && (
                      <div className="pl-14 pr-4 pb-4.5 pt-1.5 flex flex-col gap-2.5 animate-fadeIn">
                        <ul className="list-disc pl-4 space-y-2 text-xs sm:text-sm text-neutral-400 font-poppins leading-relaxed">
                          {achievement.details.map((detail, dIdx) => (
                            <li key={dIdx} className="hover:text-neutral-200 transition-colors duration-150">
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Toggle Button styled like the standard buttons */}
          {achievements.length > 3 && (
            <ScrollReveal className="flex justify-center mt-6">
              <button
                onClick={() => setVisibleAchieveCount(visibleAchieveCount === 3 ? achievements.length : 3)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#111111] border border-[#2d2e2d] rounded-lg text-[#d3d1d1] hover:border-[#A3A3A3]/50 hover:bg-[#1a1a1a] active:scale-95 transition-all duration-300 group shadow-lg shadow-black/20 text-sm font-bold font-outfit"
              >
                <span>{visibleAchieveCount === 3 ? 'Show More' : 'Show Less'}</span>
                {visibleAchieveCount === 3 ? (
                  <ChevronDown className="w-4 h-4 text-neutral-400 group-hover:translate-y-0.5 transition-transform" />
                ) : (
                  <ChevronUp className="w-4 h-4 text-neutral-400 group-hover:-translate-y-0.5 transition-transform" />
                )}
              </button>
            </ScrollReveal>
          )}
        </div>
      </div>
      <Sponsors />
    </div>
  );
};

export default Certificates;
