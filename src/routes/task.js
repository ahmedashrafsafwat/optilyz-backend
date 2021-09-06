const routes = require("express").Router();

const { taskController } = require('../controller/task.controller')
const {authentication} = require('../middlewares/authentication')
const {requiredFields} = require('../middlewares/requiredFields');

/**
 *  gets tasks with query params for paginations
 *  queryParameters: 
 *      perPage: 
 *          description: the tasks per single page
 *      page:
 *          description: the page that we are currently standing on
 *  if query parameters not sent then the default scenario is turned on which returns 
 *  page number 0 with 10 tasks per page
 */
routes.get("/", authentication ,requiredFields,taskController.getAll);

routes.post("/add",authentication,requiredFields, taskController.add);

routes.put("/edit/:id",authentication, requiredFields,taskController.edit);

routes.delete("/delete/:id", authentication , requiredFields,taskController.delete);



module.exports = routes;