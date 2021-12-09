import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Card } from '@mui/material';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { doSignup, checkUserName, verifyEmailotp ,verifyMobileOtp } from '../../Axios'
import OtpInput from 'react-otp-input';
import {useHistory} from'react-router-dom'



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

export default function SignUp() {

    const history =useHistory()

    const [user, setUser] = useState({
        email: '',
        phone: "",
        name: "",
        username: "",
        password: '',
        otp: ''
    })
    const [err, setErr] = useState({})
    const [otpsend, setOtpSend] = useState(false)
    let error = { error: false, nameErr: true, usernameErr: true, emailErr: true, passwordErr: true }

    const onChange = (e) => {

        if (e.target.name === "name") {
            const trimName = e.target.value.trim()
            if (trimName === "") {
                console.log("Name is required ");
                error = { ...error, nameErr: true, nameErrMsg: "Name is required " }
                setErr(error)

            } else if (new RegExp("^[A-Za-z\\s]{5,29}$").test(trimName)) {
                setUser({ ...user, name: trimName })
                console.log("Name is correct ");
                error = { ...error, nameErr: false, nameErrMsg: "" }
                setErr(error)
            } else {
                error = { ...error, nameErr: true, nameErrMsg: " Name containe mini 5 char or amx 29 char or name does't containe number or spesial char  " }
                console.log(" Name containe mini 5 char or amx 29 char or name does't containe number or spesial char  ");
                setErr(error)

            }
        }
        if (e.target.name === "email") {
            const trimEmail = e.target.value.trim()
            const { name, username, password, otp } = user

            if (trimEmail === "") {
                error = { ...error, emailErr: true, emailErrMsg: "  email or phone number is required " }
                setErr(error)
                console.log("email or phone number is required");

            } else if (new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(trimEmail)) {
                setUser({ name, username, password, otp, email: trimEmail })
                error = { ...error, emailErr: false, emailErrMsg: "" }
                setErr(error)
                console.log("correct mail");
            } else if (new RegExp(/^([+]\d{2})?\d{10}$/).test(trimEmail)) {
                setUser({ name, username, password, otp, phone: trimEmail })
                error = { ...error, emailErr: false, emailErrMsg: "" }
                setErr(error)
                console.log("correct number");

            } else {
                error = { ...error, emailErr: true, emailErrMsg: "invalid format of email  or phonenumber" }
                setErr(error)
                console.log("invalid format of email  or phonenumber");
            }


        }
        if (e.target.name === "password") {

            const trimPassword = e.target.value.trim()

            if (trimPassword === "") {
                console.log("password is required");

                error = { ...error, passwordErr: true, passwordErrMsg: "password is required " }
                setErr(error)


            } else {

                console.log("password succes");
                setUser({ ...user, password: trimPassword })
                error = { ...error, passwordErr: false, passwordErrMsg: "" }
                setErr(error)

            }
        }
    };
   

    const changeUsername = (e) => {

        const trimUsername = e.target.value.trim()
        if (trimUsername === "") {
            error = { usernameErr: true, usernameErrMsg: "Username is required " }
            setErr(error)

        } else if (new RegExp("^[A-Za-z]\\w{5,29}$").test(trimUsername)) {

            setUser({ ...user, username: e.target.value });
            checkUserName({ username: e.target.value.trim() }).then((data) => {
                error = { ...error, usernameErr: false, usernameErrMsg: '' }
                setErr(error)


            }).catch((error) => {
                error = { ...error, usernameErr: true, usernameErrMsg: 'username Already exist' }
                setErr(error)

            })

        } else {
            error = { ...error, usernameErr: true, usernameErrMsg: " username containe mini 5 char or amx 29 char or name does't containe number or spesial char  " }
            setErr(error)

        }

    }





    const handleSubmit = (event) => {
        event.preventDefault();
        if (user.name === "") {
            error = { ...error, nameErr: true, nameErrMsg: "Name is required " }


        }
        if (user.username === "") {
            error = { ...error, usernameErr: true, usernameErrMsg: "Username is required " }

        }
        if (user.email === "" && user.phone === "") {
            error = { ...error, emailErr: true, emailErrMsg: "email or phone number is required  " }


        }
        if (user.password === "") {
            error = { ...error, passwordErr: true, passwordErrMsg: "Password is required " }

        }
        setErr(error)
        console.log("err", err);
        console.log(user);

        if ((user.email !== "" || user.phone !== "") && user.username !== "" && user.name !== "" && user.password !== "") {
                         console.log("test");
            doSignup(user).then(() => {
                setOtpSend(true)
            }).catch((error) => {
                error = { error: true, message: error.response.data.message }
                setErr(error)
                console.log(err);
            })

        }
        

    };

    

    const changeOtp=(otp)=>{
        setUser({...user,otp:otp})
        console.log(user);
    }

    const verifyOtp =()=>{
        if(user.email!==undefined,user.phone===undefined){
            console.log("email verify",user.email,user.phone);

                verifyEmailotp({email:user.email,otp:user.otp}).then((data)=>{
                    console.log(">>>>>>>>>2",data.data.user);
                    history.push('/')
                }).catch((error)=>{
                    console.log(">>>>>>>>>3");
                })
        

        }

        if(user.email===undefined,user.phone!==undefined){

            console.log("mobile verify",user.email,user.phone);

            verifyMobileOtp({phone:user.phone,otp:user.otp}).then((data)=>{
                
                history.push('/')
                
            }).catch((error)=>{

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
                                                err.nameErrMsg ? <Typography component='span' style={{ color: 'red' }}>{err.nameErrMsg}</Typography> : null
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
                                        err.message ? <Typography component='span' style={{ color: 'red' }}>{err.message}</Typography> : null

                                    }
                                    <Grid container justifyContent="flex-end">
                                        <Grid item>
                                            <Link href="#" variant="body2">
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
                                    Sign up
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
                                                err.nameErrMsg ? <Typography component='span' style={{ color: 'red' }}>{err.nameErrMsg}</Typography> : null
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
                                                err.usernameErr ? <Typography component='span' style={{ color: 'red' }}>{err.usernameErrMsg}</Typography> : null
                                            }
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="email"
                                                label="Email Id Or Phone Number"
                                                name="email"
                                                onChange={onChange}

                                            />
                                            {
                                                err.emailErr ? <Typography component='span' style={{ color: 'red' }}>{err.emailErrMsg}</Typography> : null
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
                                                err.passwordErr ? <Typography component='span' style={{ color: 'red' }}>{err.passwordErrMsg}</Typography> : null
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
                                        err.message ? <Typography component='span' style={{ color: 'red' }}>{err.message}</Typography> : null

                                    }
                                    <Grid container justifyContent="flex-end">
                                        <Grid item>
                                            <Link href="#" variant="body2">
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