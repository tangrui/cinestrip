import bodyParser from 'koa-bodyparser'

import config from '../../config'

export default (app) => {
  app.use(bodyParser(config.get('hooks:body-parser')))
}
