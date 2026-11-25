import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');

// react-snap emits a `200.html` fallback that GitHub Pages never uses.
fs.rmSync(path.join(dist, '200.html'), { force: true });

// macOS noise that must never be published.
fs.rmSync(path.join(dist, '.DS_Store'), { force: true });

// react-snap renders "/404" into dist/404/index.html. GitHub Pages serves
// `dist/404.html` (with an HTTP 404 status) for unknown URLs, so promote the
// rendered NotFound page and drop the directory (which would make /404 a 200).
const notFoundDir = path.join(dist, '404');
const notFoundIndex = path.join(notFoundDir, 'index.html');

if (fs.existsSync(notFoundIndex)) {
  const html = fs.readFileSync(notFoundIndex, 'utf8');
  if (!/name="robots"[^>]*noindex/i.test(html)) {
    throw new Error('404 page is missing <meta name="robots" content="noindex">');
  }
  fs.copyFileSync(notFoundIndex, path.join(dist, '404.html'));
  fs.rmSync(notFoundDir, { recursive: true, force: true });
  console.log('postbuild: promoted dist/404/index.html to dist/404.html');
} else {
  console.warn('postbuild: no prerendered dist/404/index.html found, keeping static 404.html');
}
