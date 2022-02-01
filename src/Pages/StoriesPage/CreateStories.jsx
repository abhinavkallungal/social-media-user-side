import React, { useState, useEffect } from 'react'
import './StoriesPage.css'
import { Grid, } from "@mui/material"
import SideBar from '../../Components/Stories/SideBar'
import Appbar from '../../Components/Appbar/Appbar'
import BottomBar from '../../Components/BottomBar/BottomBar'
import Preview from '../../Components/Stories/Preview'
import Choosefile from '../../Components/Stories/Choosefile'
import axios from 'axios'
import { useHistory } from "react-router-dom"
import { useSelector } from 'react-redux'



const chunkSize = 5 * 1024;



function CreateStories() {
    const [files, setFiles] = useState([]);
    const [currentFileIndex, setCurrentFileIndex] = useState(null);
    const [lastUploadedFileIndex, setLastUploadedFileIndex] = useState(null);
    const [currentChunkIndex, setCurrentChunkIndex] = useState(null);
    const [progress,setProgress] =useState(null)

    const history = useHistory()
     const data = useSelector(state => state.user.user)
     const user= data 


    const onInputChange = (e) => {

        e.preventDefault();
        setFiles([...files, ...e.target.files]);

    }

    const submit =(e)=>{
        e.preventDefault()
        if (files.length > 0) {
            if (currentFileIndex === null) {
                setCurrentFileIndex(
                    lastUploadedFileIndex === null ? 0 : lastUploadedFileIndex + 1
                );
            }
        }

    }


    

    

    function readAndUploadCurrentChunk() {
        const reader = new FileReader();
        const file = files[currentFileIndex];
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
        const file = files[currentFileIndex];
        const data = readerEvent.target.result;
        const params = new URLSearchParams();
        params.set('name', file.name);
        params.set('size', file.size);
        params.set('userId',user._id)
        params.set('currentChunkIndex', currentChunkIndex);
        params.set('totalChunks', Math.ceil(file.size / chunkSize));
        const token = localStorage.getItem("token")
        const headers = { 'Content-Type': 'application/octet-stream', Authorization: token  };
        const url = 'http://localhost:4000/api/v1/user/addStory?' + params.toString();
        axios.post(url, data, headers )
            .then(response => {
                const file = files[currentFileIndex];
                const filesize = files[currentFileIndex].size;
                const chunks = Math.ceil(filesize / chunkSize) - 1;
                const isLastChunk = currentChunkIndex === chunks;
                if (isLastChunk) {
                    file.finalFilename = response.data.finalFilename;
                    setLastUploadedFileIndex(currentFileIndex);
                    console.log(response);
                    setCurrentChunkIndex(null);
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
        const isLastFile = lastUploadedFileIndex === files.length - 1;
        const nextFileIndex = isLastFile ? null : currentFileIndex + 1;
        setCurrentFileIndex(nextFileIndex);
    }, [lastUploadedFileIndex]);

  

    useEffect(() => {
        if (currentFileIndex !== null) {
            setCurrentChunkIndex(0);
        }
    }, [currentFileIndex]);

    useEffect(() => {
        if (currentChunkIndex !== null) {
            readAndUploadCurrentChunk();
        }
        files?.map((file, fileIndex) => {
            setProgress(0)
            if (file.finalFilename) {
                setProgress(100) ;
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
      
    }, [currentChunkIndex]);



    return (
        <div className="CreateStories">
            <Appbar />
            <Grid container>

                <Grid item xs={12} md={3} sx={{ display: { xs: 'none', md: 'none', lg: 'block' } }} className='p-4 mt-5' >
                    <div style={{ position: 'sticky', top: '-150px' }}>
                        <SideBar />


                    </div>
                </Grid>
                <Grid item xs={12} md={9} className=" mt-4 mx-auto">
                    {
                       ( files?.length > 0 )?<Preview  files={files} submit={submit} progress={progress}  />  :<Choosefile onInputChange={onInputChange} />
                        
                    }

                </Grid>




            </Grid>
            <BottomBar />


        </div>
    )
}

export default CreateStories
