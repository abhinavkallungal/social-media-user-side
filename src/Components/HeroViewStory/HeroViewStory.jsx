import React from 'react'
import './HeroViewStory.css'
import {IconButton} from '@mui/material'


function HeroViewStory() {
    return (
        <div className='HeroViewStory'>
            <div className="img">
                <img src="https://source.unsplash.com/user/erondu/100x180" alt="" />
            </div>
            <div className="content">
                <span>Add Story</span>
                <IconButton aria-label="fingerprint" style={{color:"white"}}>
      </IconButton>
            </div>
            
        </div>
    )
}

export default HeroViewStory
