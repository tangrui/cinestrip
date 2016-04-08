import convert from 'koa-convert'
import koaBunyanLogger from 'koa-bunyan-logger'
import PrettyError from 'pretty-error'

import logger from '../../logger'

export default (app) => {
  app.use(convert(koaBunyanLogger(logger)))
  app.use(convert(koaBunyanLogger.requestIdContext()))
  app.use(convert(koaBunyanLogger.requestLogger()))
  app.on('error', (err, ctx) => {
    const pretty = new PrettyError()
    ctx.log.error(pretty.render(err))
  })
}
