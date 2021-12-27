import React, { useEffect, useState } from 'react'

import {getTagedPost} from "../../Axios"
import ViewPostCard from '../ViewPostCard/ViewPostCard'


function ProfilePageTagedPost({user}) {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        getTagedPost({userId:user._id}).then((data) => {
            setPosts(data.TagedPost);


        }).catch((error) => {
            console.log(error);
        })

    }, [user])




    return (
        <div className="ProfilePageTagedPost">
             {
                posts !== null ? posts.map((post) => { return <ViewPostCard post={post} user={user} /> }) : null

            }
        </div>
    )
}

export default ProfilePageTagedPost
