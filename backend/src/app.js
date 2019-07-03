import express from 'express'
import dotenv from 'dotenv'
import datasource from './config/datasource'
import routesTask from './routes/task'
import routesUser from './routes/user'
import routesAuth from './routes/auth'
import middleAuth from './middlewares/auth'

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

class App {
  constructor () {
    this.express = express()

    this.config()
    this.middlewares()
    this.routes()
  }

  middlewares () {
    this.express.use(express.json())

    // authentication
    const auth = middleAuth(this.express)
    this.express.use(auth.initialize())
    this.express.auth = auth
  }

  routes () {
    routesTask(this.express)
    routesUser(this.express)
    routesAuth(this.express)
  }

  config () {
    this.express.datasource = datasource(this.express)
    this.express.set('port', 3000)
  }
}

export default new App().express
