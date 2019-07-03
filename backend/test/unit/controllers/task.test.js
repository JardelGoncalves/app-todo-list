import TaskController from '../../../src/controllers/task'

describe('Controllers Tasks', () => {

  describe('get all the tasks: getAll()', () => {
    it('should return a task lists', () => {
      const Task = {
        findAll: td.function()
      }

      const expectedResponse = [{
        id: 1,
        title: 'Expected title',
        description: 'Expected description',
        priority: 'low',
        completed: false,
        user_id: 1,
        created_at: '2019-06-25T15:15:42.6922',
        updated_at: '2019-06-25T15:15:42.6922'
      }]

      td.when(Task.findAll({ where: { user_id: 1 } })).thenResolve(expectedResponse)

      const _taskController = new TaskController(Task)
      return _taskController.getAll({ user_id: 1 })
        .then(response => expect(response.data).to.be.eql(expectedResponse))
    })
  })

  describe('get a task: getById(params)', () => {
    it('should return a task', () => {
      const Task = {
        findOne: td.function()
      }

      const expectedResponse = {
        id: 1,
        title: 'Expected title',
        description: 'Expected description',
        priority: 'low',
        completed: false,
        user_id: 1,
        created_at: '2019-06-25T15:15:42.6922',
        updated_at: '2019-06-25T15:15:42.6922'
      }

      td.when(Task.findOne({ where: { id: 1, user_id: 1 } })).thenResolve(expectedResponse)

      const _taskController = new TaskController(Task)
      return _taskController.getById({ id: 1, user_id: 1 })
        .then(response => expect(response.data).to.be.eql(expectedResponse))
    })
  })

  describe('create a task: create(data)', () => {
    it('should create a task', () => {
      const Task = {
        create: td.function()
      }

      const expectedResponse = {
        id: 1,
        title: 'Expected title',
        description: 'Expected description',
        priority: 'low',
        completed: false,
        user_id: 1,
        created_at: '2019-06-25T15:15:42.6922',
        updated_at: '2019-06-25T15:15:42.6922'
      }

      td.when(Task.create(expectedResponse)).thenResolve(expectedResponse)

      const _taskController = new TaskController(Task)
      return _taskController.create(expectedResponse)
        .then(response => expect(response.data).to.be.eql(expectedResponse))
    })
  })

  describe('delete an existing task: delete(param)', () => {
    it('should delete an existing a task', () => {
      const Task = {
        destroy: td.function()
      }

      td.when(Task.destroy({ where: { id: 1, user_id: 1 } })).thenResolve({})

      const _taskController = new TaskController(Task)
      return _taskController.delete({ id: 1, user_id: 1 })
        .then(response => expect(response.status).to.be.eql(204))
    })
  })
  
})
