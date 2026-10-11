import { StrictMode, createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { App } from './App';

// Called by the prerender plugin in vite.config.ts at build time.
export function render(): string {
  return renderToString(
    createElement(StrictMode, null, createElement(StaticRouter, { location: '/' }, createElement(App))),
  );
}
