import React, { useState, useEffect } from 'react'
import { Menu, MenuItem, Avatar, ListItemIcon, Divider, IconButton, Button } from "@mui/material"
import { doLike, doSave, doDeletePost, doCommet, getPostComment } from '../../Axios'
import './ViewPostCard.css'
import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import SwiperCore, { Pagination } from 'swiper';
import PostReportModal from '../PostReportModal/PostReportModal';
import socket  from '../../Utils/socket'




// install Swiper modules



// Import Swiper styles
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'

import moment from 'moment'

import userAvatar from '../../Assets/userAvathar.jpg'

import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { BookmarkAdd, BookmarkAddedOutlined, ChatBubble, SendRounded, Whatshot } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import ViewTages from './ViewTages';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

SwiperCore.use([Pagination]);




function ViewPostCard(props) {

    let currentUser = (useSelector((state) => state.user.user))
    const history = useHistory()

    const { post, user } = props

    const file = post.files
    const video = post?.video

    let ProfilePhotos = post?.user?.ProfilePhotos;
    const [likeCount, setlikeCount] = useState(post.likes?.length)
    const [liked, setliked] = useState(false)
    const [saved, setSaved] = useState(false)
    const [postOwner, setPostOwner] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [commentCount, setCommentCount] = useState(post.comments?.length)
    const [comment, setComment] = useState('')
    const [ViewComment, setViewComment] = useState(false)
    const [Comments, setComments] = useState([])




    useEffect(() => {
        let doeslike = post?.likes?.findIndex((likes) => {
            return likes === currentUser._id
        })
        if (doeslike === -1) {
            setliked(false)
        } else {
            setliked(true)
        }
        let doesSaved = currentUser?.SavedPost?.findIndex((posts) => {
            return posts === post._id
        })
        if (doesSaved === -1 || doesSaved === undefined) {
            setSaved(false)
        } else {
            setSaved(true)
        }



    }, [])

    useEffect(() => {

        if (post?.userId === currentUser?._id) {
            setPostOwner(true)
        } else {
            setPostOwner(false)
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

    const handleLike = () => {
        doLike({ userId: currentUser._id, postId: post._id }).then((data) => {
            if (data.NotificationId) {

                socket.emit("dolike", { NotificationId: data.NotificationId })
            }
            setlikeCount(data.likes)
            setliked(data.liked)
        }).catch((err) => {
            console.log(err);
            if (err?.response?.status == 403) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                history.push('/login')
            }
        })

    }

    const handleSave = () => {
        doSave({ userId: currentUser._id, postId: post._id }).then((data) => {

            setSaved(data.saved)

        }).catch((err) => {
            if (err.response.status == 403) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                history.push('/login')
            }
        })

    }

    const handleDelete = () => {
        handleClose()
        doDeletePost({ userId: currentUser._id, postId: post._id }).then((data) => {
            setDeleted(true)

        }).catch((err) => {
      
        })
    }
    const handleCommet = (e) => {
        setComment(e.target.value)
    }
    const handleAddComment = () => {
        setComment("")
        doCommet({ userId: currentUser._id, postId: post._id, comment }).then(({ comments, NotificationId }) => {
            if (comments) {
                setComments(comments)
                setViewComment(true)
                setCommentCount(comments?.length)
            }
            if (NotificationId) {

                socket.emit("docomment", { NotificationId })
            }

        }).catch((err) => {
            if (err.response.status == 403) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                history.push('/login')
            }
        })

    }
    const handleViewComment = () => {
        if (ViewComment) {

            setViewComment(false)
        } else {


            setViewComment(true)
            getPostComment({ postId: post._id }).then((comments) => {
                setComments(comments)
            }).catch((err) => {
                if (err.response.status == 403) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    history.push('/login')
                }

            })
        }

    }




    return (
        <div className='ViewPostCard' key={post._id} style={deleted ? { display: "none" } : null} >
            <div className="postHeader">
                <div className="profile" >
                    <div className="img">

                        <img src={ProfilePhotos ? ProfilePhotos : userAvatar} alt="" />
                    </div>
                    <div>
                        <span> <Link to={`/profile/${post.user._id}`} className="Link">{post?.user?.name}</Link> </span>
                        {
                            (post?.tag?.length > 0 || post.location) ? <span > is {post.tag.length > 0 ? <span >with <span className="fw-bold"> <Link to={`/profile/${post.tag[0]._id}`} className="Link"> {post.tag[0].name}</Link></span></span> : null} {post.tag.length > 1 ? <span className="fw-bold">and     <ViewTages postId={post?._id}> <span> {post.tag.length - 1}</span> others</ViewTages> </span> : null} {post.location ? <span>in <span className="fw-bold">{post.location}</span> </span> : null}</span> : null
                        }

                        <p>{moment(post.postedDate).fromNow()}</p>

                    </div>
                    <div>
                        {
                            post.trending? <Whatshot color='red' style={{color:'#007fff', fontSize:'36px',marginLeft:'20px'}} /> :null
                        }
                    </div>
                </div>
                <IconButton size='medium' onClick={handleClick}> <MoreVertSharpIcon size='medium' /></IconButton>



                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
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
                    {
                        postOwner ? <MenuItem> Edit Post</MenuItem> : null
                    }
                    {
                        postOwner ? <MenuItem onClick={handleDelete}> Delete Post</MenuItem> : null
                    }

                    <PostReportModal userId={user?._id} postId={post?._id}>

                        Report Post
                    </PostReportModal>

                </Menu>

            </div>
            <div className="postContent">
                <span>{post.desc}</span>
                {
                    (file !== null || video !== null) ? (
                        <>
                            <Swiper pagination={true} className="mySwiper">
                                {


                                    video ? (
                                        <SwiperSlide>
                                            <video width="500" height="300" controls className="imgOne">
                                                <source   src={video}  />
                                                    This browser doesn't support video tag.
                                            </video>
                                        </SwiperSlide>

                                    )

                                        : null

                                }

                                {


                                    file?.map((item,index) => {
                                        return (
                                            <SwiperSlide key={index}>
                                                <div className="imgOne">
                                                    <img className="" src={item} alt="" />
                                                </div>
                                            </SwiperSlide>

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
                    <span>{likeCount} likes</span>
                </Button>
                <Button>

                    <span onClick={handleViewComment}>{commentCount} Comments</span>
                </Button>
            </div>
            <div className="postBottom">
                <div className="d-flex">



                    <Checkbox onClick={handleLike} checked={liked} size="large" {...label} icon={<FavoriteBorder size="large" />} checkedIcon={<Favorite />} ></Checkbox>
                    <IconButton size="large" onClick={handleViewComment}><ChatBubbleOutlineRoundedIcon size="large" /></IconButton>


                </div>

                <Checkbox onClick={handleSave} checked={saved} size="large" {...label} icon={<BookmarkAddedOutlined size="large" />} checkedIcon={<BookmarkAdd />} ></Checkbox>


            </div>
            <div className="commentSection">
                <div className="commentInput">
                    <input type="text" onChange={handleCommet} value={comment} placeholder="Add A Comment............" />
                    <IconButton className='sendcomment' onClick={handleAddComment}>
                        <SendRounded style={{ color: '#fff' }} />
                    </IconButton>
                </div>
                {
                    ViewComment ? <div className="comments">
                        {
                            Comments?.map((item, index) => {
                                return (
                                    <div className="comment" key={index}>
                                        <div className="profilePhoto">
                                            <img src={item.user.ProfilePhotos} alt="" />
                                        </div>
                                        <div className="content">
                                            <div className="header">
                                                <span className="me-4"> {item.user.name}</span>
                                                <span className='date ms-4'>{moment(item.date).fromNow()}</span>
                                            </div>
                                            <h6 >

                                                {item.comment}
                                            </h6>
                                        </div>
                                    </div>

                                )


                            })



                        }



                    </div>
                        : null
                }


            </div>


        </div>
    )
}

export default ViewPostCard










