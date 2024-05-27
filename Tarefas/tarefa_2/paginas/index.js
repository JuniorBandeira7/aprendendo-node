const express = require('express')
const router = express.Router()

const basePath = path.join(__dirname, '../templates')

router.get('/1', (req, res)=>{

    res.sendFile(`${basePath}/pagina1.html`)
})

router.get('/2', (req, res)=>{

    res.sendFile(`${basePath}/pagina2.html`)
})

module.exports = router
