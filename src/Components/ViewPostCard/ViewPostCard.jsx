import React from 'react'
import './ViewPostCard.css'
import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp';
import { IconButton, Button } from "@mui/material"
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import BookmarkAddRoundedIcon from '@mui/icons-material/BookmarkAddRounded';



function ViewPostCard() {
    return (
        <div className='ViewPostCard'>
            <div className="postHeader">
                <div className="profile">
                    <img src="https://source.unsplash.com/user/erondu/50x50" alt="" />
                    <div>
                        <span>Abhinav Kallungal</span>

                    </div>
                </div>
                <IconButton size='medium'> <MoreVertSharpIcon size='medium' /></IconButton>

            </div>
            <div className="postContent">
                <span>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae odio accusantium vero quam eius incidunt. Veniam voluptates tempore recusandae quo.</span>
                <img src="https://source.unsplash.com/user/erondu/500x500" alt="" />

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
