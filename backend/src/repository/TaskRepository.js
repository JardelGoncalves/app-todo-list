import RepositoryBase from './base/RepositoryBase'
import Validators from '../helpers/validators'
import { prepareData } from '../helpers/utils'

export default class TaskRepository {
  constructor (Tasks) {
    this.RepositoryBase = new RepositoryBase(Tasks)
  }

  getAll (params) {
    return this.RepositoryBase.getAllByUser(params)
      .then(result => result)
      .catch(err => err)
  }
  getById (params) {
    const _validators = new Validators({
      'id.integer': params.id
    }, {
      'id.integer': 'ID inválido. informe um valor inteiro!'
    })

    return this.RepositoryBase.getByIdAndUser(params, _validators)
      .then(result => result)
      .catch(err => err)
  }

  create (data) {
    const _validators = new Validators({
      'title.required': data.title,
      'completed.boolean': data.completed
    }, {
      'title.required': 'Nenhum valor informado',
      'completed.boolean': 'Valor booleano inválido. Informe o valor true ou false!'
    })

    return this.RepositoryBase.create(data, _validators)
      .then(result => result)
      .catch(err => err)
  }

  update (params, data) {
    let prepared = {}

    Object.keys(data).map(key => {
      prepared = prepareData(data, key, {
        required: ['title'],
        integer: ['id'],
        boolean: ['completed']
      })
    })

    prepared['id.integer'] = params.id

    const _validators = new Validators(prepared, {
      'id.integer': 'ID inválido!',
      'title.required': 'Nenhum valor informado!',
      'completed.boolean': 'Valor booleano inválido. Informe o valor true ou false!'
    })

    return this.RepositoryBase.update(params, data, _validators)
      .then(result => result)
      .catch(err => err)
  }

  delete (params) {
    const _validators = new Validators({
      'id.integer': params.id
    }, {
      'id.integer': 'ID informado é inválido!'
    })

    return this.RepositoryBase.delete(params, _validators)
      .then(result => result)
      .catch(err => err)
  }
}
