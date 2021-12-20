import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Typography, IconButton } from '@mui/material/';
import { CloseRounded } from "@mui/icons-material"
import Modal from '@mui/material/Modal'
import { useSelector } from 'react-redux';


import {InputLabel,TextField} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { doReport } from '../../Axios';









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









function PostReportModal({userId,postId}) {
    const [open, setOpen] = React.useState(false);
    const[message,setMessage]=useState("")
    const[option,setOptin]=useState("")





    const handleOpen = () => setOpen(true);
    const handleClose = () => {

        setOpen(false);
    }

    const handleChange = (event) => {
        setOptin(event.target.value);
    };
    const handleSubmit=()=>{

        doReport({userId,postId,option,message}).then(()=>{
            handleClose()
        }).catch(()=>{
            handleClose()

        })

        
    }





    return (
        <div className='AddPro'>
            <Button style={{ backgroundColor: "#ffffff50" }} onClick={handleOpen}>  Report Post  </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='box'>
                    <div className="header d-flex justify-content-between align-items-center mb-4"   >
                        <Typography variant='h6' component="h2" style={{ fontWeight: 'bold' }} >Report Post</Typography>
                        <IconButton size='large' style={{ backgroundColor: '#eeeeee' }} onClick={handleClose}>
                            <CloseRounded />
                        </IconButton>
                    </div>
                    <div>
                        <Typography variant='h6' component="h2"  > Please select a problem</Typography>
                        <Typography variant='body2'  >If someone is in immediate danger, get help before reporting to Facebook. Don't wait.</Typography>
                    </div>
                    <div  className="mt-4">
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Select a problem</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={option}
                                label="Select a problem"
                                onChange={handleChange}
                            >
                                <MenuItem value="nudity">Nudity</MenuItem>
                                <MenuItem value="Violence">Violence</MenuItem>
                                <MenuItem value="Harassment">Harassment</MenuItem>
                                <MenuItem value="Spam">Spam</MenuItem>
                                <MenuItem value="Something else" >Something else</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth className='mt-3'>
                            <TextField
                                id="outlined-multiline-static"
                                label="Message"
                                multiline
                                rows={4}
                                value={message}
                                onChange={(e)=>setMessage(e.target.value)}
                            />
                        </FormControl>

                    </div>




                    <div className="d-flex align-items-end justify-content-end mt-2">
                        <Button color="warning" variant='contained' className='me-3' onClick={handleClose}>Cancel</Button>
                        <Button color="success" variant='contained' onClick={handleSubmit}>Report</Button>
                    </div>
                    <span style={{color:"red"}}></span>
                </Box>
            </Modal>
        </div>


    )
}

export default PostReportModal
