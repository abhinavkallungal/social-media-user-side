import React, { useEffect, useState } from 'react';
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
import { doSignup, checkUserName, verifyEmailotp, verifyMobileOtp, emailOtpResend } from '../../Axios'
import OtpInput from 'react-otp-input';
import { Link, useHistory } from 'react-router-dom'
import { Phone, MobileScreenShare } from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';





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
        email: "",
        name: "",
        username: "",
        password: '',
        usernameExist: true,
        otp: ''
    })
    const [error, setError] = useState({
        usernameExist: "",
        name: "",
        username: "",
        password: '',
        email: "",
        otp: ''
    })
    const [otpsend, setOtpSend] = useState(false)
    const [reSendOtp, setReSendOtp] = useState(false)
    const [submited, setSubmited] = useState(false)
    const [timer, setTimer] = useState({ minute: "", seconds: "" })


    useEffect(() => {
        let counter = 10
        if (reSendOtp) {

        } else {

            var timers = setInterval(function () {
                setTimer({ minute: Math.floor(counter / 60), seconds: Math.floor(counter % 60) })
                counter--
                if (counter === -1) {
                    clearInterval(timers);
                    setReSendOtp(true)
                }

            }, 1000);
        }
    }, [reSendOtp])



    const handleNameValidtion = (e) => {
        const trimName = e.target.value.trim()
        setUser({ ...user, name: trimName })

        if (trimName === "") {
            let err = { ...error, name: 'name is requierd' }
            setError(err)
            console.log(error);

        } else if (new RegExp("^[A-Za-z\\s]{4,29}$").test(trimName)) {
            let err = { ...error, name: "" }
            setError(err)
        } else {
            let err = { ...error, name: "Name containe mini 5 char or amx 29 char or name does't containe number or spesial char  " }
            setError(err)
        }

    }
    const handleUsernameValidtion = (e) => {

        const trimUsername = e.target.value.trim()
        setUser({ ...user, username: trimUsername })
        if (trimUsername === "") {
            let err = { ...error, username: 'username is requierd' }
            setError(err)
        } else if (new RegExp("^[A-Za-z\\s]{4,29}$").test(trimUsername)) {

            setError({ ...error, username: "" })


        } else {
            let err = { ...error, username: " Username containe mini 5 char or amx 29 char or name does't containe number or spesial char  " }
            setError(err)
        }


    }

    const checkUsernameExist = (e) => {
        if (error.username === "" && user.username !== "") {
            setError({ ...error, usernameExist: "username  Checking....." })
            checkUserName({ username: user.username }).then((data) => {
                if (data.data.usernameExist) {

                    setError({ ...error, usernameExist: "username already  exist" })

                    setUser({ ...user, usernameExist: true })
                } else {
                    setUser({ ...user, usernameExist: false })
                    
                }
                
            }).catch((err) => {
                setError({ ...error, usernameExist: err.message })


            })

        }


    }
    const handleEmailValidtion = (e) => {

        const trimEmial = e.target.value.trim()
        setUser({ ...user, email: trimEmial })

        if (trimEmial === "") {
            let err = { ...error, email: 'Email is requierd' }
            setError(err)
            console.log(error);

        } else if (new RegExp(/\S+@\S+\.\S+/).test(trimEmial)) {
            let err = { ...error, email: "" }
            setError(err)
        }
        else {
            let err = { ...error, email: "Not  a valid Email" }
            setError(err)
        }

    }

    const handlePasswordValidtion = (e) => {
        const trimPassword = e.target.value.trim()
        setUser({ ...user, password: trimPassword })

        if (trimPassword === "") {
            let err = { ...error, password: 'password is requierd' }
            setError(err)
        } else if (new RegExp("^(?=.*[0-9])"
            + "(?=.*[a-z])(?=.*[A-Z])"
            + "(?=.*[@#$%^&+=!*])"
            + "(?=\\S+$).{8,20}$").test(trimPassword)) {
            let err = { ...error, password: "" }
            setError(err)


        } else {
            let err = { ...error, password: "Minimum 8 and maximum 20 characters, at least one uppercase letter, one lowercase letter, one number and one special character:" }
            setError(err)
        }


    }


    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmited(true)

        if (error.name === "" && user.name !== "" && error.username === "" && error.usernameExist === "" && user.username !== "" && error.email === "" && user.email !== "" && error.password === "" && user.password !== "") {
            console.log("test");
            doSignup(user).then(() => {
                setOtpSend(true)
            }).catch((error) => {
                console.log(error);
                setSubmited(false)

            })
        } else {
            setSubmited(false)
            const validate = (user) => {

                let err = {}

                if (user.name === "") {
                    err = { ...err, name: 'name is requierd' }


                }
                if (user.username === "") {
                    err = { ...err, username: 'username is requierd' }


                }
                if (user.email === "") {
                    err = { ...err, email: 'Email is requierd' }


                }
                if (user.password === "") {
                    err = { ...err, password: 'password is requierd' }

                }
                setError({ ...error, ...err })

            }
            validate(user)



        }





    };



    const changeOtp = (otp) => {
        setUser({ ...user, otp: otp })
        console.log(user);
    }

    const verifyOtp = () => {
        verifyEmailotp({ email: user.email, otp: user.otp }).then((data) => {
            console.log(">>>>>>>>>2", data.data.user);
            history.push('/')
        }).catch((error) => {
           setError({...error,otp:"invalid Otp"})
        })



    }

    const handleResendOtp = () => {
        emailOtpResend({ email: user.email }).then((data) => {

            setReSendOtp(false)

        })

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

                                <Typography component="h1" variant="h5">
                                    OTP VERIFICATION
                                </Typography>
                                <Grid container flexDirection='column' alignItems='center' className='mt-5'>
                                    <MobileScreenShare style={{ fontSize: '50px' }} />
                                    <Typography>Enter the code we sent to {user.email}</Typography>
                                </Grid>
                                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={12}>
                                            <OtpInput
                                                value={user.otp}
                                                onChange={changeOtp}
                                                type='number'
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
                                                error.otp ? <Typography component='span' style={{ color: 'red' ,textAlign:'center',width:"100%",marginTop:'20px' }}>{error.otp}</Typography> : null
                                            }


                                        </Grid>



                                    </Grid>

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        onClick={verifyOtp}
                                        disabled={reSendOtp}
                                    >
                                        Verify OTP
                                    </Button>

                                    <Grid container flexDirection='column' alignItems='center' className='my-3'>
                                        <Box>{timer.minute} : {timer.seconds}</Box>

                                        <Button disabled={!reSendOtp} onClick={handleResendOtp}>Resend OTP</Button>
                                    </Grid>
                                    {
                                        error.message ? <Typography component='span' style={{ color: 'red' }}>{error.message}</Typography> : null

                                    }
                                    <Grid container justifyContent="flex-end">
                                        <Grid item>
                                            <Link to='/login' variant="body2">
                                                Already have an account? Sign in
                                            </Link>
                                            <Link to="/signup;">
                                                Signup
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
                                    Sign up Using Email
                                </Typography>
                                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={12}>
                                            <TextField
                                                autoComplete="off"
                                                name="name"
                                                required
                                                fullWidth
                                                id="firstName"
                                                label="First Name"
                                                autoFocus
                                                onChange={handleNameValidtion}
                                                error={error.name}
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
                                                autoComplete="off"
                                                onBlur={checkUsernameExist}
                                                onChange={handleUsernameValidtion}
                                                error={error.username || error.usernameExist}
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
                                                autoComplete='off'
                                                required
                                                fullWidth
                                                id="email"
                                                label="Email"
                                                type="tel"
                                                name="email"
                                                onChange={handleEmailValidtion}
                                                error={error.email}

                                            />
                                            {
                                                error.email ? <Typography component='span' style={{ color: 'red' }}>{error.email}</Typography> : null
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
                                                autoComplete="off"
                                                onChange={handlePasswordValidtion}
                                                error={error.password}


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
                                        disabled={submited}
                                    >
                                        {
                                            submited ? <CircularProgress /> : "Sign Up"
                                        }

                                    </Button>
                                    {
                                        error.message ? <Typography component='span' style={{ color: 'red' }}>{error.message}</Typography> : null

                                    }

                                    <Grid container justifyContent="center" flexDirection='column' alignItems="center">


                                        <IconButton style={{ borderRadius: 10 }} size="medium" onClick={() => history.push("/signup")}>
                                            <Phone style={{ color: "#1976D2", fontSize: "50", borderRadius: 10, border: "3px solid #ffffff" }} size="large" />
                                        </IconButton>
                                        <Typography>Signup with Phone</Typography>
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