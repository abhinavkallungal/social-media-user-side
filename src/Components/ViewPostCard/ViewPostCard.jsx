import React, { useState,useEffect } from 'react'
import { Menu, MenuItem, Avatar, ListItemIcon, Divider, IconButton, Button } from "@mui/material"
import{doLike,doSave} from '../../Axios'
import './ViewPostCard.css'
import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import BookmarkAddRoundedIcon from '@mui/icons-material/BookmarkAddRounded';

import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import SwiperCore, {Pagination} from 'swiper';

// install Swiper modules



// Import Swiper styles
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import { useHistory } from 'react-router';

import  moment from 'moment'

import userAvatar from '../../Assets/userAvathar.jpg'

import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { BookmarkAdd, BookmarkAddedOutlined, ChatBubble, Tune } from '@mui/icons-material';
import { useSelector } from 'react-redux';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

SwiperCore.use([Pagination]);




function ViewPostCard(props) {

    
    const{post,userId}=props

    const file = post.files
    let ProfilePhotos=post?.user?.ProfilePhotos;
    const[likes,setlikes]=useState(post.likes.length)
    const[liked,setliked]=useState(false)

    useEffect(() => {
        let doeslike = post.likes.findIndex((likes)=>{
            return likes===userId
        })
        if(doeslike===-1){
            setliked(false)
        }else{
            setliked(true)
        }
        
    }, [])

  


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLike=()=>{
        doLike({userId,postId:post._id}).then((data)=>{
            console.log(data);
            setlikes(data.likes)
            setliked(data.liked)
        })

    }

    const handleSave=()=>{
        doSave({userId,postId:post._id}).then(()=>{

        })

    }




    return (
        <div className='ViewPostCard' key={post._id}>
            <div className="postHeader">
                <div className="profile">
                    <div className="img">

                    <img src={ProfilePhotos ? ProfilePhotos[ProfilePhotos.length -1] :userAvatar} alt="" />
                    </div>
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
                            <Swiper pagination={true} className="mySwiper">

                                {


                                    file.map((item) => {
                                        return (
                                            <SwiperSlide>
                                                <div className="imgOne">
                                                    <img className="mx-auto" src={item} alt="" />

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
                    <span>{likes} likes</span>
                </Button>
                <Button>

                    <span>55 Comments</span>
                </Button>
            </div>
            <div className="postBottom">
                <div className="d-flex">


                    
                        <Checkbox  onClick={handleLike} checked={liked} size="large" {...label} icon={<FavoriteBorder size="large"  />} checkedIcon={<Favorite />} ></Checkbox>
                        <Checkbox size="large" {...label} icon={<ChatBubbleOutlineRoundedIcon size="large"  />} checkedIcon={<ChatBubble />} ></Checkbox>
                
                
                </div>
          
                        <Checkbox onClick={handleSave} size="large" {...label} icon={<BookmarkAddedOutlined  size="large"  />} checkedIcon={<BookmarkAdd />} ></Checkbox>


            </div>

        </div>
    )
}

export default ViewPostCard










