const express = require('express');
const fs = require('fs');

const router = express.Router();

// fetch all data
router.get('/showAlldata', (req, res) => {
    try {
        fs.readFile('./data.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.json(JSON.parse(data));
        });
    } 
    catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// fetch a single record by ID
router.get('/showData/:id', (req, res) => {
    const idToFind = req.params.id; 

    fs.readFile('./data.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }


        let jsonData = []; 
        try {
            jsonData = JSON.parse(data);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Error parsing JSON data');
        }
        const record = jsonData.find(item => item.id === idToFind);

        if (record) {
            console.log(record);
            res.send(record);
            return;
        } else {
            console.log('Record not found');
            return res.status(404).send('Record not found');
        }
    });

 });

//POST
router.post('/addData', (req, res) => {
    const newData = req.body;

    // Validate required fields
    if (!newData.id) {
        res.status(400).send('ID is required');
        return;
    }

    fs.readFile('./data.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        } 

        let jsonData = [];
        try {
            jsonData = JSON.parse(data);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error parsing JSON data');
            return;
        } 

        // Check if ID already exists
        const existingRecord = jsonData.find(item => item.id === newData.id);

        if (existingRecord) {
            res.status(400).send('ID already exists');
            return;
        }

        // Push the new data into jsonData
        jsonData.push(newData);

        // Write the updated data back to the file
        fs.writeFile('./data.json', JSON.stringify(jsonData), err => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.status(200).send('Record added successfully!!');
        });
    });
});




// PUT 
router.put('/updateData/:id', (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    
    // Read file
    fs.readFile('./data.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        let jsonData;
        try {
            // Parse the JSON data
            jsonData = JSON.parse(data);
        } catch (parseError) {
            console.error(parseError); 
            return res.status(500).send('Error parsing JSON data');
        }

        // Find the index of the record with the specified ID
        const recordIndex = jsonData.findIndex(item => item.id === id);

        //console.log(recordIndex);
        
        // Check if the record is not found
        if (recordIndex === -1) {
            return res.status(404).send('Record not found');
        }

        // Update the properties of the record
        jsonData[recordIndex].name = updatedData.name;
        jsonData[recordIndex].department = updatedData.department;

        // Write the updated data back to the JSON file
        fs.writeFile('./data.json', JSON.stringify(jsonData, null, 2), err => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            res.send('Record updated successfully');
        });
    });
});

// DELETE the record by ID
router.delete('/removeData/:id', (req, res) => {
    const id = req.params.id;

    fs.readFile('./data.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        const jsonData = JSON.parse(data);
        const filteredData = jsonData.filter(item => item.id !== id);

        //checking if object with that is present or not 
        if (jsonData.length === filteredData.length) {
            res.status(404).send('Record not found');
            return;
        }

        //writing updated data into the file again
        fs.writeFile('./data.json', JSON.stringify(filteredData), err => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.send('Record deleted successfully');
        });
    });
});

module.exports = router;
