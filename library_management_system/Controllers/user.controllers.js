const { estimatedDocumentCount } = require('../models/schema');
const User = require('../models/userSchema');
const bcrypt = require('bcrypt');

//sign up 
exports.signup = async (req,res)=>{
   try {
    const {userName, email , password}  = req.body;

    //check if user already exist 
    const user  = await User.findOne({email});
    
    if(user){
        return res.status(400).json(
            {
                sucess:false,
                message:'user already exists'
            }
        );
    }

    //hashing the password
    
    let hashedPassword;

    try {
       hashedPassword = await bcrypt.hash(password,10);
    } catch (error) {
        return res.status(500).json({
            sucess:false,
            message:'Error in hashing the password'
        })
    }

    //creating user 
    const newUser = await User.create({userName, email , password:hashedPassword})

    return res.status(200).json({
        sucess:true,
        message:'user signed up successfullyy!!'
    })
   } catch (error) {
    console.log(error);
    res.status(500).json({
     success:false,
     data:"Internal server error!",
     message:error.message
    })
   }
}


//log in 
exports.login =async(req,res)=>{
   try {

    const {email , password}  = req.body;

    if(!email || !password){
        return res.status(400).json({
          success:false,
          message:"Please fill all the details careffully"
        })
      }

    const user  = await User.findOne({email});

    if(!user){
        return res.status(404).json(
            {
                sucess:false,
                message:'user is not registered with the provided email!'
            }
        );
    }

    if(await bcrypt.compare(password,user.password)){
        res.status(200).json({
            success:true,
            message:"User logged in successfully!!"
        })
    }
    else{
        res.status(401).json({
            success:false,
            message:"Password incorrect!!"
        })
    }
   } catch (error) {
        console.log(error);
        res.status(500).json({
        success:false,
        data:"Internal server error!",
        message:error.message
        })
   }
}
