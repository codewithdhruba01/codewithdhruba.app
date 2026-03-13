import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { getMetaForPath, toAbsoluteUrl } from '../../og-meta.config';

/**
 * Dynamic SEO component - updates document title and meta tags
 * based on current route. Works alongside server-side OG injection for crawlers.
 */
const SEO = () => {
  const { pathname } = useLocation();
  const meta = getMetaForPath(pathname);

  if (!meta) return null;

  const fullUrl = toAbsoluteUrl(pathname);
  const imageUrl = toAbsoluteUrl(meta.image);

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
};

export default SEO;
