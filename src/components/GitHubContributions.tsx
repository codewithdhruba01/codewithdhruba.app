import { useEffect, useState } from "react";
import { request, gql } from "graphql-request";

interface DayData {
  date: string;
  contributionCount: number;
}

const GitHubContributions = () => {
  const [contributions, setContributions] = useState<DayData[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [year, setYear] = useState<number>(2025); // default latest year

  const GITHUB_USERNAME = "codewithdhruba01";
  const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

  const fetchContributions = async (selectedYear: number) => {
    const endpoint = "https://api.github.com/graphql";

    const query = gql`
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

      setContributions(allDays);
      setTotalCount(calendar.totalContributions);
    } catch (error) {
      console.error("GitHub API Error:", error);
    }
  };

  useEffect(() => {
    fetchContributions(year);
  }, [year]);

  const getContributionColor = (count: number) => {
    if (count === 0) return "bg-[#1f1f1f]";
    if (count <= 2) return "bg-[#00DC82]/20";
    if (count <= 5) return "bg-[#00DC82]/50";
    if (count <= 8) return "bg-[#00DC82]/80";
    return "bg-[#00DC82]";
  };

  const weeks = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }

  const years = [2025, 2024, 2023, 2022, 2021];

  // Get month labels
  const monthLabels: { index: number; month: string }[] = [];
  weeks.forEach((week, index) => {
    const firstDay = week[0];
    if (firstDay) {
      const date = new Date(firstDay.date);
      const month = date.toLocaleString("default", { month: "short" });
      const prev = monthLabels[monthLabels.length - 1];
      if (!prev || prev.month !== month) {
        monthLabels.push({ index, month });
      }
    }
  });

  return (
    <section id="contributions" className="py-20 bg-neutral-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h2 className="text-2xl font-bold mb-6 text-white">
          Contribution Graph
        </h2>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Graph Card */}
          <div className="flex-1 border border-neutral-800 bg-neutral-900/60 rounded-lg p-6 shadow-lg">
            {/* Scrollable container */}
            <div className="overflow-x-auto">
              {/* Month labels (stick with grid scroll) */}
              <div className="ml-8 flex gap-1 text-xs text-gray-400 mb-1">
                {weeks.map((_, weekIndex) => {
                  const label = monthLabels.find((m) => m.index === weekIndex);
                  return (
                    <div
                      key={weekIndex}
                      className="w-3 text-center shrink-0"
                    >
                      {label ? label.month : ""}
                    </div>
                  );
                })}
              </div>

              {/* Contribution Grid with weekdays */}
              <div className="flex">
                {/* Weekday labels */}
                <div className="flex flex-col justify-between mr-2 text-xs text-gray-400">
                  {Array.from({ length: 7 }).map((_, dayIndex) => {
                    const label =
                      dayIndex === 1
                        ? "Mon"
                        : dayIndex === 3
                        ? "Wed"
                        : dayIndex === 5
                        ? "Fri"
                        : "";
                    return (
                      <div key={dayIndex} className="h-3">
                        {label}
                      </div>
                    );
                  })}
                </div>

                {/* Grid */}
                <div className="inline-flex gap-1">
                  {weeks.map((week, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-1">
                      {week.map((day, dayIndex) => (
                        <div
                          key={`${weekIndex}-${dayIndex}`}
                          className={`w-3 h-3 rounded-sm ${getContributionColor(
                            day.contributionCount
                          )} 
                            hover:ring-2 hover:ring-[#00DC82]/30 transition-all duration-300 cursor-pointer group relative`}
                          title={`${day.contributionCount} contributions on ${day.date}`}
                        >
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Total contributions + Legend */}
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-gray-400">
              <p className="text-sm">
                <span className="text-[#00DC82] font-semibold">{totalCount}</span>{" "}
                contributions in the last year
              </p>

              <div className="flex items-center gap-2">
                <span className="font-bold">Less</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-sm bg-[#00DC82]/20"></div>
                  <div className="w-3 h-3 rounded-sm bg-[#00DC82]/50"></div>
                  <div className="w-3 h-3 rounded-sm bg-[#00DC82]/80"></div>
                  <div className="w-3 h-3 rounded-sm bg-[#00DC82]"></div>
                </div>
                <span className="font-bold">More</span>
              </div>
            </div>
          </div>

          {/* Year Selector */}
          <div className="flex lg:flex-col gap-2 justify-center">
            {years.map((y) => (
              <button
                key={y}
                onClick={() => setYear(y)}
                className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                  year === y
                    ? "bg-[#00DC82] text-black"
                    : "bg-neutral-800 text-gray-400 hover:bg-neutral-700 hover:text-white"
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubContributions;
