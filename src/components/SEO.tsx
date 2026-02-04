import { Helmet } from 'react-helmet-async';

interface Props { 
  title: string; 
  description: string; 
  path: string;
  schema?: any; // Add this
}

export const SEO = ({ title, description, path, schema }: Props) => (
  <Helmet>
    <title>{title} | VerboMetrics</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={`https://verbometrics.com${path}`} />
    {schema && (
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    )}
  </Helmet>
);