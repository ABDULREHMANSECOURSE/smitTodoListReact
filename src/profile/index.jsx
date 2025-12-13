import React from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

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
            <button><Link to="/">Back to Todo List</Link></button>
            <button><Link to="/login" onClick={() => {
                localStorage.removeItem('loggedInUser');
                toast.info('Logged out successfully');
            }}>Logout</Link></button>
        </div>
    )
}

export default Profile