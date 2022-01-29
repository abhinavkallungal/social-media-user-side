import Settings from '@mui/icons-material/Settings'
import { Button, IconButton } from '@mui/material'
import React, { useEffect } from 'react'
import './Stories.css'
import { getStoriesSideBar } from '../../Axios'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {setselectedStorySlice} from '../../Redux/selectedStorySlice'
import userAvathar from '../../Assets/userAvathar.jpg'



function SideBar() {

    const dispatch =useDispatch()


    const state = useSelector(state => state.user.user)
    let user = state
    let history =useHistory()
    const [profilePhoto, setProfilePhoto] = useState()

    useEffect(() => {
        console.log(user);
        setProfilePhoto(user.ProfilePhotos?.slice(-1)[0])

    }, [user])
    const [stories,setStories]=useState(null)

    useEffect(() => {
        getStoriesSideBar().then((data)=>{
            setStories(data.stories);
        })
    }, [])

    const viewStories=(id)=>{
        dispatch(setselectedStorySlice(id))

        history.push('/viewStories')
    }




    return (
        <div className="SideBar ">
            <div className="d-flex justify-content-between align-items-center">
                <h3>
                    Your Stories
                </h3>
                <IconButton size='large' style={{ backgroundColor: "#eeeeee" }}>
                    <Settings style={{ color: "#111111" }} />
                </IconButton>

            </div>
            <div>
                <div className="profile" onClick={viewStories}>
                    <div className="img">
                        <img src={profilePhoto?profilePhoto:userAvathar} alt="" />
                    </div>
                    <div>
                        <span>{user?.name}</span>
                    </div>
                </div>
            </div>
            <hr />
            <div>
                {
                    stories?.map((item, Index) => {
                        console.log(item);
                        return(

                            <div className="profile" onClick={()=>viewStories(item._id)}>
                            <div className="img">
                                <img src={item?.user?.ProfilePhotos ?item?.user?.ProfilePhotos :userAvathar} alt="" />
                            </div>
                            <div>
                                <span>{item?.user?.name}    </span>
                            </div>
                        </div>
                            )

                    })
                }
            </div>




        </div>
    )
}

export default SideBar
