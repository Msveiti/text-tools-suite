import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const container = document.getElementById('root')!;

// The HTML is pre-rendered by react-snap for crawlers, but we intentionally
// render a fresh root instead of hydrating: react-snap's snapshot is not a
// byte-for-byte match for React 19's client output, which triggered a React
// #418 "hydration failed" error (and a full re-render) on every load.
// Rendering fresh keeps the prerendered HTML for SEO while guaranteeing a
// consistent, error-free client tree. Revisit hydration after the prerender
// pipeline is replaced (e.g. by SSR/SSG with a React 19 compatible tool).
createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
