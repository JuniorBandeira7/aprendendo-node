const router = require("express").Router()

const PetController = require('../controllers/PetController')

const verifyToken = require('../helpers/verify-token')
const {imageUpload} = require('../helpers/image-upload')

router.post('/create', verifyToken, imageUpload.array('images'), PetController.create)
router.get('/', PetController.getAll)
router.get("/mypets", verifyToken, PetController.getAllUserPets)
router.get("/myadoptions", verifyToken, PetController.getAllUserAdoption)
router.get('/:id', PetController.getPetById)
router.delete('/:id', verifyToken, PetController.removePetById)
router.patch('/:id', verifyToken, imageUpload.array('images'), PetController.updatePet)
router.patch('/schedule/:id', verifyToken, PetController.schedule)

module.exports = router