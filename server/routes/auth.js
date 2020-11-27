const express = require('express');


const router = express.Router();

//import middlewares
const {authCheck} = require('../middlewares/auth')

//imports controller
const {createOrUpdateUser} = require("../controllers/authController")


/*const myMiddleware = (req,res,callback) =>{
    console.log('I AM A MIDDLEWARE :)')
    callback()
} */

//router.get("/create-or-update-user", createOrUpdateUser )
router.post("/create-or-update-user", authCheck, createOrUpdateUser )

/*router.get('/testing',myMiddleware, (req,res) =>{
    res.json({
        data:"YOU SUCCESFULKY TRIED A MIDDLEWARE"
    })
}) */

module.exports = router;