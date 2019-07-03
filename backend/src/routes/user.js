import UserController from '../controllers/user'

export default (app) => {
  const Users = app.datasource.models.Users
  const _userController = new UserController(Users)

  app.route('/users')
    .get((req, res) => {
      return _userController.getAll()
        .then(result => res.status(result.status).json(result.data))
    })
    .post((req, res) => {
      return _userController.create(req.body)
        .then(result => res.status(result.status).json(result.data))
    })

  app.route('/users/:id')
    .get((req, res) => {
      return _userController.getById({ id: req.params.id })
        .then(result => res.status(result.status).json(result.data))
    })
}
