const mongoose = require("mongoose");

exports.dbconnect = ()=>{
    mongoose.connect("mongodb+srv://vanshisharma303:Cu1mesrLpZhM5nEJ@cluster0.sttzwtp.mongodb.net/AuthDb").then(()=>{
        console.log("DB connected successfully");
    })
    .catch((err)=>{
        console.log("Db connection issues");
        console.log(err);
        process.exit(1);
    })
}
