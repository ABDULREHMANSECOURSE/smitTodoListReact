import React from 'react'

const Profile = () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
        window.location.href = '/login';
    }
  return (
    <div>
        <h1>Profile</h1>
        <p>Username: {loggedInUser?.username}</p>
        <p>Email: {loggedInUser?.email}</p>
        <button onClick={() => {
            window.location.href = '/';
        }}>Back to Todo List</button>
        <button onClick={() => {
            localStorage.removeItem('loggedInUser');
            window.location.href = '/login';
        }}>Logout</button>
    </div>
  )
}

export default Profile