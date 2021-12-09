import React from 'react'
import Appbar from '../../Components/Appbar/Appbar'
import BottomBar from '../../Components/BottomBar/BottomBar'
import ProfileCard from '../../Components/ProfileCard/ProfileCard'
import RequestCard from '../../Components/RequestCard/RequestCard'
import Search from '../../Components/Search/Search'
import SidebarBanner from '../../Components/SidebarBanner/SidebarBanner'
import SideNav from '../../Components/SideNav/SideNav'
import'./SearchPage.css'

function SearchPage() {
    return (
        <div className="Searchpage">
        <Appbar/>
        <div className="row">
            <div className="col-lg-3">
                <ProfileCard/>
                <SideNav/>
                <SidebarBanner/>
            </div>
            <div className="col-lg-6">
                <Search/>

            </div>
            <div className="col-lg-3">

                <RequestCard/>
                <RequestCard/>
                <RequestCard/>
            </div>
        </div>


        <BottomBar/>
        
    </div>
    )
}

export default SearchPage
