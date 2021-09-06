const Task = require("../models/task");

module.exports.taskService = {
  getAll: async (req, res, callback) => {
    try {
      let { page , perPage } = req.query 

      if(!page) {
        page = 0
      } else {
        page = parseInt(page)
      }
      if(!perPage) {
        perPage = 10
      }else {
        perPage =parseInt(perPage)
      }

      let tasks = await Task.find({})
        .select('title description deadline reminderTime isCompleted')
        .limit(perPage)
        .skip(perPage * page)
        .sort({title: 'asc'});

        callback(null, tasks);
    } catch (err) {
        callback({message:err.message,code:500})
    }
  },
  add: async (req, res, callback) => {
      try {
        let { title, description,deadline,reminderTime,isCompleted } = req.body;

        let newTask = await Task.create({title, description,deadline,reminderTime,isCompleted});

        newTask = newTask.toObject()

        // remove unneccery fields
        delete newTask["__v"]

        callback(null, newTask);

      } catch (err) {
        callback({message:err.message,code:500})
      }
  },
  edit: async (req, res, callback) => {
    try {
        let { title, description,deadline,reminderTime,isCompleted } = req.body;
        let _id = req.params.id
        let updateQuery = {}

        if(title) {
            updateQuery.title = title
        }
        if(description) {
            updateQuery.description = description
        }
        if(deadline) {
            updateQuery.deadline = deadline
        }
        if(reminderTime) {
            updateQuery.reminderTime = reminderTime
        }
        if(isCompleted != undefined || isCompleted != null) {
            updateQuery.isCompleted = isCompleted
        }

        const editedTask = await Task.updateOne({_id},updateQuery)

        editedTask.nModified ? callback(null, editedTask): callback({message:"Task not found",code:404});


    } catch (err) {
        callback({message:err.message,code:500})
    }

  },
  delete: async (req, res, callback) => {

    try {
        let _id = req.params.id

        const deletedTask = await Task.deleteOne({_id})

        deletedTask.deletedCount ? callback(null, deletedTask): callback({message:"Task not found",code:404});

    } catch (err) {
        callback({message:err.message,code:500})
    }

  },
};
