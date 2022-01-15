import { Add, SaveAs } from '@mui/icons-material'
import { Box, Button, Fab, IconButton, LinearProgress, SpeedDial, SpeedDialIcon, Typography } from '@mui/material'
import zIndex from '@mui/material/styles/zIndex'
import React from 'react'



import './Stories.css'


function Preview({ files, submit, progress }) {



    return (
        <div className="Preview">
            <Typography sx={{ display: { xs: 'none', md: 'block', lg: 'block' } }} variant='h4'>Preview</Typography>


            <div className="BlackScreen">

                <div className="screen">
                 
                    {
                        progress > 1 ?    <Box sx={{ width: '360px', height:'10px', marginTop: '25px' ,position:"absolute" ,top:"10px" ,zIndex:100}}>
                        <LinearProgress variant="buffer" value={progress} />
                    </Box> : null
                    }
                    {
                        files.map((file) => {

                            let blob = URL.createObjectURL(file)
                            let ext = file.type.split('/')
                            let type = ext[0]

                            if (type === 'image') return <img src={blob} alt="" />
                            if (type === 'video') return <video autoPlay muted className=""> <source src={blob} />This browser doesn't support video tag.</video>




                        })
                    }

                </div>
                <Fab color="primary" aria-label="add" sx={{ position: 'absolute', bottom: 16, right: 16 }} onClick={submit} >
                    <SaveAs />
                </Fab>


            </div>
        </div>
    )
}

export default Preview
