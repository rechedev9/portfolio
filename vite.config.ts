import { createServer, defineConfig } from 'vite'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const ROOT = '<div id="root"></div>'

// Renders the home page into index.html at build time, so crawlers and readers without JavaScript get the copy.
function prerenderHome(): Plugin {
  return {
    name: 'prerender-home',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      async handler(html) {
        if (!html.includes(ROOT)) throw new Error('prerender-home: root element not found in index.html')
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
