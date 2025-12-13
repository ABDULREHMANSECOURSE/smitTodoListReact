import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const TodoList = () => {
    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    useEffect(() => {
        if (!loggedInUser) {
            window.location.href = '/login';
        }
    }, []);


    const [todos, setTodos] = useState([]);
    useEffect(() => {
        setTodos(loggedInUser.tasks);
    }, []);

    const inputRef = useRef(null);

    function addTodo(text, completed = false) {
        if (text.trim() === '') {
            toast.error('Task cannot be empty');
            return;
        }
        setTodos(prev => [...prev, { text, completed, id: Date.now() }]);
    }
    useEffect(() => {
        const userIndex = accounts.findIndex(acc => acc.id === loggedInUser.id);
        if (userIndex !== -1) {
            accounts[userIndex].tasks = todos;
            localStorage.setItem('accounts', JSON.stringify(accounts));
            localStorage.setItem('loggedInUser', JSON.stringify(accounts[userIndex]));
        }
    }, [todos]);

    return (
        <div className="todoPage">
            <span className='addTodo'>
                <input
                    type="text"
                    placeholder='Add a new task'
                    ref={inputRef}
                    className="todoInput"
                />

                <button className="primaryBtn" onClick={() => addTodo(inputRef.current.value)}>
                    Add
                </button>

                <button className="secondaryBtn">
                    <Link to="/profile">Profile</Link>
                </button>

                <button className="dangerBtn">
                    <Link
                        to="/login"
                        onClick={() => {
                            localStorage.removeItem('loggedInUser');
                            toast.info('Logged out successfully');
                        }}
                    >
                        Logout
                    </Link>
                </button>

                <h1 className="taskCount">{todos.length} Tasks</h1>
            </span>

            <span className='todoList'>
                {todos.map(todo => (
                    <div className={`todoItem ${todo.completed ? 'done' : ''}`} key={todo.id}>
                        <h3>{todo.text}</h3>

                        <div className="todoActions">
                            <button
                                className="successBtn"
                                onClick={() =>
                                    setTodos(todos.map(t =>
                                        t.id === todo.id ? { ...t, completed: !t.completed } : t
                                    ))
                                }
                            >
                                {todo.completed ? 'Completed' : 'Complete'}
                            </button>

                            <button
                                className="dangerBtn"
                                onClick={() => setTodos(todos.filter(t => t.id !== todo.id))}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </span>
        </div>

    )
}

export default TodoList