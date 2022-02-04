import React, { useState, useEffect } from 'react'
import { AddLocationAlt, AddToPhotos, ArrowBack, PersonAdd, VideoLibrary } from '@mui/icons-material'
import { Typography, Button, IconButton, Box, LinearProgress } from '@mui/material'
import { styled } from '@mui/material/styles';
import { createPost } from '../../Axios'
import { useSelector } from 'react-redux';
import AutoComplete from './AutoComplete'


import axios from 'axios'




import './CreatePost.css'
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import SwiperCore, { Pagination } from 'swiper';

// install Swiper modules



// Import Swiper styles
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import { useHistory } from 'react-router';
import TagFriend from './TagFriend';
SwiperCore.use([Pagination]);


const Input = styled('input')({
    display: 'none'
});


const chunkSize = 5 * 1024;




function CreatePost() {

    const [Blobfiles, setBlobFiles] = useState([])
    const [orgfiles, setOrgFiles] = useState([])
    const [text, setText] = useState("")


    const [access, setAccess] = useState('PUBLIC')
    const [error, setError] = useState("")
    const [location, setLocation] = useState("")
    const [selected, setSelected] = useState("")
    const [send, setsend] = useState(false)
    const [tag, setTag] = useState([])
    const [postId, setPostId] = useState("")
    const [video, setVideo] = useState([]);
    const [currentFileIndex, setCurrentFileIndex] = useState(null);
    const [lastUploadedFileIndex, setLastUploadedFileIndex] = useState(null);
    const [currentChunkIndex, setCurrentChunkIndex] = useState(null);
    const [progress, setProgress] = useState(null)

    const formData = new FormData()
  
    const user = useSelector(state => state.user.user)
    const userData = user
    let ProfilePhotos = userData?.ProfilePhotos;

    const history = useHistory()



    const onInputChange = (event) => {
        let newFiles = []
      
        if (event.target.files.length !== 0) {
            const files = event.target.files;
            setOrgFiles(files)

        
            let file

            for (let i = 0; i < files.length; i++) {
                file = URL.createObjectURL(files[i])
                newFiles = [...newFiles, file]
                setBlobFiles(newFiles)
               
            }
          


        } else {
            setOrgFiles([])
            setBlobFiles([])


        }
      
    }
    const TextOnChange = (e) => {
        setText(e.target.value)
    }
    


    const onSubmit = (event) => {
        event.preventDefault();
        setsend(true)

      

        formData.append("desc", text)
        formData.append("Accessibility", access)
        formData.append("userId", user._id)
        formData.append("location", location)
        if (tag.length > 0) {
           
            let array = []

            tag.map((item) => {

                array.push({ _id: item.user._id, name: item.user.name })

            })
            formData.append('tag', JSON.stringify(array))





        }



        if (text === "" && orgfiles.length === 0 && video.length === 0) {
            setError("post is empty")
            setsend(false)


        } else if (orgfiles.length !== 0) {
            
            setError("")



            for (let i = 0; i < orgfiles.length; i++) {
                formData.append('files', orgfiles[i])
            }



            createPost(formData).then((post) => {
              
                if (video.length > 0) {
                    setPostId(post._id)
                } else {
                    setsend(false)
                 
                    history.push('/')

                }

            }).catch((err) => {
                setsend(false)
                if (err.response.status === 403) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                }
                setError(err.message)
            })



        } else {
            setError("")
          
            createPost(formData).then((post) => {
               
                if (video.length > 0) {
                    setPostId(post._id)
                } else {
                    setsend(false)
                   
                    history.push('/')

                }


            }).catch((err) => {
                setsend(false)

                if (err.response.status === 403) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    history.push('/login')
                }
                setError(err.message)
            })



        }


    }

    useEffect(() => {
      
    }, [tag])




    let blob

    function handleDrop(e) {
        e.preventDefault();
        blob = URL.createObjectURL(e.target.files[0])

        setVideo([...video, ...e.target.files]);
    }

    function readAndUploadCurrentChunk() {
        const reader = new FileReader();
        const file = video[currentFileIndex];
        if (!file) {
            return;
        }
        const from = currentChunkIndex * chunkSize;
        const to = from + chunkSize;
        const blob = file.slice(from, to);
        reader.onload = e => uploadChunk(e);
        reader.readAsDataURL(blob);
    }

    function uploadChunk(readerEvent) {
        const file = video[currentFileIndex];
        const data = readerEvent.target.result;
        const params = new URLSearchParams();
       
        params.set('name', file.name);
        params.set('postId', postId);
        params.set('size', file.size);
        params.set('currentChunkIndex', currentChunkIndex);
        params.set('totalChunks', Math.ceil(file.size / chunkSize));
        const headers = { 'Content-Type': 'application/octet-stream' };
        const url = 'http://socialmediaserver.kallungal.tech/api/v1/user/upload?' + params.toString();
        axios.post(url, data, { headers })
            .then(response => {
                const file = video[currentFileIndex];
                const videosize = video[currentFileIndex].size;
                const chunks = Math.ceil(videosize / chunkSize) - 1;
                const isLastChunk = currentChunkIndex === chunks;
                if (isLastChunk) {
                    file.finalFilename = response.data.finalFilename;
                    setLastUploadedFileIndex(currentFileIndex);
                    setCurrentChunkIndex(null);
                    setPostId(response.postId)
                    setsend(false)
                    history.push('/')
                } else {
                    setCurrentChunkIndex(currentChunkIndex + 1);
                }

            });
    }

    useEffect(() => {
        if (lastUploadedFileIndex === null) {
            return;
        }
        const isLastFile = lastUploadedFileIndex === video.length - 1;
        const nextFileIndex = isLastFile ? null : currentFileIndex + 1;
        setCurrentFileIndex(nextFileIndex);
    }, [lastUploadedFileIndex]);

    useEffect(() => {
        if (video.length > 0) {
            if (currentFileIndex === null) {
                setCurrentFileIndex(
                    lastUploadedFileIndex === null ? 0 : lastUploadedFileIndex + 1
                );
            }
        }
    }, [postId]);

    useEffect(() => {
        if (currentFileIndex !== null) {
            setCurrentChunkIndex(0);
        }
    }, [currentFileIndex]);

    useEffect(() => {
        if (currentChunkIndex !== null) {
            readAndUploadCurrentChunk();
        }
    }, [currentChunkIndex]);

    useEffect(() => {
        video?.map((file, fileIndex) => {
            setProgress(0)
            if (file.finalFilename) {
                setProgress(100);
            } else {
                const uploading = fileIndex === currentFileIndex;
                const chunks = Math.ceil(file.size / chunkSize);
                if (uploading) {
                    setProgress(Math.round(currentChunkIndex / chunks * 100))
                } else {
                    setProgress(0)
                }
            }
        })

    }, [currentChunkIndex])





    return (
        <div className="CreatePost" >

            <div className="card">
                <div className="Head">
                    <div className="backIcon">
                        <IconButton style={{ backgroundColor: "#ffffff", marginRight: "20px" }}>  <ArrowBack style={{ color: '#007fff' }} /></IconButton>
                    </div>
                    <Typography className="Typography" >Create Post</Typography>
                </div>
                <div>

                    {
                        progress > 1 ? <Box sx={{ width: '100%', marginTop: '25px' }}>
                            <LinearProgress variant="buffer" value={progress} />
                        </Box> : null
                    }
                </div>
                <div className="content">
                    <div>

                        <div className="img">
                            <img src={ProfilePhotos ? ProfilePhotos[ProfilePhotos.length - 1] : null} alt="" />
                        </div>

                    </div>
                    <div className='w-100'>
                        <div>
                            <span className="fw-bold">{userData.name}</span>

                            {
                                (tag.length > 0 || location) ? <span > is {tag.length > 0 ? <span >with <span className="fw-bold">{tag[0].user.name}</span></span> : null} {tag.length > 1 ? <span className="fw-bold">and <span>{tag.length - 1}</span> others</span> : null} {location ? <span>in <span className="fw-bold">{location}</span> </span> : null}</span> : null
                            }






                        </div>

                        <textarea name="" id="" placeholder="Create a Post" onChange={TextOnChange}></textarea>
                    </div>
                </div>


                <div className="imagePreview">
                    {
                        Blobfiles.length || video.length > 0 ? (
                            <>
                                <Swiper pagination={true} className="mySwiper">

                                    {
                                        Blobfiles.map((item) => {
                                            return (
                                                <SwiperSlide>
                                                    <div className="imgOne">
                                                        <img className="mx-auto  " src={item} alt="" />

                                                    </div></SwiperSlide>

                                            )
                                        })
                                    }
                                    {
                                        video?.map((vi) => {
                                            let blob = URL.createObjectURL(vi)
                                           
                                            return (
                                                <SwiperSlide> <video autoPlay muted className=""> <source src={blob} />This browser doesn't support video tag.</video> </SwiperSlide>
                                            )

                                        })
                                    }



                                </Swiper>
                            </>
                        ) : null
                    }
                    



                </div>


                <div className="addtoPost">
                    <Typography>Add to Your Post</Typography>
                    <div>


                        <label htmlFor="contained-button-file">
                            <Input accept="image/*" id="contained-button-file" multiple onChange={onInputChange} type="file" />

                            <IconButton style={{ backgroundColor: '#D0FAE4', marginRight: 10 }} aria-label="upload picture" component="span"><AddToPhotos style={{ color: "#06966A" }} /></IconButton>
                        </label>
                        <label htmlFor="contained-button-video">
                            <Input accept="video/*" id="contained-button-video" multiple onChange={handleDrop} type="file" />

                            <IconButton style={{ backgroundColor: '#ffb30999', marginRight: 10 }} aria-label="upload video" component="span"><VideoLibrary style={{ color: "#fff" }} /></IconButton>
                        </label>
                        <IconButton style={{ backgroundColor: '#FEE2E2', marginRight: 10 }} onClick={() => setSelected('location')}><AddLocationAlt style={{ color: "#DD2726" }} /></IconButton>
                        <IconButton style={{ backgroundColor: '#DBEBFF', marginRight: 10 }} onClick={() => setSelected('tagFriend')}><PersonAdd style={{ color: "#2764EA" }} /></IconButton>





                    </div>
                </div>
                <span className="error">{error} </span>
                <div className="footer">
                    <div className="p-3">

                        {
                            selected === 'location' ? <AutoComplete setLocation={setLocation} /> : null
                        }
                        {
                            selected === 'tagFriend' ? <TagFriend userId={userData._id} setTag={setTag} /> : null
                        }
                    </div>


                    <div className="buttons p-3" >
                        <Button variant="outlined" className="me-4">Cancel</Button>
                        <Button variant="contained" onClick={onSubmit} disabled={send}>POST</Button>
                    </div>

                </div>




            </div>

        </div>
    )

}

export default CreatePost








