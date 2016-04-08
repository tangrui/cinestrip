import path from 'path'

import Koa from 'koa'
import PrettyError from 'pretty-error'

import config from '../config'
import logger from '../logger'

logger.debug({config: config.get()})

const hooks = [
  'global-error-handler',
  'i18n',
  'body-parser',
  'etag'
]

const app = new Koa()

hooks.forEach(hookName => {
  const hookPath = path.resolve(__dirname, 'hooks', hookName)
  const hook = require(hookPath).default
  logger.info('loading hook %s...', hookName)
  hook(app)
})

app.listen(config.get('port'), (err) => {
  if (err) {
    const pretty = new PrettyError()
    logger.error(pretty.render(err))
    return
  }

  logger.info('%s server is listening on port %d.', config.get('name'), config.get('port'))
})

export default app
