import React, { useEffect, useState } from 'react'

import queryString from 'query-string'
import { useLocation } from 'react-router-dom';
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Card, Box, Grid, Typography, Button } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';

import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { forgotPasswordReset } from '../../Axios';

import './ForgotPassword.css'





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






function ForgotPasswordResat() {
    const location = useLocation();
    const [querie, setQuerie] = useState({})
    const[success,setSuccess]=useState(false)


    const [values, setValues] = useState({
        password: '',
        showPassword: false,
    });
    const [error, setError] = useState({
        passwordErr: "",
        ConfirmPasswordErr: "",
    });




    useEffect(() => {
        let queries = queryString.parse(location.search)
        setQuerie(queries)



    }, [])
    const handleSubmit = () => {
        if (values.password === "") {
            setError({ ...error, passwordErr: "Password is required" });

        }
        if (values.ConfirmPassword === "") {
            setError({ ...error, ConfirmPasswordErr: "Password is required" });

        }
        if (values.password !== values.ConfirmPassword) {
            setError({ ...error, ConfirmPasswordErr: "Confirm Password not Match with Password" });

        }
        if (values.password === values.ConfirmPassword) {
            setError({ ...error, ConfirmPasswordErr: "" });
            forgotPasswordReset({ password: values.password, ConfirmPassword: values.ConfirmPassword, userId: querie.id, Token: querie.token }).then(() => {
                setSuccess(true)
                
            }).catch((error) => {
                setError({ ...error, ConfirmPasswordErr: error.response.data.message });

            })

        }


    }

    const handleChange = (prop) => (event) => {


        setValues({ ...values, [prop]: event.target.value });

        if (prop === 'password' && event.target.value === "") {
            setError({ ...error, passwordErr: "Password is required" });
        }
        if (prop === 'password' && event.target.value !== "") {
            setError({ ...error, passwordErr: "" });
        }
        if (prop === 'ConfirmPassword' && event.target.value === "") {
            setError({ ...error, ConfirmPasswordErr: "ConfirmPassword is required" });
        }
        if (prop === 'ConfirmPassword' && event.target.value !== "") {
            setError({ ...error, ConfirmPasswordErr: "" });
        }
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };



    const theme = createTheme();


    return (


        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">

                {
                    !success ?    <Card className="card py-5 px-4 mt-5 shadow">

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
                            Reset Your Password
                        </Typography>

                        <Box sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12}>
                                    <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                                        <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
                                        <OutlinedInput
                                            fullWidth
                                            id="outlined-adornment-password"
                                            type={values.showPassword ? 'text' : 'password'}
                                            value={values.password}
                                            onChange={handleChange('password')}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="New Password"
                                        />
                                    </FormControl>
                                    {
                                        error.passwordErr ? error.passwordErr : null
                                    }
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
                                        <InputLabel htmlFor="outlined-adornment-password">Confirm password</InputLabel>
                                        <OutlinedInput
                                            fullWidth
                                            id="outlined-adornment-password"
                                            type={values.showPassword ? 'text' : 'password'}
                                            value={values.ConfirmPassword}
                                            onChange={handleChange('ConfirmPassword')}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Confirm password"
                                        />
                                    </FormControl>
                                    {
                                        error.ConfirmPasswordErr ? error.ConfirmPasswordErr : null
                                    }
                                </Grid>
                            </Grid>



                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleSubmit}
                            >
                                Reset Password
                            </Button>



                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link to='/login' variant="body2" className="me-4">
                                        Already have an account? Sign in
                                    </Link>
                                    <Link to="/dshfa;">
                                        jbhvjbkll
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Card>
                :
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
                    <Typography className="Typography text-center" component="h1" variant="h5" >
                        Your password has been updated Successfully
                    </Typography>
                    <Box noValidate sx={{ mt: 1 }}>

                        <div className="success-animation">
                            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" /><path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
                        </div>
                        


                        
                        <hr />


                        <Grid container>


                            <Grid item xs className='me-5'>
                                <Link to="/login" variant="body2">
                                    Back to Login
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
                }


             
               





                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>


    )
}

export default ForgotPasswordResat
