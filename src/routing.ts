import { Router } from 'express'
import { proxyMiddleware } from './middlewares/proxy.middleware'
import { IpFilter } from 'express-ipfilter'
import { getConfig } from './server/read-config'

export const applicationRouter = Router()

const { ipv4_addresses, rule } = getConfig()
applicationRouter.use(IpFilter(ipv4_addresses, { mode: rule }), proxyMiddleware())
