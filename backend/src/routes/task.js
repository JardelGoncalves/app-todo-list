import TaskController from '../controllers/task'

export default (app) => {
  const Tasks = app.datasource.models.Tasks
  const _taskController = new TaskController(Tasks)

  app.route('/tasks')
    .all(app.auth.authenticate())
    .get((req, res) => {
      return _taskController.getAll()
        .then(result => res.status(result.status).json(result.data))
    })
    .post((req, res) => {
      return _taskController.create(req.body)
        .then(result => res.status(result.status).json(result.data))
    })

  app.route('/tasks/:id')
    .all(app.auth.authenticate())
    .get((req, res) => {
      return _taskController.getById({ id: req.params.id })
        .then(result => res.status(result.status).json(result.data))
    })
    .put((req, res) => {
      return _taskController.update({ id: req.params.id }, req.body)
        .then(result => res.status(result.status).json(result.data))
    })
    .delete((req, res) => {
      return _taskController.delete({ id: req.params.id })
        .then(result => res.status(result.status).send())
    })
}
