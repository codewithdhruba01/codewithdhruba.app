import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import ScrollReveal from '../components/ui/ScrollReveal';
import Sponsors from '../components/ui/Sponsors';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip';
import { SectionButton } from '../components/ui/SectionButton';
import { cn } from '../lib/utils';


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
    <div className="min-h-screen pt-20 md:pt-28 pb-6 bg-background">
      <div className="max-w-3xl mx-auto w-full px-6">


        {/* Certifications Section */}
        <div className="mb-16">
          <ScrollReveal>
            <h4 className="text-xl sm:text-2xl font-semibold text-foreground font-hanken text-left border-b border-border pb-3 mb-2 flex items-center gap-1.5">
              Certifications <span className="text-xs text-muted-foreground font-mono font-normal">[{certificates.length}]</span>
            </h4>
          </ScrollReveal>

          <div className="flex flex-col py-2 sm:py-3 w-full transition-all duration-300">
            {certificates.slice(0, visibleCertCount).map((cert, index) => {
              const isExpanded = expandedCertIndex === index;
              return (
                <ScrollReveal key={index} delay={index * 0.05}>
                  <div className="flex flex-col py-2 sm:py-3 w-full transition-all duration-300">
                    <div
                      className="flex flex-col gap-1 w-full group cursor-pointer select-none"
                      onClick={() => toggleCertExpand(index)}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          <h3 className="text-base sm:text-lg font-bold font-outfit text-foreground tracking-wide transition-colors">
                            {cert.title}
                          </h3>
                          <div className={cn(
                            "flex items-center justify-center w-5 h-5 rounded transition-all duration-300 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground",
                            isExpanded ? "rotate-90 text-foreground opacity-100" : ""
                          )}>
                            <ChevronRight className="w-4 h-4 shrink-0 transition-transform duration-300" strokeWidth={2.5} />
                          </div>
                        </div>

                        <div className="hidden sm:block text-muted-foreground text-sm md:text-base font-hanken text-right shrink-0">
                          {cert.date}
                        </div>
                        <div className="block sm:hidden text-muted-foreground text-sm md:text-base font-hanken text-right shrink-0">
                          {cert.date}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm w-full mt-0.5">
                        <p className="text-muted-foreground font-hanken font-medium text-sm sm:text-base leading-snug">
                          {cert.issuer}
                        </p>

                        {cert.href && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <a
                                  href={cert.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
                                >
                                  Link
                                </a>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Verify Credentials</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                    </div>

                    <div
                      className={cn(
                        "grid transition-all duration-300 ease-in-out",
                        isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      )}
                    >
                      <div className="overflow-hidden">
                        <div className="mt-4 space-y-4 border-t border-border pt-4">
                          <div>
                            <h4 className="text-xs font-outfit font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">What I've done</h4>
                            <ul className="flex flex-col gap-2">
                              {cert.details.map((detail, dIdx) => (
                                <li key={dIdx} className="flex gap-2 items-start">
                                  <span className="text-muted-foreground shrink-0 select-none mt-1.5 text-xs">•</span>
                                  <span className="text-muted-foreground font-poppins text-sm sm:text-sm leading-relaxed">
                                    {detail}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Toggle Button styled like the standard buttons */}
          {certificates.length > 3 && (
            <ScrollReveal className="flex justify-center mt-6">
              <SectionButton
                onClick={() => setVisibleCertCount(visibleCertCount === 3 ? certificates.length : 3)}
                text={visibleCertCount === 3 ? 'Show More Certificates' : 'Show Less Certificates'}
                icon={null}
              />
            </ScrollReveal>
          )}
        </div>

        {/* Achievements Section */}
        <div className="mb-6">
          <ScrollReveal>
            <h4 className="text-xl sm:text-2xl font-semibold font-hanken text-foreground text-left border-b border-border pb-3 mb-2 flex items-center gap-1.5">
              Contributions <span className="text-xs text-muted-foreground font-mono font-normal">[{achievements.length}]</span>
            </h4>
          </ScrollReveal>

          <div className="flex flex-col py-2 sm:py-3 w-full transition-all duration-300">
            {achievements.slice(0, visibleAchieveCount).map((achievement, index) => {
              const isExpanded = expandedAchieveIndex === index;
              return (
                <ScrollReveal key={index} delay={index * 0.05}>
                  <div className="flex flex-col py-2 sm:py-3 w-full transition-all duration-300">
                    <div
                      className="flex flex-col gap-1 w-full group cursor-pointer select-none"
                      onClick={() => toggleAchieveExpand(index)}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          <h3 className="text-base sm:text-lg font-bold font-outfit text-foreground tracking-wide transition-colors">
                            {achievement.title}
                          </h3>
                          <div className={cn(
                            "flex items-center justify-center w-5 h-5 rounded transition-all duration-300 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground",
                            isExpanded ? "rotate-90 text-foreground opacity-100" : ""
                          )}>
                            <ChevronRight className="w-4 h-4 shrink-0 transition-transform duration-300" strokeWidth={2.5} />
                          </div>
                        </div>

                        <div className="hidden sm:block text-muted-foreground text-sm md:text-base font-hanken text-right shrink-0">
                          {achievement.date}
                        </div>
                        <div className="block sm:hidden text-muted-foreground text-sm md:text-base font-hanken text-right shrink-0">
                          {achievement.date}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm w-full mt-0.5">
                        <p className="text-muted-foreground font-hanken font-medium text-sm sm:text-base leading-snug">
                          {achievement.organization}
                        </p>

                        {achievement.href && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <a
                                  href={achievement.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
                                >
                                  Link
                                </a>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Verify Contribution</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                    </div>

                    <div
                      className={cn(
                        "grid transition-all duration-300 ease-in-out",
                        isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      )}
                    >
                      <div className="overflow-hidden">
                        <div className="mt-4 space-y-4 border-t border-border pt-4">
                          <div>
                            <h4 className="text-xs font-outfit font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">What I've done</h4>
                            <ul className="flex flex-col gap-2">
                              {achievement.details.map((detail, dIdx) => (
                                <li key={dIdx} className="flex gap-2 items-start">
                                  <span className="text-muted-foreground shrink-0 select-none mt-1.5 text-xs">•</span>
                                  <span className="text-muted-foreground font-poppins text-sm sm:text-sm leading-relaxed">
                                    {detail}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Toggle Button styled like the standard buttons */}
          {achievements.length > 3 && (
            <ScrollReveal className="flex justify-center mt-6">
              <SectionButton
                onClick={() => setVisibleAchieveCount(visibleAchieveCount === 3 ? achievements.length : 3)}
                text={visibleAchieveCount === 3 ? 'Show More Contributions' : 'Show Less Contributions'}
                icon={null}
              />
            </ScrollReveal>
          )}
        </div>
      </div>
      <Sponsors />
    </div>
  );
};

export default Certificates;
