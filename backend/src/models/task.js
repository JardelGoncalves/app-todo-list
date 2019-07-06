export default (sequelize, DataType) => {
  const Tasks = sequelize.define('Tasks', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    completed: {
      type: DataType.BOOLEAN
    },
    user_id: {
      type: DataType.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      },
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    hooks: {
      beforeCreate: task => {
        if (task.completed !== false || task.completed !== true) {
          task.completed = false
        }
      }
    }
  })

  return Tasks
}
