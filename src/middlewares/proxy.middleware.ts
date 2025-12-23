import type { Request, Response } from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'

export const proxyMiddleware = (target: string) =>
  createProxyMiddleware<Request, Response>({
    target,
    changeOrigin: true,
    logger: console,
  })
