import React from 'react'
import Appbar from '../../Components/Appbar/Appbar'
import BottomBar from '../../Components/BottomBar/BottomBar'
import ProfileCard from '../../Components/ProfileCard/ProfileCard'
import RequestCard from '../../Components/RequestCard/RequestCard'
import Settings from '../../Components/Settings/Settings'
import SidebarBanner from '../../Components/SidebarBanner/SidebarBanner'
import SideNav from '../../Components/SideNav/SideNav'
import "./ResetPasswordPage.css"

import { Grid } from '@mui/material'
import { makeStyles } from '@mui/styles';
import ResetPassword from '../../Components/ResetPassword/ResetPassword'

const useStyles = makeStyles({
    left: {
        padding: '20px',


    },
    right: {
        padding: '20px'

    },
    navItem: {
        maxWidth: '42px',
        maxHeight: '42px',
        minWidth: '42px',
        minHeight: '42px',
        borderRadius: 10,
        backgroundColor: "#f1f1f1",
        padding: 0,
    },
    root: {
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
        color: '#ffffff',
        height: 42,
        padding: '0 30px',
    },
});

function ResetPasswordPage() {
    const classes = useStyles()

    return (
        <div className="ResetPasswordPage ">
            <Appbar />



            <Grid container>

                <Grid item xs={12} md={2.5} sx={{ display: { xs: 'none', md: 'none', lg: 'block' } }} className={classes.left} >
                    <div style={{ position: 'sticky', top: '-150px' }}>

                        <ProfileCard />
                        <SideNav />
                        <SidebarBanner />
                    </div>
                </Grid>
                <Grid item xs={12} md={6.5} className="mx-auto">
                    <ResetPassword/>


                </Grid>
                <Grid item xs={12} md={3} sx={{ display: { xs: 'none', md: 'none', lg: 'block' } }} className={classes.right} >
                    <div style={{ position: 'sticky', top: '100px' }}>
                        <RequestCard />
                        <RequestCard />
                    </div>

                </Grid>



            </Grid>

            <BottomBar />

        </div>
    )
}

export default ResetPasswordPage
