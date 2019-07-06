import TaskRepository from '../repository/TaskRepository'

export default class TaskController {
  constructor (Tasks) {
    this.TaskRepository = new TaskRepository(Tasks)
  }

  getAll (params) {
    return this.TaskRepository.getAll(params)
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

  search(value, userId) {
    return this.TaskRepository.search(value, userId)
      .then(result => result)
  }
}
