import React, { useState } from 'react'
import {Grid} from "@mui/material"
import './MessengerPage.css'
import BottomBar from '../../Components/BottomBar/BottomBar'
import ChatList from '../../Components/Messenger/ChatList'
import { useSelector } from 'react-redux';
import OpenMessageBox from '../../Components/Messenger/OpenMessageBox'
import {  useHistory } from 'react-router-dom'


function  MessengerHomePage() {
    const history =useHistory()
    const data = useSelector((state)=>state.user.user)
   const user =data
    const [selectdChat,setSelectedChat]=useState('')

    const handleChatSelected =(userId)=>{
        setSelectedChat(userId)
        history.push(`/Messenger/${userId}`)

}

 
    return (
        <div className='MessengerPage'>
            <Grid container>

                <Grid item xs={12}  md={4} style={{margin:'0px',padding:'0px'}}    >
                  {user && <ChatList userId={user._id} handleChatSelected={handleChatSelected}/> }  
                </Grid>
                <Grid item xs={0} md={8} sx={{ display: { xs: 'none', md: 'block', lg: 'block' } }}  className="">
                    {

                         <OpenMessageBox/>

                    }

               
                </Grid>
               



            </Grid>
            <BottomBar/>    

        </div>
    )
}

export default MessengerHomePage





