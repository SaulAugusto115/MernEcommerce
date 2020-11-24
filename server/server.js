const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
//const fs = require("fs")
const {readdirSync} = require("fs")
require('dotenv').config()



//imports  routes
const authRoutes = require('./routes/auth')


//app
const app = express()

//db
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true

}).then(() =>{
    console.log("DB Connected")
}).catch((err) => {
    console.log("DB Connection error",err)
})


//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({limit: "2mb"}));
app.use(cors());

//route
/*app.get("/api", (req,res) => {
    res.json({
        data: "hey you hit node api",

    })
}) */


//routes middleware
//app.use("/api",authRoutes)

//routes autoloading
//fs.readdirSync('./routes').map((r) => app.use("/api",require('./routes/' + r)) )
readdirSync('./routes').map((r) => app.use("/api", require('./routes/' + r) ))

//PORT
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log("Server is runnig in running on port",port)
})