import React, { useState } from 'react'
import {Grid} from "@mui/material"

import './MessengerPage.css'
import ChatBox from '../../Components/Messenger/ChatBox'
import BottomBar from '../../Components/BottomBar/BottomBar'
import ChatList from '../../Components/Messenger/ChatList'
import { useSelector } from 'react-redux';
import { useEffect } from 'react'
import OpenMessageBox from '../../Components/Messenger/OpenMessageBox'


function  MessengerPage() {
    const data = useSelector((state)=>state.user.user)
   const user =data
    const [selectdChat,setSelectedChat]=useState('')

 
    return (
        <div className='MessengerPage'>
            <Grid container>

                <Grid item xs={0}  md={4} sx={{ display: { xs: 'none', md: 'block', lg: 'block' } }} style={{margin:'0px',padding:'0px'}}    >
                  {user && <ChatList userId={user._id} setSelectedChat={setSelectedChat}/> }  
                </Grid>
                <Grid item xs={12} md={8} className="">
                    {

                        selectdChat ? <ChatBox selectdChat={selectdChat} currentUser={user._id} />  :   <OpenMessageBox/>

                    }

               
                </Grid>
               



            </Grid>
            <BottomBar/>    

        </div>
    )
}

export default MessengerPage
