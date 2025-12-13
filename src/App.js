import React from 'react';
import LoginSignup from './LoginSignup';
import Profile from './profile';
import TodoList from './TodoList';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/profile' element={<Profile />} />
          <Route path='/login' element={<LoginSignup />} />
          <Route path='/' element={<TodoList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
