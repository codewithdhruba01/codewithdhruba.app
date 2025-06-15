import React from 'react';

const GitHubContributions = () => {
  // Mock data for contributions
  // In a real application, you would fetch this from GitHub API
  const generateMockData = () => {
    const contributions = [];
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      contributions.unshift({
        date: date.toISOString().split('T')[0],
        count: Math.floor(Math.random() * 10)
      });
    }
    return contributions;
  };

  const contributions = generateMockData();

  const getContributionColor = (count: number) => {
    if (count === 0) return 'bg-[#1f1f1f]';
    if (count <= 2) return 'bg-[#00DC82]/20';
    if (count <= 5) return 'bg-[#00DC82]/50';
    if (count <= 8) return 'bg-[#00DC82]/80';
    return 'bg-[#00DC82]';
  };

  const weeks = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }

  return (
    <section id="contributions" className="py-20 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 
          className="text-4xl font-bold mb-12 text-center"
          data-aos="fade-up"
        >
          GitHub Contributions
        </h2>
        <div 
          className="bg-[#0A0A0A] rounded-lg p-8 shadow-lg"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="overflow-x-auto">
            <div className="inline-flex gap-1">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.map((day, dayIndex) => (
                    <div
                      key={`${weekIndex}-${dayIndex}`}
                      className={`w-3 h-3 rounded-sm ${getContributionColor(day.count)} hover:ring-2 hover:ring-[#00DC82]/30 transition-all duration-300 cursor-pointer group relative`}
                      title={`${day.count} contributions on ${day.date}`}
                    >
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-[#1f1f1f] text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        {day.count} contributions on {day.date}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <span>Less</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-sm bg-[#1f1f1f]"></div>
                <div className="w-3 h-3 rounded-sm bg-[#00DC82]/20"></div>
                <div className="w-3 h-3 rounded-sm bg-[#00DC82]/50"></div>
                <div className="w-3 h-3 rounded-sm bg-[#00DC82]/80"></div>
                <div className="w-3 h-3 rounded-sm bg-[#00DC82]"></div>
              </div>
              <span>More</span>
            </div>
            <a 
              href="https://github.com/xanmoy" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#00DC82] hover:text-white transition-colors"
            >
              <i className="fab fa-github"></i>
              <span>View on GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubContributions;