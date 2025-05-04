const TaskModel = require('../models/Task.model');
const db = require('../../firebase/firebase.config');

const taskModel = new TaskModel(db);

const resolvers = {
  Query: {
    tasks: () => taskModel.getAll(),
    task: (_, { id }) => taskModel.getById(id),
  },
  Mutation: {
    addTask: (_, { title }) => taskModel.add(title),
    toggleTask: (_, { id }) => taskModel.toggleCompleted(id),
    deleteTask: (_, { id }) => taskModel.delete(id),
  }
};

module.exports = resolvers;