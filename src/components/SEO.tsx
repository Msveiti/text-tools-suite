import { Helmet } from 'react-helmet-async';

interface Props {
  title: string;
  description: string;
  path: string;
  schema?: any;
}

export const SEO = ({ title, description, path, schema }: Props) => {
  // Remove .html and ensure path starts with /
  const cleanPath = path.replace(/\.html$/, '').replace(/^\/?/, '/');
  const canonicalUrl = `https://verbometrics.com${cleanPath === '/' ? '' : cleanPath}`;

  return (
    <Helmet>
      <title>{title} | VerboMetrics</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
    </Helmet>
  );
};