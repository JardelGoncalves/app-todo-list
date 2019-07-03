import chai from 'chai'
import supertest from 'supertest'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import app from '../../src/app'

dotenv.config({ path: process.env.NODE_ENV === 'test' ? '.env' : '.env.test' })


global.app = app
global.request = supertest(app)
global.expect = chai.expect
global.jwt = jwt
global.secretKey = process.env.APP_SECRET
