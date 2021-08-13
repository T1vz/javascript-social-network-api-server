const TodosService = require('../service/todos-service')


class TodosController {
    async getTodos(req, res, next){
        try {
            const {page} = req.body
            const todos = await TodosService.getTodos(req.user.id, page)
            return res.json(todos)
        } catch (e) {
            next(e)
        }
    }

    async addTodo(req, res, next){
        try {
            const { subject, content, deadline } = req.body
            const todoData = await TodosService.addTodo(subject, content, deadline, req.user.id)
            return res.json(todoData)
        } catch (e) {
            next(e)
        }
    }

    async deleteTodo(req, res, next){
        try {
            const { todoId } = req.body
            const todoData = await TodosService.deleteTodo(todoId, req.user.id)
            return res.json(todoData)
        } catch (e) {
            next(e)
        }
    }

    async updateTodo(req, res, next){
        try {
            const { todoId, subject, content, deadline, isChecked } = req.body
            const todoData = await TodosService.updateTodo(todoId, subject, content, deadline, isChecked, req.user.id)
            return res.json(todoData)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new TodosController()