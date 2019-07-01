import UserController from '../../../src/controllers/user'

describe('Controllers Users', () => {

  describe('get all the users: getAll()', () => {
    it('should return a user lists', () => {
      const User = {
        findAll: td.function()
      }

      const expectedResponse = [{
        id: 1,
        name: 'User expected',
        email: 'user@expected.com',
        password: '$2a$10$gWv93RyDLNkgtZ6Ryw3sxu.rjAphhx/xTcMl4KTD.8ewH2a.4fta6',
        created_at: '2019-06-25T15:15:42.6922',
        updated_at: '2019-06-25T15:15:42.6922'
      }]

      td.when(User.findAll()).thenResolve(expectedResponse)

      const _userController = new UserController(User)
      return _userController.getAll()
        .then(response => expect(response.data).to.be.eql(expectedResponse))
    })
  })

  describe('get a user: getById(params)', () => {
    it('should return a user', () => {
      const User = {
        findOne: td.function()
      }

      const expectedResponse = {
        id: 1,
        name: 'User expected',
        email: 'user@expected.com',
        password: '$2a$10$gWv93RyDLNkgtZ6Ryw3sxu.rjAphhx/xTcMl4KTD.8ewH2a.4fta6',
        created_at: '2019-06-25T15:15:42.6922',
        updated_at: '2019-06-25T15:15:42.6922'
      }

      td.when(User.findOne({ where: { id: 1 } })).thenResolve(expectedResponse)

      const _userController = new UserController(User)
      return _userController.getById({ id: 1 })
        .then(response => expect(response.data).to.be.eql(expectedResponse))
    })
  })

  describe('create a user: create(data)', () => {
    it('should create a user', () => {
      const User = {
        create: td.function()
      }

      const body = {
        id: 1,
        name: 'User expected',
        email: 'user@expected.com',
        password: 'test'
      }

      const expectedResponse = {
        id: 1,
        name: 'User expected',
        email: 'user@expected.com',
        password: '$2a$10$gWv93RyDLNkgtZ6Ryw3sxu.rjAphhx/xTcMl4KTD.8ewH2a.4fta6',
        created_at: '2019-06-25T15:15:42.6922',
        updated_at: '2019-06-25T15:15:42.6922'
      }

      td.when(User.create(body)).thenResolve(expectedResponse)

      const _userController = new UserController(User)
      return _userController.create(body)
        .then(response => expect(response.data).to.be.eql(expectedResponse))
    })
  })

  describe('delete an existing user: delete(params)', () => {
    it('should delete an existing a user', () => {
      const User = {
        destroy: td.function()
      }

      td.when(User.destroy({ where: { id: 1 } })).thenResolve({})

      const _userController = new UserController(User)
      return _userController.delete({ id: 1 })
        .then(response => expect(response.status).to.be.eql(204))
    })
  })
  
})
