import React from 'react'
import './SideNav.css'
import { Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import {Logout} from '@mui/icons-material/';
import SettingsIcon from '@mui/icons-material/Settings';
import { useSelector } from 'react-redux'
import { Link  } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { logoutAction } from "../../Redux/userSlice"
import { useHistory } from 'react-router';

const useStyle = makeStyles({
    Button: {
        width: '100%',
        textAlign: 'left',
        display: 'flex',
        justifyContent: 'space-between',
        height:'50px',
        color:"#383860"

    },
    ButtonContent: {
        display: 'flex',
        alignItems: "center",
        width: '100%'

    },
    badge:{
        width:'30px',
        height:'25px',
        backgroundColor:'#7169697d',
        color:'white',
        fontWeight:"bold",
        borderRadius:"50%",
        textAlign:"center"

    },
    navIcons:{
        color:"#716969"
    }
})

function SideNav() {
    const classes = useStyle()
    const dispatch=useDispatch()
    let history =useHistory()
    let notificationCound = (useSelector((state) => state.notificationCount.notificationCount))
    const handleLogout = (e) => {
        dispatch(logoutAction())
        history.push('/login')
    }

    return (
        <div className="SideNav">
            <div className="navItem">
                <Button variant="text" className={classes.Button} component={Link} to="/" >
                    <div className={classes.ButtonContent}>
                        <HomeRoundedIcon className={classes.navIcons} />
                        <span>Home</span>
                    </div>
                   
                </Button>
            </div>
            <div className="navItem">
                <Button variant="text" className={classes.Button}  component={Link} to="/notification" >
                    <div className={classes.ButtonContent}>
                        <AccountBoxIcon className={classes.navIcons} />
                        <span>

                        Notifications
                        </span>
                    </div>
                    <div className={classes.badge} >
                    {notificationCound}
                    </div>
                </Button>
            </div>
           
         
            <div className="navItem">
                <Button variant="text" className={classes.Button} component={Link} to="/settings"  >
                    <div className={classes.ButtonContent}>
                        <SettingsIcon  className={classes.navIcons}/>
                        <span>

                        Settings
                        </span>
                    </div>
                    
                </Button>
            </div>
            <div className="navItem">
                <Button variant="text" className={classes.Button} onClick={handleLogout}>
                    <div className={classes.ButtonContent}>
                        <Logout  className={classes.navIcons}/>
                        
                        <span>

                        Logout
                        </span>
                    </div>
                  
                </Button>
            </div>

        </div>
    )
}

export default SideNav
