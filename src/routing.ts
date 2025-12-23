import { Router } from 'express'
import { IpFilter } from 'express-ipfilter'
import { getTenants } from './server/read-config'
import { proxyMiddleware } from './middlewares/proxy.middleware'

export const applicationRouter = Router()

const tenants = getTenants()

const tenantHandlers = tenants.map((tenant) => ({
  tenant,
  ipFilter: IpFilter(tenant.ipv4_addresses, { mode: tenant.rule, trustProxy: tenant.trustProxy }),
  proxy: proxyMiddleware(tenant.proxyTarget),
}))

function hostMatches(requestHost: string, tenantHost?: string): boolean {
  if (!tenantHost) return true
  return requestHost === tenantHost
}

function pathMatches(requestPath: string, tenantPath: string): boolean {
  if (tenantPath === '/') return true
  return requestPath === tenantPath || requestPath.startsWith(`${tenantPath}/`)
}

function findTenant(requestHost: string, requestPath: string) {
  let selected: (typeof tenantHandlers)[number] | undefined

  tenantHandlers.forEach((handler) => {
    const { tenant } = handler
    if (!hostMatches(requestHost, tenant.host)) return
    if (!pathMatches(requestPath, tenant.path)) return

    if (!selected || tenant.path.length > selected.tenant.path.length) {
      selected = handler
    }
  })

  return selected
}

applicationRouter.use((req, res, next) => {
  const requestHost = req.hostname.toLowerCase()
  const requestPath = req.path
  const handler = findTenant(requestHost, requestPath)

  if (!handler) {
    return res.status(404).json({ error: 'Not Found', reason: 'No tenant matched' })
  }

  return handler.ipFilter(req, res, (err) => {
    if (err) return next(err)
    return handler.proxy(req, res, next)
  })
})
