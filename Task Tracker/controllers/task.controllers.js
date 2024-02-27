const fs = require('fs');
//get all tasks
exports.retrieveAllTasks = (req,res)=>{
    try {
        fs.readFile('./data.json',(err,data)=>{
            if(err){
                console.log(err);
                res.status(500).send("Internal server error!");
            }
            res.status(200).json(JSON.parse(data));
        })
    } catch (error) {
        res.status(500).send("Server error!");
    }
}

//get single task by id
exports.retrieveSingleTask= (req,res)=>{
    const id = parseInt(req.params.id);
    try {
        const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
        const result = data.find(r => r.id === id);
        if (result) {
            res.status(200).json(result);
        } else {
            console.log("Task not found");
            res.status(404).send("Task not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error!");
    }
}

//create a task
exports.createTask = (req, res) => {
    const newData = req.body;
    console.log(newData);
    let jsonData = [];
    try {
         const data = fs.readFileSync('./data.json', 'utf-8',(err)=>{
            if(err){
                throw err;
            }
         });
         if(!data){
            jsonData.push(newData);
         }
         else{
            jsonData = JSON.parse(data);
            jsonData.push(newData);
         }
       
         fs.writeFileSync('./data.json', JSON.stringify(jsonData),(err)=>{
            if(err){
                throw err;
            }
         });
         res.status(200).send("Task created successfully!");
    } 
    catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
};

 // Read data from file
    // fs.promises.readFile('./data.json', 'utf-8')
    //     .then((data) => {
    //         try {
    //             jsonData = JSON.parse(data);
    //         } catch (error) {
    //             res.status(500).send("Internal server error");
    //             console.error(error);
    //         }

    //         jsonData.push(newData);

    //         // Write updated data back to file
    //         return fs.promises.writeFile('./data.json', JSON.stringify(jsonData));
    //     })
    //     .then(() => {
    //         res.status(200).send("Task created successfully!");
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //         res.status(500).send("Internal server error");
    //     });


    //update a task

    exports.updateTask= (req,res)=>{
        const id = parseInt(req.params.id);
        const updatedData = req.body;
    
    // Read file
    fs.readFileSync('./data.json', 'utf8', (err, data) => {
        const id = parseInt(req.params.id);
        const updatedData = req.body;

        try {
            // Read the JSON file synchronously
            let jsonData = fs.readFileSync('./data.json', 'utf8');

            // Parse the JSON data
            jsonData = JSON.parse(jsonData);

            // Find the index of the record with the specified ID
            const recordIndex = jsonData.findIndex(item => item.id === id);
            
            // Check if the record is not found
            if (recordIndex === -1) {
                return res.status(404).send('Record not found');
            }

            // Update the properties of the record
            jsonData[recordIndex].title = updatedData.title;
            jsonData[recordIndex].description = updatedData.description;
            jsonData[recordIndex].completedStatus = updatedData.completedStatus;

            // Write the updated data back to the JSON file
            fs.writeFileSync('./data.json', JSON.stringify(jsonData));

            res.send('Record updated successfully');
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }

    //patch
    exports.setCompleteStatus = (req,res)=>{
        const taskId = parseInt(req.params.id);
        const { completedStatus } = req.body;

        // Find the task by ID
        const taskIndex = tasks.findIndex(task => task.id === taskId);

        if (taskIndex !== -1) {
            // Update the completed status
            tasks[taskIndex].completedStatus = completedStatus;
            res.status(200).json({ message: `Task ${taskId} updated successfully` });
        } else {
            res.status(404).json({ message: `Task with ID ${taskId} not found` });
        }
    }

    //delte a task by id
    exports.deleteTask =(req,res)=>{
        const id = parseInt(req.params.id);

    fs.readFile('./data.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
    
        try {
            const jsonData = JSON.parse(data);
            const filteredData = jsonData.filter(item => item.id !== id);
    
            // Check if any data was filtered out
            if (jsonData.length === filteredData.length) {
                return res.status(404).send('Record not found');
            }
    
            // Write updated data back to the file
            fs.writeFileSync('./data.json', JSON.stringify(filteredData));
    
            return res.send('Record deleted successfully');
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }
    });
}
    
