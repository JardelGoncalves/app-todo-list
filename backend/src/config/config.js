import dotenv from 'dotenv'

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

export default {
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  params: {
    storage: 'test/db_test.sqlite',
    dialect: process.env.DB_DIALECT || 'postgres',
    logging: false,
    define: {
      underscored: true
    }
  }
}
