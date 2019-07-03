import AuthController from '../controllers/auth'

export default (app) => {
  const Users = app.datasource.models.Users
  const authController = new AuthController(Users)

  app.route('/login')
    .post((req, res) => {
      authController.authenticator(req.body, app)
        .then(result => {
          res.status(result.status).json(result.data)
        })
    })
}
