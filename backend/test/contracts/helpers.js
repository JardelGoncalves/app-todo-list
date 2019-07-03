import chai from 'chai'
import supertest from 'supertest'
import Joi from '@hapi/joi'
import JoiAssert from 'joi-assert'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import app from '../../src/app'

dotenv.config({ path: process.env.NODE_ENV === 'test' ? '.env' : '.env.test' })

global.app = app
global.request = supertest(app)
global.expect = chai.expect
global.Joi = Joi
global.JoiAssert = JoiAssert
global.jwt = jwt
global.secretKey = process.env.APP_SECRET
