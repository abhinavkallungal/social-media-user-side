import React from 'react'
import './HeroStorySection.css'
import HeroAddStory from '../HeroAddStory/HeroAddStory'
import HeroViewStory from '../HeroViewStory/HeroViewStory'

function HeroStorySection() {
    return (
        <div className="HeroStorySection">
            <div className="d-flex">

            <HeroAddStory/>
            <HeroViewStory/>
            <HeroViewStory/>
            <HeroViewStory/>
            <HeroViewStory/>
            <HeroViewStory/>
            <HeroViewStory/>
            <HeroViewStory/>
            
            </div>
            
        </div>
    )
}

export default HeroStorySection
