const THEME_COLOR = { light: '#faf8f3', dark: '#141413' } as const;

export function isDark(): boolean {
  return document.documentElement.classList.contains('dark');
}

export function subscribeTheme(onChange: () => void): () => void {
  window.addEventListener('theme-change', onChange);
  return (): void => window.removeEventListener('theme-change', onChange);
}

export function applyThemeColor(dark: boolean): void {
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', dark ? THEME_COLOR.dark : THEME_COLOR.light);
}

export function toggleTheme(): void {
  const next = !isDark();
  document.documentElement.classList.toggle('dark', next);
  applyThemeColor(next);
  window.dispatchEvent(new Event('theme-change'));
  try {
    localStorage.setItem('theme', next ? 'dark' : 'light');
  } catch {
    // Storage is blocked: the choice lasts for this visit only.
  }
}
