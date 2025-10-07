import { IpDeniedError } from 'express-ipfilter'
import type { ErrorRequestHandler } from 'express'

export const globalErrorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  if (err instanceof IpDeniedError) {
    const ip = err.extra.ip

    console.warn(`🚫 Access denied to IP ${ip} on ${req.method} ${req.originalUrl}`)
    return res.status(403).json({
      error: 'Forbidden',
      reason: `Access denied for IP ${ip}`,
    })
  }

  // other errors -> your format
  console.error(err)
  return res.status(500).json({ error: 'Internal Server Error' })
}
