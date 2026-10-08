import puppeteer from 'puppeteer-core';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const BASE = process.env.BASE_URL ?? 'http://127.0.0.1:5173';
const OUT = process.env.OUT_DIR ?? '/tmp/portfolio-e2e';
const CHROME = process.env.CHROME_PATH ?? '/usr/local/bin/google-chrome';

const results = [];

function ok(name, detail = '') {
  results.push({ name, pass: true, detail });
  console.log(`✓ ${name}${detail ? ` — ${detail}` : ''}`);
}

function fail(name, detail = '') {
  results.push({ name, pass: false, detail });
  console.error(`✗ ${name}${detail ? ` — ${detail}` : ''}`);
}

async function shot(page, name) {
  const file = path.join(OUT, `${name}.png`);
  await page.screenshot({ path: file, fullPage: true });
  return file;
}

async function textExists(page, text) {
  return page.evaluate((t) => document.body.innerText.includes(t), text);
}

async function main() {
  await mkdir(OUT, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,900'],
    defaultViewport: { width: 1280, height: 900 },
  });

  const page = await browser.newPage();
  page.setDefaultTimeout(15000);

  // ---- Home light ----
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('h1');

  const title = await page.title();
  if (title.includes('Applied AI Engineer') && !title.includes('Backend')) ok('document title', title);
  else fail('document title', title);

  for (const t of [
    'Luis Reche',
    'Applied AI Engineer',
    '/me',
    '/always',
    '/highlights',
    '/live',
    'ClipHub',
    'SocialPro',
    '100+ users',
    'Agentero',
    'Gravity Room',
    'software consultant',
    'Google Cloud',
    'Berrus (2025 — present)',
  ]) {
    if (await textExists(page, t)) ok(`home text: ${t}`);
    else fail(`home text: ${t}`);
  }

  const banned = await page.evaluate(() => document.body.innerText);
  if (!/Backend Engineer|Full Stack Engineer|TickCut|Shenron|\/workflow/i.test(banned)) ok('no stale titles or removed items');
  else fail('no stale titles or removed items', 'found a retired title, TickCut, Shenron, or /workflow');

  const cvHref = await page.$eval('a[aria-label="Download CV"]', (a) => a.getAttribute('href'));
  if (cvHref === '/Luis-Reche-Applied-AI-Engineer-CV.pdf') ok('CV link href');
  else fail('CV link href', cvHref);

  const cvRes = await page.goto(BASE + '/Luis-Reche-Applied-AI-Engineer-CV.pdf', { waitUntil: 'domcontentloaded' });
  if (cvRes && cvRes.ok() && (cvRes.headers()['content-type'] || '').includes('pdf')) {
    ok('CV PDF served', String(cvRes.status()));
  } else {
    fail('CV PDF served', cvRes ? `${cvRes.status()} ${cvRes.headers()['content-type']}` : 'no response');
  }
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });

  // Live icons load
  await page.waitForFunction(() => [...document.querySelectorAll('#live img')].every((i) => i.complete));
  const icons = await page.$$eval('#live img', (imgs) =>
    imgs.map((i) => ({ src: i.getAttribute('src'), w: i.naturalWidth, h: i.naturalHeight, complete: i.complete })),
  );
  if (icons.length >= 3) ok('live icons count', String(icons.length));
  else fail('live icons count', String(icons.length));
  for (const icon of icons) {
    if (icon.complete && icon.w > 0) ok(`icon loads ${icon.src}`);
    else fail(`icon loads ${icon.src}`, JSON.stringify(icon));
  }

  await shot(page, '01-home-light');

  // Dark mode toggle
  await page.click('button[aria-label="Switch to dark mode"]');
  await page.waitForFunction(() => document.documentElement.classList.contains('dark'));
  const isDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
  if (isDark) ok('dark mode class');
  else fail('dark mode class');
  await shot(page, '02-home-dark');

  // Command palette open via button
  await page.click('button[aria-label="Open command palette"]');
  await page.waitForSelector('[role="dialog"][aria-label="Command palette"]');
  ok('command palette opens');
  await shot(page, '03-command-palette');

  // Filter without leaving the page
  await page.type('input[aria-label="Search commands"]', 'ClipHub');
  const filtered = await page.$$eval('[role="option"]', (opts) =>
    opts.map((o) => (o.textContent || '').trim()),
  );
  if (filtered.some((t) => t.toLowerCase().includes('cliphub'))) {
    ok('command palette filter', filtered.slice(0, 3).join(' | '));
  } else {
    fail('command palette filter', filtered.join(' | ') || '(empty)');
  }
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => !document.querySelector('[aria-label="Command palette"]'), {
    timeout: 5000,
  });
  ok('command palette closes Esc');

  // Re-open palette with keyboard
  await page.keyboard.down('Control');
  await page.keyboard.press('k');
  await page.keyboard.up('Control');
  await page.waitForSelector('[role="dialog"][aria-label="Command palette"]');
  ok('command palette Ctrl+K');
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => !document.querySelector('[aria-label="Command palette"]'), {
    timeout: 5000,
  });
  ok('command palette Ctrl+K close');

  // Mobile viewport home
  await page.setViewport({ width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 });
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('h1');
  const overflowX = await page.evaluate(() => {
    const de = document.documentElement;
    return de.scrollWidth > de.clientWidth + 2;
  });
  if (!overflowX) ok('mobile no horizontal overflow');
  else fail('mobile no horizontal overflow', 'scrollWidth > clientWidth');
  await shot(page, '08-home-mobile');

  // External project links present
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  const hrefs = await page.$$eval('a[href]', (as) => as.map((a) => a.href));
  const removedHrefs = hrefs.filter((h) => /shenron|\/workflow/i.test(h));
  if (removedHrefs.length === 0) ok('no links to removed pages');
  else fail('no links to removed pages', removedHrefs.join(', '));
  for (const need of [
    'https://www.agentero.com/',
    'https://cliphub.gravityroom.app/',
    'https://gravityroom.app/',
    'https://github.com/luis-reche-ag/agent-git-toolkit',
  ]) {
    if (hrefs.some((h) => h.startsWith(need) || h === need || h.includes(need.replace(/\/$/, '')))) {
      ok(`link present ${need}`);
    } else {
      fail(`link present ${need}`, hrefs.filter((h) => h.includes('github') || h.includes('agentero') || h.includes('tickcut')).slice(0, 8).join(', '));
    }
  }

  // Console errors — attach before load
  const consoleErrors = [];
  const onPageError = (e) => consoleErrors.push(e.message);
  const onConsole = (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  };
  page.on('pageerror', onPageError);
  page.on('console', onConsole);
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  await new Promise((r) => setTimeout(r, 1500));
  page.off('pageerror', onPageError);
  page.off('console', onConsole);
  // Filter noisy chrome extension / favicon noise
  const realErrors = consoleErrors.filter(
    (e) => !/favicon|Download the React DevTools/i.test(e),
  );
  if (realErrors.length === 0) ok('no console errors on home');
  else fail('no console errors on home', realErrors.slice(0, 5).join(' | '));

  await browser.close();

  const passed = results.filter((r) => r.pass).length;
  const failed = results.filter((r) => !r.pass).length;
  const report = {
    base: BASE,
    passed,
    failed,
    total: results.length,
    results,
  };
  await writeFile(path.join(OUT, 'report.json'), JSON.stringify(report, null, 2));
  console.log('\n==== SUMMARY ====');
  console.log(`${passed}/${results.length} passed, ${failed} failed`);
  console.log(`Screenshots: ${OUT}`);
  if (failed > 0) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
