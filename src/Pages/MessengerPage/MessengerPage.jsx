import React, { useState } from 'react'
import {Grid} from "@mui/material"

import './MessengerPage.css'
import ChatBox from '../../Components/Messenger/ChatBox'
import BottomBar from '../../Components/BottomBar/BottomBar'
import ChatList from '../../Components/Messenger/ChatList'
import { useSelector } from 'react-redux';
import { useEffect } from 'react'
import OpenMessageBox from '../../Components/Messenger/OpenMessageBox'
import { useParams ,useHistory } from 'react-router-dom'



function  MessengerPage() {
    let {userId}=useParams()

    const history =useHistory()
    const data = useSelector((state)=>state.user.user)
    const[selectedChat,setSelectedChat]=useState('')
   const user =data

    const handleChatSelected =(userId)=>{
            setSelectedChat(userId)
            history.push(`/Messenger/${userId}`)

    }

 
    return (
        <div className='MessengerPage'>
            <Grid container>

                <Grid item xs={0}  md={4} sx={{ display: { xs: 'none', md: 'block', lg: 'block' } }} style={{margin:'0px',padding:'0px'}}    >
                  {user && <ChatList userId={user._id} handleChatSelected={handleChatSelected}/> }  
                </Grid>
                <Grid item xs={12} md={8} className="">
                    {

                    userId ? <ChatBox selectedChat={userId}  currentUser={user._id} />  : null

                    }

               
                </Grid>

            </Grid>
            <BottomBar/>    

        </div>
    )
}

export default MessengerPage
