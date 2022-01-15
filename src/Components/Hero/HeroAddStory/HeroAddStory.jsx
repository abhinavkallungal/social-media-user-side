import React from 'react'
import './HeroAddStory.css'
import {IconButton} from '@mui/material'
import {AddBoxRounded} from '@mui/icons-material'
import { useHistory } from 'react-router-dom'



function HeroAddStory() {
    let history =useHistory()
    return (
        <div className='HeroAddStory' onClick={()=>history.push('/createStories')}>
            <div className="img">
                <img src="https://source.unsplash.com/user/erondu/100x180" alt="" />
            </div>
            <div className="content">
                <span>Add Story</span>
                <IconButton aria-label="fingerprint" style={{color:"white"}}>
        <AddBoxRounded style={{ color: "white", border: '2px solid white',borderRadius:'5px' }} />
      </IconButton>
            </div>
        </div>
    )
}

export default HeroAddStory
