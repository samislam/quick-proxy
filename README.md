# Quick Proxy

A small reverse-proxy service driven by a YAML config file.

## Quick start

1. Install deps: `pnpm install`
2. Create a config file (see `app.config.yml`) and set `CONFIG_FILE` to its path.
3. Run locally: `pnpm dev`

Generate a fresh config file: `pnpm make-config`.
Note: the config file is not committed for security.

Production build: `pnpm build` then `pnpm start`.
PM2: an `ecosystem.config.js` file is included and ready to use; review it before deployment.

## YAML config reference

`app.config.yml` uses a `tenants` list; define one entry for single proxy setups.

- `host`: hostname or IP the proxy binds to (ex: `localhost` or `0.0.0.0`)
- `port`: number the proxy listens on (ex: `3000`)
- `tenants`: array of tenant entries
- `tenants[].name` (optional): label for logs
- `tenants[].host` (optional): hostname to match (ex: `api-mobile.proxy.myapp.com`); do not include scheme or leading `/`
- `tenants[].path`: path prefix to mount (ex: `/api`)
- `tenants[].proxyTarget`: upstream URL (ex: `https://example.com`)
- `tenants[].rule`: `allow` or `deny` to control how `ipv4_addresses` is enforced
- `tenants[].ipv4_addresses`: list of IPv4 addresses to allow/deny
- Allow everything: set `tenants[].rule` to `deny` with `tenants[].ipv4_addresses: []`
- `tenants[].trustProxy` (optional): `true` if running behind another proxy (nginx, apache)
If multiple tenants share the same path, set `tenants[].host` to route by hostname.

## CI/CD integration with the project

The project is backed-up with support for gitlab ci/cd for easier deployment process and faster delivery

## Variables from gitlab runner

The following variables must be passed from the gitlab runner as variables

- DEPLOY_ENABLED
- PROXY_ENV_FILE
- REMOTE_HOST
- REMOTE_PROJECT_DIR
- REMOTE_USER
- SSH_PRIVATE_KEY_FILE
