const resolveApp = require('./utils')

const paths = {
  appHtml: resolveApp('config/webpack.config.js/template.html'),
  clientBuild: resolveApp('build/client'),
  serverBuild: resolveApp('build/server'),
  dotenv: resolveApp('.env'),
  src: resolveApp('src'),
  srcClient: resolveApp('src/client'),
  srcServer: resolveApp('src/server'),
  srcShared: resolveApp('src/shared'),
  types: resolveApp('node_modules/@types'),
  publicPath: '/static/'
}

paths.resolveModules = [
  paths.srcClient,
  paths.srcServer,
  paths.srcShared,
  paths.src,
  'node_modules'
]

module.exports = paths
