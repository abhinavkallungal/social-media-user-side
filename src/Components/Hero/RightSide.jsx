import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getFollowRequest, dofollow } from '../../Axios'
import RequestCard from '../RequestCard/RequestCard'
import SidebarBanner from '../SidebarBanner/SidebarBanner'





function RightSide({ user }) {
    const [requests, setRequests] = useState([])

    useEffect(() => {

        if (user._id !== undefined) {


            getFollowRequest({ userId: user?._id }).then((data) => {
                setRequests(data.followRequest)

            }).catch((error) => {

            })
        }
    }, [user?._id])

    const follow = (userId) => {

        let newRequests = requests.filter((item) => userId !== item._id)

        dofollow({ userId, currentuserId: user._id }).then((data) => {
            setRequests(newRequests)
        }).catch((err) => {

        })
    }
    return (
        <div>
            {
                requests.length < 1 ? <SidebarBanner /> : null
            }
            {
                requests?.map((request, index) => {

                    return <RequestCard follow={follow} request={request} />

                })
            }



        </div>
    )
}

export default RightSide
