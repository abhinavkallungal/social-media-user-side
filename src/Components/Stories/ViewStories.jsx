import { Alert, Typography } from '@mui/material'
import React, { useState, useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import SwiperCore, { Autoplay, Navigation } from 'swiper';
import { getALLStories } from '../../Axios';
import userAvathar from '../../Assets/userAvathar.jpg'
import moment from 'moment'






// install Swiper modules



// Import Swiper styles
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import 'swiper/modules/navigation/navigation.min.css'
import { useSelector } from 'react-redux';


SwiperCore.use([Autoplay, Navigation]);






function ViewStories({ stories }) {
    const myContainer = useRef(null);
    const [duration, setDuration] = useState(5000)
    const selectedStory = useSelector(state => state.selectedStorySlice.selectedStorySlice)
    const [storiesQueue,setStoriesQueue]=useState([])

    const change = selectedStory

    useEffect(() => {

        let index = stories.findIndex(checkID);

        function checkID(item) {
            return item._id ==selectedStory ;
        }
        console.log("stories",stories);
        console.log("stories.slice",stories.slice(index,stories.length));
 
        setStoriesQueue(stories.slice(index,stories.length))
    }, [selectedStory])



    return (
        <div className="ViewStories">
            <Typography sx={{ display: { xs: 'none', md: 'block', lg: 'block' } }} variant='h4'>View</Typography>


            <div className="BlackScreen">

                <div className="screen">

                    <Swiper navigation={true}
                        onSlideChange={(e) => {
                            console.log(e);

                            if (myContainer?.current?.firstChild?.tagName === "VIDEO") {
                                setDuration(myContainer?.current?.firstChild?.duration)
                                console.log(duration)
                            }
                        }}

                        autoplay={{
                            "delay": 2500,
                            "disableOnInteraction": false,



                        }} className="mySwiper">

                        {
                            storiesQueue?.map((file, index) => {
                                console.log(file.createdAt);
                                let ext = file?.files?.file?.split('.')
                                let type = ext[ext.length - 1]
                                return (
                                    <>
                                        {



                                            (type === 'jpeg' || type === 'jpg' || type === 'png') && <SwiperSlide key={index}   >


                                                <img src={file.files.file} alt="" className="imgOne"  />
                                                <div className="Profile">
                                                    <div className="img">
                                                        <img src={file?.user?.ProfilePhotos ? file?.user?.ProfilePhotos : userAvathar} style={{ width: '50px', height: '50px', marginRight: '20px', marginLeft: '20px' }} alt="" />
                                                    </div>
                                                    <div>
                                                        <span>{file.user.name}</span>
                                                        <p>{moment(file.files.createdAt).fromNow()}</p>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        }
                                        {

                                            (type === 'mp4') && <SwiperSlide data-swiper-autoplay={duration * 1000} ref={myContainer} key={index}>

                                                <video autoPlay muted className="imgOne video" loop  > <source src={file.files.file} />This browser doesn't support video tag.</video>
                                                <div className="Profile">
                                                    <div className="img">
                                                        <img src={file?.user?.ProfilePhotos ? file?.user?.ProfilePhotos : null} style={{ width: '50px', height: '50px', marginRight: '20px', marginLeft: '20px' }} alt="" />
                                                    </div>
                                                    <div>
                                                        <span>{file.user.name}</span>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        }
                                    </>

                                )





                            })
                        }

                    </Swiper>


                </div>


            </div>

        </div>
    )
}

export default ViewStories

