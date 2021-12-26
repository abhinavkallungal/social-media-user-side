import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import { Typography, IconButton } from '@mui/material/';
import { CloseRounded } from "@mui/icons-material"
import Modal from '@mui/material/Modal'
import { getTagsDetailes } from '../../Axios';


import './ViewPostCard.css'
import { Link,useHistory } from 'react-router-dom';











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









function ViewTages(props) {
    const [open, setOpen] = React.useState(false);
    const [tag, setTag] = useState([])
    const history =useHistory()





    const handleOpen = () => {

        getTagsDetailes({ postId: props.postId }).then((data) => {
            console.log(data);
            setTag(data)

        }).catch((error) => {
            console.log(error);

        })
        setOpen(true);
    }

    const handleClose = () => {

        setOpen(false);
    }

    const goToProfile =(id)=>{
        setOpen(false);
        history.push(`/profile/${id}`)

    }









    return (
        <span className='ViewTags'>
            <span style={{ backgroundColor: "#ffffff50" }} onClick={handleOpen}> {props.children}  </span>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='box'>
                    <div className="header d-flex justify-content-between align-items-center mb-4"   >
                        <Typography variant='h6' component="h2" style={{ fontWeight: 'bold' }} >This Post Tag with</Typography>
                        <IconButton size='large' style={{ backgroundColor: '#eeeeee' }} onClick={handleClose}>
                            <CloseRounded />
                        </IconButton>
                    </div>

                    <div className="tags">
                        {
                            (tag?.length > 0) ?

                                tag.map((item) => {
                                    return (
                                        <div className="tag" onClick={()=>goToProfile(item._id)}>

                                            <div className="img">
                                                <img src={item.ProfilePhotos} alt="" />
                                            </div>
                                            <p className="name">{item.name}</p>
                                        </div>

                                    )
                                })

                                : null
                        }


                    </div>







                </Box>
            </Modal>
        </span>


    )
}

export default ViewTages
