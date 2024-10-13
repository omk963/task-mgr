import { useState } from 'react';
import InputWithLabel from './InputWithLabel';
import style from './TodoListItem/TodoListItem.module.css'
import PropTypes from 'prop-types';

const AddCommentForm = ({ onAddComment }) => {
    const [newComment, setNewComment] = useState('');

    const handleCommentChange = (e) => {
        const comment = e.target.value;
        setNewComment(comment);
    };

    const handleAddComment = (e) => {
        e.preventDefault();
        if (newComment.trim() === '') {
            alert("Please enter a valid comment");
            return;
        }
        console.log(newComment);
        onAddComment({
            fields: {
                text: newComment,
            }
        });
        setNewComment('');
    };

    return (
        <form onSubmit={handleAddComment} className={style.commentBox} >
            <InputWithLabel
                id='newComment'
                value={newComment}
                onInputChange={handleCommentChange}
                placeholder="Enter Comment Here"
            />
            <button type="submit" className={style.addBtn}>Add</button>
        </form>
    );
};

AddCommentForm.propTypes = {
    onAddComment: PropTypes.func.isRequired
}

export default AddCommentForm;