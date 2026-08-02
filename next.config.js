/**
 * GitHub Pages serves a project site from a subdirectory, so every URL the app
 * emits needs the repo name in front of it. Set NEXT_PUBLIC_BASE_PATH in CI;
 * leave it unset locally so `npm run dev` still works at the site root.
 */
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/$/, '');

/** @type {import('next').NextConfig} */
module.exports = {
  // Emit a plain folder of HTML/CSS/JS in `out/` — no Node server at runtime.
  // This is what makes GitHub Pages hosting possible, and it is why there are
  // no longer any routes under pages/api (see lib/getShows.js instead).
  output: 'export',

  basePath,
  assetPrefix: basePath || undefined,

  // A static export has no server, so there is nothing to optimise images on
  // the fly. Required whenever output is 'export'.
  images: {
    unoptimized: true,
  },

  // Write `sponsor/index.html` rather than `sponsor.html`, which is what static
  // hosts like GitHub Pages expect when resolving a directory-style URL.
  trailingSlash: true,

  reactStrictMode: true,
};
