import React from 'react'
import { useSelector } from 'react-redux'
import AccountDetails from '../../Components/AccountDetails/AccountDetails'
import Appbar from '../../Components/Appbar/Appbar'
import BottomBar from '../../Components/BottomBar/BottomBar'
import RightSide from '../../Components/Hero/RightSide'
import ProfileCard from '../../Components/ProfileCard/ProfileCard'
import RequestCard from '../../Components/RequestCard/RequestCard'
import SidebarBanner from '../../Components/SidebarBanner/SidebarBanner'
import SideNav from '../../Components/SideNav/SideNav'
import './AccountDetailsPage.css'



function AccountDetailsPage() {
    const user = (useSelector((state) => state.user.user))
    const data = user
    return (
        <div className="AccountDetailsPage">
            <Appbar/>
            <div className="row">
                <div className="col-lg-3">
                    <ProfileCard/>
                    <SideNav/>
                    <SidebarBanner/>
                </div>
                <div className="col-lg-6">
                    <AccountDetails/>

                </div>
                <div className="col-lg-3">
                    <RightSide user={data}/>



                 
                </div>
            </div>


            <BottomBar/>
            
        </div>
    )
}

export default AccountDetailsPage
