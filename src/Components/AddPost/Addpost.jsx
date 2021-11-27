import React from 'react'
import './Addpost.css'
import { InputBase, Button } from "@mui/material"
import IosShareRoundedIcon from '@mui/icons-material/IosShareRounded';


function Addpost() {
    return (
        <div className="Addpost">
            <div className='d-flex'>

                <img src="https://source.unsplash.com/user/erondu/50x50" alt="" />

                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    size='medium'
                    placeholder="What’s New, Abhinav? "
                    inputProps={{ 'aria-label': 'What’s New, Abhinav? ' }}
                />
            </div>
            <Button variant="contained" endIcon={<IosShareRoundedIcon />}>
                POST
            </Button>
        </div>
    )
}

export default Addpost
