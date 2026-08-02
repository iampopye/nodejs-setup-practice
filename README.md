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
3. **Production build** — build it, run the built output, notice how that
   differs from dev mode.
4. **Deploy it** — any Node host. A URL you can send someone is the milestone.
5. **Containerise it** — write the Dockerfile yourself. There isn't one here;
   that's the exercise.

## Requirements

- Node.js 18.1.2 or higher
- npm

## Running it

```bash
npm install
npm run dev      # http://localhost:6969
```

```bash
npm run build    # production build
npm start        # serve the build
```

## Notes for learners

- `package-lock.json` is committed deliberately. Delete it, reinstall, and you
  get different dependency versions — a classic source of "works on my machine".
- The dev port is `6969`, set in `package.json`, not the Next.js default.
- This codebase predates current Next.js. Install warnings are expected, and
  reading them is part of the exercise — understanding *why* a package is
  deprecated beats silencing the message.

## Licence

MIT, © 2018 Wes Bos. See [LICENSE](./LICENSE).
