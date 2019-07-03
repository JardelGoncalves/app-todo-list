import TaskController from '../controllers/task'

export default (app) => {
  const Tasks = app.datasource.models.Tasks
  const _taskController = new TaskController(Tasks)

  app.route('/tasks')
    .all(app.auth.authenticate())
    .get((req, res) => {
      return _taskController.getAll({ user_id: app.userId })
        .then(result => res.status(result.status).json(result.data))
    })
    .post((req, res) => {
      req.body.user_id = app.userId
      return _taskController.create(req.body)
        .then(result => res.status(result.status).json(result.data))
    })

  app.route('/tasks/:id')
    .all(app.auth.authenticate())
    .get((req, res) => {
      return _taskController.getById({ id: req.params.id, user_id: app.userId })
        .then(result => res.status(result.status).json(result.data))
    })
    .put((req, res) => {
      return _taskController.update({ id: req.params.id, user_id: app.userId }, req.body)
        .then(result => res.status(result.status).json(result.data))
    })
    .delete((req, res) => {
      return _taskController.delete({ id: req.params.id, user_id: app.userId })
        .then(result => res.status(result.status).send())
    })
}
