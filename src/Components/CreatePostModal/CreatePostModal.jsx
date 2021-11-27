import React from 'react'
import './CreatePostModal.css'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Typography, IconButton } from '@mui/material';
import { CloseRounded} from '@mui/icons-material';
import Modal from '@mui/material/Modal';


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
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <div className='CreatePostModal'>

            <Button onClick={handleOpen}>Open modal</Button>
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
                        <IconButton size='large' style={{ backgroundColor: '#eeeeee' }}>
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
                        <textarea name="" id="" rows='5' placeholder='TEXT  HERE............'></textarea>
                        <div className="img">
                            <img src="" alt="" />
                        </div>
                    </div>

                    <div className="footer">
                        <Button className="btn" variant='contained'> POST IT</Button>
                    </div>


                    
                </Box>
            </Modal>
        </div>
    )
}

export default CreatePostModal
