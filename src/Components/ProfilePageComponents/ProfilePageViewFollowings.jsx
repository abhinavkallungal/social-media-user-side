import React, { useEffect, useState } from 'react'
import './ProfilePageComponents.css'
import { getFollowings } from "../../Axios"
import { useHistory } from 'react-router-dom'


function ProfilePageViewFollowings({ user }) {
    const [followings, setFollowings] = useState([])
    let history = useHistory()

    useEffect(() => {
        getFollowings({ userId: user._id }).then((data) => {
            setFollowings( data.followings)

        }).catch(() => {

        })

    }, [user])


    return (
        <div className="getFollowers" >

            <div className="row">
                {
                    followings?.map((following) => {
                        console.log(following)
                        console.log(followings)

                        return (

                            <div className="col-md-6">
                                <div className="card" onClick={() => history.push(`/profile/${following._id}`)}>

                                    <div className="img">
                                        <img src={following?.ProfilePhotos ? following?.ProfilePhotos : null} alt="" />
                                    </div>
                                    <div>
                                        <span className="fw-bold">{following?.name}</span>
                                        <p>@{following?.username}</p>
                                    </div>

                                </div>
                            </div>
                        )

                    })
                }

            </div>
        </div>
    )
}

export default ProfilePageViewFollowings
