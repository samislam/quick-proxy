import { writeFileSync } from 'node:fs'

function setup() {
  const fileContent = `# yaml-language-server: $schema=./dist/app-config.json
host: 'localhost'
port: 3000
proxyTarget: 'https://google.com'
rule: 'deny'
ipv4_addresses:
  - ''
`
  writeFileSync('app.config.yml', fileContent, { encoding: 'utf-8' })
}
setup()
