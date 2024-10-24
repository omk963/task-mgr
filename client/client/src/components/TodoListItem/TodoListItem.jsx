import api from "../../utils/api";
import { useState } from 'react';
import AddCommentForm from '../AddCommentForm';
import CommentsList from '../CommentsList/CommentsList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPencil, faComment, faCommentDots, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import style from './TodoListItem.module.css';

const TodoListItem = ({ todo, onEditTodo, onRemoveTodo, commentList }) => {
    // useState for Tasks
    const [isEditing, setIsEditing] = useState(false);
    const [newTask, setNewTask] = useState(todo.title);
    const [newPriority, setNewPriority] = useState(todo.priority);

    // useState for Comments
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState(commentList || []);

    const commentsCount = comments.length || 0;

    // useState for Checkbox
    const [completed, setCompleted] = useState(false);

    // functions for Tasks
    const startEdit = () => {
        setIsEditing(true);
    };

    const saveEdit = () => {
        onEditTodo(newTask, newPriority, todo._id);
        setIsEditing(false);
    };

    const handleTextChange = (e) => {
        const editedText = e.target.value;
        setNewTask(editedText);
    };

    const handlePriorityChange = (e) => {
        const editedPriority = e.target.value;
        setNewPriority(editedPriority);
    };

    // functions for Comments
    const toggleCommentInput = () => {
        setShowComments((toggle) => !toggle);
    };


    const fetchData = async () => {
        try {
            const res = await api.get(`/tasks/${todo._id}/comments`);
            console.log("fetchdata: ", res.data)
            setComments(res.data);
        } catch (error) {
            console.error('Failed to fetch tasks', error);
        }
    };

    const addComment = async (newComment) => {
        try {
            console.log("new comment: ", newComment, "todo id: ", todo._id);
            const comment = newComment.fields;
            console.log("fields: ", comment);

            const res = await api.post(`/tasks/${todo._id}/comments`, {
                text: comment.text,
                author: todo.createdBy,
                task: todo,
                _id: comment._id,
            });
            console.log("comments added", res);
            setComments((prevList) => {
                const newList = [...prevList, res.data];
                return newList;
            });
            await fetchData(); // Ensures data is updated
            console.log("Post completed: ", res.data);
        } catch (error) {
            console.error('Failed to add comment', error);
        }
    };


    const editComment = async (newText, id) => {
        try {
            console.log(newText);
            console.log("new text: ", newText);

            await api.patch(`/tasks/${todo._id}/comments/${id}`, {
                text: newText
            });
            setComments((prev) =>
                prev.map((comment) =>
                    comment._id === id ? { ...comment, text: newText } : comment
                )
            );
            await fetchData(); // Ensures data is updated
        } catch (error) {
            console.error('Failed to fetch tasks', error);
        }
    };

    const removeComment = async (id) => {
        try {
            await api.delete(`/tasks/${todo._id}/comments/${id}`);
            setComments((prevComments) => prevComments.filter(comments => comments._id !== id));
        } catch (error) {
            console.error('Failed to fetch tasks', error);
        }
    };

    // functions for Checkbox
    const handleCheckboxClick = async () => {
        setCompleted(true);
        await onRemoveTodo(todo._id)
    };

    return (
        <div>
            <div className={style.list}>
                {!completed && (
                    <>
                        <input
                            type="checkbox"
                            id="todo"
                            name="todo"
                            onChange={handleCheckboxClick}
                        />

                        <li>
                            {isEditing ? (
                                <>
                                    <input
                                        type='text'
                                        value={newTask}
                                        onChange={handleTextChange}
                                    />
                                    <select
                                        type='text'
                                        value={newPriority}
                                        onChange={handlePriorityChange}
                                        className={`
                                            ${style.input} 
                                            ${style.priority}
                                            ${newPriority === "Low" ? style.low : newPriority === "Medium" ? style.medium : style.high}
                                        `}
                                    >
                                        <option value="Low" className={style.low}>Low</option>
                                        <option value="Medium" className={style.medium}>Medium</option>
                                        <option value="High" className={style.high}>High</option>
                                    </select>
                                </>
                            ) : (
                                todo.title
                            )}
                        </li>
                        <span className={style.buttons}>
                            <p
                                className={`
                                            ${newPriority === "Low" ? style.low : newPriority === "Medium" ? style.medium : style.high}
                                            ${isEditing ? style.hidePriority : style.dispPriority}
                                            `}
                            >
                                {todo.priority}
                            </p>
                            <button onClick={toggleCommentInput} className={style.commentToggleBtn}>
                                <FontAwesomeIcon icon={commentsCount > 0 ? faCommentDots : faComment} />
                            </button>
                            {isEditing ? (
                                <button className={style.editBtn} onClick={saveEdit} >
                                    <FontAwesomeIcon icon={faFloppyDisk} />
                                </button>
                            ) : (
                                <button className={style.editBtn} onClick={startEdit}>
                                    <FontAwesomeIcon icon={faPencil} />
                                </button>
                            )}
                            <button className={style.deleteBtn} onClick={() => onRemoveTodo(todo._id)}>
                                <FontAwesomeIcon icon={faTrashCan} />
                            </button>
                        </span>
                    </>
                )}
            </div>

            {showComments && comments && commentsCount > 0 && (
                <div>
                    <p className={style.commentTitle}>Comments:</p>
                    <ul className={style.commentsList}>
                        {comments.map((comment) => (
                            <CommentsList
                                key={comment._id}
                                comment={comment}
                                onEditComment={editComment}
                                onRemoveComment={removeComment}
                            />
                        ))}
                    </ul>
                </div>
            )
            }
            {showComments && (
                <AddCommentForm onAddComment={addComment} />
            )}
        </div >
    );
};

export default TodoListItem;