export interface ProxyTenantConfig {
  /** Optional label for logs */
  name?: string
  /** Path prefix to mount this tenant (ex: `/api`) */
  path: string
  /** The URL that you want to proxy and mirror the requests for */
  proxyTarget: string
  /**
   * Allow or disallow IP addresses in the `ipv4_addresses` property from accessing the routes on
   * this proxy server
   */
  rule: 'allow' | 'deny'
  /** If this service is running behind a proxy, ex: nginx or apache, set this to `true` */
  trustProxy?: boolean
  ipv4_addresses: string[]
}

export interface AppConfigJsonSchema {
  /** Required */
  port: number
  /** Localhost or the public IP addresses of the server */
  host: string
  /** Multi-tenant config */
  tenants: ProxyTenantConfig[]
}
