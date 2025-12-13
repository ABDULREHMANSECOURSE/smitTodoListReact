import React from 'react'

function Popup({ message, type }) {
    if (!message) return null;
    return (
        <div>
            <div className={`popup ${type}`}>
                <span>{message}</span>
            </div>
        </div>
    )
}

export default Popup