# dannyd2222.github.io

Sorgente del sito personale pubblicato su **GitHub Pages** all’URL [`https://dannyd2222.github.io/`](https://dannyd2222.github.io/) (repository utente `username.github.io`, senza sottopath `/nome-repo`).

---

## Repository

Clone del repository:

```
git@github.com:dannyd2222/dannyd2222.github.io.git
```

## What's included

Struttura del progetto:

```
dannyd2222.github.io
├── next.config.js
├── next-env.d.ts
├── package.json
├── package-lock.json
├── public
│   └── favicon.ico
├── README.md
├── src
│   ├── components
│   │   ├── Appbar.tsx
│   │   ├── Avatar.tsx
│   │   ├── ContactForm.tsx
│   │   ├── Copyright.tsx
│   │   ├── DataItem.tsx
│   │   ├── ExpandButton.tsx
│   │   ├── icons
│   │   │   └── SkypeIcon.tsx
│   │   ├── Link.tsx
│   │   ├── ReferenceIcon.tsx
│   │   ├── SectionItem.tsx
│   │   ├── SidebarMenu.tsx
│   │   ├── Sidebar.tsx
│   │   └── ThemeSwitcher.tsx
│   ├── contexts
│   │   └── MUIWrapper.tsx
│   ├── data.json
│   ├── pages
│   │   ├── _app.tsx
│   │   ├── _document.tsx
│   │   ├── index.tsx
│   │   └── login.tsx
│   ├── theme
│   │   └── index.ts
│   └── utils
│       ├── googlePhotos.ts
│       └── __tests__
│           └── googlePhotos.test.js
└── tsconfig.json
```

## Getting Started

### Prerequisites

* [NodeJS v.18.x.x](https://nodejs.org/download/) or higher
* *NPM v.9.4.2* or higher (it comes along with NodeJS)

## Development

This project has been developed with the [React.js](https://reactjs.org/) framework

### Running Dev Server:
In order to start the development server run the following commands:

```
$ cd path/to/project/
$ npm run dev
```

If the process exits with no errors you should be able to access the result page at: https://localhost:3000/

## Deploying to GitHub Pages

[GitHub Pages](https://docs.github.com/pages) only serves **static files**. This app uses Next.js with [`output: 'export'`](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports) in `next.config.js`, so a normal production build emits a complete static site.

### What to publish

1. Install dependencies: `npm ci` (or `npm install`).
2. Run **`npm run build`**.
3. Deploy **everything inside the `build/` directory** (HTML, `_next/`, assets). That folder is the static site. Do not upload the raw source tree.

Because `distDir` is set to `build`, the export is written there. If you removed `distDir`, Next.js would use `out/` instead.

To preview the static build locally (static export does not use `next start`):

```bash
npx serve build
```

### GitHub settings

In the GitHub repository: **Settings → Pages**.

- For the automated workflow, set **Source** to **GitHub Actions** (see below). For a branch-based setup, pick the branch and folder that contain the contents of `build/`.
- The files GitHub serves must be the **contents** of `build/` after step 2 above—for example the root of a `gh-pages` branch, or `/ (root)` of `main` if you commit the built assets there.

### User site (questo repository)

`package.json` imposta `"homepage": "https://dannyd2222.github.io"`, coerente con un **sito utente** alla radice del dominio. **Non** servono `basePath` né `assetPrefix` in `next.config.js` (il sito non è sotto `/nome-repo`).

Se in futuro spostassi lo stesso codice in un **project site** (es. `https://dannyd2222.github.io/mio-progetto/`), andrebbero aggiunti in `next.config.js` sia `basePath` sia `assetPrefix` (es. `'/mio-progetto'`), poi `npm run build` e ridistribuire la cartella `build/`.

### GitHub Actions workflow

Il workflow principale è [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml), che esegue build e deploy a ogni push su `main` (e su esecuzione manuale). Il file [`.github/workflows/nextjs.yml`](.github/workflows/nextjs.yml) è solo un template: non parte automaticamente su push, perché usa `out/` e opzioni non allineate a questo progetto (`distDir: 'build'`).

**How it works (two jobs):**

1. **`build`** — Checks out the code, installs dependencies with `npm ci`, runs `npm run build`, then uploads the **`build/`** folder as a [Pages deployment artifact](https://docs.github.com/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-with-a-custom-github-actions-workflow). Nothing from `build/` is committed to git; the artifact is internal to the workflow run.

2. **`deploy`** — Runs only after `build` succeeds. [`actions/deploy-pages`](https://github.com/actions/deploy-pages) takes that artifact and publishes it to GitHub Pages using a short‑lived OIDC token (`id-token: write`), so you do not need a personal access token in secrets.

**One-time activation on GitHub:**

1. Open the repo → **Settings** → **Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions** (not “Deploy from a branch”).
3. Push to `main` (or run the workflow manually from the **Actions** tab). The first run may prompt you to approve the `github-pages` environment if GitHub shows a protection review.

If your default branch is not `main`, edit the `on.push.branches` list in the workflow file.

You can still deploy manually by copying `build/` if you prefer not to use Actions.

**Troubleshooting:** If **Upload artifacts** fails with `tar: out: Cannot open`, the workflow is archiving the wrong folder. Next.js static export normally writes to `out/`, but this project sets `distDir: 'build'` in `next.config.js`, so the deployable files are under **`build/`**. Ensure `actions/upload-pages-artifact` uses `path: build` (not `out`). That error is unrelated to GitHub’s **Node.js 20 deprecation** warnings on the runner: those refer to the JavaScript runtime used *inside* official actions (`checkout`, `cache`, `configure-pages`, etc.). Updating action versions (as in the workflow file) reduces the noise; your app is still built with the `node-version` you set in `setup-node`.

## Author

* **Daniele Dalle Nogare** - *Full Stack Developer* - [Linkedin page](https://www.linkedin.com/in/danieledallenogare)
