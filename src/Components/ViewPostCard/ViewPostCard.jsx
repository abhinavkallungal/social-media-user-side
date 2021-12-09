import React, { useState } from 'react'
import { Menu, MenuItem, Avatar, ListItemIcon, Divider, IconButton, Button } from "@mui/material"

import './ViewPostCard.css'
import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import BookmarkAddRoundedIcon from '@mui/icons-material/BookmarkAddRounded';
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { Pagination } from 'swiper'

import  moment from 'moment'

import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { BookmarkAdd, BookmarkAddedOutlined, ChatBubble } from '@mui/icons-material';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };





function ViewPostCard({ post }) {
    const file = post.files

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };




    return (
        <div className='ViewPostCard'>
            <div className="postHeader">
                <div className="profile">
                    <img src="https://source.unsplash.com/user/erondu/50x50" alt="" />
                    <div>
                        <span>{post.user.name}</span>
                        <p>{moment(post.postedDate).fromNow()}</p>

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
                {
                    file !== null ? (
                        <>
                            <Swiper pagination={{
                                "dynamicBullets": true
                            }} className="mySwiper">

                                {


                                    file.map((item) => {
                                        return (
                                            <SwiperSlide>
                                                <div className="imgOne">
                                                    <img className="mx-auto  " src={item} alt="" />

                                                </div></SwiperSlide>

                                        )

                                    })

                                }

                            </Swiper>
                        </>

                    ) : null

                }

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


                    
                        <Checkbox size="large" {...label} icon={<FavoriteBorder size="large"  />} checkedIcon={<Favorite />} ></Checkbox>
                        <Checkbox size="large" {...label} icon={<ChatBubbleOutlineRoundedIcon size="large"  />} checkedIcon={<ChatBubble />} ></Checkbox>
                
                
                </div>
          
                        <Checkbox size="large" {...label} icon={<BookmarkAddedOutlined  size="large"  />} checkedIcon={<BookmarkAdd />} ></Checkbox>


            </div>

        </div>
    )
}

export default ViewPostCard










