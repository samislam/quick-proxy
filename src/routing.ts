import { Router } from 'express'
import { IpFilter } from 'express-ipfilter'
import { getConfig } from './server/read-config'
import { proxyMiddleware } from './middlewares/proxy.middleware'

export const applicationRouter = Router()

const { ipv4_addresses, rule } = getConfig()
applicationRouter.use(IpFilter(ipv4_addresses, { mode: rule }), proxyMiddleware())
