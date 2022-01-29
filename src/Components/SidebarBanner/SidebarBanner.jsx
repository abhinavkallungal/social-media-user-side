import React, { useEffect, useState } from 'react'
import './SidebarBanner.css'
import { Button, Typography } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear';
import { getBanner } from '../../Axios';

function SidebarBanner() {
    const [banner, setBanner] = useState(null)
    useEffect(() => {
        getBanner().then((data) => {
            setBanner(data)

        })
    }, [])
    return (

        <div className='SidebarBanner' >
            <Typography className='mb-1'>Sponsored*</Typography>
            {
                banner ? <div className="banner" >
                    <img src={banner?.files[0]} alt="" />
                    <span>{banner?.description}</span>
                </div > :null
            }

            <div className='bannerButtons'>
                {/* <Button variant="contained" style={{ fontSize: '12px', fontWeight: 'bold', height: '50px' }} className="btn" >Accept Invitation </Button>
                <Button variant="outlined"><ClearIcon /></Button> */}
            </div>


        </div >


    )
}

export default SidebarBanner
