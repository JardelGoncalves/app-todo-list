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
    description: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    priority: {
      type: DataType.ENUM('low', 'medium', 'high'),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    completed: {
      type: DataType.BOOLEAN
    }
  }, {
    hooks: {
      beforeCreate: task => {
        if (task.priority) {
          task.priority = task.priority.toLowerCase()
        }
      }
    }
  })

  return Tasks
}