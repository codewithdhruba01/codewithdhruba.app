const githubBadges = [
  {
    name: "Pull Shark",
    img: "https://github.githubassets.com/images/modules/profile/achievements/pull-shark-default.png",
    count: "x3",
  },
  {
    name: "Pair Extraordinaire",
    img: "https://github.githubassets.com/images/modules/profile/achievements/pair-extraordinaire-default.png",
    count: "x3",
  },
  {
    name: "Starstruck",
    img: "https://github.githubassets.com/images/modules/profile/achievements/starstruck-default.png",
  },
  {
    name: "Galaxy Brain",
    img: "https://github.githubassets.com/images/modules/profile/achievements/galaxy-brain-default.png",
    count: "x2",
  },
  {
    name: "Quickdraw",
    img: "https://github.githubassets.com/images/modules/profile/achievements/quickdraw-default.png",
  },
  {
    name: "YOLO",
    img: "https://github.githubassets.com/images/modules/profile/achievements/yolo-default.png",
  },
  {
    name: "POSTMAN",
    img: "https://github.com/codewithdhruba01/codewithdhruba01/raw/main/Assets/Postman%20-%20Postman.png",
  },
];

export default function GithubBadgeSection() {
  return (
    <section className="py-16 bg-neutral-950 text-center">
      <h2 className="text-4xl font-bold text-white mb-10 font-synonym">All Badges</h2>

      {/* Scrolling Line */}
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
                  className="h-16 w-16 object-contain"
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
  );
}