import HttpStatus from 'http-status'
import { successResponse, errorResponse } from '../../helpers/response-default'
import { Op } from 'sequelize'

export default class ReposittoryBase {
  constructor (Model) {
    this.Model = Model
  }

  getAll () {
    return this.Model.findAll()
      .then(result => successResponse(result))
      .catch(() => errorResponse('Ocorreu um erro inesperado. Contate o administrador!', HttpStatus.INTERNAL_SERVER_ERROR))
  }

  getById (params, Validator) {
    if (!Validator.hasError()) {
      return this.Model.findOne({ where: params })
        .then(result => successResponse(result))
        .catch(() => errorResponse('Ocorreu um erro inesperado. Contate o administrador!', HttpStatus.INTERNAL_SERVER_ERROR))
    }

    return new Promise((resolve, reject) => {
      resolve(errorResponse(Validator.errors))
    })
  }

  getAllByUser (params) {
    return this.Model.findAll({ where: params })
      .then(result => successResponse(result))
      .catch(() => errorResponse('Ocorreu um erro inesperado. Contate o administrador!', HttpStatus.INTERNAL_SERVER_ERROR))
  }

  getByIdAndUser (params, Validator) {
    if (!Validator.hasError()) {
      return this.Model.findOne({ where: params })
        .then(result => successResponse(result))
        .catch(() => errorResponse('Ocorreu um erro inesperado. Contate o administrador!', HttpStatus.INTERNAL_SERVER_ERROR))
    }

    return new Promise((resolve, reject) => {
      resolve(errorResponse(Validator.errors))
    })
  }

  create (data, Validator) {
    if (!Validator.hasError()) {
      return this.Model.create(data)
        .then(result => successResponse(result, HttpStatus.CREATED))
        .catch(() => errorResponse('Ocorreu um erro inesperado. Contate o administrador!', HttpStatus.INTERNAL_SERVER_ERROR))
    }

    return new Promise((resolve, reject) => {
      resolve(errorResponse(Validator.errors))
    })
  }

  update (params, data, Validator) {
    if (!Validator.hasError()) {
      return this.Model.update(data, { where: params })
        .then(() => this.Model.findOne({ where: params })
          .then(result => successResponse(result))
        )
        .catch(err => {
          console.log(err)
          return errorResponse('Ocorreu um erro inesperado. Contate o administrador!', HttpStatus.INTERNAL_SERVER_ERROR)
        })
    }

    return new Promise((resolve, reject) => {
      resolve(errorResponse(Validator.errors))
    })
  }

  delete (params, Validator) {
    if (!Validator.hasError()) {
      return this.Model.destroy({ where: params })
        .then(result => successResponse(result, HttpStatus.NO_CONTENT))
        .catch(() => errorResponse('Ocorreu um erro inesperado. Contate o administrador!', HttpStatus.INTERNAL_SERVER_ERROR))
    }

    return new Promise((resolve, reject) => {
      resolve(errorResponse(Validator.errors))
    })
  }

  findWord (field, value, userId) {
    return this.Model.findAll({ where: {
      [field]: {
        [Op.iLike]: '%'+value+'%'
      },
      user_id: userId
    }})
      .then(response => successResponse(response))
      .catch(err => errorResponse(err.message, HttpStatus.UNPROCESSABLE_ENTITY))
  }

  exists (params) {
    return this.Model.findOne({ where: params })
      .then(result => result !== null ? true : false)
      .catch(() => false)
  }
}
