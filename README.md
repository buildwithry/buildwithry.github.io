# Build with RY — Portfolio

Portfolio site for Adrian Agdan, HighLevel Certified Admin building AI voice agents and CRM automation.

**Live:** https://buildwithry.github.io/

## Tech stack

- Vite + React + TypeScript
- Tailwind CSS + shadcn/ui
- Deployed to GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`)

## Local development

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
```

Output goes to `dist/`. Pushing to `main` triggers the Actions workflow, which builds and
deploys to GitHub Pages automatically.

## Notes

- Case study content lives in `src/components/portfolio/Projects.tsx`.
- Images are served from `public/lovable-uploads/` (legacy folder name kept so existing
  asset paths keep resolving).
- `public/og-image.png` is the social/link-preview card referenced by the Open Graph tags
  in `index.html`. Regenerate it if the hero headline or branding changes.
