import path from 'path'

import Koa from 'koa'
import PrettyError from 'pretty-error'

import config from '../config'
import logger from '../logger'
import SketchRepository from './sketch-repository'

class Server {
  static hooks = [
    'response-time',
    'global-error-handler',
    'i18n',
    'request-logger',
    'body-parser',
    'etag'
  ]

  constructor() {
    this.app = new Koa()
    this.sketchRepository = new SketchRepository()
  }

  start() {
    logger.debug({config: config.get()})

    this.sketchRepository.init()

    Server.hooks.forEach(hookName => {
      const hookPath = path.resolve(__dirname, 'hooks', hookName)
      const hook = require(hookPath).default
      logger.info('loading hook %s...', hookName)
      hook(this.app)
    })

    this.app.listen(config.get('port'), (err) => {
      if (err) {
        const pretty = new PrettyError()
        logger.error(pretty.render(err))
        process.exit()
      }

      logger.info('Server is listening on port %d.', config.get('port'))
    })
  }
}

const server = new Server()

export default server
