export interface AppConfigJsonSchema {
  /**
   * Allow or disallow IP addresses in the `ipv4_addresses` property from accessing the routes on
   * this proxy server
   */
  rule: 'allow' | 'disallow'
  ipv4_addresses: string[]
  /** Required */
  port: number
  /** Localhost or the public IP addresses of the server */
  host: string
  /** The URL that you want to proxy and mirror the requests for */
  proxyTarget: string
}
