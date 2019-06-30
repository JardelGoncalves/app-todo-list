import chai from 'chai'
import supertest from 'supertest'
import Joi from '@hapi/joi'
import JoiAssert from 'joi-assert'
import app from '../../src/app'

global.app = app
global.request = supertest(app)
global.expect = chai.expect
global.Joi = Joi
global.JoiAssert = JoiAssert
