import React from 'react'
import './SidebarBanner.css'
import {Button} from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear';

function SidebarBanner() {
    return (
        <div className='SidebarBanner'>
            <div className="banner">
                <img src="https://source.unsplash.com/user/erondu/200x220" alt="" />
                <span>How To Build Strong Company</span>
            </div>
            <div className='bannerButtons'>
                     <Button variant="contained" style={{fontSize:'12px',fontWeight:'bold',height:'50px'}} className="btn" >Accept Invitation </Button>
                     <Button variant="outlined"><ClearIcon/></Button>
            </div>
            
        </div>
    )
}

export default SidebarBanner
