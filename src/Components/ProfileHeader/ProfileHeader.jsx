import React ,{useState}from 'react'
import { Camera, PhotoCamera } from '@mui/icons-material'
import { IconButton, Button } from '@mui/material'
import AddProfilePhoto  from '../AddProfilePhoto/AddProfilePhoto'
import userAvatar from '../../Assets/userAvathar.jpg'


import './ProfileHeader.css'


import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom'
import { dofollow } from '../../Axios';

function ProfileHeader({ user }) {
    const [follow, setFollow] = useState(false)
    const currentuser = (useSelector((state) => state.user.user))
    let data = currentuser
    let ProfilePhotos=user?.ProfilePhotos;


    const handlefollow = (userId, currentuserId) => {
        dofollow({ userId, currentuserId }).then((data) => {
            console.log(data);
            setFollow(data.follow)
        }).catch((err) => {
            console.log(err);

        })
    }
    return (
        <div className="main">

            <div className="main-container">
                <div className="profile">
                    <div className="profile-avatar">
                        <div>
                            {
                                data._id === user._id ? <IconButton className="profile-ChangeIcon" style={{ backgroundColor: "#ffffff50" }}> <AddProfilePhoto />  </IconButton> : null
                            }
                            <img src={ProfilePhotos ? ProfilePhotos[ProfilePhotos.length -1] :userAvatar} alt="" className="profile-img" />
                        </div>

                        <div className="profile-name">{user.name}</div>
                    </div>
                    <div>
                        {
                            data._id === user._id ? <IconButton className="cover-ChangeIcon" style={{ backgroundColor: "#ffffff50" }}>  <PhotoCamera />  </IconButton> : null
                        }

                    </div>
                    <img src="https://images.unsplash.com/photo-1508247967583-7d982ea01526?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80" alt="" className="profile-cover" />
                    <div className="profile-menu">
                        <div className=" m-3 ms-auto ">
                            {
                                data._id === user._id ? <Button variant="outlined"> Edit Profile</Button> : (<div>

                                    <Button variant="contained" className="me-3" onClick={() => handlefollow(user._id, data._id)}> 
                                    {
                                        follow ? 'Unfollow' :'Follow'
                                    }
                                    </Button>
                                    <Button variant="outlined"> Message</Button>
                                </div>

                                )
                            }





                        </div>


                    </div>
                </div>
            </div>
        </div>
    )

}
export default ProfileHeader
