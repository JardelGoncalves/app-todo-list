import RepositoryBase from './base/RepositoryBase'
import Validators from '../helpers/validators'
import { prepareData } from '../helpers/utils'

export default class TaskRepository {
  constructor (Users) {
    this.RepositoryBase = new RepositoryBase(Users)
  }

  getAll () {
    return this.RepositoryBase.getAll()
      .then(result => result)
      .catch(err => err)
  }

  getById (params) {
    const _validators = new Validators({
      'id.integer': params.id
    }, {
      'id.integer': 'ID inválido. informe um valor inteiro!'
    })

    return this.RepositoryBase.getById(params, _validators)
      .then(result => result)
      .catch(err => err)
  }

  create (data) {
    const _validators = new Validators({
      'name.required': data.name,
      'email.required': data.email,
      'email.email': data.email,
      'password.required': data.password
    }, {
      'name.required': 'É necessário informar um valor para name',
      'email.required': 'É necessário informar um valor para email',
      'password.required': 'É necessário informar um valor para password',
      'email.email': 'Email informado inválido'
    })

    return this.RepositoryBase.create(data, _validators)
      .then(result => result)
      .catch(err => err)
  }
}
