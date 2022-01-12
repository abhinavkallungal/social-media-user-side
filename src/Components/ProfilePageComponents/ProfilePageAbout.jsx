import { AccountCircle, Email, Facebook, Instagram, LinkedIn, Phone, Twitter } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material'
import React from 'react'

function ProfilePageAbout({ user }) {
    console.log(user);
    return (
        <div className="ProfilePageAbout ">
            <div className="card shadow p-5">


                <Typography variant='h5'>ABOUT <span className="heading">{user.name}</span> </Typography>

            </div>
            <div className="card shadow p-5">

                <div className="Profile">
                    <div className="img">
                        <img src={user.ProfilePhotos ? user.ProfilePhotos.pop() : null} alt="" className="ProfilePhoto" />
                    </div>
                    <div>

                        {
                            user.name ? <Typography margin='10px'>  <AccountCircle />   {user.name} </Typography> : null
                        }
                        {
                            user.username ? <Typography margin='10px'>   <AccountCircle />  @{user.username} </Typography> : null
                        }
                        {
                            user.email ? <Typography margin='10px'> <Email />   {user.email} </Typography> : null
                        }
                        {
                            user.phone ? <Typography margin='10px'> <Phone />  {user.phone} </Typography> : null
                        }
                    </div>
                </div>







            </div>
            <div className="card shadow p-5">
                <div className="d-flex justify-content-between">
                    {
                        user.Facebook ? <a href={ user.Facebook}><Facebook style={{ color: '#4065AD' }}  /> </a> : null
                    }
                    {
                        user.Twitter ? <a href={ user.Twitter}><Twitter style={{ color: "#00acee" }}/> </a> : null
                    }

                    {
                        user.LinkedIn ? <a href={user.LinkedIn}><LinkedIn style={{ color: "#0e76a8" }}/> </a> : null
                    }

                    {
                        user.Instagram ? <a href={user.Instagram }><Instagram  style={{ color: "#E1416A", size: '40px' }}/> </a> : null
                    }


                </div>

            </div>


        </div>
    )
}

export default ProfilePageAbout
