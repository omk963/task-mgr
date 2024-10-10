const express = require('express');
const router = express.Router();

const { getAllTasks, getTask, createTask, updateTask, deleteTask } = require('../controllers/tasks')
const { getComments, getComment, createComment, updateComment, deleteComment } = require('../controllers/comments')

// view all tasks added by user
router.route('/')
    .get(getAllTasks)
    .post(createTask)

// view specific task
router.route('/:id')
    .get(getTask)
    .patch(updateTask)
    .delete(deleteTask)

// view comments for specific task
router.route('/:id/comments')
    .get(getComments)
    .post(createComment)

// view specific comment for specific task
router.route('/:id/comments/:commentId')
    .get(getComment)
    .patch(updateComment)
    .delete(deleteComment)

module.exports = router;