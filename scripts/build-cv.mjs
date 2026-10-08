import puppeteer from 'puppeteer-core';
import { copyFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SOURCE = path.join(ROOT, 'cv/luis-reche.html');
const OUT = path.join(ROOT, 'public/Luis-Reche-Applied-AI-Engineer-CV.pdf');
// Older links point here, so it serves the same file.
const LEGACY_OUT = path.join(ROOT, 'public/luis-reche-cv.pdf');
const CHROME = process.env.CHROME_PATH ?? '/usr/local/bin/google-chrome';

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.goto(pathToFileURL(SOURCE).href, { waitUntil: 'networkidle0' });
await page.evaluate(() => document.fonts.ready);
await page.pdf({ path: OUT, preferCSSPageSize: true, printBackground: true });
await browser.close();
await copyFile(OUT, LEGACY_OUT);

console.log(`CV written to ${path.relative(ROOT, OUT)} and ${path.relative(ROOT, LEGACY_OUT)}`);
