## Purpose

These instructions are for AI coding agents working on the InputDrive static site (GitHub Pages). The repo is a plain static site composed of HTML, CSS, and small client-side JavaScript snippets. Aim to produce safe, minimal edits that preserve the site’s simplicity and privacy-first claims.

## Quick repo facts

- Hosting: GitHub Pages (root `index.html` is the site entry). A `CNAME` file exists — changes may affect a custom domain.
- No build system: there is no `package.json`, no bundler, and no CI config in the repo. Changes are deployed by committing to the repository and pushing to `main`.
- Key files to reference:
  - `index.html` — home page, inline scripts using `document.lastModified` and `fetch('https://ipapi.co/json/')`.
  - `mortgage_calculator.html` and `mortgage_calculator_advanced.html` — client-side calculators. Look for `calculateMortgage()` and `calculateLoan()` functions.
  - `stylesheet.css` — global styles and CSS custom properties used across pages.
  - `parsing_api.html`, `random.html`, `buyme.html`, and other small sample pages — follow their patterns for link structure and script usage.

## Important patterns & constraints

- Client-side only: All calculations and logic run in the browser. Avoid introducing server-side components in this repo.
- Inline scripts are common and intentionally simple. If you refactor code into external scripts, update HTML references and preserve cross-page behavior.
- External network calls are present (examples: `https://ipapi.co/json/`, CDNJS, and BuyMeACoffee). Note privacy/security implications before modifying these calls.
- Accessibility and validation: forms in the mortgage calculators currently do client-side arithmetic but have minimal validation. Good small tasks: add input validation, guard against NaN, and improve label/ARIA usage.

## What to do (high-value, low-risk tasks)

- Fix bugs in-place: e.g., ensure `calculateMortgage()` handles zero/invalid inputs and does not display `NaN`.
- Reduce duplication: a few scripts (lastModified, IP fetch) are repeated across pages — consolidate to a shared `scripts/common.js` and update pages to reference it.
- Improve UX/accessibility: add explicit `<label for=...>` associations, ARIA-live regions for dynamic results, and keyboard-friendly controls.
- CSS tweaks: follow `stylesheet.css` variables (e.g., `--color-primary`) rather than hard-coding colors.

## What to avoid

- Don’t introduce a server or backend in this repo (no Node, no server-side templates). If a feature needs backend support, document the requirement and propose a separate service or repo.
- Don’t remove the `CNAME` or change DNS-related content without coordination — that affects the live site.

## Examples (where to make the change)

- Input validation: update `mortgage_calculator.html` — inside `calculateMortgage()` add guards like `if (!isFinite(monthlyPayment)) { /* show error */ }` and sanitize numeric parsing.
- Consolidation: create `scripts/common.js`, move the `lastModified` and `ipapi` fetch logic there, then replace duplicated inline blocks in `index.html` and calculators with `<script src="/scripts/common.js"></script>`.

## Merge strategy

- If this file already exists, merge preserving any existing guidance. Otherwise, create `.github/copilot-instructions.md` (this file).

## Tests & verification

- There are no automated tests in this repo. Fast manual verification steps:
  1. Open `index.html` and modified pages in a browser (or `file://` preview) to confirm scripts run.
  2. Verify calculator outputs reasonable numeric values for sample inputs.
  3. Confirm no console errors and external scripts are still loaded as expected.

## When you need help

- If a requested change would add a build step, CI, or server hosting, explain the trade-offs and propose a separate repo/PR for that work.
- If privacy-sensitive external calls are proposed, note the exact endpoint and the reason for the call before changing it.

---
If you want different formatting, more examples, or more aggressive refactor guidance (e.g., introducing a build pipeline), tell me what level of change is acceptable and I’ll expand these instructions.
