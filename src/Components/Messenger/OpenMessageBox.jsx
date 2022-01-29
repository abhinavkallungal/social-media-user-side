import { Typography } from '@mui/material'
import { height } from '@mui/system'
import React from 'react'
import messageFun from '../../Assets/messageFun.svg'

function OpenMessageBox() {
    return (
        <div className='OpenMessageBox ChatBox'>
            <div className="header">

               
            </div>
            <div className='d-flex align-items-center justify-content-center w-100 h-100  flex-column ' >
                <img src={messageFun} alt="" style={{width:"250px " }} />
                <Typography style={{color:'#007fff',fontWeight:'bold'}}>Start Chating..........! </Typography>
            </div>
                
          
        </div>
            
    )
}

export default OpenMessageBox
 