import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { applyThemeColor, isDark } from './theme';
import './index.css';

const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');

applyThemeColor(isDark());

const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// The build prerenders the home page into #root. Every other path gets the same file, so it renders from scratch.
if (root.hasChildNodes() && window.location.pathname === '/') {
  hydrateRoot(root, app);
} else {
  root.replaceChildren();
  createRoot(root).render(app);
}
