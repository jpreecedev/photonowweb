const fs = require('fs')
const path = require('path')
const paths = require('./paths')

delete require.cache[require.resolve('./paths')]

if (!process.env.NODE_ENV) {
  throw new Error(
    'The process.env.NODE_ENV environment variable is required but was not specified.'
  )
}

// https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
const dotenvFiles = [
  `${paths.dotenv}.${process.env.NODE_ENV}.local`,
  `${paths.dotenv}.${process.env.NODE_ENV}`,
  process.env.NODE_ENV !== 'test' && `${paths.dotenv}.local`,
  paths.dotenv
].filter(Boolean)

dotenvFiles.forEach(dotenvFile => {
  if (fs.existsSync(dotenvFile)) {
    require('dotenv').config({
      path: dotenvFile
    })
  }
})

const appDirectory = fs.realpathSync(process.cwd())
process.env.NODE_PATH = (process.env.NODE_PATH || '')
  .split(path.delimiter)
  .filter(folder => folder && !path.isAbsolute(folder))
  .map(folder => path.resolve(appDirectory, folder))
  .join(path.delimiter)

module.exports = () => {
  // define env vars you want to use in your client app here.
  // CAREFUL: don't use any secrets like api keys or database passwords as they are exposed publicly!
  const raw = {
    PORT: process.env.PORT || 8500,
    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST || 'http://localhost',
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY || '',
    SERVER_API_URL: process.env.SERVER_API_URL || '',
    DEFAULT_MOMENT_PRICE: process.env.DEFAULT_MOMENT_PRICE || '399',
    FACE_RECOGNITION_COLLECTION_NAME: process.env.FACE_RECOGNITION_COLLECTION_NAME || ''
  }

  // Stringify all values so we can feed into Webpack DefinePlugin
  const stringified = {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key])
      return env
    }, {})
  }

  return { raw, stringified }
}
