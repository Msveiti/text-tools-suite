import { Helmet } from 'react-helmet-async';

interface Props { title: string; description: string; path: string; schema?: any; }

export const SEO = ({ title, description, path, schema }: Props) => {
  // Ensure the path always starts with a / and has no .html
  const cleanPath = path.endsWith('.html') ? path.replace('.html', '') : path;
  const canonicalUrl = `https://verbometrics.com${cleanPath === '/' ? '' : cleanPath}`;

  return (
    <Helmet>
      <title>{title} | VerboMetrics</title>
      <meta name="description" content={description} />
      
      {/* THIS IS THE FIX: Tells Google exactly which URL to index */}
      <link rel="canonical" href={canonicalUrl} />
      
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};