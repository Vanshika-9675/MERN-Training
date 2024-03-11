const express = require('express');
const mongoose = require('mongoose');
const router = require('./Routers/library.routes');
const cors = require('cors');
const bodyParser = require('body-parser'); 
const app = express();

const PORT = 8000;

//middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded bodies
app.use(bodyParser.json()); // Parse JSON bodies


app.use(cors());

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


 