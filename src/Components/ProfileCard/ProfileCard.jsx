import React from 'react'
import './ProfileCard.css'
import { useSelector } from 'react-redux';



function ProfileCard() {
    const user = useSelector(state => state.user.user)
    console.log(user);
    return (
        <div className="ProfileCard" >
            <div className="img">
                <img src="https://source.unsplash.com/user/erondu/50x50" alt="" />
            </div>
            <div>
                <p> {user && user.name}</p>
                <span>@{user && user.username}</span>
            </div>

        </div>
    )
}

export default ProfileCard
