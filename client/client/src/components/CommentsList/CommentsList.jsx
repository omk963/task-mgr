import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPencil, faAnglesRight, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import style from './CommentsList.module.css'

const CommentsList = ({ comment, onEditComment, onRemoveComment }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(comment.text);

    const startEdit = () => {
        setIsEditing(true);
    };

    const saveEdit = () => {
        onEditComment(newText, comment._id);
        setIsEditing(false);
    };

    const handleTextChange = (e) => {
        const editedText = e.target.value;
        setNewText(editedText);
    };

    return (
        <p className={style.list}>
            <FontAwesomeIcon icon={faAnglesRight} style={{ marginRight: "1em" }} />
            {isEditing ? (
                <input
                    type='text'
                    value={newText}
                    onChange={handleTextChange}
                />
            ) : (comment.text)}
            <span className={style.buttons}>
                {isEditing ? (
                    <button className={style.editBtn} onClick={saveEdit} >
                        <FontAwesomeIcon icon={faFloppyDisk} />
                    </button>
                ) : (
                    <button className={style.editBtn} onClick={startEdit}>
                        <FontAwesomeIcon icon={faPencil} />
                    </button>
                )}
                <button className={style.deleteBtn} onClick={() => onRemoveComment(comment._id)}>
                    <FontAwesomeIcon icon={faTrashCan} />
                </button>
            </span>
        </p >
    );
};

export default CommentsList;