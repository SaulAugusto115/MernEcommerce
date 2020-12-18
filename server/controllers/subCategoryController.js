const SubCategory = require('../models/subcategory')
const slugify = require('slugify')

exports.create = async (req,res) => {

    try{

        //get the name and the parent from the front end
        const {name,parent} = req.body

        const subCategory = await new SubCategory({name,parent, slug: slugify(name)}).save()

        res.json(subCategory)

    }catch(error)
    {
        console.log("Sub Category Create ERROR",error)
        res.status(400).send("Create Sub Category Failed")
    }

}


exports.list = async (req,res) =>{

    try{

        res.json(await SubCategory.find({}).sort({createdAt: -1}).exec())

    }catch(error){

        console.log("Sub Category List ERROR",error)
        res.status(400).send("Sub Category List Failed")
    }

}

exports.read = async (req,res) => {
    try{

       let sub = await SubCategory.findOne({slug: req.params.slug}).exec()

       res.json(sub)

    }catch(error){
        console.log("Sub Category Read ERROR",error)
        res.status(400).send("Sub Category Read Failed")
    }
}

exports.update = async (req,res) => {

    const {name,parent} = req.body

    try{

        res.json(await SubCategory.findOneAndUpdate({slug: req.params.slug},{name,parent, slug: slugify(name)},{new: true}))



    }catch(error){
        console.log("Sub Category Update ERROR",error)
        res.status(400).send("Sub Category Update Failed")
    }
}

exports.remove = async (req,res) => {
    const {name} = req.body

    try{

        res.json(await SubCategory.findOneAndDelete({slug: req.params.slug}))


    }catch(error){
        console.log("Sub Category Delete ERROR",error)
        res.status(400).send("Sub Category Delete Failed")
    }
}