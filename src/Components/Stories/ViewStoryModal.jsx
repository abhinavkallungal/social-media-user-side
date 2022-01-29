import React, { useState, useRef } from 'react'
import Box from '@mui/material/Box';
import { Typography, IconButton, Button } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos, CloseRounded, Whatshot } from '@mui/icons-material';
import Modal from '@mui/material/Modal';
import { useSelector } from 'react-redux';
import './Stories.css'
import LinearProgress from '@mui/material/LinearProgress';
import { useEffect } from 'react';
import { getALLStories, viewSroty } from '../../Axios';
import Stories, { WithSeeMore } from 'react-insta-stories';
import moment from 'moment'














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












function ViewStoryModal({ story, stories }) {


    const [open, setOpen] = React.useState(false);
    const ref = useRef()
    const user = useSelector(state => state.user.user)

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [sto, setSto] = useState([])
    const [currentStory,setCurrentStory]=useState({})





    useEffect(() => {
        if (open) {



            let index = stories.findIndex(checkID);

            function checkID(item) {
                return item._id == story._id;
            }
            console.log("stories", stories);
            console.log("stories.slice", stories.slice(index, stories.length));


            let setStoriesQueuedummy = stories.slice(index, stories.length)



            let array = []
            let s = setStoriesQueuedummy.filter((file, index) => {
                console.log(file.createdAt);
                let ext = file?.files?.file?.split('.')
                let exttype = ext[ext.length - 1]


                if (exttype === 'png' || exttype === 'jpes' || exttype === 'jpg') {

                    console.log('image', file.files.file);
                    array.push({ url: file.files.file })

                    return ({ type: 'image', url: file.files.file, originalContent: file._id })
                } else if (exttype === "mp4") {
                    array.push({ type: 'video', url: file.files.file })
                    return ({ type: 'video', url: file.files.file })

                } else {
                    alert()
                }


            })
            setSto(array)
        }

    }, [open])


    const storyViewed = (s, st) => {
        console.log("st", st.url);

        let viewdStory = stories.find((item) => {
            console.log(item);
            return item.files.file == st.url
        })

        setCurrentStory(viewdStory)
        console.log("viewdStory",viewdStory);
        
        viewSroty({ storyId: viewdStory.files.id, ViewerId: user._id }).then((data) => {
            console.log(data);
        }).catch((err) => {
            console.log(err);
        })








    }







    return (
        <div className='CreatePostModal ViewStoryModal'>
            <div className='HeroViewStory' onClick={handleOpen}>
                <div className="img">
                    <img src={story?.user?.ProfilePhotos ? story?.user?.ProfilePhotos : "https://source.unsplash.com/user/erondu/100x180"} alt="" />
                </div>
                <div className="content">
                    <span>{story.user.name}</span>
                    {
                        story.trending ? <Whatshot style={{ color: "#007fff" }} /> : null
                    }
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
                                <div className="StoryContent d-flex flex-column h-100 align-items-center justify-content-center" ref={ref} >
                                    <div style={{width:'100%'}}>
                                        {
                                            currentStory?  <div className="Profile">
                                            <div className="img">
                                                <img src={currentStory?.user?.ProfilePhotos ? currentStory?.user?.ProfilePhotos : "https://source.unsplash.com/user/erondu/100x180"} style={{ width: '50px', height: '50px', marginRight: '20px', marginLeft: '20px' }} alt="" />
                                            </div>
                                            <div>
                                                <span>{currentStory?.user?.name}</span>
                                                <p>{moment(currentStory?.createdAt).fromNow()}</p>
                                            </div>
                                        </div> :null
                                        }

                                      
                                    </div>

                                    {

                                        <Stories

                                            keyboardNavigation
                                            defaultInterval={3000}
                                            stories={sto}
                                            onStoryStart={storyViewed}
                                            onAllStoriesEnd={handleClose}
                                            onStoryEnd={(s, st) => console.log("story ended", s, st)}
                                        />


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




const image = {
    display: "block",
    maxWidth: "100%",
    borderRadius: 4
};

const contentStylestoryback = {
    background: "black",
    width: "100%",
    padding: 20,
    color: "white"
};

const code = {
    background: "#eee",
    padding: "5px 10px",
    borderRadius: "4px",
    color: "#333"
};

const contentStyle = {
    background: "salmon",
    width: "100%",
    padding: 20,
    color: "white"
};

const customSeeMore = {
    textAlign: "center",
    fontSize: 14,
    bottom: 20,
    position: "relative"
};

export default ViewStoryModal
