import UserRepository from '../repository/UserRepository'

export default class UserController {
  constructor (Users) {
    this.UserRepository = new UserRepository(Users)
  }

  getAll () {
    return this.UserRepository.getAll()
      .then(result => result)
  }

  getById (params) {
    return this.UserRepository.getById(params)
      .then(result => result)
  }

  create (data) {
    return this.UserRepository.create(data)
      .then(result => result)
  }

  update (params, data) {
    delete data['id']
    return this.UserRepository.update(params, data)
      .then(result => result)
  }

  delete (params) {
    return this.UserRepository.delete(params)
      .then(result => result)
  }
}
