import React,{useState,useEffect} from 'react'
import './HeroStorySection.css'
import HeroAddStory from '../HeroAddStory/HeroAddStory'
import HeroViewStory from '../HeroViewStory/HeroViewStory'
import { getStoriesSideBar } from '../../../Axios'
import ViewStoryModal from '../../Stories/ViewStoryModal'



function HeroStorySection() {
    const [stories, setStories] = useState([])
    useEffect(() => {
        getStoriesSideBar().then((data)=>{
            setStories(data.stories);
        })
    }, [])
    return (
        <div className="HeroStorySection">
            <div className="d-flex">

            <HeroAddStory/>
            {
                stories?.map((story)=>  <HeroViewStory story={story}/>)
            }

            <ViewStoryModal/>
      
            </div>
            
        </div>
    )
}

export default HeroStorySection
