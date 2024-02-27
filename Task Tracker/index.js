const express = require('express');
const router = require('./routes/task.routes');

const app = express();

const PORT = 3000;

//middleware
app.use(express.json());

//default route
app.get('/',(req,res)=>{
    res.send("Welcome to the task Tracker!")
})

//mounting routes
app.use('/api/v1',router);

//server
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})


