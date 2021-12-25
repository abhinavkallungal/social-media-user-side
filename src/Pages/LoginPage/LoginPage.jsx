import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import {Link} from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Card, IconButton } from '@mui/material';
import { FacebookOutlined, Google } from '@mui/icons-material';
import { google, googleLogin, login } from '../../Axios'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginAction } from "../../Redux/userSlice"
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';




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
  const [socket, setSoket] = useState(useSelector((state) => state.socket.socket))


  console.log("loginsoket", socket);





  const handleChange = (e) => {


    if (e.target.name === "email") {
      console.log("emailtest");
      const trimEmail = e.target.value.trim()

      if (trimEmail === "") {
        setErrors({ error: true, emailErr: "username or email or phone number is required " })

      } else if (new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(trimEmail)) {
        const { password } = form
        setForm({ password, email: trimEmail })
        console.log("test2");
        setErrors({ error: false, emailErr: "" })
      }
      else if (new RegExp("^[A-Za-z]\\w{5,29}$").test(trimEmail)) {
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
      console.log(trimPassword);
      if (trimPassword === "") {
        setErrors({ error: true, passwordErr: "password is required " })

      } else {
        console.log("password");
        setForm({ ...form, password: trimPassword })
        setErrors({ error: false, passwordErr: "" })
      }
    }

  }


  const validattion = () => {
    const { email, password } = user
    const trimEmail = email.trim()
    const trimPassword = password.trim()
    console.log("test1");

    if (trimEmail === "") {
      setErrors({ error: true, emailErr: "username or email or phone number is required " })

    } else if (new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(trimEmail)) {
      setForm({ ...form, email: trimEmail })
      console.log("test2");
      setErrors({ error: false, emailErr: "" })
    }
    else if (new RegExp("^[A-Za-z]\\w{5,29}$").test(trimEmail)) {
      setForm({ ...form, username: trimEmail })
      setErrors({ error: false, emailErr: "" })


    } else if (new RegExp(/^([+]\d{2})?\d{10}$/).test(trimEmail)) {
      setForm({ ...form, phone: trimEmail })
      setErrors({ error: false, emailErr: "" })

    } else {
      setErrors({ error: true, emailErr: "username or email or phone number is required " })

    }

    if (trimPassword === "") {
      setErrors({ error: true, passwordErr: "password is required " })

    } else {
      setForm({ ...form, password: trimPassword })
      setErrors({ error: false, passwordErr: "" })
    }

  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (form.email === undefined && form.username === undefined && form.phone === undefined) {

      setErrors({ error: true, emailErr: "username or email or phone number is required " })


    } else if (form.password === undefined) {
      setErrors({ error: true, passwordErr: "password is required " })

    } else {
      if (!errors.error) {
        login(form).then((user) => {
          console.log("login data from server", user);
          dispatch(loginAction(user))
          socket?.emit("login", { id: socket.id, userId: user._id })

          history.push('/')


        }).catch((err) => {
          setErrors({ error: true, emailErr: "invalid UserName Or Password" })

        })

      }

    }


  };

  const responseGoogle = (response) => {
    console.log(response.su.ev);
    
    const email = response.su.ev
    googleLogin({email}).then((user) => {
      console.log("login data from server", user);
      dispatch(loginAction(user))
      socket?.emit("login", { id: socket.id, userId: user._id })

      history.push('/')

    }).catch((err) => {
      setErrors({ error: true, emailErr: "invalid UserName Or Password" })


    })
  }
  const responseFacebook = (response) => {
    console.log(response);
  }



  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Card className="card py-5 px-4 mt-5 shadow">
          <CssBaseline />
          <Typography variant="h4" className="text-center fw-bold Typography " style={{ color: "#1877F2", fontFamily: 'Montserrat' }} >Social Media</Typography>
          <Box
            sx={{
              marginTop: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
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
              <div className="d-flex justify-content-evenly">

                <GoogleLogin
                  clientId="967826436699-lmpvmcre1r12tn050u52phkfs9aro8jv.apps.googleusercontent.com"
                  buttonText="Login"
                  render={renderProps => (

                    <IconButton style={{ backgroundColor: "#F7010130", borderRadius: 10 }} size="medium" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                      <Google style={{ color: "#F70101", fontSize: "50", borderRadius: 10, border: "3px solid #ffffff" }} size="large" />
                    </IconButton>
                  )}
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                />

              

                <FacebookLogin
                  appId="4796539330410041"
                  autoLoad={true}
                  fields="name,email,picture"
                  callback={responseFacebook}

                  render={renderProps => (
                    <IconButton style={{ backgroundColor: "#1877F230", borderRadius: 10 }} size="medium" onClick={renderProps.onClick} >
                    <FacebookOutlined style={{ color: "#1877F2", fontSize: "50", borderRadius: 10, border: "3px solid #ffffff" }} size="large" />
                  </IconButton>
                  )}
                  callback={responseFacebook} />,




              </div>

              <hr />
              <Grid container>
                
                <Grid item xs>
                  <Link to="/forgotpassword" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to='/signup' variant="body2">
                    Don't have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Card>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

