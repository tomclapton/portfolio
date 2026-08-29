# Brett Bazzelle — Portfolio

A single-page photography and video portfolio. Static site, no database,
no CMS — built with Eleventy.

### Add photos

Copy images (JPG, JPEG, PNG, or WebP) into:

`src/photos/`

They're detected automatically and sorted alphabetically by filename —
no metadata, no manual list to update.

### Add videos

Copy videos (MP4 or WebM) into:

`src/videos/`

They're detected automatically. No metadata needed.

### Edit your name / email

Both live in one file: `src/_data/site.json`.

### Run locally on Windows

PowerShell on some machines blocks `npm.ps1`, so use `npm.cmd` instead:

```
npm.cmd install
npm.cmd run dev
```

Then open `http://localhost:8080` in your browser.

### Production build

```
npm.cmd run build
```

Output is written to the `dist` folder.

### Cloudflare Pages settings

- **Build command:** `npm run build`
- **Output directory:** `dist`
