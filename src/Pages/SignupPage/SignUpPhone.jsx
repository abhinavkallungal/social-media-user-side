import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Card, IconButton } from '@mui/material';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { doSignup, checkUserName, verifyEmailotp, verifyMobileOtp } from '../../Axios'
import OtpInput from 'react-otp-input';
import { Link, useHistory } from 'react-router-dom'
import { Mail } from '@mui/icons-material';




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

export default function SignUpPhone() {

    const history = useHistory()

    const [user, setUser] = useState({
        phone: "",
        name: "",
        username: "",
        password: '',
        otp: ''
    })
    const [error, setError] = useState({
        usernameExist: "",
        name: "",
        username: "",
        password: '',
        otp: ''
    })
    const [otpsend, setOtpSend] = useState(false)

    const onChange = (e) => {

        if (e.target.name === "name") {
            const trimName = e.target.value.trim()
            if (trimName === "") {
                let err = { ...error, name: 'name is requierd' }
                setError(err)
                console.log(error);

            } else if (new RegExp("^[A-Za-z\\s]{5,29}$").test(trimName)) {
                setUser({ ...user, name: trimName })
                let err = { ...error, name: "" }
                setError(err)
            } else {
                let err = { ...error, name: " Name containe mini 5 char or amx 29 char or name does't containe number or spesial char  " }
                setError(err)
                console.log(" Name containe mini 5 char or amx 29 char or name does't containe number or spesial char  ");
                console.log(error);
            }
        }
        if (e.target.name === "phone") {
            const trimEmail = e.target.value.trim()

            if (trimEmail === "") {
                setError({ ...error, email: "email or phone number is required " })
                console.log("email or phone number is required");

            } else if (new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(trimEmail)) {

                setUser({ ...user, email: trimEmail, phone: "" })
                setError({ ...error, email: "" })
            } else if (new RegExp(/^([+]\d{2})?\d{10}$/).test(trimEmail)) {
                setUser({ ...user, phone: trimEmail, email: "" })
                setError({ ...error, email: "" })

            } else {
                setError({ ...error, email: "invalid format of email  or phone number" })

            }


        }
        if (e.target.name === "password") {

            const trimPassword = e.target.value.trim()

            if (trimPassword === "") {

                setError({ ...error, password: "password is required" })


            } else {

                setUser({ ...user, password: trimPassword })
                setError({ ...error, password: "" })

            }
        }
    };

   const  validate = (name, value) => {
        const { fields } = this.state;
        switch (name) {
          case "firstName":
            if (!value || value.trim() === "") {
              return "First name is Required";
            } else {
              return "";
            }
          case "email":
            if (!value) {
              return "Email is Required";
            } else if (
              !value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
            ) {
              return "Enter a valid email address";
            } else {
              return "";
            }
          case "mobile":
            if (!value || value.trim() === "") {
              return "Mobile number is Required";
            } else if (!value.match(/^[6-9]\d{9}$/)) {
              return "Enter a valid mobile number.";
            } else {
              return "";
            }
          case "password":
            if (!value) {
              return "Password is Required";
            } else if (value.length < 8 || value.length > 15) {
              return "Please fill at least 8 character";
            } else if (!value.match(/[a-z]/g)) {
              return "Please enter at least lower character.";
            } else if (!value.match(/[A-Z]/g)) {
              return "Please enter at least upper character.";
            } else if (!value.match(/[0-9]/g)) {
              return "Please enter at least one digit.";
            } else {
              return "";
            }
          case "confirmPassword":
            if (!value) {
              return "Confirm Password Required";
            } else if (value !== fields.password) {
              return "New Password and Confirm Password Must be Same";
            } else {
              return "";
            }
          default: {
            return "";
          }
        }
      };

     const handleUserInput = e => {
        setError({...error,[e.target.name]: validate(e.target.name, e.target.value)})
        setUser({...user, [e.target.name]: e.target.value} );
      };


    const changeUsername = (e) => {

        const trimUsername = e.target.value.trim()
        if (trimUsername === "") {
            setError({ ...error, username: "username Required" })

        } else if (new RegExp("^[A-Za-z]\\w{4,29}$").test(trimUsername)) {

            setUser({ ...user, username: e.target.value });
            checkUserName({ username: trimUsername }).then((data) => {
                setError({ ...error, usernameExist: "" })
                setUser({ ...user, username: trimUsername })
            }).catch((error) => {
                setError({ ...error, usernameExist: "username already exist" })

            })

        } else {
            setError({ ...error, username: "username containe mini 5 char or amx 29 char or name does't containe number or spesial char  " })


        }

    }





    const handleSubmit = (event) => {
        event.preventDefault();
        if (user.name === "") {
            let err = { ...error, ["name"]: "Name is required " }
            setError(err)


        }
        if (user.username === "") {
            let err = { ...error, ["username"]: "Username is required" }
            setError(err)

        }
        if (user.email === "" && user.phone === "") {
            let err = { ...error, ["email"]: "email or phone number is required  Or Email is invalid format" }
            setError(err)


        }
        if (user.password === "") {
            let err = { ...error, ["password"]: "Password is required " }
            setError(err)

        }
        console.log(user);


        if (error.email === "" & error.usernameExist === "" && user.username === "" && user.name === "" && user.password === "") {
            console.log("test");
            doSignup(user).then(() => {
                setOtpSend(true)
            }).catch((error) => {
                console.log(error);

            })

        }


    };



    const changeOtp = (otp) => {
        setUser({ ...user, otp: otp })
        console.log(user);
    }

    const verifyOtp = () => {
        if (user.email !== undefined, user.phone === undefined) {
            console.log("email verify", user.email, user.phone);

            verifyEmailotp({ email: user.email, otp: user.otp }).then((data) => {
                console.log(">>>>>>>>>2", data.data.user);
                history.push('/')
            }).catch((error) => {
                console.log(">>>>>>>>>3");
            })


        }

        if (user.email === undefined, user.phone !== undefined) {

            console.log("mobile verify", user.email, user.phone);

            verifyMobileOtp({ phone: user.phone, otp: user.otp }).then((data) => {

                history.push('/')

            }).catch((error) => {

                console.log(error);

            })




        }


    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                {
                    otpsend ? (
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
                                <Typography component="h1" variant="h5">
                                    OTP VERIFICATION
                                </Typography>
                                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={12}>
                                            <OtpInput
                                                value={user.otp}
                                                onChange={changeOtp}
                                                type={Number}
                                                numInputs={4}
                                                separator={<span>-</span>}
                                                name="otp"
                                                inputStyle={{
                                                    width: "2.5rem",
                                                    height: "2.5rem",
                                                    margin: "0 1rem",
                                                    fontSize: "2rem",
                                                    borderRadius: 4,
                                                    border: "1px solid rgba(0,0,0,0.3)"
                                                }}
                                            />
                                            {
                                                error.nameErrMsg ? <Typography component='span' style={{ color: 'red' }}>{error.nameErrMsg}</Typography> : null
                                            }


                                        </Grid>



                                    </Grid>

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        onClick={verifyOtp}
                                    >
                                        Verify OTP
                                    </Button>
                                    {
                                        error.message ? <Typography component='span' style={{ color: 'red' }}>{error.message}</Typography> : null

                                    }
                                    <Grid container justifyContent="flex-end">
                                        <Grid item>
                                            <Link to="/login" variant="body2">
                                                Already have an account? Sign in
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        </Card>
                    ) : (
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
                                <Typography component="h1" variant="h5">
                                    Sign up Using Mobile
                                </Typography>
                                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={12}>
                                            <TextField
                                                autoComplete="given-name"
                                                name="name"
                                                required
                                                fullWidth
                                                id="firstName"
                                                label="First Name"
                                                autoFocus
                                                onChange={onChange}
                                            />
                                            {
                                                error.name ? <Typography component='span' style={{ color: 'red' }}>{error.name}</Typography> : null
                                            }


                                        </Grid>
                                        <Grid item xs={12} sm={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="Username"
                                                label="Username"
                                                name="username"
                                                autoComplete="family-name"
                                                onChange={changeUsername}
                                            />
                                            {
                                                error.username ? <Typography component='span' style={{ color: 'red' }}>{error.username}</Typography> : null
                                            }
                                            {
                                                error.usernameExist ? <Typography component='span' style={{ color: 'red' }}>{error.usernameExist}</Typography> : null
                                            }
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="phone"
                                                label="Phone Number"
                                                name="phone"
                                                onChange={onChange}

                                            />
                                            {
                                                error.phone ? <Typography component='span' style={{ color: 'red' }}>{error.phone}</Typography> : null
                                            }


                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                name="password"
                                                label="Password"
                                                type="password"
                                                id="password"
                                                autoComplete="new-password"
                                                onChange={onChange}

                                            />
                                            {
                                                error.password ? <Typography component='span' style={{ color: 'red' }}>{error.password}</Typography> : null
                                            }


                                        </Grid>

                                    </Grid>

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Sign Up
                                    </Button>
                                    {
                                        error.message ? <Typography component='span' style={{ color: 'red' }}>{error.message}</Typography> : null

                                    }
                                    
                                    <Grid container justifyContent="center" flexDirection='column' alignItems="center">


                                    <IconButton style={{  borderRadius: 10 }} size="medium">
                                        <Mail style={{ color: "#1976D2", fontSize: "50", borderRadius: 10, border: "3px solid #ffffff" }} size="large" />
                                    </IconButton>
                                    <Typography>Signup with Email</Typography>
                                    </Grid>

                                    <Grid container justifyContent="flex-end" className='mt-3'>
                                        <Grid item>
                                            <Link to="/login" variant="body2">
                                                Already have an account? Sign in
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        </Card>

                    )

                }


                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}