import { useState } from 'react';
import InputWithLabel from './InputWithLabel';
import style from './TodoListItem/TodoListItem.module.css'
import PropTypes from 'prop-types';

const AddTodoForm = ({ onAddTodo }) => {
    const [todoTitle, setTodoTitle] = useState('');
    const [todoPriority, setTodoPriority] = useState("Low");

    const handleTitleChange = (e) => {
        const newTodoTitle = e.target.value;
        setTodoTitle(newTodoTitle);
    };

    const handlePriorityChange = (e) => {
        const newPriority = e.target.value;
        setTodoPriority(newPriority);
    };

    const handleAddTodo = (e) => {
        e.preventDefault();
        if (todoTitle.trim() === '') {
            alert("Please enter a valid to-do item");
            return;
        }
        console.log(todoTitle);
        onAddTodo({
            fields: {
                title: todoTitle,
                completed: false,
                priority: todoPriority
            }
        });
        setTodoTitle('');
        setTodoPriority('Low');
    };

    return (
        <form onSubmit={handleAddTodo} className={style.titleForm} >
            <InputWithLabel
                id='todoTitle'
                value={todoTitle}
                onInputChange={handleTitleChange}
                placeholder='Enter Task Here'
                className={style.input}
            >
                Title:
            </InputWithLabel>
            <label>Priority: </label>
            <select
                onChange={handlePriorityChange}
                value={todoPriority}
                className={`
                ${style.input} 
                ${style.priority}
                ${todoPriority === "Low" ? style.low : todoPriority === "Medium" ? style.medium : style.high}
                `}>
                <option value="Low" className={style.low}>Low</option>
                <option value="Medium" className={style.medium}>Medium</option>
                <option value="High" className={style.high}>High</option>
            </select>
            <button type="submit" className={style.addBtn}>Add</button>
        </form>
    );
};

AddTodoForm.propTypes = {
    onAddTodo: PropTypes.func.isRequired
}

export default AddTodoForm;