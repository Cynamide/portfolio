# Arjit Agarwal's portfolio

A React portfolio built with Vite.

## Run locally

Use Node.js 22 (also specified in `.nvmrc`):

```sh
nvm use
npm install
npm start
```

Run `npm test` for the component test or `npm run build` for a production build.

## Netlify

`netlify.toml` selects Node 22 and publishes the `dist` directory. No legacy OpenSSL provider is required.

## Blog posts

Add entries to `src/blog/posts.js`. Each entry has a unique `slug`, `title`, an ISO date (`YYYY-MM-DD`), a short `summary`, and a `content` array of paragraphs. Posts appear newest first and can be opened in the Blog section. Rebuild and deploy the site to publish changes.

The first build downloads the original Customer Detection and Image Segmentation demo videos from their GitHub repositories and converts them to browser-compatible MP4 files. The generated videos are reused on subsequent local builds.
