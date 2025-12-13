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
        <div>
            <span className='addTodo'>
                <input type="text" placeholder='Add a new task' ref={inputRef} />
                <button onClick={() => addTodo(inputRef.current.value)}>Add</button>
                <button><Link to="/profile">Profile</Link></button>
                <button><Link to="/login" onClick={() => {
                    localStorage.removeItem('loggedInUser');
                    toast.info('Logged out successfully');
                }}>Logout</Link></button>
                <h1>{todos.length} Tasks</h1>
            </span>
            <span className='todoList'>
                {todos.map(todo => (
                    <div className="todoItem" key={todo.id}>
                        <h3 style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</h3>
                        <button onClick={(e) => {
                            setTodos(todos.map(t =>
                                t.id === todo.id ? { ...t, completed: !t.completed } : t
                            ));
                        }}>{todo.completed ? 'Completed' : 'Complete'}</button>
                        <button onClick={(e) => {
                            setTodos(todos.filter(t => t.id !== todo.id));
                        }
                        }>Delete</button>
                    </div>
                ))}
            </span>
        </div>
    )
}

export default TodoList