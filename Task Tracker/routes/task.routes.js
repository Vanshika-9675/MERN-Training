const express = require('express');

const router = express.Router();


const {retrieveAllTasks,createTask,retrieveSingleTask,updateTask,setCompleteStatus,deleteTask} = require('../controllers/task.controllers');


router.get('/tasks',retrieveAllTasks);
router.get('/tasks/:id',retrieveSingleTask);
router.post('/tasks',createTask);
router.put('/tasks/:id',updateTask);
router.patch('/tasks/:id',setCompleteStatus);
router.delete('/tasks/:id',deleteTask);

module.exports = router;
