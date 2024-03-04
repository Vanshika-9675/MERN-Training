const mongoose = require('mongoose');


const librarySchema = new mongoose.Schema({
      id:{
          type: Number,
           required:true,
      },
      title:{
        type:String,
        required:true
     },
     author:{
        type:String,
        required:true,
     },
     isBorrowed:{
        type:Boolean,
        default:false
     }
})

const mymodel = mongoose.model('library',librarySchema);
module.exports = mymodel;
