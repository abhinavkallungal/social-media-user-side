import React, { useEffect, useState } from 'react'
import {Switch,Route,Redirect,useHistory,useLocation} from "react-router-dom";
import Feed from '../src/Pages/Feed/Feed'
import Loginpage from './Pages/LoginPage/LoginPage'
import SignupPage from './Pages/SignupPage/SignupPage';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux'
import { loginAction } from "./Redux/userSlice"
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import SettingsPage from './Pages/SettingsPage/SettingsPage';
import AccountDetailsPage from './Pages/AccountDetailsPage/AccountDetailsPage';
import SearchPage from './Pages/SearchPage/SearchPage';
import CreatePostPage from './Pages/CreatePostPage/CreatePostPage';


function Router() {
    
    
    const history = useHistory()
    const location = useLocation()
    const dispatch = useDispatch()
    
    
    
    const [Token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    

   
    


    useEffect(() => {
        console.log("router");
        const token = localStorage.getItem('token')
        if (token) {
            dispatch(loginAction(JSON.parse(localStorage.getItem('user'))))
            setToken(token)

            const decodedToken = jwtDecode(token)
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
            console.log(decodedToken);

        }else{
            setToken(null)

        }
        console.log("Adfadsfa");

    }, [location])



    const logout = () => {
        console.log('logout');
        localStorage.removeItem("token");
        setToken(null);
        console.log("tokens",Token);
        history.push('/login')
    }

    return (
        <Switch>

           
            <Route exact path="/">
                {Token ? <Feed /> : <Redirect to="/login" />}

            </Route>
            <Route exact path="/login">
                {console.log("login",Token)}

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


        </Switch>
    )
}

export default Router
