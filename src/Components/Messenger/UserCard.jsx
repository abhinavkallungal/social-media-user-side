import React from 'react'
import profilePhoto from '../../Assets/userAvathar.jpg'

function UserCard({user,setSelectedChat}) {

    return (
        <div className="UserCard" onClick={()=>setSelectedChat(user._id)}>
            <div className="Profile">
                <div className="img">
                    <img src={user.profilePhotos ? user.profilePhotos : profilePhoto} alt="" />
                </div>
                <div>
                    <span className='fw-bold'>{user.name}   </span>
                </div>
            </div>
            <div className="badge">
                <span></span>
            </div>
            
        </div>
    )
}

export default UserCard
