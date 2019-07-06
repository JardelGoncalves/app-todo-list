describe('Routes Tasks', () => {

  const Task = app.datasource.models.Tasks
  const User = app.datasource.models.Users
  const TaskDefault = {
    id: 1,
    title: 'title default',
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
      request
        .get('/tasks')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.body[0].id).to.be.eql(TaskDefault.id)
          expect(res.body[0].title).to.be.eql(TaskDefault.title)
          expect(res.body[0].completed).to.be.eql(TaskDefault.completed)
          done(err)
        })
    })
  })

  describe('Route GET /tasks/:id', () => {
    it('should return a task', done => {
      request
        .get('/tasks/1')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(TaskDefault.id)
          expect(res.body.title).to.be.eql(TaskDefault.title)
          expect(res.body.completed).to.be.eql(TaskDefault.completed)
          done(err)
        })
    })
  })

  describe('Route POST /tasks', () => {
    it('should create a task', done => {
      const newTask = {
        id: 2,
        title: 'new title',
        completed: false
      }
      request
        .post('/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send(newTask)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(newTask.id)
          expect(res.body.title).to.be.eql(newTask.title)
          expect(res.body.completed).to.be.eql(newTask.completed)
          done(err)
        })
    })
  })

  describe('Route PUT /tasks/:id', () => {
    it('should update a task', done => {
      const updateTask = {
        id: 1,
        completed: true
      }
      request
        .put('/tasks/1')
        .set('Authorization', `Bearer ${token}`)
        .send(updateTask)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(TaskDefault.id)
          expect(res.body.title).to.be.eql(TaskDefault.title)
          expect(res.body.completed).to.be.eql(updateTask.completed)
          done(err)
        })
    })
  })

  describe('Route DELETE /tasks/:id', () => {
    it('should delete a task', done => {
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
