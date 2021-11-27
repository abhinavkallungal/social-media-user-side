import React from 'react'
import './HeroAddStory.css'
import {IconButton} from '@mui/material'
import {AddBoxRounded} from '@mui/icons-material'


function HeroAddStory() {
    return (
        <div className='HeroAddStory'>
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
