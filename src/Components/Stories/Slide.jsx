import React,{useEffect} from 'react'
import {  SwiperSlide } from "swiper/react/swiper-react";
import userAvathar from '../../Assets/userAvathar.jpg'
import moment from 'moment'


function Slide({ file, index ,duration,myContainer }) {

    console.log(file.createdAt);
    let ext = file?.files?.file?.split('.')
    let type = ext[ext.length - 1]
    

    useEffect(() => {
        
        return () => {
            alert()
        }
    }, [])

    return (


        <>
            {



                (type === 'jpeg' || type === 'jpg' || type === 'png') && <SwiperSlide key={index}   >


                    <img src={file.files.file} alt="" className="imgOne" onClick={(e) => alert(e.target.duration)} />
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

                    <video autoPlay muted className="imgOne video" loop onClick={(e) => alert(e.target.duration)} > <source src={file.files.file} />This browser doesn't support video tag.</video>
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
            lhkhkjhjklh
        </>







    )
}

export default Slide
