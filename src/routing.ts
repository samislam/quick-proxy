import { Router } from 'express'
import { IpFilter } from 'express-ipfilter'
import { getTenants } from './server/read-config'
import { proxyMiddleware } from './middlewares/proxy.middleware'

export const applicationRouter = Router()

const tenants = getTenants()
tenants.forEach((tenant) => {
  applicationRouter.use(
    tenant.path,
    IpFilter(tenant.ipv4_addresses, { mode: tenant.rule, trustProxy: tenant.trustProxy }),
    proxyMiddleware(tenant.proxyTarget)
  )
})
