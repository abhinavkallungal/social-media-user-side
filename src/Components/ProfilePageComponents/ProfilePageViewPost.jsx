import React, {useState, useEffect } from 'react'
import ViewPostCard from '../ViewPostCard/ViewPostCard'


function ProfilePageViewPost({ posts,user }) {



    return (
        <div className='ProfilePageViewPost'>
            {
                posts !== null ? posts.map((post) => { return <ViewPostCard post={post} user={user} /> }) : null

            }

        </div>
    )
}

export default ProfilePageViewPost
