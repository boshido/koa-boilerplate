import KoaCors from 'kcors'

const cors = KoaCors({allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'OPTIONS'], maxAge: 3600 * 5})
export default function connectMiddleware (app) {
  app.use(cors)
}

export {
  cors
}
