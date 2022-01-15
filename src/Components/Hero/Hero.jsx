import React, { useState, useRef , useCallback } from 'react'
import './Hero.css'
import { Grid } from '@mui/material'
import ProfileCard from '../ProfileCard/ProfileCard'
import { makeStyles } from '@mui/styles';
import SideNav from '../SideNav/SideNav';
import SidebarBanner from '../SidebarBanner/SidebarBanner';
import RequestCard from '../RequestCard/RequestCard';
import Addpost from './AddPost/Addpost';
import { useSelector } from 'react-redux';

import HeroStorySection from '../Hero/HeroStorySection/HeroStorySection';
import ViewPostCard from '../ViewPostCard/ViewPostCard';
import FeedSkeleton from '../Skeletons/FeedSkeleton/FeedSkeleton';

import PostScroll from './PostScroll'
import RightSide from './RightSide';

const useStyles = makeStyles({
    left: {
        padding: '20px',


    },
    right: {
        padding: '20px'

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
    const classes = useStyles()
    const user = (useSelector((state) => state.user.user))
    const data = user


    const [page, setPage] = useState(1)

    const { posts, hasMore, loading, error } = PostScroll({page,userId:data._id})

    const observer = useRef()
    const lastPostRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPageNumber => prevPageNumber + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])



    



    return (
        <div className="Hero">
            <Grid container>

                <Grid item xs={12} md={2.5} sx={{ display: { xs: 'none', md: 'none', lg: 'block' } }} className={classes.left} >
                    <div style={{ position: 'sticky', top: '-150px' }}>

                        <ProfileCard />
                        <SideNav />
                        <SidebarBanner />
                    </div>
                </Grid>
                <Grid item xs={12} md={6.5} className="mx-auto">
                    <HeroStorySection />
                    <Addpost user={data} />

                  
                    {
                        loading ? <div> <FeedSkeleton /> <FeedSkeleton />  <FeedSkeleton /></div> : null
                    }

                    {posts.map((post, index) => {
                        if (posts.length === index + 1) {

                            return <div ref={lastPostRef} key={index}><ViewPostCard post={post} user={user} /></div>
                        } else {
                            return <ViewPostCard post={post} user={user} /> 
                        }
                    })}
                    <div>{loading && 'Loading...'}</div>
                    <div>{error && 'Error'}</div>



                </Grid>
                <Grid item xs={12} md={3} sx={{ display: { xs: 'none', md: 'none', lg: 'block' } }} className={classes.right} >
                    <div style={{ position: 'sticky', bottom: '100vh' }}>
                       <RightSide user={data}/>
                       
                    </div>

                </Grid>



            </Grid>
        </div>
    )
}

export default Hero 
