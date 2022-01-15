import React, { useState, useRef } from 'react'
import Box from '@mui/material/Box';
import { Typography, IconButton, Button } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos, CloseRounded } from '@mui/icons-material';
import Modal from '@mui/material/Modal';
import { useSelector } from 'react-redux';
import './Stories.css'
import LinearProgress from '@mui/material/LinearProgress';
import { useEffect } from 'react';
import { getALLStories } from '../../Axios';













const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100vw',
    height: "100vh",
    boxShadow: 24,
    p: 4,
    borderRadius: 5,
    zIndex: 2,
    backdropFilter: ' blur(5px)',

};












function ViewStoryModal({ story }) {

    const [open, setOpen] = React.useState(false);
    const [stories, setStories] = useState([])
    const ref = useRef()
    const user = useSelector(state => state.user.user)
    const [currentItem, setCurrentItem] = useState(1)
    const [percentage, setPercentage] = useState(100 / stories.length)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [timer, setTimer] = useState(0)
    useEffect(() => {

        getALLStories().then((data) => {
            setStories(data.stories)
        })

    }, [])


    useEffect(() => {
        const timer = setInterval(() => {

            setTimer((oldProgress) => {
                if (oldProgress > 99) {


                    clearInterval(timer);
                }
                return Math.min(oldProgress + 10, 100);
            });
        }, 500);

        return () => {
            setTimer(0)
        };
    }, [open, currentItem]);

    const moveRight = () => {
        if (currentItem === stories.length) {
            setCurrentItem(1)
            setPercentage(100 / stories.length)
            setOpen(false);
        } else {

            setPercentage((100 / stories.length) * (currentItem + 1))
            setCurrentItem(item => item + 1)
            ref.current.style.transition = `all 0.3s ease-in`;
            ref.current.style.transform = `translateX(-${percentage}%)`;
        }


    }

    const StoryContent = {
        width: `${stories.length * 100}%`,
        transition: 'all 0.3s ease-in',
        display: 'flex',
        overflow: 'hidden',
        zIndex: 1

    }





    return (
        <div className='CreatePostModal ViewStoryModal'>
            <div className='HeroViewStory' onClick={handleOpen}>
                <div className="img">
                    <img src={"https://source.unsplash.com/user/erondu/100x180"} alt="" />
                </div>
                <div className="content">
                    <span>sad</span>
                    <IconButton aria-label="fingerprint" style={{ color: "white" }}>
                    </IconButton>
                </div>

            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='box p-0'>
                    <div className="header d-flex justify-content-end align-items-center" style={{ position: 'fixed', top: 0, left: 10, right: 10, zIndex: 100 }}  >

                        <IconButton size='large' style={{ backgroundColor: '#eeeeee30' }} onClick={handleClose}>
                            <CloseRounded />
                        </IconButton>
                    </div>

                    <div className="d-flex justify-content-center w-100" style={{ zIndex: 1 }}>
                        <div className="view" style={{ height: '100vh', width: '33vw', backgroundColor: "#dddddd", minWidth: "360px", overflow: 'hidden' }}>

                            {
                                <div className="StoryContent d-flex h-100" style={StoryContent} ref={ref} >

                                    {

                                        stories.map((file) => {
                                            return (
                                                <>

                                                    <div className="story" style={{ zIndex: 10 }}>
                                                        <LinearProgress variant="determinate" value={timer} style={{ height: 10, borderRadius: 10, zIndex: 10 }} />
                                                        <div style={{ position: 'relative', top: '50%', zIndex: 100 }} className="d-flex justify-content-between">

                                                            <IconButton className='StoryButton' style={{ zIndex: 1000 }} ><ArrowBackIos /> </IconButton>
                                                            <IconButton className='StoryButton' onClick={moveRight}><ArrowForwardIos /> </IconButton>
                                                        </div>
                                                        <div className="Profile">
                                                            <div className="img">
                                                                <img src={file?.user?.ProfilePhotos ? file?.user?.ProfilePhotos : null} style={{ width: '50px', height: '50px', marginRight: '20px', marginLeft: '20px' }} alt="" />
                                                            </div>
                                                            <div>
                                                                <span>{file.user.name}</span>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex  justify-content-center align-items-center"  style={{ height: '100vh', width: '33vw', backgroundColor: "#dddddd", minWidth: "360px", overflow: 'hidden' }}>

                                                            <img src={file.files} alt="" className="" />
                                                        </div>
                                                    </div>
                                                </>

                                            )
                                        })
                                    }

                                </div>
                            }

                        </div>
                    </div>




                </Box>
            </Modal>
        </div>
    )
}

export default ViewStoryModal
