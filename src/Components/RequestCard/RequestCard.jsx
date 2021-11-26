import React from 'react'
import './RequestCard.css'
import {Button} from '@mui/material'

function RequestCard() {
    return (
        <div className="RequestCard">
            <div className="details">
                <div className="img">
                <img src="https://source.unsplash.com/user/erondu/50x50" alt="" />
                </div>
                <div className="content">
                        <p><span>Sanin</span> want to add you to friend</p>
                </div>
            </div>
            <div className="btns">
            <Button variant="contained" style={{fontSize:'12px',fontWeight:'bold',height:'40px',marginRight:'20px'}} className="btn" >Follow </Button>
            <Button variant="outlined" style={{fontSize:'12px',fontWeight:'bold',height:'40px'}}>Remove</Button>
            </div>
            
        </div>
    )
}

export default RequestCard
