import { Helmet } from 'react-helmet-async';

interface Props { title: string; description: string; path: string; }

export const SEO = ({ title, description, path }: Props) => (
  <Helmet>
    <title>{title} | VerboMetrics</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={`https://verbometrics.com${path}`} />
  </Helmet>
);