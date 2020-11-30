const user = require('../models/user')
const User =  require('../models/user')


exports.createOrUpdateUser = async (req,res) =>{
    
    const {name,email,picture} = req.user

    const user = await User.findOneAndUpdate({email},{name: email.split("@")[0],picture},{new: true})

    if(user)
    {
        console.log("USER UPDATED",user)
        res.json(user)

    }else{
        const newUser = await new User({
            email,
            name: email.split("@")[0],
            picture
        }).save();
        console.log("USER CREATED",newUser)
        res.json(newUser);
    }

}

exports.currentUser = async (req,res) =>{

     User.findOne({email: req.user.email}).exec((error, user) => {
         if(error)
         {
             throw new Error(error)
         }else{
             res.json(user)
         }
     })
   
}