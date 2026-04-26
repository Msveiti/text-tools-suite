import React from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import './index.css'

const container = document.getElementById('root')!;

if (container.hasChildNodes()) {
  // If the HTML is pre-rendered by react-snap, hydrate it
  hydrateRoot(
    container,
    <React.StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </React.StrictMode>
  );
} else {
  // Fallback for standard development rendering
  createRoot(container).render(
    <React.StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </React.StrictMode>
  );
}