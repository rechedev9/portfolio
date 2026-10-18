import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { createServer, defineConfig } from 'vite'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const ROOT = '<div id="root"></div>'

function notFoundDocument(html: string): string {
  const stripped = html.replace(/\n\s*<link rel="canonical" href="[^"]*" \/>/, '')
  const titled = stripped
    .replace(/<title>[^<]*<\/title>/, '<title>404 | Luis Reche</title>')
    .replace(/<meta name="title" content="[^"]*" \/>/, '<meta name="title" content="404 | Luis Reche" />')
    .replace(/<meta name="description" content="[^"]*" \/>/, '<meta name="description" content="This page does not exist." />')
  const robots = '<meta name="robots" content="noindex" />'
  const withRobots = titled.includes('name="robots"')
    ? titled
    : titled.replace(
        '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
        `<meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    ${robots}`,
      )
  if (
    !withRobots.includes(ROOT) ||
    withRobots.includes('rel="canonical"') ||
    !withRobots.includes('<meta name="robots" content="noindex" />') ||
    !withRobots.includes('<title>404 | Luis Reche</title>') ||
    !withRobots.includes('<meta name="description" content="This page does not exist." />')
  ) {
    throw new Error('prerender-home: 404.html head was not rewritten')
  }
  return withRobots
}

// Renders the home page into index.html at build time, so crawlers and readers without JavaScript get the copy.
// Also writes 404.html, the same app with an empty root, so a wrong URL never shows the home page first.
function prerenderHome(): Plugin {
  let shell = ''
  let outDir = 'dist'
  return {
    name: 'prerender-home',
    apply: 'build',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir)
    },
    async closeBundle() {
      if (shell !== '') await writeFile(path.join(outDir, '404.html'), notFoundDocument(shell))
    },
    transformIndexHtml: {
      order: 'post',
      async handler(html) {
        if (!html.includes(ROOT)) throw new Error('prerender-home: root element not found in index.html')
        shell = html
        const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' })
        try {
          const entry: Record<string, unknown> = await server.ssrLoadModule('/src/entry-server.ts')
          const render = entry.render
          if (typeof render !== 'function') throw new Error('prerender-home: entry-server.ts does not export render')
          const markup: unknown = render()
          if (typeof markup !== 'string') throw new Error('prerender-home: render did not return a string')
          return html.replace(ROOT, () => `<div id="root">${markup}</div>`)
        } finally {
          await server.close()
        }
      },
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), prerenderHome()],
})
