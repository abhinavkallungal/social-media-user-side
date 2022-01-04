import React from 'react'
import "./ProfilePostListcard.css"

function ProfilePostListcard(user) {
    return (
        <div className="ProfilePostListcard mt-3">
            <div className="card p-3 shadow">

                <div className="header fw-bold mb-3">
                    POSTS
                </div>

                <div className="row mx-autp">
                    {
                        user?.ProfilePhotos ? user?.ProfilePhotos.map((item,index)=> (index <6) &&<div className="img"><img src={item} alt="" /></div>) :null
                    }
   
                   
                </div>

            </div>
        </div>
    )
}

export default ProfilePostListcard
