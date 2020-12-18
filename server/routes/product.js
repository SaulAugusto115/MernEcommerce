const express = require('express')
const router = express.Router()

const {authCheck,adminCheck} = require('../middlewares/auth')

const {create} = require('../controllers/productController')

//routes
router.post("/product",authCheck,adminCheck,create)

module.exports = router