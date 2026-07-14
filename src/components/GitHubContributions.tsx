import { useEffect, useState } from 'react';
import { request, gql } from 'graphql-request';
import ScrollReveal from './ui/ScrollReveal';

interface DayData {
  date: string;
  contributionCount: number;
}

const GitHubContributions = () => {
  const [contributions, setContributions] = useState<DayData[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [year, setYear] = useState<number | 'Default'>('Default'); // default to past 12 months
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Play click audio sound from public/Audio/
  const playClickSound = () => {
    const audio = new Audio('/Audio/mouse-click.mp3');
    audio.volume = 0.2; // Lower volume for a very soft and pleasant click
    audio.play().catch((err) => console.log('Audio play blocked or failed:', err));
  };

  const GITHUB_USERNAME = 'codewithdhruba01';
  const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

  const fetchContributions = async (selectedYear: number | 'Default') => {
    setIsLoading(true);
    const endpoint = 'https://api.github.com/graphql';

    const query = selectedYear === 'Default'
      ? gql`
          query {
            user(login: "${GITHUB_USERNAME}") {
              contributionsCollection {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      date
                      contributionCount
                    }
                  }
                }
              }
            }
          }
        `
      : gql`
          query {
            user(login: "${GITHUB_USERNAME}") {
              contributionsCollection(
                from: "${selectedYear}-01-01T00:00:00Z"
                to: "${selectedYear}-12-31T23:59:59Z"
              ) {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      date
                      contributionCount
                    }
                  }
                }
              }
            }
          }
        `;

    try {
      const headers = {
        Authorization: `Bearer ${TOKEN}`,
      };

      const data = (await request(endpoint, query, {}, headers)) as {
        user: {
          contributionsCollection: {
            contributionCalendar: {
              totalContributions: number;
              weeks: Array<{
                contributionDays: DayData[];
              }>;
            };
          };
        };
      };

      const calendar = data.user.contributionsCollection.contributionCalendar;
      const allDays: DayData[] = calendar.weeks.flatMap(
        (week: any) => week.contributionDays
      );

      // Add small delay for smooth transition effect
      setTimeout(() => {
        setContributions(allDays);
        setTotalCount(calendar.totalContributions);
        setIsLoading(false);
      }, 300);
    } catch (error) {
      console.error('GitHub API Error:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContributions(year);
  }, [year]);

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

  // Dynamic latest 4 years
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 4 }, (_, i) => currentYear - i);

  // Get month labels
  const monthLabels: { index: number; month: string }[] = [];
  weeks.forEach((week, index) => {
    const firstDay = week[0];
    if (firstDay) {
      const date = new Date(firstDay.date);
      const month = date.toLocaleString('default', { month: 'short' });
      const prev = monthLabels[monthLabels.length - 1];
      if (!prev || prev.month !== month) {
        monthLabels.push({ index, month });
      }
    }
  });

  return (
    <section id="contributions" className="pt-4 pb-8 bg-neutral-950">
      <div className="max-w-3xl mx-auto w-full px-6">
        {/* Title */}
        <ScrollReveal className="mb-6">
          <h4 className="text-2xl md:text-2xl font-extrabold text-neutral-200 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 text-left font-hanken">
            GitHub Activity
          </h4>
          <p className="text-left mt-2 text-sm font-supreme text-[#909092]">
            <strong>codewithdhruba's</strong> coding journey over the past year
          </p>
        </ScrollReveal>
        <ScrollReveal className="w-full mt-8" delay={0.15}>
          {/* Graph Card */}
          <div className="w-full border border-neutral-800 bg-neutral-900/60 rounded-lg p-4 sm:py-4 sm:px-6 shadow-lg">
            {/* Card Header: Total Contributions + Year Selector */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div className="text-sm font-satoshi text-[#909092]">
                {year === 'Default' ? 'Total contributions in the last 12 months' : `Total contributions in ${year}`}
                :{' '}
                <span className={`text-[#00DC82] font-semibold transition-all duration-300 ${isLoading ? 'animate-shimmer bg-gradient-to-r from-[#00DC82]/20 via-[#00DC82]/60 to-[#00DC82]/20 bg-[length:200%_100%] rounded px-2' : ''}`}>
                  {isLoading ? 'Loading...' : totalCount}
                </span>
              </div>

              {/* Year Selector */}
              <div className="flex flex-wrap gap-2 font-outfit select-none items-center">
                {years.map((y) => (
                  <button
                    key={y}
                    onClick={() => {
                      if (year === y) {
                        setYear('Default');
                      } else {
                        setYear(y);
                      }
                      playClickSound();
                    }}
                    className={`px-3.5 py-1.5 border rounded-lg text-xs font-bold transition-all duration-150 cursor-pointer ${year === y
                      ? 'border-neutral-950 bg-gradient-to-b from-[#0d0d0e] to-[#161617] text-white translate-y-[2px] shadow-[0_1px_0_#000000,_inset_0_2px_4px_rgba(0,0,0,0.8)]'
                      : 'border-[#2d2e2d] bg-gradient-to-b from-[#252526] to-[#161617] text-[#a0a0a5] hover:text-white shadow-[0_3px_0_#000000,_inset_0_1px_0_rgba(255,255,255,0.1)] hover:-translate-y-[1px] hover:shadow-[0_4px_0_#000000,_inset_0_1px_0_rgba(255,255,255,0.15)] active:translate-y-[1px] active:shadow-[0_1px_0_#000000]'
                      }`}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable container */}
            <div className="overflow-x-auto thin-scrollbar pb-2">
              {/* Month labels */}
              <div className="ml-[32px] sm:ml-[36px] flex gap-[2px] sm:gap-[2px] text-[#909092] font-supreme mb-1">
                {weeks.map((_, weekIndex) => {
                  const label = monthLabels.find((m) => m.index === weekIndex);
                  return (
                    <div key={weekIndex} className="w-[8px] sm:w-[9px] text-[9px] sm:text-[10px] text-center shrink-0">
                      {label ? label.month : ''}
                    </div>
                  );
                })}
              </div>

              {/* Contribution Grid */}
              <div className="flex">
                {/* Weekday labels */}
                <div className="flex flex-col justify-between w-[24px] sm:w-[28px] mr-2 text-[9px] sm:text-[10px] font-supreme text-[#909092]">
                  {Array.from({ length: 7 }).map((_, dayIndex) => {
                    const label =
                      dayIndex === 1
                        ? 'Mon'
                        : dayIndex === 3
                          ? 'Wed'
                          : dayIndex === 5
                            ? 'Fri'
                            : '';
                    return (
                      <div key={dayIndex} className="h-[8px] sm:h-[9px] flex items-center">
                        {label}
                      </div>
                    );
                  })}
                </div>

                {/* Grid */}
                <div className="inline-flex gap-[2px] sm:gap-[2px]">
                  {isLoading ? (
                    // Skeleton loading effect
                    Array.from({ length: 53 }).map((_, weekIndex) => (
                      <div key={`skeleton-${weekIndex}`} className="flex flex-col gap-[2px] sm:gap-[2px]">
                        {Array.from({ length: 7 }).map((_, dayIndex) => (
                          <div
                            key={`skeleton-${weekIndex}-${dayIndex}`}
                            className="w-[8px] h-[8px] sm:w-[9px] sm:h-[9px] rounded-sm bg-neutral-700 animate-pulse"
                            style={{
                              animationDelay: `${(weekIndex * 7 + dayIndex) * 30}ms`,
                              animationDuration: '1.5s'
                            }}
                          ></div>
                        ))}
                      </div>
                    ))
                  ) : (
                    weeks.map((week, weekIndex) => (
                      <div key={weekIndex} className="flex flex-col gap-[2px] sm:gap-[2px]">
                        {week.map((day, dayIndex) => (
                          <div
                            key={`${weekIndex}-${dayIndex}`}
                            className={`w-[8px] h-[8px] sm:w-[9px] sm:h-[9px] rounded-sm ${getContributionColor(
                              day.contributionCount
                            )}
                              hover:ring-2 hover:ring-[#00DC82]/30 transition-all duration-300 cursor-pointer group relative
                              animate-fade-in`}
                            style={{
                              animationDelay: `${(weekIndex * 7 + dayIndex) * 15}ms`,
                              animationFillMode: 'both'
                            }}
                            title={`${day.contributionCount} contributions on ${day.date}`}
                          ></div>
                        ))}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Total contributions + Legend */}
            <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <span className="font-bold font-supreme">Less</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-sm bg-[#00DC82]/20"></div>
                  <div className="w-3 h-3 rounded-sm bg-[#00DC82]/50"></div>
                  <div className="w-3 h-3 rounded-sm bg-[#00DC82]/80"></div>
                  <div className="w-3 h-3 rounded-sm bg-[#00DC82]"></div>
                </div>
                <span className="font-bold font-supreme">More</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default GitHubContributions;
