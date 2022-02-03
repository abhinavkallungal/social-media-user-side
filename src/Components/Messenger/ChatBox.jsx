import React, { useRef, useEffect } from 'react'
import './Messenger.css'
import userAvathar from "../../Assets/userAvathar.jpg"
import { IconButton } from '@mui/material'
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { ArrowBackRounded, AttachmentRounded, EmojiEmotionsRounded, MoreVertSharp, SendRounded } from '@mui/icons-material';
import Message from './Message';
import { useState } from 'react';
import { getMessages, getUserDetailes } from "../../Axios"
import socket from '../../Utils/socket'
import { useHistory } from "react-router-dom";







function ChatBox({ currentUser, selectedChat }) {
    let history = useHistory();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const scrollRef = useRef()
    const [newMessage, setNewMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [user, setUser] = useState({})
    const [chat, setChat] = useState("")




    useEffect(() => {

        setChat(selectedChat)
    }, [selectedChat])



    useEffect(() => {


        if (chat && currentUser) {
            getUserDetailes({ userId: chat }).then((data) => {

                setUser(data.user[0])
            }).catch(() => {


            })


            getMessages({ sender: currentUser, userId: chat }).then((messages) => {

                setMessages(messages)

            })



            
        }


    }, [chat, currentUser])


    useEffect(() => {
        let messageArray = []
        socket?.on('doReceiveMessage', (message) => {


            let receivedMessage = message[0]


            messageArray.push(message[0])

          



            if (messageArray.length !== 0) {







              
                if (messageArray[messageArray.length - 1].sender === selectedChat) {




                    setMessages(messages => [...messages, receivedMessage])

                }
                else {


                }

            }


        })
    
      return () => {
        socket.off('doReceiveMessage')
      };
    }, [chat]);
    

    useEffect(() => {

        scrollRef?.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const handleClick = (event) => {
        console.log(14);
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        console.log(15);
        setAnchorEl(null);
    };

    function enterKeyPressed(event) {
        if (event.charCode == 13) {
            addMessage()
        }
    }















    const addMessage = () => {
        console.log(8);

        if (newMessage.trim() === "") {

            console.log(9);
        } else {
            console.log(10);




            setMessages(messages => [...messages, { message: newMessage, createdAt: new Date(), sender: currentUser }])


            socket.emit('doSendMessage', { message: newMessage, sender: currentUser, receiver: chat })
            setNewMessage("")




        }

    }













    return (
        <div className='ChatBox'>
            <div className="header">

                <div className="detailes">
                    <div className="backbtn">
                       
                        <IconButton style={{ background: '#ffffff' }} onClick={history.goBack} >
                            <ArrowBackRounded style={{ color: '#007fff' }} />
                        </IconButton>
                      
                    </div>
                    <div className="img">
                        <img src={user.ProfilePhotos ? user.ProfilePhotos : userAvathar} alt="" />
                    </div>
                    <div>
                        <div className="name">
                            {user.name}
                        </div>
                        <span className="lastseen">
                            1d ago
                        </span>
                    </div>
                </div>
                <div>
                    <Tooltip title="Account settings">
                        <IconButton onClick={handleClick} size="large" sx={{ ml: 2 }}>
                            <MoreVertSharp style={{ color: '#ffffff' }} />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem>
                            <Avatar /> Profile
                        </MenuItem>
                        <MenuItem>
                            <Avatar /> My account
                        </MenuItem>
                        <Divider />
                        <MenuItem>
                            <ListItemIcon>
                                <PersonAdd fontSize="small" />
                            </ListItemIcon>
                            Add another account
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            Settings
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                </div>

            </div>
            <div className="viewMessage">
                {
                    messages?.map((item, index) => {
                        return (
                            <div key={index} ref={scrollRef}>
                                <Message item={item} currentUser={currentUser} />
                            </div>
                        )
                    })
                }
            </div>
            <div className="sendMessage">
                <IconButton>
                    <EmojiEmotionsRounded style={{ color: '#077fff' }} />
                </IconButton>
                <IconButton>
                    <AttachmentRounded />
                </IconButton>
                <input type="text" className="input" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyPress={enterKeyPressed} />

                <IconButton style={{ background: '#007fff', marginLeft: "20px", marginRight: '20px' }} onClick={addMessage}>
                    <SendRounded style={{ color: "#fff" }} />
                </IconButton>




            </div>
        </div>
    )
}

export default ChatBox
