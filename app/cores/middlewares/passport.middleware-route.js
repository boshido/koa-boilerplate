import passport from 'app/cores/modules/passport'

export default function connectMiddleware (app) {
  app.use(passport.initialize())
  app.use(passport.session())
}
