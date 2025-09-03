import cors from 'cors'

export const corsMiddleware = cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['*'], // see note below; we'll also echo headers in proxy
  maxAge: 86400,
})
