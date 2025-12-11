import {useRef} from 'react'

const TodoList = () => {
    // const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
        window.location.href = '/login';
    }
    const inputRef = useRef(null);
    function createTodos(text, completed = false) {
        const todo = document.createElement('div');
        todo.className = 'todoItem';
        const completeBtn = document.createElement('button');
        completeBtn.checked = completed;
        completeBtn.innerText = completed ? 'Completed' : 'Complete';
        const span = document.createElement('span');
        span.innerText = text;
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete';
        deleteBtn.onclick = () => {
            todo.remove();
        };
        completeBtn.onclick = () => {
            completeBtn.checked = !completeBtn.checked;
            completeBtn.checked ? span.style.textDecoration = 'line-through' : span.style.textDecoration = 'none';
            completeBtn.innerText = completeBtn.checked ? 'Completed' : 'Complete';
        }
        todo.appendChild(completeBtn);
        todo.appendChild(span);
        todo.appendChild(deleteBtn);
        document.querySelector('.todoList').appendChild(todo);
    }
  return (
    <div>
        <span className='addTodo'>
            <input type="text" placeholder='Add a new task' ref={inputRef}/>
            <button onClick={() => createTodos(inputRef.current.value)}>Add</button>
        </span>
        <span className='todoList'></span>
    </div>
  )
}

export default TodoList