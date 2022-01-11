import { AddToPhotos } from '@mui/icons-material'
import { IconButton, Input } from '@mui/material'
import React from 'react'
import './Stories.css'


function Choosefile({onInputChange}) {
    return (
        <div className="Choosefile">
            <div className="select">
                <div className="d-flex flex-column align-items-center" >


                <label htmlFor="contained-button-file" >
                    <Input accept="image/*" id="contained-button-file"  onChange={onInputChange} style={{ display: "none" }} type="file" />

                    <IconButton style={{ backgroundColor: '#D0FAE4', marginRight: 10 }} aria-label="upload picture" component="span"><AddToPhotos style={{ color: "#06966A" }} /></IconButton>
                </label>
                    Create a Photo Story
                </div>


            </div>
        </div>

    )
}

export default Choosefile
