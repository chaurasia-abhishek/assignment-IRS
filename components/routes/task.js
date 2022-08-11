const express = require('express');
const TaskSchema = require('../models/task');
const router = express.Router();
const { body, validationResult, param } = require('express-validator');
const fetchUserId = require('../middleware/fetchuser')
const savedocument = require('../middleware/savedocument')


router.post('/createtask', [
    body('task_description', 'task description cant be empty').isLength({ min: 3 })
], fetchUserId, savedocument,async (req, res) => {
    const error = validationResult(req);
    //validating the required fields
    if (!error.isEmpty())
        return res.status(400).json({ error: error.array(), success: false, msg: "task can't be empty, please assign task" })
    try {
        let comment;
        //create comment if available
        if (req.body.comment)
            comment = {
                comment: req.body.comment,
                updatedAt: new Date,
                updatedBy: req.user.Name
            }

        //creating task
        let newTask = await TaskSchema.create({
            task_description: req.body.task_description,
            UserName: req.user.Name,
            UserId: req.user._id,
            comments: comment,
            docs: req.filename,
            global: req.body.global
        })

        res.status(200).json({ success: true, data: newTask })

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, error: error, msg: 'internal server error' });
    }
})

//view all tasks
router.get('/viewtask', fetchUserId, async (req, res) => {
    try {
        //sending task details
        let tasks;

        //if user is a team member can only access own notes
        if (req.user.Role === 'Team Member')
            tasks = await TaskSchema.find({ $or :[{ UserId: req.user._id }, { global: true }] }).sort({ createdAt: '-1' })

        //if user is an admin can access all notes
        else
            tasks = await TaskSchema.find().sort({ createdAt: '-1' })
        res.status(200).json({ success: true, data: tasks });

    } catch (error) {
        console.error(error.message)
        return res.status(500).json({ success: false, msg: 'Internal server error ', error: error.message });
    }
})

//change the status of the task & comment admin & task creator can do
router.put('/update/:id',
    [param('id', ` invalid id`).isMongoId()]
    , fetchUserId,savedocument, async (req, res) => {
        const error = validationResult(req);
        //validating the required fields
        if (!error.isEmpty())
            return res.status(400).json({ error: error.array(), success: false, msg: "invalid task Id try with valid task" })

        if (!(req.body.task_description || req.body.comment))
            return res.status(400).json({ error: error.array(), success: false, msg: "task description/comment can't be empty" })


        //finding the task in database
        const task = await TaskSchema.findById(req.params.id);

        //if task not found
        if (task === null)
            return res.status(400).json({ success: false, msg: 'invalid task Id try with valid task' })

        //only admin and task creator can comment & task creator change 
        if (!task.global && req.user.Role !== 'Admin' && String(req.user._id) !== String(task.UserId))
            return res.status(400).json({ success: false, msg: 'you dont have permission to change and comment' })

        try {
            let updatedTask;

            //creating comment
            if (req.body.comment) {
                const comment = {
                    comment: req.body.comment,
                    updatedAt: new Date,
                    updatedBy: req.user.Name
                }
                updatedTask = await TaskSchema.findByIdAndUpdate(task._id, { $push: { comments: { $each: [comment], $position: 0 } } })
            }
            else if (req.body.task_description && String(req.user._id) === String(task.UserId))
                updatedTask = await TaskSchema.findByIdAndUpdate(task._id, {
                    task_description: req.body.task_description,
                    global: req.body.global,
                    docs:req.filename
                })
            else
                return res.status(400).json({ success: false, msg: "you don't have permission to change the task description" });

            res.status(200).json({ data: updatedTask, success: true });

        } catch (error) {
            console.error(error.message)
            return res.status(500).json({ success: false, msg: 'Internal server error ', error: error.message });
        }

    }
)

//delete the task only admin user can
router.delete('/delete/:id', fetchUserId, async (req, res) => {
    const task = await TaskSchema.findById(req.params.id);
    //if task is not found
    if (task === null)
        return res.status(400).json({ success: false, msg: 'invalid task id, task not found' })

    //only admin and task creator can delete the task
    if (req.user.Role !== 'Admin' && String(req.user._id) !== String(task.UserId))
        return res.status(400).json({ success: false, msg: 'you dont have permission to delete the task' })

    try {
        //deleting the task
        await TaskSchema.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, data: task })
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({ success: false, msg: 'Internal server error ', error: error.message });
    }
})

module.exports = router;
