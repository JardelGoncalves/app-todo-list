import RepositoryBase from './base/RepositoryBase'
import Validators from '../helpers/validators'
import { prepareData } from '../helpers/utils'

export default class TaskRepository {
  constructor (Tasks) {
    this.RepositoryBase = new RepositoryBase(Tasks)
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
      'title.required': data.title,
      'description.required': data.description,
      'priority.required': data.description,
      'priority.eql': { value: data.priority.toLowerCase(), possibles: ['low', 'medium', 'high'] },
      'completed.boolean': data.completed
    }, {
      'title.required': 'Nenhum valor informado',
      'description.required': 'Nenhum valor informado',
      'priority.required': 'Nenhum valor informado',
      'priority.eql': 'Os valores permitidos para este campo são: low, medium ou high',
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
        required: ['title', 'description', 'priority'],
        integer: ['id'],
        boolean: ['completed']
      })
    })

    if (data['priority']) {
      prepared['priority.eql'] = { value: data['priority'], possibles: ['low', 'medium', 'high'] }
    }
    prepared['id.integer'] = params.id

    const _validators = new Validators(prepared, {
      'id.integer': 'ID inválido!',
      'title.required': 'Nenhum valor informado!',
      'description.required': 'Nenhum valor informado!',
      'priority.required': 'Nenhum valor informado!',
      'priority.eql': 'Os valores permitidos para este campo são: low, medium ou high!',
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
