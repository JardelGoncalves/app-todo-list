describe('Model Users', () => {

  const User = app.datasource.models.Users
  const UserDefault = {
    id: 1,
    name: 'User Default',
    email: 'user@default.com',
    password: 'test'
  }

  beforeEach(done => {
    User.destroy({ where: {} })
      .then(() => User.create(UserDefault)
        .then(() => {
          done()
        }))
  })

  describe('Route GET /users', () => {
    it('should return a user lists', done => {
      const userLists = Joi.array().items(Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        email: Joi.string(),
        password: Joi.string(),
        createdAt: Joi.date().iso(),
        updatedAt: Joi.date().iso()
      }))
      request
        .get('/users')
        .end((err, res) => {
          JoiAssert(res.body, userLists)
          done(err)
        })
    })
  })

  describe('Route GET /users/:id', () => {
    it('should return a user', done => {
      const user = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        email: Joi.string(),
        password: Joi.string(),
        createdAt: Joi.date().iso(),
        updatedAt: Joi.date().iso()
      })
      request
        .get('/users/1')
        .end((err, res) => {
          JoiAssert(res.body, user)
          done(err)
        })
    })
  })

  describe('Route POST /users', () => {
    it('should create a user', done => {
      const user = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        email: Joi.string(),
        password: Joi.string(),
        createdAt: Joi.date().iso(),
        updatedAt: Joi.date().iso()
      })
      request
        .post('/users')
        .send({
          name: 'new user',
          email: 'user@new.com',
          password: 'test'
        })
        .end((err, res) => {
          JoiAssert(res.body, user)
          done(err)
        })
    })
  })

  describe('Route PUT /users/:id', () => {
    it('should updated an existing user', done => {
      const user = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        email: Joi.string(),
        password: Joi.string(),
        createdAt: Joi.date().iso(),
        updatedAt: Joi.date().iso()
      })
      request
        .put('/users/1')
        .send({
          name: 'updated user'
        })
        .end((err, res) => {
          JoiAssert(res.body, user)
          done(err)
        })
    })
  })

  describe('Route DELETE /users/:id', () => {
    it('should delete an existing user', done => {
      request
        .delete('/users/1')
        .end((err, res) => {
          expect(res.status).to.be.eql(204)
          done(err)
        })
    })
  })
})
