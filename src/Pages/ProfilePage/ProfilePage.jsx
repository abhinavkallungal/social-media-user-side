import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
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
import { getProfileDetails } from '../../Axios'
import { Tab, Box } from "@mui/material"
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import './ProfilePage'
import ProfilePageViewPost from '../../Components/ProfilePageComponents/ProfilePageViewPost'
import ProfilePageTagedPost from '../../Components/ProfilePageComponents/ProfilePageTagedPost'
import ProfilePageSavedPost from '../../Components/ProfilePageComponents/ProfilePageSavedPost'
import ProfilePageViewFollowers from '../../Components/ProfilePageComponents/ProfilePageViewFollowers'
import ProfilePageViewFollowings from '../../Components/ProfilePageComponents/ProfilePageViewFollowings'

function ProfilePage() {
    let { userId } = useParams();
    const [user, setUser] = useState({})
    const [posts, setPosts] = useState([])
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        console.log(userId);
        getProfileDetails(userId).then(({ user, posts }) => {
            setUser(user)
            setPosts(posts)
            console.log(user, posts);

        }).catch((error) => {
            console.log(error);
        })

    }, [userId])


    return (
        <div className="ProfilePage">
            <Appbar />
            <div className="row mt-5 me-0">
                <div className="col-lg-3 p-2 pt-5 d-md-none d-lg-block   left" >
                    <div style={{ position: 'sticky', top: '-170px' }}>

                        <ProfileCard />
                        <SideNav />
                        <SidebarBanner />
                    </div>

                </div>
                <div className="col-lg-9 mt-5 center">
                    <ProfileHeader user={user} />
                    <div className="row me-0">
                        <div className="col-lg-5 order-lg-last">
                            <ProfileIntroCard user={user} />
                            <ProfilePostListcard />
                        </div>

                        <div className="col-lg-7  order-lg-first ">
                            <TabContext value={value}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={handleChange} aria-label="lab API tabs example" variant="scrollable" scrollButtons="auto">
                                        <Tab label="Posts" value="1" />
                                        <Tab label="Taged Posts" value="2" />
                                        <Tab label="Saved Posts" value="3" />
                                        <Tab label="Followers" value="4" />
                                        <Tab label="Followings" value="5" />

                                    </TabList>
                                </Box>
                                <TabPanel value="1">
                                    <ProfilePageViewPost posts={posts} user={user} />
                                </TabPanel>
                                <TabPanel value="2">
                                    <ProfilePageTagedPost user={user} />
                                </TabPanel>
                                <TabPanel value="3">
                                    <ProfilePageSavedPost user={user} />
                                </TabPanel>
                                <TabPanel value="4">
                                    <ProfilePageViewFollowers user={user} />
                                </TabPanel>
                                <TabPanel value="4">
                                    <ProfilePageViewFollowings user={user} />
                                </TabPanel>
                            </TabContext>


                        </div>


                    </div>

                </div>




            </div>

            <BottomBar />

        </div>
    )
}

export default ProfilePage
