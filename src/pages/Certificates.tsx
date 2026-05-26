import { Calendar, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import ScrollReveal from '../components/ui/ScrollReveal';

const Certificates = () => {
  const [loadedCertificateImages, setLoadedCertificateImages] = useState<Record<number, boolean>>({});
  const [loadedAchievementImages, setLoadedAchievementImages] = useState<Record<number, boolean>>({});
  const [loadedBadgeImages, setLoadedBadgeImages] = useState<Record<number, boolean>>({});

  const certificates = [
    {
      title: 'The Complete Full-Stack Web Development',
      issuer: 'Udemy',
      date: 'December 2022',
      image: '/certificates/udamy.png',
      credentialId: 'UC-dcc34792-26f4-4e13-a573-023b6b988d1f',
      description:
        'successfully completed the course The Complete Full-Stack Web Development Bootcamp',
      skills: [
        'Full Stack Development',
        'React',
        'Node.js',
        'MongoDB',
        'Express.js',
      ],
    },
    {
      title: 'Postman API Fundamentals Student Expert',
      issuer: 'Postman',
      date: 'June 2025',
      image: '/certificates/postman.png',
      credentialId: 'GCP-PCD-2023-67890',
      description:
        'Postman Student Experts are proficient in the essential skills required for consuming APIs in Postman and applications',
      skills: ['API Development', 'Postman', 'API Testing'],
    },
    {
      title: 'Bootcamp for Instagram Clone',
      issuer: 'Google Devloper Student Clubs',
      date: 'December 2023',
      image: '/certificates/GDSC.png',
      credentialId: 'verify/9E1pf',
      description:
        'The certificate affirms that Dhrubaraj Pati has satisfactorily fulfilled the requirements outlined This validation ensures its authenticity',
      skills: ['HTML', 'CSS', 'JavaScript', 'JSX'],
    },
    {
      title: 'Acodemy Of Skill Development',
      issuer: 'Swami Vivekananda University',
      date: 'August 2023',
      image: '/certificates/cprogram.png',
      credentialId: 'ASD/ADV/SWA/B/48918',
      description: 'Professional MongoDB database development certification',
      skills: ['C Programming'],
    },
  ];

  const achievements = [
    {
      title: 'Contributor',
      organization: 'Open Source Connect',
      date: 'August 2025',
      image: '/certificates/OpenSourceConnect.png',
      description:
        'I’ve been selected as a Contributor for Open Source Connect India - one of the largest collaborative open source initiatives in the country.',
    },
    {
      title: 'Contributor',
      organization: 'GSSoC',
      date: 'August  2025',
      image: '/certificates/GirlScript.png',
      description:
        "I have been selected as a Contributor for GirlScript Summer of Code 2025 (GSSoC '25)!",
    },
    {
      title: 'Contributor',
      organization: 'Hacktoberfast',
      date: 'Oct 2025',
      image: '/certificates/hacktoberfast.png',
      description:
        "I've successfully completed my contributions for Hacktoberfest 2025",
    },
    {
      title: 'Open Source Developer',
      organization: 'Recode Hive',
      date: 'Present',
      image: '/certificates/recodehive.png',
      description:
        'Recognized for significant contributions to Python Documentation community projects',
    },
  ];

  const githubBadges = [
    {
      name: 'Pull Shark',
      img: 'https://github.githubassets.com/images/modules/profile/achievements/pull-shark-default.png',
      count: 'x3',
    },
    {
      name: 'Pair Extraordinaire',
      img: 'https://github.githubassets.com/images/modules/profile/achievements/pair-extraordinaire-default.png',
      count: 'x3',
    },
    {
      name: 'Starstruck',
      img: 'https://github.githubassets.com/images/modules/profile/achievements/starstruck-default.png',
    },
    {
      name: 'Galaxy Brain',
      img: 'https://github.githubassets.com/images/modules/profile/achievements/galaxy-brain-default.png',
      count: 'x2',
    },
    {
      name: 'Quickdraw',
      img: 'https://github.githubassets.com/images/modules/profile/achievements/quickdraw-default.png',
    },
    {
      name: 'YOLO',
      img: 'https://github.githubassets.com/images/modules/profile/achievements/yolo-default.png',
    },
    {
      name: 'POSTMAN',
      img: 'https://github.com/codewithdhruba01/codewithdhruba01/raw/main/Assets/Postman%20-%20Postman.png',
    },
    {
      name: 'Arcade',
      img: 'https://cdn.qwiklabs.com/4MlP8X6Zqepz7nED0fOVdlLiiDTgLW6D79lZtC4j64M%3D',
    },
  ];

  const handleCertificateImageLoad = (index: number) => {
    setLoadedCertificateImages(prev => ({ ...prev, [index]: true }));
  };

  const handleAchievementImageLoad = (index: number) => {
    setLoadedAchievementImages(prev => ({ ...prev, [index]: true }));
  };

  const handleBadgeImageLoad = (index: number) => {
    setLoadedBadgeImages(prev => ({ ...prev, [index]: true }));
  };

  return (
    <div className="min-h-screen pt-28 md:pt-36 pb-16 bg-[#0A0A0A]">
      <div className="max-w-4xl mx-auto w-full px-6">
        <ScrollReveal>
          <div className="text-left mb-10">
            <h1 className="text-3xl md:text-4xl font-bold font-outfit mb-3 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-300">
              Certificates & Achievements
            </h1>
            <p className="text-[#909092] mt-2 text-base font-poppins">
              A Journey of Learning, Certifications, and Professional Recognition
            </p>
          </div>
        </ScrollReveal>

        {/* Certificates Section */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates.map((cert, index) => (
              <ScrollReveal key={index} delay={index * 0.05}>
                <div className="bg-neutral-900 backdrop-blur-md rounded-xl overflow-hidden border border-gray-700/30 transition-all duration-300 group shadow-lg h-full">
                  <div className="relative aspect-[4/3] w-full overflow-hidden flex items-center justify-center bg-black">
                    {/* Grainy Gradient Placeholder */}
                    <div
                      className={`absolute inset-0 z-10 transition-opacity duration-700 ${loadedCertificateImages[index] ? 'opacity-0' : 'opacity-100'
                        } ${[
                          'bg-gradient-to-br from-blue-900/40 via-neutral-900 to-black',
                          'bg-gradient-to-br from-emerald-900/40 via-neutral-900 to-black',
                          'bg-gradient-to-br from-purple-900/40 via-neutral-900 to-black'
                        ][index % 3]}`}
                    >
                      <div className="absolute inset-0 opacity-20 bg-[url('/assets/noise.svg')]"></div>
                    </div>

                    <img
                      src={cert.image}
                      alt={cert.title}
                      className={`w-full h-full transition-all duration-500 group-hover:scale-105 ${loadedCertificateImages[index] ? 'blur-0' : 'blur-md'
                        }`}
                      onLoad={() => handleCertificateImageLoad(index)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <span className="absolute top-2 right-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-md z-20">
                      Complete
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg lg:text-xl font-bold text-neutral-300 mb-2 line-clamp-2 font-synonym">
                      {cert.title}
                    </h3>

                    {/* Issuer + Date in one row */}
                    <div className="flex justify-between items-center mb-2 text-sm lg:text-base">
                      <h4 className="text-green-600 font-semibold font-outfit">
                        {cert.issuer}
                      </h4>
                      <div className="flex items-center text-gray-300">
                        <Calendar className="mr-1 text-neutral-400" size={14} />
                        <span className="font-synonym text-sm text-neutral-400">
                          {cert.date}
                        </span>
                      </div>
                    </div>

                    <p className="text-neutral-400 mb-3 text-sm line-clamp-2 font-satoshi">
                      {cert.description}
                    </p>

                    <div className="mb-3">
                      <span className="text-xs text-gray-400">
                        ID: {cert.credentialId}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center flex-wrap gap-2">
                        <h5 className="text-white font-semibold text-sm font-synonym">
                          Skills:
                        </h5>
                        {cert.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="whitespace-nowrap bg-green-600/20 text-green-500 px-2 py-1 rounded-full text-xs font-satoshi"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Achievements Section */}
        <div>
          <ScrollReveal delay={0.1}>
            <div className="flex items-center mb-8">
              <CheckCircle className="text-green-500 mb-4 mr-3" size={32} />
              <h2 className="text-3xl md:text-3xl mb-4 font-bold font-excon bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400">
                Open Source &{' '}
                <span className="font-bold font-excon bg-gradient-to-r from-blue-400 to-green-600 bg-clip-text text-transparent">
                  Contribution
                </span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {achievements.map((achievement, index) => (
              <ScrollReveal key={index} delay={index * 0.05}>
                <div className="bg-neutral-900 backdrop-blur-md rounded-xl overflow-hidden border border-gray-700/30 hover:bg-gray-900/80 transition-all duration-300 group shadow-lg h-full">
                  <div className="relative h-32 lg:h-44 overflow-hidden">
                    {/* Grainy Gradient Placeholder */}
                    <div
                      className={`absolute inset-0 z-10 transition-opacity duration-700 ${loadedAchievementImages[index] ? 'opacity-0' : 'opacity-100'
                        } ${[
                          'bg-gradient-to-br from-blue-900/40 via-neutral-900 to-black',
                          'bg-gradient-to-br from-emerald-900/40 via-neutral-900 to-black',
                          'bg-gradient-to-br from-purple-900/40 via-neutral-900 to-black'
                        ][index % 3]}`}
                    >
                      <div className="absolute inset-0 opacity-20 bg-[url('/assets/noise.svg')]"></div>
                    </div>

                    <img
                      src={achievement.image}
                      alt={achievement.title}
                      className={`w-full h-full object-cover group-hover:scale-110 transition-all duration-500 ${loadedAchievementImages[index] ? 'blur-0' : 'blur-md'
                        }`}
                      onLoad={() => handleAchievementImageLoad(index)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-base lg:text-lg font-bold font-outfit text-neutral-300 mb-2 line-clamp-2">
                      {achievement.title}
                    </h3>

                    {/* Org + Date same row */}
                    <div className="flex justify-between items-center mb-2 text-xs lg:text-sm">
                      <h4 className="text-green-600 font-semibold line-clamp-1">
                        {achievement.organization}
                      </h4>
                      <div className="flex items-center text-gray-300">
                        <Calendar className="mr-1" size={10} />
                        <span className="font-synonym text-xs text-neutral-400">
                          {achievement.date}
                        </span>
                      </div>
                    </div>

                    <p className="text-neutral-400 text-xs line-clamp-3 font-poppins">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* GitHub Badges Section */}
        <ScrollReveal delay={0.2}>
          <section className="py-16 bg-neutral-950 text-center">
            <h2 className="text-4xl font-bold mb-10 font-synonym bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400">
              All Badges
            </h2>
            <div className="overflow-hidden whitespace-nowrap">
              <div className="inline-flex animate-marquee space-x-8">
                {githubBadges.map((badge, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center min-w-[150px]"
                  >
                    <div className="relative">
                      <img
                        src={badge.img}
                        alt={badge.name}
                        className={`h-16 w-16 object-contain transition-all duration-500 ${loadedBadgeImages[index] ? 'blur-0' : 'blur-md'
                          }`}
                        onLoad={() => handleBadgeImageLoad(index)}
                      />
                      {badge.count && (
                        <span className="absolute bottom-0 right-0 bg-white text-black text-xs font-bold px-1 rounded-full">
                          {badge.count}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-300 text-sm mt-2">{badge.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Marquee Animation */}
            <style>
              {`
            @keyframes marquee {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-100%); }
            }
            .animate-marquee {
              display: inline-flex;
              animation: marquee 15s linear infinite;
            }
          `}
            </style>
          </section>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Certificates;
