import { Camera } from '@mui/icons-material'
import { IconButton, Button } from '@mui/material'
import React from 'react'
import './ProfileHeader.css'
function ProfileHeader() {
    return (
        <div className="main">

            <div className="main-container">
                <div className="profile">
                    <div className="profile-avatar">
                        <img src="https://images.genius.com/2326b69829d58232a2521f09333da1b3.1000x1000x1.jpg" alt="" className="profile-img" />
                        <div className ="profile-name">Quan Ha</div>
                    </div>
                    <img src="https://images.unsplash.com/photo-1508247967583-7d982ea01526?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80" alt="" className="profile-cover" />
                    <div className ="profile-menu">
                        <div className="m-3">

                        <Button variant="contained" className="me-3"> Follow</Button>
                        <Button variant="outlined"> Message</Button>

                        </div>
                    <a className ="profile-menu-link "></a>
                   
                    </div>
                </div>
            </div>
            </div>
            )

}
            export default ProfileHeader
