import { IpDeniedError } from 'express-ipfilter'
import { type ErrorRequestHandler } from 'express'

export const globalErrorHandler: ErrorRequestHandler = (err, req, res) => {
  if (err instanceof IpDeniedError) {
    console.warn(`🚫 Access denied to IP ${err.extra.ip} on ${req.method} ${req.originalUrl}`)
    // send a simple response
    return res.status(403).json({
      error: 'Forbidden',
      reason: `Access denied for IP ${err.extra.ip}`,
    })
  }

  // fallback for other errors
  console.error(err)
  res.status(500).json({ error: 'Internal Server Error' })
}
