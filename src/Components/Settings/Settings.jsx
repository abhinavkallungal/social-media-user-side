import { AccountBalance, AccountCircle, ConnectWithoutContact, Help, Home, VpnKey,Logout,Notifications } from '@mui/icons-material'
import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import "./Settings.css"

function Settings() {
    return (
        <div className="Settings">
            <div className="card p-4">
                <div className="head fw-bold">
                    Settings
                </div>
                <div className="subhead">
                    Genaral
                </div>
                <div className="item">
                    <Link to="/AccountDetails">
                        <AccountBalance/>  Account Informations
                    </Link>
                </div>
                <div className="item">
                   <Home/> Saved Address
                </div>
                <div className="item">
                    <Link to="/AddSocialAccount">
                   <ConnectWithoutContact/> Social Acount
                    </Link>
                </div>
                <div className="subhead">
                    Account
                </div>
                <div className="item">
                        <AccountCircle/>  My Account 
                </div>
                <div className="item">
                    <Link to='/resetPasswords'>
                   <VpnKey/> Password
                    </Link>
                </div>
                <div className="subhead">
                      Others
                </div>
                <div className="item">
                    <Button to='/notification' component={Link}>
                        <Notifications/>  Notification 
                    </Button>
                </div>
                <div className="item">
                   <Help/> Help
                </div>
                <div className="item">
                   <Logout/> Logout
                </div>
              
            </div>
            
        </div>
    )
}

export default Settings
