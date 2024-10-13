import TodoListItem from "../TodoListItem/TodoListItem";
import style from './TodoList.module.css';

const TodoList = ({ todoList, onEditTodo, onRemoveTodo }) => {
    return (
        <ul className={style.list}>
            {todoList.map((todo) => (
                <TodoListItem
                    key={todo._id}
                    todo={todo}
                    onEditTodo={onEditTodo}
                    onRemoveTodo={onRemoveTodo}
                    commentList={todo.comments}
                />
            ))}
        </ul>
    );
};

export default TodoList;