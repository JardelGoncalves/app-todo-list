import TaskRepository from '../repository/TaskRepository'

export default class TaskController {
  constructor (Tasks) {
    this.TaskRepository = new TaskRepository(Tasks)
  }

  getAll () {
    return this.TaskRepository.getAll()
      .then(result => result)
  }

  getById (params) {
    return this.TaskRepository.getById(params)
      .then(result => result)
  }

  create (data) {
    return this.TaskRepository.create(data)
      .then(result => result)
  }

  update (params, data) {
    delete data['id']
    return this.TaskRepository.update(params, data)
      .then(result => result)
  }

  delete (params) {
    return this.TaskRepository.delete(params)
      .then(result => result)
  }
}
