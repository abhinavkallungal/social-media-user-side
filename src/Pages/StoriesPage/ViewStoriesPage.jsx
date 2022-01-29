import React, { useEffect, useState } from 'react'
import Appbar from '../../Components/Appbar/Appbar'
import { Grid } from '@mui/material'
import SideBar from '../../Components/Stories/SideBar'
import ViewStories from '../../Components/Stories/ViewStories'
import BottomBar from '../../Components/BottomBar/BottomBar'
import { getALLStories } from '../../Axios'






function ViewStoriesPage() {
    const [stories, setStories] = useState([])
    useEffect(() => {

        getALLStories().then((data) => {
            setStories(data.stories)
        })

    }, [])

    return (
        <div>
            <Appbar />
        <Grid container>

            <Grid item xs={12} md={3} sx={{ display: { xs: 'none', md: 'none', lg: 'block' } }} className='p-4 mt-5' >
                <div style={{ position: 'sticky', top: '-150px' }}>
                    <SideBar stories={stories} />


                </div>
            </Grid>
            <Grid item xs={12} md={9} className=" mt-4 mx-auto">
                <ViewStories stories={stories}/>

            </Grid>




        </Grid>
        <BottomBar />

            
        </div>
    )
}

export default ViewStoriesPage
