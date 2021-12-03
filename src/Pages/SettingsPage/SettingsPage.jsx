import React from 'react'
import Appbar from '../../Components/Appbar/Appbar'
import BottomBar from '../../Components/BottomBar/BottomBar'
import ProfileCard from '../../Components/ProfileCard/ProfileCard'
import RequestCard from '../../Components/RequestCard/RequestCard'
import Settings from '../../Components/Settings/Settings'
import SidebarBanner from '../../Components/SidebarBanner/SidebarBanner'
import SideNav from '../../Components/SideNav/SideNav'
import "./SettingsPage.css"

function SettingsPage() {
    return (
        <div className="settingsPage ">
            <Appbar/>

            <div className="row ">
                <div className="col-lg-3">
                    <ProfileCard/>
                    <SideNav/>
                    <SidebarBanner/>

                </div>
                <div className="col-lg-6">
                    <Settings/>

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

export default SettingsPage
