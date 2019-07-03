import passport from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'

export default app => {
  const Users = app.datasource.models.Users
  const opts = {}
  opts.secretOrKey = process.env.APP_SECRET
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()

  const strategy = new Strategy(opts, (payload, done) => {
    Users.findOne({ where: payload.id })
      .then(user => {
        if (user) {
          app.userId = user.id
          return done(null, {
            id: user.id,
            email: user.email
          })
        }
        return done(null, false)
      })
      .catch(error => done(error, null))
  })

  passport.use(strategy)

  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', { session: false })
  }
}
