import { getConfig } from '../server/read-config'
import type { Request, Response } from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'

export const proxyMiddleware = () =>
  createProxyMiddleware<Request, Response>({
    target: getConfig().proxyTarget,
    changeOrigin: true,
    logger: console,
  })
