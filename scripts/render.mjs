import { createServer } from 'vite';
import fs from 'node:fs/promises';
const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, appType: 'custom' });
try {
  const { pages, routeOf } = await server.ssrLoadModule('/src/pages.js');
  const { render } = await server.ssrLoadModule('svelte/server');
  const template = await fs.readFile('rendered/index.html', 'utf8');
  for (const [path, page] of Object.entries(pages)) {
    const result = render(page.default);
    const html = template.replace('<div id="app"></div>', `<div id="app">${result.body}</div>`).replace('</head>', `${result.head}</head>`);
    const dest = `rendered${routeOf(path)}`;
    await fs.mkdir(dest, { recursive: true });
    await fs.writeFile(`${dest}/index.html`, html);
    if (routeOf(path) === '/kb/incidents/4471-review') {
      await fs.mkdir('submission', { recursive: true });
      await fs.copyFile('src/routes/kb/incidents/4471-review/+page.svx', 'submission/4471-review.svx');
      await fs.writeFile('submission/4471-review.html', html);
    }
    console.log(`Rendered ${routeOf(path)}`);
  }
} finally { await server.close(); }
