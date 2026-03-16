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
  const url = new URL(req.url);

  // Avoid redirect loops by enforcing a single canonical URL.
  // Search Console "Redirect error" is commonly caused by http↔https or www↔non-www loops.
  const host = req.headers.get('host') || url.host;
  const forwardedProto = req.headers.get('x-forwarded-proto') || url.protocol.replace(':', '');
  const isProdHost = host === 'codewithdhruba.in' || host === 'www.codewithdhruba.in';

  if (isProdHost) {
    const canonicalHost = 'codewithdhruba.in';
    const needsHttps = forwardedProto !== 'https';
    const needsHost = host !== canonicalHost;

    if (needsHttps || needsHost) {
      const redirectUrl = new URL(req.url);
      redirectUrl.protocol = 'https:';
      redirectUrl.host = canonicalHost;
      return Response.redirect(redirectUrl.toString(), 308);
    }
  }

  const ua = (req.headers.get('user-agent') || '').toLowerCase();
  const isBot = CRAWLERS.some((b) => ua.includes(b.toLowerCase()));

  if (!isBot) return fetch(req);

  const path = url.pathname;
  if (!getMetaForPath(path)) return fetch(req);

  const og = new URL('/api/og', req.url);
  og.searchParams.set('path', path);
  return fetch(og.toString(), { headers: req.headers });
}
