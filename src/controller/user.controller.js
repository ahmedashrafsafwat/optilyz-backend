const { successResponse, errorResponse, uniqueId } = require('../helper');
const { userService } = require("../services/user.service")

module.exports.userController = {
    login: async (req, res) => {
        await userService.login(req, res, (err, response) => {
            if (err) return errorResponse(err.message, err.code, res);

            return successResponse("User Logged in", response, 200, res)
        })
    },
    register: async (req, res) => {
        await userService.register(req, res, (err, response) => {
            if (err) return errorResponse(err.message, err.code, res);

            return successResponse("User Registered", response, 200, res)
        })
    }
};