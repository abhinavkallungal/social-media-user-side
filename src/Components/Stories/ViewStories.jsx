import { Alert, Typography } from '@mui/material'
import React, { useState, useEffect,useRef } from 'react'
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import SwiperCore, {  Autoplay ,Navigation  } from 'swiper';
import { getALLStories } from '../../Axios';





// install Swiper modules



// Import Swiper styles
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import 'swiper/modules/navigation/navigation.min.css'


SwiperCore.use([Autoplay ,Navigation]);




function ViewStories({stories}) {
    const myContainer = useRef(null);
    const [duration,setDuration]=useState(5000)

   
    return (
        <div className="ViewStories">
            <Typography sx={{ display: { xs: 'none', md: 'block', lg: 'block' } }} variant='h4'>View</Typography>


            <div className="BlackScreen">

                <div className="screen">

                    <Swiper  navigation={true}  
                    onSlideChange={(swiper, current, total) => {
                        console.log(myContainer.current.firstChild.tagName);

                        if(myContainer.current.firstChild.tagName==="VIDEO"){
                            setDuration(myContainer.current.firstChild.duration)
                            console.log(duration)
                        }
                    }}

                    autoplay={{
                        "delay": 2500,
                        "disableOnInteraction": false,
                        
                        
                        
                    }} className="mySwiper">

                        {
                            stories?.map((file,index) => {
                                console.log(file);
                                let ext = file?.files?.split('.')
                                let type = ext[ext.length - 1]
                                return (
                                    <>
                                        {



                                            (type === 'jpeg' || type === 'jpg' || type === 'png') && <SwiperSlide key={index}   >
                                               
                                                
                                                <img src={file.files} alt="" className="imgOne" onClick={(e) => alert(e.target.duration)} /></SwiperSlide>
                                        }
                                        <div>dfsdfsdfad</div>
                                        {

                                            (type === 'mp4') && <SwiperSlide data-swiper-autoplay={duration*1000} ref={myContainer} key={index}>
                                       
                                                <video autoPlay muted className="imgOne video"  onClick={(e) => alert(e.target.duration)} > <source src={file.files} />This browser doesn't support video tag.</video></SwiperSlide>
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

