import './server/read-env'
import chalk from 'chalk'
import morgan from 'morgan'
import express from 'express'
import { applicationRouter } from './routing'

const { HOST, PORT, PROXY_TARGET } = process.env

const app = express()

app.use(morgan('dev'))
// 🚨 Nuclear CORS off-switch — runs BEFORE the proxy
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS')

  // Echo requested headers if provided (more reliable than '*')
  const reqHeaders = req.header('access-control-request-headers')
  res.setHeader('Access-Control-Allow-Headers', reqHeaders ? reqHeaders : '*')

  // Cache preflight for a day
  res.setHeader('Access-Control-Max-Age', '86400')

  if (req.method === 'OPTIONS') {
    res.status(204).end()
    return
  }
  next()
})

app.use(applicationRouter)

app.listen(PORT, HOST, () => {
  const publicUrl = `http://${HOST}:${PORT}`
  console.log('')
  console.log(`Service is listening on: ${chalk.underline(publicUrl)}`)
  console.log(`Proxy Target: ${chalk.bold.magentaBright.underline(PROXY_TARGET)}`)
  console.log(chalk.bold.greenBright('Proxying is now active'))
})
