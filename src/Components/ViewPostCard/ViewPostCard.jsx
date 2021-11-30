import React,{useState} from 'react'
import {  Menu, MenuItem, Avatar, ListItemIcon, Divider, IconButton, Button } from "@mui/material"

import './ViewPostCard.css'
import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import BookmarkAddRoundedIcon from '@mui/icons-material/BookmarkAddRounded';



function ViewPostCard({post}) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    console.log(post.files);


    return (
        <div className='ViewPostCard'>
            <div className="postHeader">
                <div className="profile">
                    <img src="https://source.unsplash.com/user/erondu/50x50" alt="" />
                    <div>
                        <span>Abhinav Kallungal</span>

                    </div>
                </div>
                <IconButton size='medium' onClick={handleClick}> <MoreVertSharpIcon size='medium' /></IconButton>

                    
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
                            Edit Post
                        </MenuItem>
                        <MenuItem>
                            
                            Report Post
                        </MenuItem>
                        <MenuItem >
                            
                            test
                        </MenuItem>
                    </Menu>

            </div>
            <div className="postContent">
                <span>{post.desc}</span>
                <img src={post.files} alt="" />

            </div>
            <div className="engageCount">
                <Button>
                    <span>200 likes</span>
                </Button>
                <Button>

                    <span>55 Comments</span>
                </Button>
            </div>
            <div className="postBottom">
                <div className="d-flex">

                <Button>
                    <FavoriteBorderRoundedIcon />   
                    <span>Like</span>
                </Button>
                <Button>
                    <ChatBubbleOutlineRoundedIcon />
                    <span>Comments</span>
                </Button>
                </div>
                <Button style={{flex:"end"}}>
                    <BookmarkAddRoundedIcon />
                    
                </Button>

            </div>

        </div>
    )
}

export default ViewPostCard
