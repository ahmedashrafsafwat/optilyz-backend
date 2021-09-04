const routes = require("express").Router();

const { userController } = require('../controller/user.controller')

/**
 *  Allows the spam protection team to block a source from the users
 */
routes.post("/register", userController.register);

/**
 *  Allows the spam protection team to resolve a ticket
 */
routes.post("/login", userController.login);

module.exports = routes;