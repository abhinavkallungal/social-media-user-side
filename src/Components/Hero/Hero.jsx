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
import { getAllpost } from '../../Axios';
import PostReportModal from '../PostReportModal/PostReportModal'
import FeedSkeleton from '../Skeletons/FeedSkeleton/FeedSkeleton';

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
    const user =(useSelector((state) =>  state.user.user))
    const data= user
    const post  = useSelector(state => state.newPost)
    const[posts,SetPosts]=useState([])
    const[loding,SetLoding]=useState(false)
    useEffect(() => {
        SetLoding(true)
        console.log(data);
        getAllpost({userId:data?._id}).then((posts)=>{
            SetPosts(posts)
         
            SetLoding(false)
        })

       
    }, [])
   
    

    return (
        <div className="Hero">
                <Grid container>

                <Grid item xs={12} md={2.5} sx={{ display: { xs: 'none', md: 'none', lg: 'block' } }}  className={classes.left} >
                    <div style={{position:'sticky',top:'-150px'}}>

                    <ProfileCard />
                    <SideNav/>
                    <SidebarBanner/>
                    </div>
                </Grid>
                <Grid item xs={12} md={6.5}  className="mx-auto">
                   <HeroStorySection/>
                    <Addpost/> 
                    {
                        post.post ? <ViewPostCard key={1} post={post.post} user={user}/> : null

                    }
                    {
                        posts.map((post,index)=>{
                            return <ViewPostCard post={post} user={user}/> 

                        })
                    }
                    {
                        loding? <div> <FeedSkeleton/> <FeedSkeleton/>  <FeedSkeleton/></div>  :null
                    }
                   
                   
                    
                </Grid>
                <Grid item xs={12} md={3} sx={{ display: { xs: 'none', md: 'none', lg: 'block' } }} className={classes.right} >
                <div style={{position:'sticky',top:'100px'}}>                
                    <RequestCard/>
                    <RequestCard/>
                    <PostReportModal/>
                </div>
                    
                </Grid>
                
                

            </Grid>
        </div>
    )
}

export default Hero
