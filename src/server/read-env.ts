import chalk from 'chalk'
import { existsSync } from 'fs'
import { cleanEnv, str } from 'envalid'
import { config as configDotenv } from 'dotenv'

const { NODE_ENV } = process.env
const possibleEnvFiles = [`.env.${NODE_ENV}.local`, `.env.${NODE_ENV}`, '.env.local', '.env']
const dotenvFile = possibleEnvFiles.find((file) => existsSync(file))
console.log(
  chalk.cyanBright('Using environment file: '),
  chalk.bold.greenBright(dotenvFile ?? 'None!')
)

if (!dotenvFile) {
  throw new Error(`❌ Environment file not found! please define one!`)
}

configDotenv({ path: dotenvFile })

const env = cleanEnv(process.env, {
  CONFIG_FILE: str({ default: './app.config.yml' }),
})

Object.assign(process.env, env)

console.log(chalk.italic(`~ using environment file ${dotenvFile}`))
