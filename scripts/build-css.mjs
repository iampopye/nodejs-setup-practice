/**
 * Compiles the original Stylus sources to a single plain CSS file.
 *
 * Why this exists
 * ---------------
 * Next.js 12 and earlier let you bolt a custom webpack loader chain onto the
 * build (see the old `next.config.js`), and this project used that to turn
 * `styles/*.styl` into CSS at bundle time. Next 13+ owns its CSS pipeline and
 * will not run that chain any more.
 *
 * Rather than rewrite 16 Stylus files by hand, we compile them here — before
 * Next runs — and let Next treat the result as an ordinary global stylesheet
 * imported from `pages/_app.js`. The upstream `.styl` sources stay untouched.
 *
 * This runs from the `predev` and `prebuild` npm scripts, so you never have to
 * remember to call it yourself.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import stylus from 'stylus';

const projectRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const stylesDir = path.join(projectRoot, 'styles');
const entryFile = path.join(stylesDir, 'style.styl');
const outFile = path.join(stylesDir, 'generated', 'style.css');

/**
 * When the site is served from a subdirectory (GitHub Pages serves this repo
 * at /nodejs-setup-practice/) every absolute URL needs that prefix. Next
 * rewrites the ones it controls, but it cannot see inside a stylesheet, so the
 * `url('/static/...')` references in the Stylus sources are our problem.
 */
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/$/, '');

function render(source) {
  return new Promise((resolve, reject) => {
    stylus(source)
      .set('filename', entryFile)
      // Mirrors the `includePaths` from the old next.config.js webpack block.
      .set('paths', [stylesDir, path.join(projectRoot, 'node_modules')])
      .render((err, css) => (err ? reject(err) : resolve(css)));
  });
}

const source = await readFile(entryFile, 'utf-8');
let css = await render(source);

if (basePath) {
  // url('/static/x.png') -> url('/nodejs-setup-practice/static/x.png')
  css = css.replace(/url\((['"]?)\/static\//g, `url($1${basePath}/static/`);
}

await mkdir(path.dirname(outFile), { recursive: true });
await writeFile(outFile, css, 'utf-8');

console.log(
  `[build-css] ${path.relative(projectRoot, outFile)} (${css.length} bytes)` +
    `${basePath ? ` with basePath ${basePath}` : ''}`
);
