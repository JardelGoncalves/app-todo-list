describe('Routes Users', () => {

  const User = app.datasource.models.Users
  const UserDefault = {
    id: 1,
    name: 'User default',
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
      request
        .get('/users')
        .end((err, res) => {
          expect(res.body[0].id).to.be.eql(UserDefault.id)
          expect(res.body[0].name).to.be.eql(UserDefault.name)
          expect(res.body[0].email).to.be.eql(UserDefault.email)
          done(err)
        })
    })
  })

  describe('Route GET /users/:id', () => {
    it('should return a user', done => {
      request
        .get('/users/1')
        .end((err, res) => {
          expect(res.body.id).to.be.eql(UserDefault.id)
          expect(res.body.name).to.be.eql(UserDefault.name)
          expect(res.body.email).to.be.eql(UserDefault.email)
          done(err)
        })
    })
  })

  describe('Route POST /users', () => {
    it('should create a user', done => {
      const newUser = {
        id: 2,
        name: 'New user',
        email: 'user@new.com',
        password: 'test'
      }

      request
        .post('/users')
        .send(newUser)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(newUser.id)
          expect(res.body.name).to.be.eql(newUser.name)
          expect(res.body.email).to.be.eql(newUser.email)
          done(err)
        })
    })
  })

  describe('Route PUT /users/:id', () => {
    it('should update an existing user', done => {
      const updateUser = {
        name: 'Updated user'
      }
      request
        .put('/users/1')
        .send(updateUser)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(UserDefault.id)
          expect(res.body.name).to.be.eql(updateUser.name)
          expect(res.body.email).to.be.eql(UserDefault.email)
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
