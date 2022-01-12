import React from 'react'
import './RequestCard.css'
import {Button} from '@mui/material'
import Avathar from '../../Assets/userAvathar.jpg'
import { useHistory } from 'react-router-dom'


function RequestCard({request,follow}) {
    const history =useHistory()

    const ViewProfile =(id)=>{
        history.push('/profile/'+id)
        
    }

 
    return (
        <div className="RequestCard">
            <div className="details">
                <div className="img">
                <img src={request?.ProfilePhotos ? request?.ProfilePhotos :Avathar} alt="" />
                </div>
                <div className="content">
                        <p><span>{request?.name}</span> want to add you to friend</p>
                </div>
            </div>
            <div className="btns">
            <Button variant="contained" style={{fontSize:'12px',fontWeight:'bold',height:'40px',marginRight:'20px'}} className="btn" onClick={()=>follow(request._id)}>Follow </Button>
            <Button variant="outlined" style={{fontSize:'12px',fontWeight:'bold',height:'40px'}} onClick={()=>ViewProfile(request._id)}>View Profile</Button>
            </div>
            
        </div>
    )
}

export default RequestCard
