// Browser chrome colour per theme. Keep in sync with --color-background in index.css.
const THEME_COLOR = { light: '#fbfaf6', dark: '#131211' } as const;

export function isDarkTheme(): boolean {
  return document.documentElement.classList.contains('dark');
}

export function syncThemeColor(): void {
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', isDarkTheme() ? THEME_COLOR.dark : THEME_COLOR.light);
}

export function toggleTheme(): void {
  const next = !isDarkTheme();
  document.documentElement.classList.toggle('dark', next);
  try {
    localStorage.setItem('theme', next ? 'dark' : 'light');
  } catch {
    // Storage can be blocked; the toggle still works for this visit.
  }
  syncThemeColor();
  window.dispatchEvent(new Event('theme-change'));
}
