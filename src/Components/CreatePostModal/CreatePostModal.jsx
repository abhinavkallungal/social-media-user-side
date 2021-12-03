import React, { useState } from 'react'
import './CreatePostModal.css'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Typography, IconButton } from '@mui/material';
import { CloseRounded } from '@mui/icons-material';
import Modal from '@mui/material/Modal';
import { createPost } from '../../Axios'
import S3FileUpload from 'react-s3'
import { useSelector, useDispatch } from 'react-redux';
import { setNewPostAction } from '../../Redux/newPostSlice'
import { useHistory } from 'react-router-dom';




const config = {
    bucketName: 'socialmedia-posts',
    dirName: 'posts', /* optional */
    region: 'us-west-1',
    accessKeyId: 'AKIAVVVY46DQ7X6LQLMZ',
    secretAccessKey: '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'
}


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px'

};





function CreatePostModal() {

    const dispatch = useDispatch()
    const history = useHistory()

    const [open, setOpen] = React.useState(false);
    const [image, setImage] = React.useState('');

    const user =useSelector(state => state.user.user)
    const [post, setPost] = useState({ desc: "", files: "" })


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    const handleDisc = (e) => {
        console.log(post);
        setPost({ ...post, desc: e.target.value })

    }

    const imageChange = (e) => {
        const file = URL.createObjectURL(e.target.files[0])
        setImage(file)

        S3FileUpload.uploadFile(e.target.files[0], config).then((data) => {
            console.log(data);
            setPost({ ...post, files: data.location })

        }).catch((err) => {
            console.log(err);
        })

    }

    const handlePost = (e) => {
        console.log(post);

        if (post.desc === '' && post.files === '') {

        } else {
            createPost({ ...post, Accessibility: 'Public', userId: user._id }).then((data) => {
                console.log(data);
                dispatch(setNewPostAction(data))
                setOpen(false)

            }).catch((err) => {
                if (err.response.status == 403) {
                    localStorage.removeItem("token");
                    
                    history.push('/feed')
                }
            })

        }

    }


    return (
        <div className='CreatePostModal'>
            <Button onClick={handleOpen} className='modalbtn' style={{ color: '#ffffff' }} >Create Post</Button>

            <Modal
                className='modal'
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='Box' >
                    <div className="header" >
                        <Typography variant='h6' component="h2" style={{ fontWeight: 'bold' }} >Create Post</Typography>
                        <IconButton size='large' style={{ backgroundColor: '#eeeeee' }} onClick={handleClose}>
                            <CloseRounded />
                        </IconButton>

                    </div>
                    <div className="profile">
                        <div className="img">
                            <img src="https://source.unsplash.com/user/erondu/50x50" alt="" />
                        </div>
                        <div className="pro">
                            <span>Abhinav Kallungal</span>
                            <div>

                                <select className='select' >
                                    <option className='option' value="volvo">   PUBLIC</option>
                                    <option className='option' value="saab">PRIVET</option>

                                </select>
                            </div>

                        </div>
                    </div>
                    <div className="content">
                        <textarea name="" id="" rows='5' onChange={handleDisc} placeholder='TEXT  HERE............'></textarea>
                        <div className="img" >
                            <input type="file" onChange={imageChange} />
                            <img src={image} alt="" />
                        </div>
                    </div>

                    <div className="footer">
                        <Button onClick={handlePost} className="btn" variant='contained'> POST IT</Button>
                    </div>



                </Box>
            </Modal>
        </div>
    )
}

export default CreatePostModal
