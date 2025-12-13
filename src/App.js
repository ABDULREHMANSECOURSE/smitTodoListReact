import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Popup from "./components/Popup";
import LoginSignup from "./LoginSignup";
import Profile from "./profile";
import TodoList from "./TodoList";

function App() {
  return (
    <Popup>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </Popup>
  );
}

export default App;
