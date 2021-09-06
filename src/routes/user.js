const routes = require("express").Router();

const { userController } = require('../controller/user.controller')
const {requiredFields} = require('../middlewares/requiredFields');

routes.post("/register",requiredFields, userController.register);
routes.post("/login",requiredFields, userController.login);

module.exports = routes;