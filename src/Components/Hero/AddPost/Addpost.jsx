import React from 'react'
import './Addpost.css'
import { InputBase, Button } from "@mui/material"
import IosShareRoundedIcon from '@mui/icons-material/IosShareRounded';
import Avathar from '../../../Assets/userAvathar.jpg'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';



function Addpost({user}) {
    const [post,setPost]=useState("")
    const history =useHistory()

    const handleClick=()=>{
        history.push('/createPost')
    }
  
    
    return (
        <div className="Addpost" onClick={handleClick}>
            <div className='d-flex w-100'>

                <img src={user.ProfilePhotos ? user.ProfilePhotos.slice(-1).pop() :<Avathar/>}    alt="" />

         

                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    fullWidth
                    style={{width:'100%'}}
                    placeholder={'What’s New, ' +user?.name +"?"  }
                    inputProps={{ 'aria-label': 'What’s New, Abhinav? ' }}
                    onChange={(e)=>setPost(e.target.value)}
                />
            </div>
            <Button variant="contained" endIcon={<IosShareRoundedIcon />}>
                POST
            </Button>
        </div>
    )
}

export default Addpost
