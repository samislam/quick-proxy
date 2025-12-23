import { writeFileSync } from 'node:fs'

function setup() {
  const fileContent = `# yaml-language-server: $schema=./dist/app-config.json
host: 'localhost'
port: 3000
tenants:
  - name: 'google'
    host: 'google.proxy.local'
    path: '/'
    proxyTarget: 'https://google.com'
    rule: 'deny'
    ipv4_addresses:
      - '127.0.0.1'
  - name: 'docs'
    host: 'docs.proxy.local'
    path: '/docs'
    proxyTarget: 'https://example.com'
    rule: 'allow'
    ipv4_addresses:
      - '127.0.0.1'
    trustProxy: true
`
  writeFileSync('app.config.yml', fileContent, { encoding: 'utf-8' })
}
setup()
