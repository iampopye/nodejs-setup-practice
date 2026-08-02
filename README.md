# Node.js / Next.js Setup Practice

A realistic, working Next.js codebase used for teaching **local setup and
deployment** — installing dependencies, running a dev server, building for
production, and shipping it somewhere.

Toy "hello world" projects hide the problems people actually hit on day one.
This is a real application with real dependencies, real build steps and real
configuration, so the practice is representative.

## Attribution — please read this first

**This is not my code, and it is not a dummy sample site.**

The application is [**Syntax.fm**](https://syntax.fm) — the website for the web
development podcast by **[Wes Bos](https://wesbos.com)** and
**[Scott Tolinski](https://scotttolinski.com)**.

- Copyright © 2018 Wes Bos
- Licensed **MIT** — see [LICENSE](./LICENSE), reproduced unmodified
- The episode content under `shows/` and `transcripts/` is their editorial work

It is reproduced here under the MIT licence as teaching material only. If you
find it useful, **go listen to the podcast** and support the people who made it.

I did not write this application and I make no claim to it. My own projects are
at [github.com/iampopye](https://github.com/iampopye?tab=repositories).

## Exercises

The goal is getting it running, not rewriting it.

1. **Get it running locally** — clone, install, start the dev server, open it.
2. **Read the errors.** Wrong Node version? The message says so. Practise
   reading failures instead of guessing.
3. **Production build** — build it, serve the built output, notice how that
   differs from dev mode.
4. **Deploy it** — the included workflow ships it to GitHub Pages. A URL you
   can send someone is the milestone.
5. **Containerise it** — write the Dockerfile yourself. There isn't one here;
   that's the exercise.

## Requirements

- Node.js 20.9 or higher
- npm

## Running it

```bash
npm install
npm run dev      # http://localhost:6969
```

```bash
npm run build    # static export, written to out/
npm start        # serve out/ at http://localhost:6969
```

`npm run build` produces a folder of plain HTML, CSS and JavaScript in `out/`
(`output: 'export'` in `next.config.js`). There is no Node server at runtime,
which is what makes free static hosting possible — and it is why this app has
no `pages/api` routes: the episode markdown under `shows/` is read at **build**
time by `lib/getShows.js` and baked into the pages.

Note that `npm start` is not `next start` any more. A static export has nothing
to start; `npm start` just serves the `out/` folder with a plain file server.

## Deploying

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the
static export and publishes it to GitHub Pages at
<https://iampopye.github.io/nodejs-setup-practice/>.

This needs one manual setting first, once per repository: **Settings → Pages →
Build and deployment → Source: GitHub Actions**. A workflow cannot do this for
itself — turning Pages on is an admin-level API call, and the automatic
`GITHUB_TOKEN` deliberately never has admin rights. Until it is set, the build
job passes and the deploy job fails with `Resource not accessible by
integration`, which is a permissions error, not a broken build.

Two things make a project Pages site work, and both are worth understanding:

- **`basePath`** — the site is served from `/nodejs-setup-practice/`, not the
  domain root, so every absolute URL needs that prefix. The workflow sets
  `NEXT_PUBLIC_BASE_PATH`, which `next.config.js` feeds to `basePath` and
  `assetPrefix`. Next cannot see inside a stylesheet, so
  `scripts/build-css.mjs` applies the same prefix to the `url()` references,
  and `lib/asset.js` does it for hand-written `src` attributes.
- **`.nojekyll`** — Pages runs files through Jekyll by default, which silently
  drops anything starting with an underscore, including Next's `_next/` asset
  directory. The empty `public/.nojekyll` file turns that off.

Leave `NEXT_PUBLIC_BASE_PATH` unset when building locally so the export works
at the root, the way `npm start` serves it.

## Notes for learners

- `package-lock.json` is committed deliberately. Delete it, reinstall, and you
  get different dependency versions — a classic source of "works on my machine".
- The dev port is `6969`, set in `package.json`, not the Next.js default.
- The 16 Stylus files in `styles/` are the original authors' source. Next no
  longer compiles `.styl` itself, so `scripts/build-css.mjs` turns them into
  one CSS file first — that is what the `predev` and `prebuild` npm scripts
  are for. npm runs a `preX` script automatically before `X`; nothing invokes
  it by hand.
- `styles/generated/` and `out/` are build output and are gitignored. If a
  stylesheet change seems not to apply, check that the prebuild step ran.
- Install still prints deprecation warnings from transitive dependencies.
  Reading them is part of the exercise — understanding *why* a package is
  deprecated beats silencing the message.
- `npm audit` is not clean, and that is worth sitting with rather than
  reflexively running `npm audit fix --force` (which here would "fix" things by
  downgrading to Next 9). The `overrides` block in `package.json` pins a
  patched `sharp`, an optional dependency of Next that this site never loads.
  What remains is build-time only: `postcss`, which Next pins to an exact
  version, and `meta-marked`, whose old `marked`/`js-yaml` cannot be bumped
  without breaking the markdown rendering. Both only ever parse files committed
  to this repository, never anything a visitor supplies. Severity is not risk
  until you know whether the vulnerable path is reachable.

## Licence

MIT, © 2018 Wes Bos. See [LICENSE](./LICENSE).
