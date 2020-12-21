const Product = require('../models/product')
const slugify = require('slugify')

exports.create = async (req,res) =>{
    try{

        console.log(req.body)

        req.body.slug = slugify(req.body.title)

        const newProduct = await new Product(req.body).save()

        res.json(newProduct)

    }catch(err){
        console.log("Product Create ERROR",err)
        //res.status(400).send("Create Product Failed")
        res.status(400).json({
            err: err.message,

        })
    }
}

exports.read = async (req,res) => {

    let products = await Product.find({}).populate("SubCategory")
    res.json(products)
}