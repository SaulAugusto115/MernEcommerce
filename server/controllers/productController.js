const Product = require('../models/product')
const User = require('../models/user')
const slugify = require('slugify')
const e = require('express')


//here will appear all endpoints

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

/*exports.read = async (req,res) => {

    let products = await Product.find({}).populate("SubCategory")
    res.json(products)
} */

exports.listAll = async (req,res) => {
 
        let products = await Product.find({}).limit(parseInt(req.params.count))
        .populate('category').populate('subcategory').sort([["createdAt","desc"]]).exec()

        res.json(products)
   
}

exports.remove = async (req, res) => {
    try {
      const deleted = await Product.findOneAndRemove({
        slug: req.params.slug,
      }).exec();
      res.json(deleted);
    } catch (err) {
      console.log(err);
      return res.staus(400).send("Product delete failed");
    }
  };

  exports.read = async (req,res) => {
    const product = await Product.findOne({slug: req.params.slug}).populate('category').populate('subcategory').exec()

    res.json(product)
  }

  exports.update = async (req,res) => {
      try{

        if(req.body.title){
          req.body.slug = slugify(req.body.title)
        }

        const updated = await Product.findOneAndUpdate({slug: req.params.slug}, req.body, {new: true}).exec()

        res.json(updated)

      }catch(err)
      {
        console.log("PRODUCT UPDATE ERROR ---> ",err)

        //return res.status(400).send('Product Update Failed')
        res.status(400).json({
          err: err.message,

      })
      }
  }

  // WITHOUT PAGINATION
 /* exports.list = async(req,res) => {
    try{
      //thro sort would be something like createdAt/updatedAt and ordre would be somtehinglike ascending or descending
      const {sort,order,limit} = req.body

      const products = await Product.find({}).populate("category").populate("subcategory").sort([[sort, order]]).limit(limit).exec()

      res.json(products)

    }catch(err){
      console.log("PRODUCT LIST ERROR",err)

      res.status(400).json({
        err: err.message
      })
    }
  } */

    // WITH PAGINATION
  exports.list = async(req,res) => {

    console.log(req.body)

    try{
      //thro sort would be something like createdAt/updatedAt and ordre would be somtehinglike ascending or descending
      const {sort,order,page} = req.body
      const currentPage = page || 1
      const perPage = 3

      const products = await Product.find({})
      .skip((currentPage - 1) * perPage).populate("category").populate("subcategory").sort([[sort, order]]).limit(perPage).exec()

      res.json(products)

    }catch(err){
      console.log("PRODUCT LIST ERROR",err)

      res.status(400).json({
        err: err.message
      })
    }
  } 

  exports.productsCount = async (req,res) => {
    try{

      let total = await Product.find({}).estimatedDocumentCount().exec()

      res.json(total)

    }catch(err){
      console.log("Get Products Count ERROR",err)

      res.status(400).json({
        err: err.message
      })
    }
  }


  //controllers to rating and review a product
  exports.productStar = async (req,res) =>{

    const product = await Product.findById(req.params.productId).exec()

    const user = await User.findOne({email: req.user.email}).exec()

    const {star} = req.body

    //who is updating?
    //check if currently logged in user have already added rating to this product

    let existingRatingObject = product.ratings.find((element) => (element.postedBy.toString() === user._id.toString()))

    //if user havent left rating yet, push it
    if(existingRatingObject === undefined){
      let ratingAdded = await Product.findByIdAndUpdate(product._id,{
        $push: {ratings:{star,postedBy: user._id}}
      },{new: true}).exec()

      console.log('RATING ADDED',ratingAdded)
      res.json(ratingAdded)
    }else{

      //if user have already left rating,update it
      const ratingUpdated  = await Product.updateOne(
        {ratings: { $elemMatch: existingRatingObject},
      },{$set: {"ratings.$.star": star}},{
        new: true
      }).exec()

      console.log("RATING UPDATED",ratingUpdated)
      res.json(ratingUpdated)

    }

    


  }

  exports.productReview = async (req,res) => {
    const product = await Product.findById(req.params.productId).exec()

    const user = await User.findOne({email: req.user.email}).exec()

    const {review} = req.body

    //who is updating?
    //check if currently logged in user have already added rating to this product

    let existingReviewObject = product.reviews.find((element) => (element.postedBy.toString() === user._id.toString()))

    //if user havent left rating yet, push it
    if(existingReviewObject === undefined){
      let reviewingAdded = await Product.findByIdAndUpdate(product._id,{
        $push: {reviews:{review,postedBy: user._id}}
      },{new: true}).exec()

      console.log('REVIEWING ADDED',reviewingAdded)
      res.json(reviewingAdded)
    }else{

      //if user have already left rating,update it
      const reviewingUpdated  = await Product.updateOne(
        {reviews: { $elemMatch: existingReviewObject},
      },{$set: {"reviews.$.type": review}},{
        new: true
      }).exec()

      console.log("REVIEWING UPDATED",reviewingUpdated)
      res.json(reviewingUpdated)

    }
  }