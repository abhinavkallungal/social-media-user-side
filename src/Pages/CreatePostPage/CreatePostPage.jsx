import React from 'react'
import Appbar from '../../Components/Appbar/Appbar'
import BottomBar from '../../Components/BottomBar/BottomBar'
import CreatePost from '../../Components/CreatePost/CreatePost'
import ProfileCard from '../../Components/ProfileCard/ProfileCard'
import RequestCard from '../../Components/RequestCard/RequestCard'
import SidebarBanner from '../../Components/SidebarBanner/SidebarBanner'
import SideNav from '../../Components/SideNav/SideNav'

function CreatePostPage() {
    return (
        <div className="CreatePostPage">
        <Appbar/>
        <div className="row mt-5">
            <div className="col-lg-3 mt-5">
                <ProfileCard/>
                <SideNav/>
                <SidebarBanner/>
            </div>
            <div className="col-lg-6 mt-5">
                <CreatePost/>

            </div>
            <div className="col-lg-3 mt-5">

                <RequestCard/>
                <RequestCard/>
                <RequestCard/>
            </div>
        </div>


        <BottomBar/>
        
    </div>
    )
    
}

export default CreatePostPage
