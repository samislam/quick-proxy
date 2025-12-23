import './server/read-env'
import chalk from 'chalk'
import morgan from 'morgan'
import express from 'express'
import { applicationRouter } from './routing'
import { getConfig, getTenants } from './server/read-config'
import { globalErrorHandler } from './middlewares/global-error-handler.middleware'

const { host, port } = getConfig()
const tenants = getTenants()

const app = express()

app.use(morgan('dev'))
app.use(applicationRouter)
app.use(globalErrorHandler)

app.listen(port, host, () => {
  const publicUrl = `http://${host}:${port}`
  console.log('')
  console.log(`Service is listening on: ${chalk.underline(publicUrl)}`)
  tenants.forEach((tenant) => {
    const label = tenant.name ? ` (${tenant.name})` : ''
    console.log(`Tenant${label}: ${chalk.bold(tenant.path)}`)
    if (tenant.host) {
      console.log(`Host: ${chalk.bold.cyanBright(tenant.host)}`)
    }
    console.log(`Proxy Target: ${chalk.bold.magentaBright.underline(tenant.proxyTarget)}`)
    console.log(`Rule is ${chalk.bold(tenant.rule)}`)
    console.log(
      tenant.ipv4_addresses.map((ip) => `${ip} ➡ ${cr(tenant.rule === 'allow')}`).join('\n'),
      `\nelse ➡ ${cr(tenant.rule !== 'allow')}`
    )
  })
  console.log(chalk.bold.greenBright('Proxying is now active'))
})

const cr = (isAllowed: boolean) =>
  isAllowed ? chalk.bold.greenBright('allowed') : chalk.bold.redBright('denied')
