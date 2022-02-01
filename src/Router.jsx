import React, { useEffect, useState } from 'react'
import { Switch, Route, Redirect, useHistory, useLocation } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux'
import { loginAction } from "./Redux/userSlice"
import { setSoketAction } from './Redux/socketSlice'
import { setNotificationCountAction } from './Redux/notificationCountSlice'
import socket  from './Utils/socket'



import SignupPage from './Pages/SignupPage/SignupPage';
import Loginpage from './Pages/LoginPage/LoginPage'
import Feed from '../src/Pages/Feed/Feed'
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import SettingsPage from './Pages/SettingsPage/SettingsPage';
import AccountDetailsPage from './Pages/AccountDetailsPage/AccountDetailsPage';
import SearchPage from './Pages/SearchPage/SearchPage';
import CreatePostPage from './Pages/CreatePostPage/CreatePostPage';
import NotificationPage from './Pages/NotificationPage/NotificationPage'
import Swal from 'sweetalert2'
import SignUpPhone from './Pages/SignupPage/SignUpPhone';
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword';
import ForgotPasswordResat from './Pages/ForgotPassword/ForgotPasswordResat';
import AutoComplete from './Components/CreatePost/AutoComplete';
import ResetPasswordPage from './Pages/ResetPasswordPage/ResetPasswordPage';
import MessangerPage from "./Pages/MessengerPage/MessengerPage"
import MessangerHome from '../src/Pages/MessengerPage/MessengerHomePage'
import CreateStories from './Pages/StoriesPage/CreateStories';
import ViewStoriesPage from './Pages/StoriesPage/ViewStoriesPage';
import AddSocialAccountsPage from './Pages/AddSocialAccountsPage/AddSocialAccountsPage';
const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})









function Router() {


    const history = useHistory()
    const location = useLocation()
    const dispatch = useDispatch()




    const [Token, setToken] = useState(localStorage.getItem('token'));
    const user = JSON.parse(localStorage.getItem('user'))


    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('user'))
        //dispatch(setSoketAction(socket))
        console.log("routersoket", socket);



        socket.on("likemsg", (msg) => {
            alert(msg)
        })
        socket.on("sendLikeNotification", ({ notifications, unReadNotificationsCount }) => {
            dispatch(setNotificationCountAction(unReadNotificationsCount))

            Toast.fire({
                title: `${notifications.user.name} Liked Your Post`
            })
        })

        socket.on("sendCommentNotification", ({ notifications, unReadNotificationsCount }) => {
            dispatch(setNotificationCountAction(unReadNotificationsCount))
            Toast.fire({
                title: `${notifications.user.name} Commented Your Post`
            })
        })
        socket.on("save", (msg) => {
        })

        socket.emit("getNotificationCound", { userId: user?._id })

        socket.on('notificationCound', (notificationCound) => {
            console.log(notificationCound);
            dispatch(setNotificationCountAction(notificationCound.notification))

        })







    }, [user])






    useEffect(() => {
        console.log("router");
        const token = localStorage.getItem('token')
        if (token) {
            dispatch(loginAction(JSON.parse(localStorage.getItem('user'))))
            setToken(token)

            const decodedToken = jwtDecode(token)
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();

        } else {
            setToken(null)

        }

    }, [location])





    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        history.push('/login')
    }

    return (
        <Switch>


            <Route exact path="/">
                {Token ? <Feed /> : <Redirect to="/login" />}

            </Route>
            <Route exact path="/login">

                {Token ? <Redirect to="/" /> : <Loginpage />}
            </Route>

            <Route exact path="/signup">
                {Token ? <Redirect to="/" /> : <SignUpPhone />}
            </Route>
            <Route exact path="/emailSignup">
                {Token ? <Redirect to="/" /> : <SignupPage />}
            </Route>
            <Route exact path="/forgotPassword">
                {Token ? <Redirect to="/" /> : <ForgotPassword />}
            </Route>

            <Route path="/profile/:userId">
                {Token ? <ProfilePage /> : <Redirect to="/login" />}
            </Route>

            <Route path="/settings">
                {Token ? <SettingsPage /> : <Redirect to="/login" />}
            </Route>
            <Route path="/AccountDetails">
                {Token ? <AccountDetailsPage /> : <Redirect to="/login" />}
            </Route>
            <Route path="/search">
                {Token ? <SearchPage /> : <Redirect to="/login" />}
            </Route>
            <Route path="/createpost">
                {Token ? <CreatePostPage /> : <Redirect to="/login" />}
            </Route>
            <Route path="/notification">
                {Token ? <NotificationPage /> : <Redirect to="/login" />}
            </Route>
            <Route path="/test">
                {Token ?  <AutoComplete /> : <Redirect to="/login" />}

               

               
            </Route>
            <Route path="/passwordReset">
                {Token ? <ForgotPasswordResat /> : <Redirect to="/login" />}

                
            </Route>
            <Route path="/resetPasswords">
                {Token ? <ResetPasswordPage /> : <Redirect to="/login" />}

                
            </Route>
            <Route exact path="/Messenger">
                {Token ?  <MessangerHome />: <Redirect to="/login" />}

              
            </Route>
            <Route path="/Messenger/:userId">
                {Token ? <MessangerPage /> : <Redirect to="/login" />}

               
            </Route>

            <Route path="/createStories">
                {Token ?  <CreateStories /> : <Redirect to="/login" />}

               
            </Route>
            <Route path="/viewStories">
                {Token ?   <ViewStoriesPage />: <Redirect to="/login" />}

              
            </Route>
            <Route path="/AddSocialAccount">
                {Token ?  <AddSocialAccountsPage /> : <Redirect to="/login" />}

               
            </Route>




        </Switch>
    )
}

export default Router
