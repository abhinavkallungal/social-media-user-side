import React, { useState, useEffect, useRef } from 'react'
import { AddLocationAlt, AddToPhotos, ArrowBack, PersonAdd, SearchOutlined } from '@mui/icons-material'
import { InputBase, Typography, TextField, Button, IconButton, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import { styled } from '@mui/material/styles';
import S3FileUpload from 'react-s3'
import { createPost } from '../../Axios'
import { useSelector, useDispatch } from 'react-redux';





import './CreatePost.css'
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import SwiperCore, {Pagination} from 'swiper';

// install Swiper modules



// Import Swiper styles
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import { useHistory } from 'react-router';
SwiperCore.use([Pagination]);


const Input = styled('input')({
    display: 'none'
});

const config = {
    bucketName: process.env.REACT_APP_S3_BUCKET_NAME,
    dirName: process.env.REACT_APP_S3_DIR_NAME, /* optional */
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY
}





function CreatePost() {
    const [length, setLength] = useState(0)
    const [Blobfiles, setBlobFiles] = useState([])
    const [orgfiles, setOrgFiles] = useState([])
    const [formData, setFormData] = useState({})
    const [text, setText] = useState("")
    const [access, setAccess] = useState('PUBLIC')
    const [result, setResult] = useState([])
    const [error, setError] = useState("")

    let array = []
    const user = useSelector(state => state.user.user)
    const history=useHistory()



    const onInputChange = (event) => {
        let newFiles = []
        console.log(1);
        if (event.target.files !== 0) {
            const files = event.target.files;
            setOrgFiles(files)

            console.log(2);
            let file

            for (let i = 0; i < files.length; i++) {
                file = URL.createObjectURL(files[i])
                newFiles = [...newFiles, file]
                setBlobFiles(newFiles)
                console.log(file);
            }
            console.log(5);


        }
        console.log(4);
        console.log(newFiles);
    }
    const TextOnChange = (e) => {
        setText(e.target.value)
    }
    const Accesschange = (e) => {
        setAccess(e.target.value)
    }


    const onSubmit = (event) => {
        event.preventDefault();
        console.log(text, orgfiles.length);


        if (text === "" && orgfiles.length === 0) {
            setError("post is empty")

        } else if(orgfiles.length !== 0){
            console.log("post with files    ");
            setError("")

            for (let i = 0; i < orgfiles.length; i++) {

                handleUpload(orgfiles[i]);

            }



        }else{
            setError("")
            console.log("only test");
            createPost({ desc: text, Accessibility: access, userId: user._id}).then((data) => {
                history.push('/')

            }).catch((err) => {
                if (err.response.status == 403) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                }
                setError(err.message)
            })

        }


    }


    const handleUpload = (file) => {
        S3FileUpload.uploadFile(file, config).then((data) => {
            console.log(data.location);
            array.push(data.location)
            console.log("test");

            if (orgfiles.length === array.length) {
                console.log("upload completed");
                createPost({ desc: text, Accessibility: access, userId: user._id, files: array }).then((data) => {
                    history.push('/')
    
                }).catch((err) => {
                    if (err.response.status == 403) {
                        localStorage.removeItem("token");
                    }
                    setError(err.message)
                })
            }

        }).catch((err) => {

        })
       
    };



    return (
        <div className="CreatePost" >

            <div className="card">
                <div className="Head">
                    <div className="backIcon">
                        <IconButton style={{ backgroundColor: "#ffffff", marginRight: "20px" }}>  <ArrowBack style={{ color: '#007fff' }} /></IconButton>
                    </div>
                    <Typography className="Typography" >Create Post</Typography>
                </div>
                <div className="content">
                    <div>

                        <div className="img">s
                            <img src="" alt="" />
                        </div>
                    </div>
                    <textarea name="" id="" placeholder="Create a Post" onChange={TextOnChange}></textarea>
                </div>

                <div className="imagePreview">
                    {
                        Blobfiles.length > 1 ? (
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

                                </Swiper>
                            </>
                        ) : null
                    }
                    {
                        Blobfiles.length === 1 ? (
                            <div className="imgOne">
                                <img className="mx-auto  " src={Blobfiles[0]} alt="" />

                            </div>

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
                        <IconButton style={{ backgroundColor: '#FEE2E2', marginRight: 10 }}><AddLocationAlt style={{ color: "#DD2726" }} /></IconButton>
                        <IconButton style={{ backgroundColor: '#DBEBFF', marginRight: 10 }}><PersonAdd style={{ color: "#2764EA" }} /></IconButton>





                    </div>
                </div>
                <span className="error">{error} </span>
                <div className="footer">
                    <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-filled-label">Access</InputLabel>
                        <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            onChange={Accesschange}

                        >

                            <MenuItem value="PUBLIC">PUBLIC</MenuItem>
                            <MenuItem value="PRIVATE">PRIVATE</MenuItem>
                        </Select>
                    </FormControl>
                    <div>
                        <Button variant="outlined" className="me-4">Cancel</Button>
                        <Button variant="contained" onClick={onSubmit}>POST</Button>
                    </div>
                </div>



            </div>

        </div>
    )

}

export default CreatePost








