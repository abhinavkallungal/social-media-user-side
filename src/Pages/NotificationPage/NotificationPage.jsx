import React from 'react'
import AccountDetails from '../../Components/AccountDetails/AccountDetails'
import Appbar from '../../Components/Appbar/Appbar'
import BottomBar from '../../Components/BottomBar/BottomBar'
import ProfileCard from '../../Components/ProfileCard/ProfileCard'
import RequestCard from '../../Components/RequestCard/RequestCard'
import SidebarBanner from '../../Components/SidebarBanner/SidebarBanner'
import SideNav from '../../Components/SideNav/SideNav'
import {Grid} from '@mui/material'

import './NotificationPage.css'
import Notification from '../../Components/Notification/Notification'

function NotificationPage() {
    return (
        <div>

<div className="NotificationPage">
            <Appbar/>
            <Grid container>

            <Grid item xs={12} md={2.5} sx={{ display: { xs: 'none', md: 'none', lg: 'block' } }}  className='left' >
                    <div style={{position:'sticky',top:'-150px'}}>

                    <ProfileCard />
                    <SideNav/>
                    <SidebarBanner/>
                    </div>
                </Grid>
                <Grid item xs={12} md={6.5}  className="mx-auto">
                    <Notification/>
                    </Grid>

                <Grid item xs={12} md={3} sx={{ display: { xs: 'none', md: 'none', lg: 'block' } }} className='right' >
                <div style={{position:'sticky',top:'100px'}}>                
                    <RequestCard/>
                    <RequestCard/>
                </div>
                    
                </Grid>
                </Grid>


            <BottomBar/>
            
        </div>
            
        </div>
    )
}

export default NotificationPage
