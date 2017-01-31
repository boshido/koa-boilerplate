import KoaConvert from 'koa-convert'
import KoaBodyParser from 'koa-bodyparser'

export default function connectMiddleware (app) {
  app.use(new KoaConvert(new KoaBodyParser()))
}
