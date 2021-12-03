import React, { useEffect, useState } from 'react'
import {
    Switch,
    Route,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";
import Feed from '../src/Pages/Feed/Feed'
import Loginpage from './Pages/LoginPage/LoginPage'
import SignupPage from './Pages/SignupPage/SignupPage';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux'
import { loginAction } from "./Redux/userSlice"
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import SettingsPage from './Pages/SettingsPage/SettingsPage';
import AccountDetailsPage from './Pages/AccountDetailsPage/AccountDetailsPage';


function Router() {

    const history = useHistory()
    const location = useLocation()
    const dispatch = useDispatch()



    const [Token, setToken] = useState("");
    const [user, setUser] = useState({});



    useEffect(() => {
        console.log("router");
        const token = localStorage.getItem('token')
        if (token) {
            setToken(token)
            setUser(localStorage.getItem('user'))
            dispatch(loginAction(user))
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
        history.push('/feed')
    }

    return (
        <Switch>

            <Route exact path="/feed">

                {Token ? <Redirect to="/" /> : <Redirect to="/login" />}

            </Route>
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
            <Route  path="/profile">
                {Token ?<ProfilePage/> :<ProfilePage/>}
            </Route>

            <Route  path="/settings">
                {Token ? <SettingsPage/> :<SettingsPage/>}
            </Route>
            <Route  path="/Accountdetails">
                {Token ? <AccountDetailsPage/> :<SettingsPage/>}
            </Route>


        </Switch>
    )
}

export default Router
