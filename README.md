# Quick Proxy

A small reverse-proxy service driven by a YAML config file.

## Quick start

1. Install deps: `pnpm install`
2. Create a config file (see `app.config.yml`) and set `CONFIG_FILE` to its path.
3. Run locally: `pnpm dev`

Production build: `pnpm build` then `pnpm start`.
PM2: an `ecosystem.config.js` file is included and ready to use; review it before deployment.

## YAML config reference

`app.config.yml` supports these fields:

- `host`: hostname or IP the proxy binds to (ex: `localhost` or `0.0.0.0`)
- `port`: number the proxy listens on (ex: `3000`)
- `proxyTarget`: upstream URL to forward requests to (ex: `http://example.com`)
- `rule`: `allow` or `deny` to control how `ipv4_addresses` is enforced
- `ipv4_addresses`: list of IPv4 addresses to allow/deny
- `trustProxy` (optional): `true` if running behind another proxy (nginx, apache)

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
