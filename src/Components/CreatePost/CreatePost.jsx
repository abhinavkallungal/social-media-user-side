import React, { useState, useEffect, useRef } from 'react'
import { AddLocationAlt, AddToPhotos, ArrowBack, PersonAdd, SearchOutlined } from '@mui/icons-material'
import { InputBase, Typography, TextField, Button, IconButton, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import { styled } from '@mui/material/styles';
import S3FileUpload from 'react-s3'
import { createPost } from '../../Axios'
import { useSelector, useDispatch } from 'react-redux';
import  AutoComplete from './AutoComplete'




import './CreatePost.css'
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import SwiperCore, {Pagination} from 'swiper';

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

const config={
    
}





function CreatePost() {
    const [length, setLength] = useState(0)
    const [Blobfiles, setBlobFiles] = useState([])
    const [orgfiles, setOrgFiles] = useState([])
    const [text, setText] = useState("")
    const [access, setAccess] = useState('PUBLIC')
    const [result, setResult] = useState([])
    const [error, setError] = useState("")
    const[location,setLocation]=useState("")
    const[selected,setSelected]=useState("")
    const[send,setsend]=useState(false)
    const[tag,setTag]=useState([])

    const formData =new FormData()
    let array = []
    const user = useSelector(state => state.user.user)
    const userData=user
    let ProfilePhotos=userData?.ProfilePhotos;

    const history=useHistory()



    const onInputChange = (event) => {
        let newFiles = []
        console.log(1);
        if (event.target.files.length !== 0) {
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


        }else{
            setOrgFiles([])
            setBlobFiles([])


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
        setsend(true)

        console.log(text, orgfiles.length);

        formData.append("desc",text)
        formData.append("Accessibility",access)
        formData.append("userId",user._id)
        formData.append("location",location)
        if(tag.length >0){
            console.log(tag);
            let array=[]

            tag.map((item)=>{

                array.push({_id:item.user._id,name:item.user.name})

            })
            formData.append('tag',JSON.stringify(array))

            
     
 

        }
      


        if (text === "" && orgfiles.length === 0) {
            setError("post is empty")
            setsend(false)


        } else if(orgfiles.length !== 0){
            console.log("post with files");
            setError("")

            

            for (let i = 0; i < orgfiles.length; i++) {
                formData.append('files',orgfiles[i])
            }
          
          

            createPost( formData).then((data) => {
                setsend(false)
                history.push('/')

            }).catch((err) => {
                setsend(false)
                if (err.response.status == 403) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                }
                setError(err.message)
            })



        }else{
            setError("")
            console.log("only test");
            createPost( formData).then((data) => {
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

    useEffect(() => {
        console.log(tag);
    }, [tag])




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

                        <div className="img">
                            <img src={ProfilePhotos ? ProfilePhotos[ProfilePhotos.length -1]:null} alt="" />
                        </div>
                        
                    </div>
                    <div className='w-100'>
                        <div>
                        <span className="fw-bold">{userData.name}</span>
                
                        {
                            (tag.length >0 || location)  ? <span > is { tag.length >0 ? <span >with <span className="fw-bold">{tag[0].user.name}</span></span>:null  } { tag.length >1 ? <span className="fw-bold">and <span>{tag.length-1}</span> others</span>:null  } {location ? <span>in <span className="fw-bold">{location}</span> </span> :null }</span>:null
                        }

                       


                      

                        </div>
                       
                    <textarea name="" id="" placeholder="Create a Post" onChange={TextOnChange}></textarea>
                    </div>
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
                        <IconButton style={{ backgroundColor: '#FEE2E2', marginRight: 10 }} onClick={()=>setSelected('location')}><AddLocationAlt style={{ color: "#DD2726" }} /></IconButton>
                        <IconButton style={{ backgroundColor: '#DBEBFF', marginRight: 10 }} onClick={()=>setSelected('tagFriend')}><PersonAdd style={{ color: "#2764EA" }} /></IconButton>





                    </div>
                </div>
                <span className="error">{error} </span>
                <div className="footer">
                    <div className="p-3">

                        {
                         selected==='location' ?   <AutoComplete setLocation={setLocation} /> : null
                        }
                        {
                          selected==='tagFriend' ? <TagFriend userId={userData._id} setTag={setTag} /> :null
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








