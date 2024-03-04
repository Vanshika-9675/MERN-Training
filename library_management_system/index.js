const express = require('express');
const mongoose = require('mongoose');
const router = require('./Routers/library.routes');

const app = express();

const PORT = 8000;

//middleware
app.use(express.json());

//default route
app.get('/',(req,res)=>{
    res.send("Welcome to the Library Management System!")
})

//mounting routes
app.use('/api/v1',router);

//server
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

//database connection 
mongoose.connect('mongodb://127.0.0.1:27017/library').then(()=>{
        console.log("Database connection is successful");
 })
.catch((error)=>{
        console.log("Issue in db connection ");
        console.log(error.message);
        process.exit(1);
 })


 