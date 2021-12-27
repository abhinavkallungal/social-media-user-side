import React, { useEffect, useState } from 'react'

import {getSavedPosts} from "../../Axios"
import ViewPostCard from '../ViewPostCard/ViewPostCard'


function ProfilePageSavedPost({user}) {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        getSavedPosts({userId:user._id}).then((data) => {
            setPosts(data.SavedPosts);


        }).catch((error) => {
            console.log(error);
        })

    }, [user])




    return (
        <div className="ProfilePageSavedPost">
             {
                posts !== null ? posts.map((post) => { return <ViewPostCard post={post} user={user} /> }) : null

            }
        </div>
    )
}

export default ProfilePageSavedPost
