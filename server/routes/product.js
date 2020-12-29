const express = require('express')
const router = express.Router()

const {authCheck,adminCheck} = require('../middlewares/auth')

const {create,listAll} = require('../controllers/productController')


//routes
router.post("/product",authCheck,adminCheck,create)
//router.get("/products",read)
router.get("/products/:count",listAll)

module.exports = router