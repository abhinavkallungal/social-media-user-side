import { Grid } from '@mui/material'
import React from 'react'
import ProfileCard from '../../Components/ProfileCard/ProfileCard'
import SidebarBanner from '../../Components/SidebarBanner/SidebarBanner'
import SideNav from '../../Components/SideNav/SideNav'
import RightSide from '../../Components/Hero/RightSide'
import AddSocialAccount from '../../Components/AddSocialAccount/AddSocialAccount'
import './AddSocialAccountsPage.css'
import Appbar from '../../Components/Appbar/Appbar'
import BottomBar from '../../Components/BottomBar/BottomBar'
import { useSelector } from 'react-redux'





function AddSocialAccountsPage() {
    const data = useSelector(state => state.user.user)
    const user= data
    return (
        <div className='AddSocialAccountsPage'>       
        <Appbar/>    
            <Grid container style={{marginTop:'70px'}}>

                <Grid item xs={12} md={2.5} sx={{ display: { xs: 'none', md: 'none', lg: 'block' } }} className='left' >
                    <div style={{ position: 'sticky', top: '-150px' }}>

                        <ProfileCard />
                        <SideNav />
                        <SidebarBanner />
                    </div>
                </Grid>
                <Grid item xs={12} md={6.5} className="mx-auto" style={{paddingTop:'20px'}}>
                  <AddSocialAccount user={user}/>


                </Grid>
                <Grid item xs={12} md={3} sx={{ display: { xs: 'none', md: 'none', lg: 'block' } }} className='right' >
                    <div style={{ position: 'sticky', bottom: '100vh' }}>
                    <RightSide user={user}/>

                    </div>

                </Grid>



            </Grid>
        <BottomBar/>
        </div>
    )
}

export default AddSocialAccountsPage
