# Quick Proxy
A small reverse-proxy service driven by a YAML config file.

## Quick start
1. Install deps: `pnpm install`
2. Create a config file (see `app.config.yml`) and set `CONFIG_FILE` to its path.
3. Run locally: `pnpm dev`

Production build: `pnpm build` then `pnpm start`.
PM2: an `ecosystem.config.js` file is included and ready to use; review it before deployment.

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
