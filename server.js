/* global process */
import fs from 'node:fs';
import path from 'node:path';

import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono';

const CWD = process.cwd();
const PORT = process.env.PORT ?? 8080;
const STATIC_PATHNAME = path.resolve(CWD, 'static');

const app = new Hono();

app.use(
  '/*',
  serveStatic({
    root: path.relative(CWD, STATIC_PATHNAME),
  })
);

app.get('/*', async (context, next) => {
  if (context.req.header('accept')?.includes('text/html')) {
    const notFoundPathname = path.resolve(STATIC_PATHNAME, '404/index.html');

    if (fs.existsSync(notFoundPathname)) {
      return context.html(fs.readFileSync(notFoundPathname).toString(), 404);
    }

    return context.text('Not found', 404);
  }

  return next();
});

serve(
  {
    fetch: app.fetch,
    port: PORT,
  },
  () => {
    // eslint-disable-next-line no-console
    console.log(`Server running on port ${PORT}`);
  }
);
