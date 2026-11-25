import { useLayoutEffect } from 'react';

const SITE_URL = 'https://verbometrics.com';
const SITE_NAME = 'VerboMetrics';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
const SCHEMA_ID = 'verbo-page-schema';

interface Props {
  title: string;
  description: string;
  path: string;
  schema?: Record<string, unknown> | Record<string, unknown>[];
  /** Mark the page as a software application (adds SoftwareApplication schema). */
  application?: boolean;
  /** Optional FAQ entries — rendered as FAQPage schema. */
  faqs?: { q: string; a: string }[];
  /** Use for error pages and other URLs that must not be indexed. */
  noindex?: boolean;
  /** Open Graph type, e.g. "article" for blog posts. */
  type?: 'website' | 'article';
}

/** Create or update a single <meta> tag and drop accidental duplicates. */
const setMeta = (attribute: 'name' | 'property', key: string, content: string) => {
  const selector = `meta[${attribute}="${key}"]`;
  const existing = document.head.querySelectorAll<HTMLMetaElement>(selector);
  const tag = existing[0] ?? document.createElement('meta');

  if (!existing.length) {
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);

  // Keep exactly one of each tag (older builds could leave duplicates behind).
  existing.forEach((extra, index) => index > 0 && extra.remove());
};

const setCanonical = (href: string) => {
  const tags = document.head.querySelectorAll<HTMLLinkElement>('link[rel="canonical"]');
  const tag = tags[0] ?? document.createElement('link');

  if (!tags.length) {
    tag.setAttribute('rel', 'canonical');
    document.head.appendChild(tag);
  }
  tag.setAttribute('href', href);
  tags.forEach((extra, index) => index > 0 && extra.remove());
};

const setSchema = (schema?: Record<string, unknown> | Record<string, unknown>[] | null) => {
  let tag = document.getElementById(SCHEMA_ID) as HTMLScriptElement | null;

  if (!schema || (Array.isArray(schema) && schema.length === 0)) {
    tag?.remove();
    return;
  }

  if (!tag) {
    tag = document.createElement('script');
    tag.id = SCHEMA_ID;
    tag.type = 'application/ld+json';
    document.head.appendChild(tag);
  }
  tag.textContent = JSON.stringify(schema);
};

/**
 * Applies per-route document metadata.
 *
 * We deliberately manage <head> imperativey instead of using React 19's
 * metadata hoisting (which appends duplicates of pre-rendered tags on the
 * client) and instead of react-helmet-async (whose deferred updates were not
 * reliably captured by the react-snap prerender). A layout effect runs before
 * paint and keeps every tag unique and in sync on route changes.
 */
export const SEO = ({ title, description, path, schema, noindex = false, type = 'website', application = false, faqs }: Props) => {
  // Publish the trailing-slash form: that is the URL GitHub Pages serves for
  // directory routes after its 301 redirect.
  const cleanPath = `/${path.replace(/^\/+|\/+$/g, '')}`.replace(/^\/$/, '/');
  const canonicalUrl = cleanPath === '/' ? `${SITE_URL}/` : `${SITE_URL}${cleanPath}/`;

  // Avoid double-branding if a page title already includes the site name.
  const fullTitle = new RegExp(SITE_NAME, 'i').test(title) ? title : `${title} | ${SITE_NAME}`;

  useLayoutEffect(() => {
    document.title = fullTitle;

    setMeta('name', 'description', description);
    setMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow');
    // A noindex page (e.g. 404) should not also declare a canonical target.
    if (noindex) {
      document.head.querySelectorAll('link[rel="canonical"]').forEach((tag) => tag.remove());
    } else {
      setCanonical(canonicalUrl);
    }

    // Open Graph
    setMeta('property', 'og:site_name', SITE_NAME);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:image', DEFAULT_OG_IMAGE);
    setMeta('property', 'og:image:width', '1200');
    setMeta('property', 'og:image:height', '630');
    setMeta('property', 'og:image:alt', `${SITE_NAME} — free writing and text analysis tools`);

    // Twitter
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', DEFAULT_OG_IMAGE);

    // Auto-generate a per-route BreadcrumbList (Home → … → current page).
    const crumbName = title.replace(new RegExp(SITE_NAME, 'i'), '').trim() || title;
    const crumbs: { name: string; url: string }[] = [{ name: 'Home', url: `${SITE_URL}/` }];
    if (cleanPath.startsWith('/blog') && cleanPath !== '/blog' && cleanPath !== '/blog/') {
      crumbs.push({ name: 'Blog', url: `${SITE_URL}/blog/` });
    }
    crumbs.push({ name: crumbName, url: canonicalUrl });
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.name,
        item: c.url,
      })),
    };

    // Auto-detect tool pages so they get a SoftwareApplication schema without
    // per-page edits.
    const isToolPage =
      !cleanPath.startsWith('/blog') &&
      !['/', '/contact', '/privacy', '/terms', '/404'].includes(cleanPath);
    const isApplication = application || isToolPage;

    const schemas: (Record<string, unknown>)[] = [breadcrumbSchema];
    if (isApplication) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: title,
        description,
        url: canonicalUrl,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      });
    }
    if (schema) {
      if (Array.isArray(schema)) schemas.push(...schema);
      else schemas.push(schema);
    }
    if (faqs && faqs.length) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      });
    }

    if (noindex) {
      // Error pages: keep only the breadcrumb-free minimal set (none).
      setSchema(null);
    } else {
      setSchema(schemas.length === 1 ? schemas[0] : schemas);
    }
  }, [fullTitle, description, noindex, canonicalUrl, type, schema, application, cleanPath, faqs, title]);

  return null;
};
