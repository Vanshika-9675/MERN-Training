const express = require('express');
//importing routes 
const routes = require('./routes/routes');

//instantiating express
const app = express();

const PORT = 3000;

//middleware
app.use(express.json());


// default route
app.get('/',(req,res)=>{
    res.send("Hello!")
})

//routes mounting
app.use('/api/v1', routes);

//creating server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});