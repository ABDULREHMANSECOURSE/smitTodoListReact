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
    </div>
  )
}

export default Profile