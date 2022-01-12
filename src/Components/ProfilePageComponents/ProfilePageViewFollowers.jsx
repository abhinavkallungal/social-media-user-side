import React, { useEffect, useState } from 'react'
import './ProfilePageComponents.css'
import { getFollowers} from "../../Axios"
import { useHistory } from 'react-router-dom'


function ProfilePageViewFollowers({user}) {
        const[followers,setFollowers]=useState([])
        let history=useHistory()

        useEffect(()=>{
            getFollowers({userId:user._id}).then((data)=>{
                setFollowers(data.followers)

            }).catch(()=>{

            })

        },[user])


    return (
        <div className="getFollowers" >

                <div className="row">
                    {
                        followers.map((follower)=>{
                            console.log(follower);
                            return(

                                <div className="col-md-6">
                            <div className="card" onClick={()=>history.push(`/profile/${follower._id}`)}>
    
                                <div className="img">
                                    <img src={follower.ProfilePhotos?follower.ProfilePhotos:null} alt="" />
                                </div>
                                <div>
                                    <span className="fw-bold">{follower.name}</span>
                                    <p>@{follower.username}</p>
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

export default ProfilePageViewFollowers
