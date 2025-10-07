import './server/read-env'
import chalk from 'chalk'
import morgan from 'morgan'
import express from 'express'
import { applicationRouter } from './routing'
import { getConfig } from './server/read-config'
import { globalErrorHandler } from './middlewares/global-error-handler.middleware'

const { host, ipv4_addresses, port, proxyTarget, rule } = getConfig()

const app = express()

app.use(morgan('dev'))
app.use(applicationRouter)
app.use(globalErrorHandler)

app.listen(port, host, () => {
  const publicUrl = `http://${host}:${port}`
  console.log('')
  console.log(`Service is listening on: ${chalk.underline(publicUrl)}`)
  console.log(`Proxy Target: ${chalk.bold.magentaBright.underline(proxyTarget)}`)
  console.log(`Rule is ${chalk.bold(rule)}`)
  console.log(
    ipv4_addresses.map((ip) => `${ip} ➡ ${cr(rule === 'allow')}`).join('\n'),
    `\nelse ➡ ${cr(rule !== 'allow')}`
  )
  console.log(chalk.bold.greenBright('Proxying is now active'))
})

const cr = (isAllowed: boolean) =>
  isAllowed ? chalk.bold.greenBright('allowed') : chalk.bold.redBright('denied')
