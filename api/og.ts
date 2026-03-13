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
      [/<title>.*?<\/title>/s, `<title>${escape(meta.title)}</title>`],
      [/<meta\s+name="description"\s+content="[^"]*"/is, `<meta name="description" content="${escape(meta.description)}"`],
      [/<meta\s+property="og:title"\s+content="[^"]*"/is, `<meta property="og:title" content="${escape(meta.title)}"`],
      [/<meta\s+property="og:description"\s+content="[^"]*"/is, `<meta property="og:description" content="${escape(meta.description)}"`],
      [/<meta\s+property="og:url"\s+content="[^"]*"/is, `<meta property="og:url" content="${escape(fullUrl)}"`],
      [/<meta\s+property="og:image"\s+content="[^"]*"/is, `<meta property="og:image" content="${escape(imageUrl)}"`],
      [/<meta\s+name="twitter:title"\s+content="[^"]*"/is, `<meta name="twitter:title" content="${escape(meta.title)}"`],
      [/<meta\s+name="twitter:description"\s+content="[^"]*"/is, `<meta name="twitter:description" content="${escape(meta.description)}"`],
      [/<meta\s+name="twitter:image"\s+content="[^"]*"/is, `<meta name="twitter:image" content="${escape(imageUrl)}"`],
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
