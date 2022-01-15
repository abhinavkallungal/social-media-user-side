import React from 'react'
import './HeroViewStory.css'
import { IconButton } from '@mui/material'
import { useHistory } from 'react-router-dom'



function HeroViewStory({ story }) {
    const history = useHistory()
    console.log(story);
    return (
        <div className='HeroViewStory' onClick={() => history.push('/viewStories')}>
            <div className="img">
                <img src={story.user.ProfilePhotos ? story.user.ProfilePhotos : "https://source.unsplash.com/user/erondu/100x180"} alt="" />
            </div>
            <div className="content">
                <span>{story?.user?.name.trim()}</span>
                <IconButton aria-label="fingerprint" style={{ color: "white" }}>
                </IconButton>
            </div>

        </div>
    )
}

export default HeroViewStory
