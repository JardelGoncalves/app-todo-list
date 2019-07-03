import jwt from 'jsonwebtoken'
import HttpStatus from 'http-status'
import { successResponse, errorResponse } from '../helpers/response-default'

export default class Authenticate {
  constructor (Users) {
    this.Users = Users
  }

  authenticator (data, app) {
    const { email, password } = data
    let response
    if (email && password) {
      response = this.Users.findOne({ where: { email } })
        .then(user => {
          if (user && user.comparePassword(password)) {
            const payload = { id: user.id }
            return successResponse({ user: {
              id: user.id,
              name: user.name,
              email: user.email,
              createdAt: user.createdAt,
              updatedAt: user.updatedAt
            },
            token: jwt.sign(payload, process.env.APP_SECRET) })
          } else {
            return errorResponse('Password ou email inválido!', HttpStatus.UNAUTHORIZED)
          }
        })
        .catch(err => errorResponse(err.message, HttpStatus.UNAUTHORIZED))
    } else {
      return errorResponse('Password ou email inválido!', HttpStatus.UNAUTHORIZED)
    }

    return response
  }
}
