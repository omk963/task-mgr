import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPencil } from '@fortawesome/free-solid-svg-icons';
import style from './TodoListItem.module.css';


const TodoListItem = ({ todo, onEditTodo, onRemoveTodo }) => {
    return (
        <div className={style.list}>
            <input type="checkbox" id="todo" name="todo" />
            <li>
                {todo.title}
            </li>
            <span className={style.buttons}>
                <button className={style.editBtn} onClick={() => onEditTodo(todo.id)}>
                    <FontAwesomeIcon icon={faPencil} />
                </button>
                <button className={style.deleteBtn} onClick={() => onRemoveTodo(todo._id)}>
                    <FontAwesomeIcon icon={faTrashCan} />
                </button>
            </span>
        </div>
    );
};

export default TodoListItem;