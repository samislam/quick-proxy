import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { getConfig, getTenants } from '../src/server/read-config'

function withConfig(content: string, run: () => void) {
  const dir = mkdtempSync(path.join(os.tmpdir(), 'quick-proxy-'))
  const configPath = path.join(dir, 'app.config.yml')
  writeFileSync(configPath, content, 'utf8')
  process.env.CONFIG_FILE = configPath
  try {
    run()
  } finally {
    getConfig.cache?.clear?.()
    rmSync(dir, { recursive: true, force: true })
  }
}

describe('config normalization', () => {
  it('normalizes multi-tenant configs', () => {
    const yaml = `
host: 'localhost'
port: 3000
tenants:
  - name: 'api'
    path: 'api'
    proxyTarget: 'https://example.com'
    rule: 'allow'
    ipv4_addresses:
      - '127.0.0.1'
    trustProxy: true
`
    withConfig(yaml, () => {
      const tenants = getTenants()
      expect(tenants).toHaveLength(1)
      expect(tenants[0].path).toBe('/api')
      expect(tenants[0].trustProxy).toBe(true)
      expect(tenants[0].proxyTarget).toBe('https://example.com')
    })
  })

  it('throws on invalid tenant configs', () => {
    const yaml = `
host: 'localhost'
port: 3000
tenants:
  - name: 'broken'
    path: '/api'
    rule: 'allow'
    ipv4_addresses:
      - '127.0.0.1'
`
    withConfig(yaml, () => {
      expect(() => getTenants()).toThrow('Invalid tenant config')
    })
  })
})
