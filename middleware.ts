import { getMetaForPath } from './og-meta.config';

const CRAWLERS = [
  'facebookexternalhit', 'Facebot', 'Twitterbot', 'WhatsApp', 'LinkedInBot',
  'TelegramBot', 'Slurp', 'Pinterest', 'Discordbot', 'Applebot', 'Embedly',
  'Googlebot', 'bingbot',
];

export const config = {
  matcher: ['/((?!api|_next|favicon|assets|.*\\.(?:png|jpg|jpeg|gif|ico|svg|css|js|woff2?)$).*)'],
};

export default async function middleware(req: Request): Promise<Response> {
  const ua = (req.headers.get('user-agent') || '').toLowerCase();
  const isBot = CRAWLERS.some((b) => ua.includes(b.toLowerCase()));

  if (!isBot) return fetch(req);

  const path = new URL(req.url).pathname;
  if (!getMetaForPath(path)) return fetch(req);

  const og = new URL('/api/og', req.url);
  og.searchParams.set('path', path);
  return fetch(og.toString(), { headers: req.headers });
}
