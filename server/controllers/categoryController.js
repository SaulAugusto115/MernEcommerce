const Category = require('../models/category')
const slugify = require('slugify')

exports.create = async (req,res) =>{

    try {

        //get the name fromthe frontend
        const {name} = req.body

        const category = await new Category({name, slug: slugify(name)}).save()

        res.json(category)

    }catch(error)
    {
        console.log(error)
        res.status(400).send('Create category failed')
    }

}



exports.list = async (req,res) =>{

    try{

        res.json(await Category.find({}).sort({createdAt: -1}).exec())

    }catch(error)
    {
        console.log(error)
        //res.json(400).send('List category failed')
    }
    
}



exports.read = async (req,res) =>{
    let category = await Category.findOne({slug: req.params.slug}).exec()
    res.json(category)
}


exports.update = async (req,res) =>{

    const {name} = req.body

    try{

        const update = await Category.findOneAndUpdate({slug: req.params.slug},{name, slug: slugify(name)},{new: true})

        res.json(update)

    }catch(err)
    {
        console.log(err)
        res.status(400).send('Update Category Failed')
    }
    
}


exports.remove = async (req,res) =>{

    try{

        const deleted = await Category.findOneAndDelete({slug: req.params.slug});
        res.json(
            //"The Category has been deleted succesfully",
            deleted
        )

    }catch(error)
    {
        console.log(error)
        res.status(400).send("Categroy delete failed")
    }
    
}