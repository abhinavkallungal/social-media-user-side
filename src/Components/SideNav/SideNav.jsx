import React from 'react'
import './SideNav.css'
import { Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { color, textAlign } from '@mui/system'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import FeedIcon from '@mui/icons-material/Feed';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';

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
    return (
        <div className="SideNav">
            <div className="navItem">
                <Button variant="text" className={classes.Button} >
                    <div className={classes.ButtonContent}>
                        <HomeRoundedIcon className={classes.navIcons} />
                        <span>Home</span>
                    </div>
                   
                </Button>
            </div>
            <div className="navItem">
                <Button variant="text" className={classes.Button} >
                    <div className={classes.ButtonContent}>
                        <AccountBoxIcon className={classes.navIcons} />
                        <span>

                        People
                        </span>
                    </div>
                    <div className={classes.badge} >
                        3
                    </div>
                </Button>
            </div>
            <div className="navItem">
                <Button variant="text" className={classes.Button} >
                    <div className={classes.ButtonContent}>
                        <InsertPhotoIcon className={classes.navIcons} />
                        <span>

                        Photo
                        </span>
                    </div>
                   
                </Button>
            </div>
            <div className="navItem">
                <Button variant="text" className={classes.Button} >
                    <div className={classes.ButtonContent}>
                        <FeedIcon className={classes.navIcons} />
                        <span>

                        Feed
                        </span>
                    </div>
                   
                </Button>
            </div>
            <div className="navItem">
                <Button variant="text" className={classes.Button} >
                    <div className={classes.ButtonContent}>
                        <PersonIcon  className={classes.navIcons}/>
                        <span>

                        People
                        </span>
                    </div>
                    <div className={classes.badge} >
                        11
                    </div>
                </Button>
            </div>
            <div className="navItem">
                <Button variant="text" className={classes.Button} >
                    <div className={classes.ButtonContent}>
                        <SettingsIcon  className={classes.navIcons}/>
                        <span>

                        Settings
                        </span>
                    </div>
                    
                </Button>
            </div>

        </div>
    )
}

export default SideNav
