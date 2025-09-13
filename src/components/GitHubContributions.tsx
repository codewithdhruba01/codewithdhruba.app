import { useEffect, useState } from 'react';
import { request, gql } from 'graphql-request';

interface DayData {
  date: string;
  contributionCount: number;
}

const GitHubContributions = () => {
  const [contributions, setContributions] = useState<DayData[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  const GITHUB_USERNAME = 'codewithdhruba01';
  const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

  const fetchContributions = async () => {
    const endpoint = 'https://api.github.com/graphql';

    const query = gql`
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
    `;

    try {
      const headers = {
        Authorization: `Bearer ${TOKEN}`,
      };

      const data = await request(endpoint, query, {}, headers) as {
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

      const allDays: DayData[] = calendar.weeks.flatMap((week: any) => week.contributionDays);
      setContributions(allDays);
      setTotalCount(calendar.totalContributions);
    } catch (error) {
      console.error("GitHub API Error:", error);
    }
  };

  useEffect(() => {
    fetchContributions();
  }, []);

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
    <section id="contributions" className="py-20 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-12 text-center font-synonym">GitHub Contributions</h2>

        <div className="bg-[#111111] rounded-lg p-8 shadow-lg">
          <div className="overflow-x-auto">
            <div className="inline-flex gap-1">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.map((day, dayIndex) => (
                    <div
                      key={`${weekIndex}-${dayIndex}`}
                      className={`w-3 h-3 rounded-sm ${getContributionColor(day.contributionCount)} hover:ring-2 hover:ring-[#00DC82]/30 transition-all duration-300 cursor-pointer group relative`}
                      title={`${day.contributionCount} contributions on ${day.date}`}
                    >
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-[#1f1f1f] text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        {day.contributionCount} on {day.date}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-gray-400">
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

            <div className="text-center sm:text-right">
              <span className="text-[#00DC82] font-semibold">{totalCount}</span> contributions in the last year
            </div>
          </div>

          <div className="mt-2 text-right">
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#00DC82] hover:text-white transition-colors text-sm"
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