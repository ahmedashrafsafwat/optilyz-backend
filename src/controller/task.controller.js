const { successResponse, errorResponse } = require("../helper");
const { taskService } = require("../services/task.service");

module.exports.taskController = {
  getAll: async (req, res) => {
    await taskService.getAll(req, res, (err, response) => {
        if (err) return errorResponse(err.message, err.code, res);

      return successResponse("Tasks", response, 200, res);
    });
  },
  add: async (req, res) => {
    await taskService.add(req, res, (err, response) => {
        if (err) return errorResponse(err.message, err.code, res);

      return successResponse("Task added", response, 200, res);
    });
  },
  edit: async (req, res) => {
    await taskService.edit(req, res, (err, response) => {
        if (err) return errorResponse(err.message, err.code, res);

      return successResponse("Task Updated", response, 200, res);
    });
  },
  delete: async (req, res) => {
    await taskService.delete(req, res, (err, response) => {
      if (err) return errorResponse(err.message, err.code, res);

      return successResponse("Task Deleted", response, 200, res);
    });
  },
};
