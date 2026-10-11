import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { applyThemeColor, isDark } from './theme';
import './index.css';

const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');

// Tells the inline script in index.html that the app started, so it keeps the reveal states.
document.documentElement.setAttribute('data-app', '');

applyThemeColor(isDark());

const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// The build prerenders the home page into #root. Unknown paths are served 404.html, which has an empty root;
// a host that falls back to index.html instead (vite preview) still gets a clean render here.
if (root.hasChildNodes() && window.location.pathname === '/') {
  hydrateRoot(root, app);
} else {
  root.replaceChildren();
  createRoot(root).render(app);
}
