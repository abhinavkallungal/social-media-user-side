import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Card, IconButton } from '@mui/material';
import { FacebookOutlined, Google } from '@mui/icons-material';
import { thirdPartyLogin, login } from '../../Axios'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginAction } from "../../Redux/userSlice"
import { setNotificationCountAction } from "../../Redux/notificationCountSlice"
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import socket from '../../Utils/socket'
import './LoginPage.css'






function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const dispatch = useDispatch()

  const history = useHistory()
  const [user, setUser] = React.useState({ email: null, password: "" })
  const [form, setForm] = React.useState({})
  const [errors, setErrors] = React.useState({ error: false, emailErr: "", passwordErr: "" })







  const handleChange = (e) => {


    if (e.target.name === "email") {

      const trimEmail = e.target.value.trim()

      if (trimEmail === "") {
        setErrors({ error: true, emailErr: "username or email or phone number is required " })

      } else if (new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(trimEmail)) {
        const { password } = form
        setForm({ password, email: trimEmail })

        setErrors({ error: false, emailErr: "" })
      }
      else if (new RegExp("^[A-Za-z]\\w{4,29}$").test(trimEmail)) {
        const { password } = form
        setForm({ password, username: trimEmail })
        setErrors({ error: false, emailErr: "" })


      } else if (new RegExp(/^([+]\d{2})?\d{10}$/).test(trimEmail)) {
        const { password } = form
        setForm({ password, phone: trimEmail })
        setErrors({ error: false, emailErr: "" })

      } else {
        setErrors({ error: true, emailErr: "username or email or phone number is required " })

      }


    }
    if (e.target.name === "password") {
      const trimPassword = e.target.value.trim()

      if (trimPassword === "") {
        setErrors({ error: true, passwordErr: "password is required " })

      } else {

        setForm({ ...form, password: trimPassword })
        setErrors({ error: false, passwordErr: "" })
      }
    }

  }



  const handleSubmit = (event) => {
    event.preventDefault();
    if (form.email === undefined && form.username === undefined && form.phone === undefined) {

      setErrors({ error: true, emailErr: "Invalied Detailes" })


    } else if (form.password === undefined) {
      setErrors({ error: true, passwordErr: "password is required " })

    } else {
      if (!errors.error) {
        login(form).then((data) => {


          socket.emit("login", { id: socket.id, userId: data.user._id })
          dispatch(loginAction(data.user))
          dispatch(setNotificationCountAction(data.unReadNotificationsCount))


          history.push('/')


        }).catch((err) => {
          setErrors({ error: true, emailErr: err?.response?.data?.message })

        })

      }

    }


  };

  const responseGoogle = (response) => {


    const email = response.Du.tv
    if (email) {

      thirdPartyLogin({ email }).then((data) => {

        dispatch(loginAction(data.user))
        dispatch(setNotificationCountAction(data.unReadNotificationsCount))


        socket?.emit("login", { id: socket.id, userId: data.user._id })

        history.push('/')

      }).catch((err) => {
        setErrors({ error: true, emailErr: err?.response?.data?.message })



      })
    }
  }
  const responseFacebook = (response) => {

    if (response.email) {
      thirdPartyLogin({ email: response.email }).then((data) => {
        socket?.emit("login", { id: socket.id, userId: data.user._id })

        dispatch(loginAction(data.user))
        dispatch(setNotificationCountAction(data.unReadNotificationsCount))

        history.push('/')

      }).catch((err) => {

        setErrors({ error: true, emailErr: err.response.data.message })



      })
    }
  }



  return (
    <div className="col-lg-9 mx-auto">



      <div className="row justify-content-between align-items-center">

        <div className="col-lg-5   d-lg-block  d-none">
          <Typography variant="h4" className=" fw-bold Typography " style={{ color: "#1877F2", fontFamily: 'Montserrat' }} >Social Media</Typography>
          <Typography variant='h6' style={{ fontFamily: 'Montserrat' }}>Connect with friends and the world around you on Social Media</Typography>

        </div>
        <div className="col-lg-5">
          <Card className="card p-4 mt-5 shadow">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >

              <Typography className="Typography " component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={handleChange}
                />
                <Typography variant="span" style={{ color: 'red' }}>{errors.error ? errors.emailErr : null}</Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleChange}

                />
                <Typography variant="span" style={{ color: 'red' }}>{errors.error ? errors.passwordErr : null}</Typography>


                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <hr />
                <div className="d-flex flex-column align-items-center">
                  <div className="mt-2">

                    <FacebookLogin
                      appId="4796539330410041"
                      autoLoad={false}
                      fields="name,email,picture"
                      callback={responseFacebook}
                      cssClass="facebook"
                      icon="fa-facebook"

                      render={renderProps => (
                        <IconButton style={{ backgroundColor: "#1877F230", borderRadius: 10 }} size="medium" onClick={() => renderProps.onClick} >
                          <FacebookOutlined style={{ color: "#1877F2", fontSize: "50", borderRadius: 10, border: "3px solid #ffffff" }} size="large" />
                        </IconButton>
                      )}
                      callback={responseFacebook} >
                      login
                    </FacebookLogin>
                  </div>

                  <div className="mt-3">

                    <GoogleLogin
                      clientId="967826436699-lmpvmcre1r12tn050u52phkfs9aro8jv.apps.googleusercontent.com"
                      onSuccess={responseGoogle}
                      isSignedIn={false}
                      onSuccess={responseGoogle}
                      onFailure={responseGoogle}
                      cookiePolicy={'single_host_origin'}
                    />
                  </div>
                </div>



                <hr />
                <Grid container>

                  <Grid item xs>
                    <Link to="/forgotpassword" variant="body2" style={{ textDecoration: "none" }}>
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link to='/signup' variant="body2" style={{ textDecoration: "none" }}>
                      Don't have an account? Sign Up
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Card>
        </div>
      </div>

    </div>


  );
}

