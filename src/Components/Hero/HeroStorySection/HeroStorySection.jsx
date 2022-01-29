import React,{useState,useEffect} from 'react'
import './HeroStorySection.css'
import HeroAddStory from '../HeroAddStory/HeroAddStory'
import HeroViewStory from '../HeroViewStory/HeroViewStory'
import { getStoriesSideBar ,getTrendingStories ,getALLStories } from '../../../Axios'
import ViewStoryModal from '../../Stories/ViewStoryModal'



function HeroStorySection() {
    const [stories, setStories] = useState([])
    const [allStories, setAllStories] = useState([])
    const [trendingStorie, setTrendingStorie] = useState([])

    useEffect(() => {
        getStoriesSideBar().then((data)=>{
            setStories(data.stories);
        })
    }, [])

    useEffect(() => {

        getALLStories().then((data) => {
            setAllStories(data.stories)
        })

    }, [])
    
    useEffect(() => {
        getTrendingStories().then((data)=>{
            setTrendingStorie(data.trendingStories)
        })
    }, [])
    return (
        <div className="HeroStorySection">
            <div className="d-flex">

            <HeroAddStory/>
            {
                stories?.map((story)=>   <ViewStoryModal stories={allStories} story={story}/> )

          
            }
            {
                trendingStorie?.map((story)=>   <ViewStoryModal stories={allStories} story={story}/> )

          
            }
            </div>
            
        </div>
    )
}

export default HeroStorySection
