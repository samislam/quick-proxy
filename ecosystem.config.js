// This file is used by pm2 for deployment
module.exports = {
  apps: [
    {
      name: 'proxy',
      script: './dist/src/main.js',
      exec_mode: 'cluster',
      instances: 'max',
      autorestart: true,
      watch: false,
      max_memory_restart: '400M',
      env: {
        NODE_ENV: 'production',
      },
      error_file: '~/.pm2/logs/proxy-error.log',
      out_file: '~/.pm2/logs/proxy-out.log',
      merge_logs: true,
      time: true,
    },
  ],
}
