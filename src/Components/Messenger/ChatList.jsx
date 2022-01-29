import React, { useState ,useEffect } from 'react'
import { makeStyles } from '@mui/styles';
import { IconButton, Typography } from '@mui/material';
import { DragIndicatorRounded, Search } from '@mui/icons-material';
import UserCard from './UserCard';
import { getFriends} from "../../Axios"




const useStyles = makeStyles({

    logo: {
        color: "#ffffff",
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 700,
        fontSize: 22

    },
   
});

 
function ChatList({userId,handleChatSelected}) {
    const classes = useStyles();
    const [friends,setFriends]=useState([])
    useEffect(() => {
        console.log(userId);
        if(userId !== undefined){

            getFriends({userId}).then((data)=>{
                console.log(data);
                setFriends(data)
                
            }).catch(()=>{
                
            })
        }
        
    }, [userId])

    return (
        <div className='ChatList'>
            <div className="header">
                 <Typography className={classes.logo} variant="p">
                            Social Media
                </Typography>

                <IconButton>
                    <DragIndicatorRounded style={{color:'#ffffff'}}/>
                </IconButton>

            </div>
      
            <div className="search">
                <input type="text" placeholder='Search Your Friends...........' />
                <IconButton>
                    <Search style={{color:"#ffffff"}}/>
                </IconButton>
            </div>
            <div className="userList">
                {
                    friends?.map((item)=> <UserCard user={item.user} handleChatSelected={handleChatSelected} />)
                }
           
            </div>
        </div>
    )
}

export default ChatList
