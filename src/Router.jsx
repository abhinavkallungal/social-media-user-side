import React, { useEffect, useState } from 'react'
import {Switch,Route,Redirect,useHistory,useLocation} from "react-router-dom";
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux'
import { loginAction } from "./Redux/userSlice"
import {setSoketAction} from './Redux/socketSlice'
import { io, Socket } from "socket.io-client";




import SignupPage from './Pages/SignupPage/SignupPage';
import Loginpage from './Pages/LoginPage/LoginPage'
import Feed from '../src/Pages/Feed/Feed'
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import SettingsPage from './Pages/SettingsPage/SettingsPage';
import AccountDetailsPage from './Pages/AccountDetailsPage/AccountDetailsPage';
import SearchPage from './Pages/SearchPage/SearchPage';
import CreatePostPage from './Pages/CreatePostPage/CreatePostPage';
import TestPage from './Pages/TestPage/TestPage'
import NotificationPage from './Pages/NotificationPage/NotificationPage'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

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
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    let[socket,setSocket]=useState(null)

    
    useEffect(() => {
        let socket=io('http://localhost:4000', { transports: ['websocket', 'polling', 'flashsocket'] })
        dispatch(setSoketAction(socket))
        console.log("routersoket",socket);
        setSocket(socket)
        socket.on("connect", () => {
            console.log("connect",socket.id);
            if(user && socket) return socket.emit("login",{id:socket.id,userId:user._id}) 
        });
        socket.on("likemsg",(msg)=>{
            alert(msg)
        })
        socket.on("sendLikeNotification",(notification)=>{
            Toast.fire({
                title: `${notification.user.name} Liked Your Post`
            })
        })
        socket.on("save",(msg)=>{
        })

        

    }, [])



    

   
    useEffect(() => {
        console.log("router");
        const token = localStorage.getItem('token')
        if (token) {
            dispatch(loginAction(JSON.parse(localStorage.getItem('user'))))
            setToken(token)

            const decodedToken = jwtDecode(token)
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();

        }else{
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
                {Token ? <Redirect to="/" /> : <SignupPage />}
            </Route>

            <Route  path="/profile/:userId">
               {Token ? <ProfilePage/> : <Redirect to="/login" />}
           </Route>

            <Route  path="/settings">
                {Token ? <SettingsPage/> : <Redirect to="/login" />}
            </Route>
            <Route  path="/AccountDetails">
                {Token ? <AccountDetailsPage/> : <Redirect to="/login" />}
            </Route>
            <Route  path="/search">
                {Token ? <SearchPage/> : <Redirect to="/login" />}
            </Route>
            <Route  path="/createpost">
                {Token ? <CreatePostPage/> : <Redirect to="/login" />}
            </Route>
            <Route  path="/notification">
                {Token ? <NotificationPage/> : <Redirect to="/login" />}
            </Route>
            <Route  path="/test">
               <TestPage/>
            </Route>


        </Switch>
    )
}

export default Router
