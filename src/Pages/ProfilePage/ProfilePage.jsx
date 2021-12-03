import React from 'react'
import Appbar from '../../Components/Appbar/Appbar'
import BottomBar from '../../Components/BottomBar/BottomBar'
import ProfileCard from '../../Components/ProfileCard/ProfileCard'
import ProfileHeader from '../../Components/ProfileHeader/ProfileHeader'
import ProfileIntroCard from '../../Components/ProfileIntroCard/ProfileIntroCard'
import ProfilePostListcard from '../../Components/ProfilePostListcard/ProfilePostListcard'
import RequestCard from '../../Components/RequestCard/RequestCard'
import SidebarBanner from '../../Components/SidebarBanner/SidebarBanner'
import SideNav from '../../Components/SideNav/SideNav'
import ViewPostCard from '../../Components/ViewPostCard/ViewPostCard'

function ProfilePage() {
    return (
        <div>
            <Appbar />
            <div className="row mt-5 me-0">
                <div className="col-lg-3 p-2 pt-5   left">
                    <ProfileCard />
                    <SideNav />
                    <SidebarBanner />

                </div>
                <div className="col-lg-9 mt-5 center">
                    <ProfileHeader />
                    <div className="row me-0">

                        <div className="col-lg-7">
                            <ViewPostCard post={{ name: "dfsdd", disc: "dfadfa" }} />
                            <ViewPostCard post={{ name: "dfsdd", disc: "dfadfa" }} />
                            <ViewPostCard post={{ name: "dfsdd", disc: "dfadfa" }} />
                            <ViewPostCard post={{ name: "dfsdd", disc: "dfadfa" }} />
                            <ViewPostCard post={{ name: "dfsdd", disc: "dfadfa" }} />
                        </div>
                        <div className="col-lg-5">
                            <ProfileIntroCard/>
                            <ProfilePostListcard/>
                        </div>

                    </div>

                </div>




            </div>

            <BottomBar />

        </div>
    )
}

export default ProfilePage
