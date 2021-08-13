const TodosModel = require('../models/todo-model')
const TodoDto = require('../dtos/todo-dto')
const ApiError = require('../exceptions/api-error')

class TodosService {
    async getTodos(userId, page) {
        const skip = (page - 1) * 15
        const todosCount = await TodosModel.count({owner: userId})
        let hasMore = true
        if (todosCount < page*15) {
            hasMore = false
        }
        const todos = await TodosModel.find({owner: userId}, {owner: 0}, {skip, limit: 15})
        return {
            todos,
            hasMore
        }
    }

    async addTodo(subject, content, deadline, owner) {
        const todo = await TodosModel.create({subject, content, deadline, owner})
        const todoDto = new TodoDto(todo)
        return {
            todo: todoDto
        }
    }

    async deleteTodo(todoId, userId) {
        const candidateTodo = await TodosModel.findById(todoId)
        if (!candidateTodo) {
            throw ApiError.BadRequest(`Todo не существует`)
        }
        if (candidateTodo?.owner != userId) {
            throw ApiError.BadRequest(`Вы пытались удалить чужой Todo`)
        }
        await TodosModel.findOneAndRemove({_id:todoId})
        return {
            deletedTodoId: todoId
        }
    }

    async updateTodo(todoId, subject, content, deadline, isChecked, userId) {
        const todo = await TodosModel.findById(todoId)
        if (!todo) {
            throw ApiError.BadRequest(`Todo не существует`)
        }
        if (todo?.owner != userId) {
            throw ApiError.BadRequest(`Вы пытались изменить чужой Todo`)
        }
        todo.subject = subject
        todo.content = content
        todo.deadline = deadline
        todo.isChecked = isChecked
        await todo.save()
        const todoDto = new TodoDto(todo)
        return {
            todo: todoDto
        }
    }
}

module.exports = new TodosService()