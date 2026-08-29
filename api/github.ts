import { request, gql } from 'graphql-request';

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { year } = req.query;
  const GITHUB_USERNAME = 'codewithdhruba01';
  // Use GITHUB_TOKEN instead of VITE_GITHUB_TOKEN
  const TOKEN = process.env.GITHUB_TOKEN || process.env.VITE_GITHUB_TOKEN; 

  if (!TOKEN) {
    return res.status(500).json({ error: 'GitHub token is missing' });
  }

  const endpoint = 'https://api.github.com/graphql';

  const query = year === 'Default' || !year
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
              from: "${year}-01-01T00:00:00Z"
              to: "${year}-12-31T23:59:59Z"
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
    const data = await request(endpoint, query, {}, { Authorization: `Bearer ${TOKEN}` });
    
    // Cache the response on Vercel Edge for 1 hour to prevent GitHub API rate limiting
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    res.status(200).json(data);
  } catch (error) {
    console.error('GitHub API Error:', error);
    res.status(500).json({ error: 'Failed to fetch GitHub contributions' });
  }
}
