describe('Routes Tasks', () => {

  const Task = app.datasource.models.Tasks
  const TaskDefault = {
    id: 1,
    title: 'title default',
    description: 'description default',
    priority: 'low',
    completed: false
  }

  beforeEach(done => {
    Task.destroy({ where: {} })
      .then(() => Task.create(TaskDefault)
        .then(() => {
          done()
        }))
  })

  describe('Route GET /tasks', () => {
    it('should return a task lists', done => {
      request
        .get('/tasks')
        .end((err, res) => {
          expect(res.body[0].id).to.be.eql(TaskDefault.id)
          expect(res.body[0].title).to.be.eql(TaskDefault.title)
          expect(res.body[0].description).to.be.eql(TaskDefault.description)
          expect(res.body[0].priority).to.be.eql(TaskDefault.priority)
          expect(res.body[0].completed).to.be.eql(TaskDefault.completed)
          done(err)
        })
    })
  })

  describe('Route GET /tasks/:id', () => {
    it('should return a task', done => {
      request
        .get('/tasks/1')
        .end((err, res) => {
          expect(res.body.id).to.be.eql(TaskDefault.id)
          expect(res.body.title).to.be.eql(TaskDefault.title)
          expect(res.body.description).to.be.eql(TaskDefault.description)
          expect(res.body.priority).to.be.eql(TaskDefault.priority)
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
        description: 'nwq description',
        priority: 'high',
        completed: false
      }
      request
        .post('/tasks')
        .send(newTask)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(newTask.id)
          expect(res.body.title).to.be.eql(newTask.title)
          expect(res.body.description).to.be.eql(newTask.description)
          expect(res.body.priority).to.be.eql(newTask.priority)
          expect(res.body.completed).to.be.eql(newTask.completed)
          done(err)
        })
    })
  })

  describe('Route PUT /tasks/:id', () => {
    it('should update a task', done => {
      const updateTask = {
        id: 1,
        priority: 'high',
        completed: true
      }
      request
        .put('/tasks/1')
        .send(updateTask)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(TaskDefault.id)
          expect(res.body.title).to.be.eql(TaskDefault.title)
          expect(res.body.description).to.be.eql(TaskDefault.description)
          expect(res.body.priority).to.be.eql(updateTask.priority)
          expect(res.body.completed).to.be.eql(updateTask.completed)
          done(err)
        })
    })
  })

  describe('Route DELETE /tasks/:id', () => {
    it('should delete a task', done => {
      request
        .delete('/tasks/1')
        .end((err, res) => {
          expect(res.status).to.be.eql(204)
          done(err)
        })
    })
  })
})
