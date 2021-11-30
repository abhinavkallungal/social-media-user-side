import React, { useState } from 'react'
import './appbar.css'
import { AppBar, Toolbar, Typography, Menu, MenuItem, Avatar, ListItemIcon, Divider, IconButton, Button } from "@mui/material"
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import { HomeRounded, NotificationsRounded, ChatRounded, PeopleAltRounded, AddBoxRounded } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import CreatePostModal from '../CreatePostModal/CreatePostModal'
import { useDispatch } from 'react-redux'
import {logoutAction} from "../../Redux/userSlice"
import { useHistory } from 'react-router';

const useStyles = makeStyles({
    
    logo: {
        color: "#007FFF",
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 700,
        fontSize: 22

    },
    navItem: {
        maxWidth: '42px',
        maxHeight: '42px',
        minWidth: '42px',
        minHeight: '42px',
        borderRadius: 10,
        backgroundColor: "#f1f1f1",
        padding: 0,
    },
    mobileNavbar:{
        display:'none'
    },
    root: {
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
        color: '#ffffff',
        height: 42,
        padding: '0 30px',
    },
});



function Appbar() {
    const dispatch = useDispatch()
    const history =useHistory()

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [user, setUser] = useState("")
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const classes = useStyles();

    const handleLogout=(e)=>{
        dispatch(logoutAction())
        history.push('/login')
    }

    return (
        <>
            <AppBar style={{ backgroundColor: "#fff" }} sx={{ width: "100%", position: 'fixed', top: 0, left: 0, right: 0 }}>
                <Toolbar>


                    <div className="nav">

                        <Typography className={classes.logo} variant="p">
                            Social Media
                        </Typography>
                        <div className="navItems">
                            <Button variant="text" className={classes.navItem,'navItem'} sx={classes.mobileNavbar} style={{}} >
                                <HomeRounded color="primary" fontSize="medium" />
                            </Button>
                            <Button variant="text" className={classes.navItem,'navItem'} >
                                <NotificationsRounded color="primary" size="medium" />
                            </Button>
                            <Button variant="text" className={classes.navItem,'navItem'}>
                                <ChatRounded color="primary" size="medium" />
                            </Button>
                            <Button variant="text" className={classes.navItem,'navItem'} >
                                <PeopleAltRounded color="primary" size="medium" />
                            </Button>



                            <CreatePostModal className={classes.root} style={{ color: '#ffffff' }} ></CreatePostModal>

                            <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                                {
                                    user ? <img src="https://source.unsplash.com/user/erondu/32x32" style={{ borderRadius: 10 }} alt="" /> :
                                        <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>

                                }
                            </IconButton>

                        </div>

                    </div>


                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem>
                            <Avatar /> Profile
                        </MenuItem>
                        <MenuItem>
                            <Avatar /> My account
                        </MenuItem>
                        <Divider />
                        <MenuItem>
                            <ListItemIcon>
                                <PersonAdd fontSize="small" />
                            </ListItemIcon>
                            Add another account
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            Settings
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>
                            <ListItemIcon>
                                <LogoutIcon fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>

                </Toolbar>

            </AppBar>
        </>
    )
}

export default Appbar
