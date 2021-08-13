const Router = require('express').Router
const userController = require('../controllers/user-controller')
const router = new Router()
const {body} = require('express-validator')
const authMiddleware = require('../middlewares/auth-middleware')
const todosController = require('../controllers/todos-controller')

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)
router.get('/users', authMiddleware, userController.getUsers)
router.post('/todos', authMiddleware, todosController.getTodos)
router.post('/todos/add', authMiddleware, todosController.addTodo)
router.post('/todos/delete', authMiddleware, todosController.deleteTodo)
router.post('/todos/update', authMiddleware, todosController.updateTodo)

module.exports = router