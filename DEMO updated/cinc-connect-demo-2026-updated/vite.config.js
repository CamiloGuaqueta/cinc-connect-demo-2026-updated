import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = path.dirname(fileURLToPath(import.meta.url))
const norm = p => p.replace(/\\/g, '/')

// Prospect demos: `vite build --mode <tenant>` → dist/<tenant>/, served at /<tenant>
// Config lives in tenants/<tenant>/config.js (strings, colors, assets, extra CSS).
function tenantPlugin(tenant) {
  const srcDir = norm(path.join(ROOT, 'src'))
  const assetMap = Object.fromEntries(
    Object.entries(tenant.assets || {}).map(([from, to]) => [norm(path.join(ROOT, from)), norm(path.join(ROOT, to))])
  )
  return {
    name: 'tenant',
    enforce: 'pre',
    async resolveId(source, importer, options) {
      if (!importer || !/\.(svg|png|jpe?g)$/.test(source.split('?')[0])) return null
      const resolved = await this.resolve(source, importer, { ...options, skipSelf: true })
      const swap = resolved && assetMap[norm(resolved.id.split('?')[0])]
      return swap ? swap + (source.includes('?') ? '?' + source.split('?')[1] : '') : null
    },
    transform(code, id) {
      const file = norm(id.split('?')[0])
      if (!file.startsWith(srcDir) || !/\.(jsx?|css)$/.test(file)) return null
      let out = code
      for (const [from, to] of tenant.replace) {
        out = typeof from === 'string' ? out.split(from).join(to) : out.replace(from, to)
      }
      if (file.endsWith('/src/index.css') && tenant.css) out += tenant.css
      return out === code ? null : { code: out, map: null }
    },
    transformIndexHtml(html) {
      // Separate localStorage namespace so the CINC demo and this one never share state
      const storageShim = `<script>(function(){var p='${tenant.id}:',s=Storage.prototype;['getItem','setItem','removeItem'].forEach(function(m){var o=s[m];s[m]=function(k){var a=[].slice.call(arguments);if(this===window.localStorage)a[0]=p+k;return o.apply(this,a)}})})();</script>`
      return html
        .replace(/<title>.*<\/title>/, `<title>${tenant.title}</title>`)
        .replace(/href="\/favicon\.svg"/, `href="${tenant.favicon}"`)
        .replace('type="image/svg+xml" href="' + tenant.favicon, 'type="image/png" href="' + tenant.favicon)
        .replace(/name="theme-color" content="[^"]*"/, `name="theme-color" content="${tenant.themeColor}"`)
        .replace('<head>', '<head>\n    ' + storageShim)
    },
  }
}

// https://vite.dev/config/
export default defineConfig(async ({ mode, command }) => {
  const tenantFile = path.join(ROOT, 'tenants', mode, 'config.js')
  const tenant = fs.existsSync(tenantFile) ? (await import(pathToFileURL(tenantFile).href)).default : null

  return {
    plugins: [react(), ...(tenant ? [tenantPlugin(tenant)] : [])],
    server: {
      port: 5174,
    },
    ...(tenant && {
      base: command === 'build' ? `/${tenant.id}/` : '/',
      publicDir: command === 'build' ? false : 'public',   // in prod the root deployment serves /images, /tenants (dev serves at /)
      build: { outDir: `dist/${tenant.id}`, emptyOutDir: true },
    }),
  }
})
