/**
 * Prefixes a root-relative asset path with the site's basePath.
 *
 * Next rewrites the URLs it generates itself (its own JS/CSS chunks, and
 * anything you pass to next/link), but a hand-written `src="/static/logo.png"`
 * is opaque to it. On GitHub Pages the site lives under /nodejs-setup-practice/,
 * so those paths would 404 without this.
 *
 * NEXT_PUBLIC_ variables are inlined into the client bundle at build time, so
 * this works in the browser as well as during the static export.
 */
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/$/, '');

export default function asset(path) {
  return `${basePath}${path}`;
}
