const mongoose = require('mongoose')
//import mongoose from 'mongoose';
const {Schema} = mongoose;
const {ObjectId} = mongoose.Schema;


const userSchema = new Schema({
    name: String,
    email:{
        type:String,
        required: true,
        index: true
    },
    role:{
        type: String,
        default: 'subscriber'
    },
    cart:{
        type: Array,
        default: [],
    },
    address:{
        street: String,
        city: String,
        state: String,
        zip: Number,
        phoneNumber: Number,
        //required: true
    },
    //wishlist: [{type: ObjectId, ref: "Product"}],
    //address: String,


}, {timestamps: true});

module.exports = mongoose.model('User', userSchema)

