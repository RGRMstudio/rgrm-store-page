# Project Health Check (automated)

Date: 2026-03-13

## What is currently not working

1. Dependency installation is blocked.
   - `npm ci` fails because `package.json` and `package-lock.json` are out of sync.
   - `npm install` fails with HTTP 403 when resolving multiple packages (for example `@sanity/client`) from `https://registry.npmjs.org`.

2. Linting cannot run.
   - `npm run lint` fails with `next: not found` because dependencies are not installed successfully.

3. Toolchain version mismatch warning.
   - The project declares Node `20.x` in `package.json` but the environment is running Node `v22.21.1`. This is reported as an `EBADENGINE` warning.

## Evidence (commands + key outputs)

- `npm run lint`
  - Output: `sh: 1: next: not found`

- `npm ci`
  - Output includes:
    - `npm ci can only install packages when your package.json and package-lock.json are in sync`
    - numerous `Missing:` / `Invalid:` lock file dependency entries

- `npm install --verbose`
  - Output includes:
    - `npm error code E403`
    - `403 Forbidden - GET https://registry.npmjs.org/@sanity%2fclient`

- `npm config list`
  - Output includes environment-level proxy settings:
    - `http-proxy = "http://proxy:8080"`
    - `https-proxy = "http://proxy:8080"`

## Likely causes

- Outdated or incorrect `package-lock.json` relative to current `package.json`.
- Registry access restrictions/policy or proxy configuration causing 403 responses.
- Node runtime version drift vs declared engine (20.x expected).

## Suggested next steps

1. Use Node 20.x for this repo (e.g., via `nvm use 20`).
2. Verify npm registry/proxy access policy and credentials for scoped packages.
3. Regenerate lockfile in a clean environment after registry access is fixed:
   - remove `node_modules` and `package-lock.json`
   - run `npm install`
4. Re-run:
   - `npm run lint`
   - `npm run build`
