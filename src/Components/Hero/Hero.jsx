import React,{useEffect,useState} from 'react'
import './Hero.css'
import {Grid} from '@mui/material'
import ProfileCard from '../ProfileCard/ProfileCard'
import { makeStyles } from '@mui/styles';
import SideNav from '../SideNav/SideNav';
import SidebarBanner from '../SidebarBanner/SidebarBanner';
import RequestCard from '../RequestCard/RequestCard';
import Addpost from '../AddPost/Addpost';
import { useSelector } from 'react-redux';

import HeroStorySection from '../HeroStorySection/HeroStorySection';
import ViewPostCard from '../ViewPostCard/ViewPostCard';
import CreatePostModal from '../CreatePostModal/CreatePostModal';
import { getAllpost } from '../../Axios';

const useStyles = makeStyles({
    left: {
       padding:'20px',


    },
    right: {
        padding:'20px'
 
     },
    navItem: {
        maxWidth: '42px',
        maxHeight: '42px',
        minWidth: '42px',
        minHeight: '42px',
        borderRadius: 10,
        backgroundColor: "#f1f1f1",
        padding: 0,
    },
    root: {
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
        color: '#ffffff',
        height: 42,
        padding: '0 30px',
    },
});

function Hero() {
    const classes=useStyles()
    const post  = useSelector(state => state.newPost)
    const[posts,SetPosts]=useState([])
    useEffect(() => {
        getAllpost().then((posts)=>{
            SetPosts(posts)
        })

       
    }, [])
    

    return (
        <div className="Hero">
            <Grid container>

                <Grid item xs={12} md={2.5} sx={{ display: { xs: 'none', md: 'none', lg: 'block' } }} className={classes.left} >
                    <ProfileCard />
                    <SideNav/>
                    <SidebarBanner/>
                </Grid>
                <Grid item xs={12} md={6.5}  className="mx-auto">
                   <HeroStorySection/>
                    <Addpost/> 
                    {
                        post.post ? <ViewPostCard post={post.post}/> : null

                    }
                    {
                        posts.map((post)=>{
                            return <ViewPostCard post={post}/> 

                        })
                    }
                   
                    
                </Grid>
                <Grid item xs={12} md={3} sx={{ display: { xs: 'none', md: 'none', lg: 'block' } }} className={classes.right} >
                
                    <RequestCard/>
                    <RequestCard/>
                </Grid>
                
                

            </Grid>
        </div>
    )
}

export default Hero
