# Contributing

Thanks for wanting to contribute! A few project-specific notes to keep contributions safe and easy to review.

- This repo is a static GitHub Pages site (no build system). Edit HTML/CSS/JS in place and open pages locally with a browser to verify behavior.
- Do NOT commit secrets (API keys, private certificates, service account JSON). This repo's `.gitignore` includes common patterns but always double-check for sensitive files.

Quick checks before committing:
- Run `git status` to verify staged files.
- Inspect changes for any `.key`, `.pem`, `.json` (service-account), or `.env` entries.

If you find accidentally committed secrets, do not re-add them; instead open an issue and coordinate a rotation of the affected keys. Removing secrets from history requires a force-push and coordination with repository collaborators.

Privacy note
- The site uses a small external lookup to `https://ipapi.co/json/` to show a visitor's region/IP in a demo area. If you prefer to disable this in your deployment, set either:
  - a `data-disable-ip-fetch="true"` attribute on the `<body>` element, or
  - a `<meta name="disable-ip-fetch" content="true">` in the page head.

Thanks — small, careful edits keep this site simple and privacy-first.