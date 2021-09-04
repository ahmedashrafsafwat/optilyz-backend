const routes = require("express").Router();

const { taskController } = require('../controller/task.controller')
const {authentication} = require('../middlewares/authentication')
/**
 *  Allows the spam protection team to block a source from the users
 */
routes.get("/all", authentication ,taskController.getAll);

/**
 *  Allows the spam protection team to resolve a ticket
 */
routes.post("/add",authentication, taskController.add);

routes.put("/edit/:id",authentication, taskController.edit);

routes.delete("/delete/:id", authentication , taskController.delete);



module.exports = routes;