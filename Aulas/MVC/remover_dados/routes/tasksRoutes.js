const express = require('express')
const router = express.Router()
const app = express()
const port = 3000

const TaskController = require('../controllers/TaskController')

router.get('/add', TaskController.createTask)
router.post('/add', TaskController.createTaskSave)
router.post('/remove', TaskController.removeTask)
router.get('/', TaskController.showTasks)

module.exports = router


