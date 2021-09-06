/**
 *  all the required and not required body, params query in the apis
 */
module.exports.requiredBody = {
    "login": {
            email: true,
            password: true,
    },
    "register": {
            email: true,
            name: true,
            password: true
    },
    "task_add": {
            title: true,
            description: true,
            deadline: true,
            reminderTime: true,
            isCompleted: true
    },
    "task": {
            perPage: false,
            page: false

    },
    "task_edit": {
            id: true,
            title: true,
            description: true,
            deadline: true,
            reminderTime: true,
            isCompleted: true

    },
    "task_delete": {
            id: true
    }
}