const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema;

const productSchema = new mongoose.Schema({
    title:{
        type: String,
        trim: true,
        required: true,
        maxlength: [32,"Too long"],
        text: true
    },
    slug:{
        type: String,
        unique: true,
        lowercase: true,
        index: true
    },
    description:{
        type: String,
        required: true,
        maxlength: 2500,
        text: true
    },
    price:{
        type: Number,
        required: true,
        trim: true,
        maxlength: 32
    },
    category:{
        type:ObjectId,
        ref: "Category"
    },
    subcategory:[{
        type:ObjectId,
        ref: "SubCategory"
    }],
    quantity:{
        type: Number
    },
    sold:{
        type: Number,
        default: 0
    },
    /*images:{
        type: Array
    },*/
    shipping:{
        type: String,
        enum: ["Yes","No"]
    },
    color:{
        type: String,
        enum: ["Black","Brown","Silver","White","Blue"]
    },
    brand:{
        type: String,
        enum: ["Apple","Samsung","Microsoft","Lenovo","Asus"]
    },
    /*ratings:[{
        star: Number,
        postedBy: {
            type: ObjectId,
            ref: "User"
        }
    }],
    reviews:[{
        type: String,
        maxlength: 2500,
        postedBy:{
            type: ObjectId,
            ref: "User"
        }
    }] */
},{timestamps: true})

module.exports = mongoose.model("Product",productSchema)