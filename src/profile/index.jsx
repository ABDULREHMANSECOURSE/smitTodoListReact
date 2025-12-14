import React from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const navigate = useNavigate();
    React.useEffect(() => {
        if (!loggedInUser) {
            navigate('/login');
        }
    }, [loggedInUser]);
    return (
        <div className="profilePage">
            <div className="profileCard">
                <h1>Profile</h1>

                <p><span>Username:</span> {loggedInUser?.username}</p>
                <p><span>Email:</span> {loggedInUser?.email}</p>

                <div className="profileActions">
                    <button className="secondaryBtn">
                        <Link to="/">Back to Todo List</Link>
                    </button>

                    <button className="dangerBtn">
                        <Link
                            to="/login"
                            onClick={() => {
                                localStorage.removeItem('loggedInUser');
                                toast.info('Logged out successfully');
                            }}> Logout
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Profile