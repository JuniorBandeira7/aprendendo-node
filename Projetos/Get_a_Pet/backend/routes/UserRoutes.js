const UserController = require('../controllers/UserController')

const router = require('express').Router()

// middleware
const verifyToken = require('../helpers/verify-token')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/checkuser', UserController.checkUser)
router.get('/:id', UserController.getUserById)
router.patch('/edit/:id', verifyToken, UserController.editUser)// faz a verificação do token antes de encaminhar para a função
//patch é atualiazação

module.exports = router