import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Custom plugin to run our Vercel API function locally
const apiFallback = () => ({
  name: 'api-fallback',
  configureServer(server: any) {
    server.middlewares.use('/api/github', async (req: any, res: any) => {
      try {
        const { request, gql } = await import('graphql-request');
        const env = loadEnv('', process.cwd(), '');
        const TOKEN = env.GITHUB_TOKEN || env.VITE_GITHUB_TOKEN;
        
        if (!TOKEN) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: 'Missing GITHUB_TOKEN in .env' }));
          return;
        }

        const url = new URL(req.originalUrl, `http://${req.headers.host}`);
        const year = url.searchParams.get('year') || 'Default';
        const GITHUB_USERNAME = 'codewithdhruba01';

        const query = year === 'Default'
          ? gql`query { user(login: "${GITHUB_USERNAME}") { contributionsCollection { contributionCalendar { totalContributions weeks { contributionDays { date contributionCount } } } } } }`
          : gql`query { user(login: "${GITHUB_USERNAME}") { contributionsCollection(from: "${year}-01-01T00:00:00Z" to: "${year}-12-31T23:59:59Z") { contributionCalendar { totalContributions weeks { contributionDays { date contributionCount } } } } } }`;

        const data = await request('https://api.github.com/graphql', query, {}, { Authorization: `Bearer ${TOKEN}` });
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
      } catch (e) {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Failed' }));
      }
    });
  }
});

export default defineConfig({
  plugins: [react(), apiFallback()],
})