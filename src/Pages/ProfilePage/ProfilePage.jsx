import React, { useEffect, useState } from 'react'
import {useParams}from 'react-router-dom'
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
import {getProfileDetails} from '../../Axios'

function ProfilePage() {
    let { userId } = useParams();
    const[user,setUser]=useState({})
    const[posts,setPosts]=useState([])
    useEffect(() => {
        console.log(userId);
        getProfileDetails(userId).then(({user,posts})=>{
            setUser(user)
            setPosts(posts)
            console.log(user,posts);

        }).catch((error)=>{
            console.log(error);
        })
        
    }, [userId])

    
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
                    <ProfileHeader user={user} />
                    <div className="row me-0">
                    <div className="col-lg-5 order-lg-last">
                            <ProfileIntroCard user={user}/>
                            <ProfilePostListcard/>
                        </div>

                        <div className="col-lg-7 btn order-lg-first ">
                        { 
                            posts !==null ? posts.map((post)=>{return <ViewPostCard post={post} user={user} />  }) :null
                         
                        }
                       
                        </div>
                       

                    </div>

                </div>




            </div>

            <BottomBar />

        </div>
    )
}

export default ProfilePage
