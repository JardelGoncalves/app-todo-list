describe('Model Tasks', () => {

  const Task = app.datasource.models.Tasks
  const User = app.datasource.models.Users
  const TaskDefault = {
    id: 1,
    title: 'title default',
    description: 'description default',
    priority: 'low',
    completed: false,
    user_id: 1
  }

  let token

  beforeEach(done => {
    Task.destroy({ where: {} })
      .then(() => {
        User.destroy({ where: {} })
          .then(() => User.create({
            id: 1,
            name: 'jardel',
            email: 'jardel@admin.com',
            password: 'admin'
        }))
          .then(user => {
              Task.create(TaskDefault)
              .then(() => {
                token = jwt.sign({ id: user.id }, secretKey)
                done()
              })
          })
      })
  })

  describe('Route GET /tasks', () => {
    it('should return a task lists', done => {
      const taskLists = Joi.array().items(Joi.object().keys({
        id: Joi.number(),
        title: Joi.string(),
        description: Joi.string(),
        priority: Joi.string(),
        completed: Joi.boolean(),
        user_id: Joi.number(),
        createdAt: Joi.date().iso(),
        updatedAt: Joi.date().iso()
      }))
      request
        .get('/tasks')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          JoiAssert(res.body, taskLists)
          done(err)
        })
    })
  })

  describe('Route GET /tasks/:id', () => {
    it('should return a task', done => {
      const task = Joi.object().keys({
        id: Joi.number(),
        title: Joi.string(),
        description: Joi.string(),
        priority: Joi.string(),
        completed: Joi.boolean(),
        user_id: Joi.number(),
        createdAt: Joi.date().iso(),
        updatedAt: Joi.date().iso()
      })
      request
        .get('/tasks/1')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          JoiAssert(res.body, task)
          done(err)
        })
    })
  })

  describe('Route POST /tasks', () => {
    it('should create a task', done => {
      const task = Joi.object().keys({
        id: Joi.number(),
        title: Joi.string(),
        description: Joi.string(),
        priority: Joi.string(),
        completed: Joi.boolean(),
        user_id: Joi.number(),
        createdAt: Joi.date().iso(),
        updatedAt: Joi.date().iso()
      })
      request
        .post('/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'new title',
          description: 'new description',
          priority: 'high',
          completed: true
        })
        .end((err, res) => {
          JoiAssert(res.body, task)
          done(err)
        })
    })
  })

  describe('Route PUT /tasks/:id', () => {
    it('should updated an existing task', done => {
      const task = Joi.object().keys({
        id: Joi.number(),
        title: Joi.string(),
        description: Joi.string(),
        priority: Joi.string(),
        completed: Joi.boolean(),
        user_id: Joi.number(),
        createdAt: Joi.date().iso(),
        updatedAt: Joi.date().iso()
      })
      request
        .put('/tasks/1')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'updated title',
          description: 'updated description'
        })
        .end((err, res) => {
          JoiAssert(res.body, task)
          done(err)
        })
    })
  })

  describe('Route DELETE /tasks/:id', () => {
    it('should delete an existing task', done => {
      request
        .delete('/tasks/1')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.status).to.be.eql(204)
          done(err)
        })
    })
  })
})
