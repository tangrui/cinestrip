import convert from 'koa-convert'
import fresh from 'koa-fresh'
import etag from 'koa-etag'

export default (app) => {
  app.use(convert(fresh()))
  app.use(etag())
}
