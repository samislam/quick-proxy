import _ from 'lodash'
import yaml from 'js-yaml'
import { readFileSync } from 'node:fs'
import { AppConfigJsonSchema } from '@/types/app-config.interface'

/** Reads and gets the yaml config file without caching */
export function loadConfig(): AppConfigJsonSchema {
  const path = process.env.CONFIG_FILE
  if (!path) throw new Error('CONFIG_FILE env var not set')
  const file = readFileSync(path, 'utf8')
  const parsed = yaml.load(file)
  return parsed as AppConfigJsonSchema
}

/** Loads a memoized version of the yaml config file */
export const getConfig = _.memoize(loadConfig)
