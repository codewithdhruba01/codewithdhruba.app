import { getMetaForPath, toAbsoluteUrl } from '../og-meta.config';

export const config = { runtime: 'edge' };

export default async function handler(req: Request): Promise<Response> {
  try {
    const url = new URL(req.url);
    const path = url.searchParams.get('path') || '/';
    const origin = url.origin;
    const meta = getMetaForPath(path);

    if (!meta) return new Response('Not found', { status: 404 });

    const baseUrl = `${origin}/`;
    const htmlResponse = await fetch(baseUrl);
    let html = await htmlResponse.text();

    const fullUrl = toAbsoluteUrl(path.startsWith('/') ? path : '/' + path);
    const imageUrl = toAbsoluteUrl(meta.image);

    const escape = (s: string) =>
      s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

    const replacements: Array<[RegExp, string]> = [
      [/<title>.*?<\/title>/, `<title>${escape(meta.title)}</title>`],
      [/<meta name="description" content="[^"]*"/, `<meta name="description" content="${escape(meta.description)}"`],
      [/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${escape(meta.title)}"`],
      [/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${escape(meta.description)}"`],
      [/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${escape(fullUrl)}"`],
      [/<meta property="og:image" content="[^"]*"/, `<meta property="og:image" content="${escape(imageUrl)}"`],
      [/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${escape(meta.title)}"`],
      [/<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${escape(meta.description)}"`],
      [/<meta name="twitter:image" content="[^"]*"/, `<meta name="twitter:image" content="${escape(imageUrl)}"`],
    ];

    for (const [regex, repl] of replacements) html = html.replace(regex, repl);

    return new Response(html, {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  } catch (err) {
    console.error('OG API error:', err);
    return new Response('Internal Server Error', { status: 500 });
  }
}
