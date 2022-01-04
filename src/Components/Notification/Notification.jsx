import React, { useState, useEffect } from 'react'
import { ArrowBack } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import './Notification.css'
import { getAllNotifications } from '../../Axios'
import { useSelector ,useDispatch} from 'react-redux'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { setNotificationCountAction } from '../../Redux/notificationCountSlice'





function Notification() {
    const user = (useSelector((state) => state.user.user))
    const socket = (useSelector((state) => state.socket.socket))
    const dispatch =useDispatch()
    const [notifications, setNotifications] = useState([])

    let userData = user
    console.log(userData);


    useEffect(() => {
        getAllNotifications({ userId: userData._id }).then((notification) => {
            setNotifications(notification)
           

        })


    }, [user])

    useEffect(() => {
        let  userId=userData._id
        socket.emit('notificationSeen', userId)
        dispatch(setNotificationCountAction(null))
    }, [socket])
    return (
        <div className="Notification">

            <div className="card ">
                <div className="Head">
                    <div className="backIcon">
                        <IconButton style={{ backgroundColor: "#ffffff", marginRight: "20px" }}>  <ArrowBack style={{ color: '#007fff' }} /></IconButton>

                    </div>
                    Notifications
                </div>
                <div className="notifications">
                    {
                        notifications ? notifications.map((item) => {
                            return (

                                (item.type === 'like') ? <LikeNotification notification={item} /> : (item.type === 'follow') ? <FollowNotification notification={item} /> : null

                            )


                        }) : null
                    }







                </div>




            </div>

        </div>
    )
}

export default Notification

const LikeNotification = ({ notification }) => {
    return (
        <div className={notification.read ? "notification read" : "notification"}>
            <div className="img">
                <img src={notification.user.ProfilePhotos} alt="" />
            </div>
            <div className="content">
                <p>
                    <Link className="name" to={`/profile/${notification.from}`} >{notification.user.name}  </Link>liked your Post
                </p>
                <span className="time"> {moment(notification.date).fromNow()} </span>
            </div>
        </div>
    )
}

const FollowNotification = ({ notification }) => {
    return (
        <div className={notification.read ? "notification read" : "notification"}>
            <div className="img">
                <img src={notification.user.ProfilePhotos} alt="" />
            </div>
            <div className="content">
                <p>
                    <Link className="name" to={`/profile/${notification.from}`} >{notification.user.name}  </Link>Started to Follow You
                </p>
                <span className="time"> {moment(notification.date).fromNow()} </span>
            </div>
        </div>
    )
}
