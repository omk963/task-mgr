const Task = require('../models/Tasks');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const getComments = async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.status(StatusCodes.OK).json(task.comments);
};

const getComment = async (req, res) => {
    const {
        params: {
            id: taskId,
            commentId: commentId
        }
    } = req;

    const task = await Task.findById(taskId);
    const comment = task.comments.id(commentId);

    if (!comment) {
        throw new NotFoundError(`No comment with id ${commentId}`);
    };
    res.status(StatusCodes.OK).json({ comment });
};

const createComment = async (req, res) => {
    req.body.author = req.user.userId;
    const comment = req.body;

    const task = await Task.findById(req.params.id);

    task.comments.push(comment)

    await task.save();
    res.status(StatusCodes.CREATED).json({ comment });
};

const updateComment = async (req, res) => {
    const {
        body: { text },
        params: {
            id: taskId,
            commentId: commentId
        }
    } = req;

    const task = await Task.findById(taskId);
    const comment = task.comments.id(commentId);


    if (text === '') {
        throw new BadRequestError('Text field cannot be empty');
    };

    comment.text = text;

    await task.save();

    if (!comment) {
        throw new NotFoundError(`No comment with id ${commentId}`);
    };
    res.status(StatusCodes.OK).json({ comment });
};

const deleteComment = async (req, res) => {
    const {
        params: {
            id: taskId,
            commentId: commentId
        }
    } = req;

    const task = await Task.findById(taskId);
    const comment = task.comments.id(commentId);

    if (!comment) {
        throw new NotFoundError(`No task with id ${commentId}`);
    };

    await comment.deleteOne();
    await task.save();

    res.status(StatusCodes.OK).json({ comment });
};

module.exports = {
    getComments,
    getComment,
    createComment,
    updateComment,
    deleteComment
};