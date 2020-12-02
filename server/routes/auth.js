const express = require('express');


const router = express.Router();

//import middlewares
const {authCheck,adminCheck} = require('../middlewares/auth')

//imports controller
const {createOrUpdateUser,currentUser} = require("../controllers/authController");
const { auth } = require('../firebase');


/*const myMiddleware = (req,res,callback) =>{
    console.log('I AM A MIDDLEWARE :)')
    callback()
} */

//router.get("/create-or-update-user", createOrUpdateUser )
router.post("/create-or-update-user", authCheck, createOrUpdateUser )
router.post("/current-user",authCheck,currentUser)

router.post("/current-admin",authCheck,adminCheck,currentUser)


/*router.get('/testing',myMiddleware, (req,res) =>{
    res.json({
        data:"YOU SUCCESFULKY TRIED A MIDDLEWARE"
    })
}) */

module.exports = router;