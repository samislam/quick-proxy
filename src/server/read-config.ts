import _ from 'lodash'
import yaml from 'js-yaml'
import { readFileSync } from 'node:fs'
import { AppConfigJsonSchema, ProxyTenantConfig } from '@/types/app-config.interface'

/** Reads and gets the yaml config file without caching */
export function loadConfig(): AppConfigJsonSchema {
  const path = process.env.CONFIG_FILE
  if (!path) throw new Error('CONFIG_FILE env var not set')
  const file = readFileSync(path, 'utf8')
  const parsed = yaml.load(file)
  return parsed as AppConfigJsonSchema
}

/** Loads a memoized version of the yaml config file */
export const getConfig = _.memoize(loadConfig)

function normalizePath(path: string): string {
  if (!path.startsWith('/')) return `/${path}`
  return path
}

export function getTenants(): ProxyTenantConfig[] {
  const config = getConfig()
  if (!config.tenants || config.tenants.length === 0) {
    throw new Error('Invalid config: `tenants` is required')
  }

  return config.tenants.map((tenant, index) => {
    const hasRequired =
      tenant.path && tenant.proxyTarget && tenant.rule && Array.isArray(tenant.ipv4_addresses)
    if (!hasRequired) throw new Error(`Invalid tenant config at index ${index}`)
    return {
      ...tenant,
      path: normalizePath(tenant.path),
    }
  })
}
