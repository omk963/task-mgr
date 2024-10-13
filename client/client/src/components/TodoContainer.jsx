import api from "../utils/api";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import TodoList from "./TodoList/TodoList";
import AddTodoForm from "./AddTodoForm";

const TodoContainer = () => {
    const navigate = useNavigate();
    const [todoList, setTodoList] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await api.get('/tasks');
            setTodoList(res.data.tasks);
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
                _id: task._id
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

    const editTodo = async (newTask, id) => {
        try {
            await api.patch(`/tasks/${id}`, {
                title: newTask
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
        } catch (error) {
            console.error('Failed to fetch tasks', error);
        }
    };


    return (
        <div>
            <AddTodoForm onAddTodo={addTodo} />
            <TodoList todoList={todoList} onEditTodo={editTodo} onRemoveTodo={removeTodo} />
        </div>
    );
};

export default TodoContainer;