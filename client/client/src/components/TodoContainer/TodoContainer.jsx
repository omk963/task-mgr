import api from "../../utils/api";
import { useState, useEffect } from "react";
import TodoList from "../TodoList/TodoList";
import AddTodoForm from "../AddTodoForm";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import style from './TodoContainer.module.css';

const TodoContainer = () => {
    const [todoList, setTodoList] = useState([]);
    const [originalTodo, setOriginalTodo] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAscending, setIsAscending] = useState(false);
    const [clickedSort, setClickedSort] = useState(false);
    const [sortBy, setSortBy] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await api.get('/tasks');
            setTodoList(res.data.tasks);
            setIsLoading(false);
            setOriginalTodo(res.data.tasks)
            console.log("fetch completed: ", res.data.tasks);
        } catch (error) {
            console.error('Failed to fetch tasks', error);
        }
    };

    const addTodo = async (newTask) => {
        try {
            const task = newTask.fields;
            const res = await api.post('/tasks', {
                title: task.title,
                priority: task.priority,
                _id: task._id,
            });
            setTodoList((prevList) => {
                const newList = [...prevList, res.data];
                return newList;
            });
            await fetchData(); // Ensures data is updated
            console.log("Post completed: ", res.data);
        } catch (error) {
            console.error('Failed to add tasks', error);
        }
    };

    const editTodo = async (newTask, newPriority, id) => {
        try {
            await api.patch(`/tasks/${id}`, {
                title: newTask,
                priority: newPriority
            });
            setTodoList((prev) => {
                return prev.map((task) =>
                    todo._id === id ? { ...task, title: newTask } : task
                )
            });
            await fetchData(); // Ensures data is updated
        } catch (error) {
            console.error('Failed to fetch tasks', error);
        }
    };

    const removeTodo = async (id) => {
        try {
            await api.delete(`/tasks/${id}`);
            setTodoList((prevTodoList) => prevTodoList.filter(todo => todo._id !== id));
            setOriginalTodo((prevTodoList) => prevTodoList.filter(todo => todo._id !== id));
        } catch (error) {
            console.error('Failed to fetch tasks', error);
        }
    };

    const handleSortChange = (e) => {
        const newSort = e.target.value;
        setSortBy(newSort);
    }

    const sortList = () => {
        let sortedTodos;
        setIsAscending(prev => !prev);

        if (sortBy === 'priority') {
            const priorityOrder = {
                Low: 1,
                Medium: 2,
                High: 3
            }

            sortedTodos = [...todoList].sort((a, b) => {
                return isAscending
                    ? priorityOrder[b.priority] - priorityOrder[a.priority]
                    : priorityOrder[a.priority] - priorityOrder[b.priority];
            });
        } else if (sortBy === 'date') {
            if (isAscending) {
                sortedTodos = [...todoList].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
                setIsAscending(false);
            } else {
                sortedTodos = [...todoList].sort((a, b) => a.createdAt.localeCompare(b.createdAt));
                setIsAscending(true);
            }
        } else {
            if (isAscending) {
                sortedTodos = [...todoList].sort((a, b) => b.title.localeCompare(a.title));
                setIsAscending(false);
            } else {
                sortedTodos = [...todoList].sort((a, b) => a.title.localeCompare(b.title));
                setIsAscending(true);
            }
        }
        setTodoList(sortedTodos);

        // check if it's first click
        if (!clickedSort) {
            setClickedSort(true);
        }
    };

    const reset = () => {
        setTodoList(originalTodo);
        setClickedSort(false);
        setSortBy('');
    };

    return (
        <div>
            <div className={style.input}>
                <AddTodoForm onAddTodo={addTodo} />
                <div className={style.sort}>
                    <select
                        type='text'
                        value={sortBy}
                        onChange={handleSortChange}
                        className={style.select}
                    >
                        <option value="" disabled>Sort By:</option>
                        <option value="name">Name</option>
                        <option value="priority">Priority</option>
                        <option value="date">Date</option>
                    </select>
                    <button onClick={sortList} className={style.sortBtn} disabled={sortBy === ''}>
                        <span>Sort</span>
                        {clickedSort && (
                            <span className={style.icon}>
                                {isAscending ? <FontAwesomeIcon icon={faArrowUp} /> : <FontAwesomeIcon icon={faArrowDown} />}
                            </span>
                        )}
                    </button>
                    <button onClick={reset} disabled={clickedSort === false && sortBy === ''}>
                        Reset
                    </button>
                </div>
            </div>
            {todoList.length > 0 && (
                isLoading
                    ? <p>Loading...</p>
                    : <TodoList todoList={todoList} onEditTodo={editTodo} onRemoveTodo={removeTodo} />
            )}
        </div>
    );
};

export default TodoContainer;