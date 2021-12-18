import React, { useState,useRef } from 'react'
import './AddProfilePhoto.css'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Typography, IconButton } from '@mui/material/';
import { CloseRounded } from "@mui/icons-material"
import Modal from '@mui/material/Modal'
import uploadSVG from '../../Assets/undraw_add_files.svg'
import ReactCrop, { makeAspectCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import S3FileUpload from 'react-s3'
import {PhotoCamera} from '@mui/icons-material'
import {addProfilePhoto} from '../../Axios'
import { useSelector,useDispatch } from 'react-redux';
import { loginAction } from "../../Redux/userSlice";





const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px'

};

const config = {
    bucketName: process.env.REACT_APP_S3_BUCKET_NAME,
    dirName: 'profiephotos',
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY
}







function AddProfilePhoto() {
    const currentuser = (useSelector((state) => state.user.user))
    const dispatch=useDispatch()


    const [open, setOpen] = React.useState(false);
    const [file, setFile] = useState(null)
    const [src, setSrc] = useState(null)
    const [cropImageUrl, setCropImageUrl] = useState(null)
    const [cropImage, setCropImage] = useState(null)
    const [crop, setCrop] = useState({  unit: '%', width: 30, aspect: 9 / 9 }    )
    const [imageRef,setImageRef] =useState(null)



    const handleOpen = () => setOpen(true);
    const handleClose = () => {

        setOpen(false);
        setFile(null)
    }

    const openFile = (e) => {
        document.getElementById('input').click()
    }

    const fileChange = (e) => {
        setFile(e.target.files[0])
        const reader = new FileReader()
        reader.addEventListener(
            'load',
            () => setSrc(reader.result)

        )
        reader.readAsDataURL(e.target.files[0])
    }


    const onImageLoaded = image => {
        
        setImageRef(image)
    }

    

    const onCropComplete = crop => {
        if (imageRef && crop.width && crop.height) {
            console.log("onCropComplete2");
            const croppedImageUrl = getCroppedImg(imageRef, crop)
            setCropImageUrl(cropImageUrl)
        }
    }

    const onCropChange = crop => {
        setCrop(crop)
    }

    const getCroppedImg=(image, crop)=>{
        console.log("getCroppedImg");
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");
        
        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
         )
    
        const reader = new FileReader()
        canvas.toBlob(blob => {
            let name=+ new Date()
            reader.readAsDataURL(blob)
            reader.onloadend = () => {
                dataURLtoFile(reader.result, `${name}.jpg`)
            }
        })
    }

    const  dataURLtoFile=(dataurl, filename)=> {
        console.log("dataURLtoFile");
        let arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
                
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        let croppedImage = new File([u8arr], filename, {type:mime});
        setCropImage(croppedImage)
        console.log("croppedImage",croppedImage);
    }

    const handleUpload = () => {
        console.log(cropImage);
        handleClose()
        S3FileUpload.uploadFile(cropImage, config).then((data) => {
           console.log(data);

           addProfilePhoto({profilePhoto:data.location,currentuserId:currentuser._id}).then((user)=>{
            dispatch(loginAction(user))

           })

        }).catch((err) => {
            console.log(err);

        })
       
    };

    return (
        <div className='AddPro'>
            <IconButton  style={{ backgroundColor: "#ffffff50" }} onClick={handleOpen}>  <PhotoCamera />  </IconButton> 
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='box'>
                    <div className="header d-flex justify-content-between align-items-center mb-4"   >
                        <Typography variant='h6' component="h2" style={{ fontWeight: 'bold' }} >Add Profile Photo</Typography>
                        <IconButton size='large' style={{ backgroundColor: '#eeeeee' }} onClick={handleClose}>
                            <CloseRounded />
                        </IconButton>

                    </div>

                    {
                        file ?<div>

                        <ReactCrop
                            src={src}
                            crop={crop}
                            onImageLoaded={onImageLoaded}
                            onComplete={onCropComplete}
                            onChange={onCropChange}
                        />  
                        <Button onClick={()=>{onCropComplete(crop)}}>crop</Button>
                        <Button onClick={handleUpload}>save</Button>
                        <img src={cropImageUrl} alt="" />
                        </div>
                        
                        : <div className='content d-flex align-items-center   justify-content-center' >

                            <div className="img" onClick={openFile}>
                                <img src={uploadSVG} alt="" />
                                <input type="file" accept="image/*" id='input' style={{ display: "none" }} onChange={fileChange} />
                            </div>

                        </div>
                    }




                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>
            </Modal>
        </div>


    )
}

export default AddProfilePhoto
