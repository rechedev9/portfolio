import { useEffect } from 'react';

const SITE_URL = 'https://luisreche.dev';

type DocumentMeta = {
  readonly title: string;
  readonly description: string;
  readonly path: string;
};

const ROUTE_META: Record<string, DocumentMeta> = {
  '/': {
    title: 'Luis Reche | Fullstack Developer',
    description:
      'Fullstack Software Developer from Spain. TypeScript, React, Node.js, Bun, PostgreSQL. Interactive terminal portfolio.',
    path: '/',
  },
  '/cs': {
    title: 'Luis Reche | CS 1.6 Theme',
    description:
      'Counter-Strike 1.6 themed developer portfolio. Luis Reche — Fullstack Developer. TypeScript, React, Node.js.',
    path: '/cs',
  },
  '/pokemon': {
    title: 'Luis Reche | Pokémon Theme',
    description:
      'Game Boy Pokémon themed developer portfolio. Luis Reche — Fullstack Developer. TypeScript, React, Node.js.',
    path: '/pokemon',
  },
};

function setMetaTag(property: string, content: string): void {
  const selector = property.startsWith('og:')
    ? `meta[property="${property}"]`
    : `meta[name="${property}"]`;

  let element = document.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    if (property.startsWith('og:')) {
      element.setAttribute('property', property);
    } else {
      element.setAttribute('name', property);
    }
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setCanonical(url: string): void {
  let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

export function useDocumentMeta(path: string): void {
  useEffect(() => {
    const meta = ROUTE_META[path] ?? ROUTE_META['/'];
    if (!meta) return;

    const fullUrl = `${SITE_URL}${meta.path}`;

    document.title = meta.title;
    setMetaTag('description', meta.description);
    setMetaTag('og:title', meta.title);
    setMetaTag('og:description', meta.description);
    setMetaTag('og:url', fullUrl);
    setMetaTag('twitter:title', meta.title);
    setMetaTag('twitter:description', meta.description);
    setMetaTag('twitter:url', fullUrl);
    setCanonical(fullUrl);
  }, [path]);
}
