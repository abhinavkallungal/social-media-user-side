import React from 'react'
import './LoginPage.css'
import { Grid, Card, Box, TextField, Button } from '@mui/material'
import { useState } from 'react'
import { login, verifyEmailotp } from '../../Axios'
import { useHistory, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginAction } from "../../Redux/userSlice"



function LoginPage() {
    const history = useHistory()
    const dispatch = useDispatch()
    const [sendOtp, setSendOtp] = useState(false)

    const [error, setError] = useState({ error: false, message: null })
    const [values, setValues] = useState({
        email: "",
        password: "",
        otp: ""
    });


    const handleEmail = (e) => {
        setValues({ ...values, email: e.target.value })
    }

    const handlePassword = (e) => {
        setValues({ ...values, password: e.target.value })
    }

    const handleOtp = (e) => {
        setValues({ ...values, otp: e.target.value })
    }

    const Loginsubmit = (e) => {
        var regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

        if (values.email === "") {

            setError({ error: true, message: "Email Is Requerd" })

        }
        else if (!regex.test(values.email)) {

            setError({ error: true, message: "invalid Email format " })

        } else if (values.password === "") {

            setError({ error: true, message: "Password Is Requerd" })

        }  else {
            login(values).then((data) => {
                if (data.data.user.emailVerified) {
                    dispatch(loginAction(data.data.user))
                    history.push('/')
                } else {
                    setSendOtp(true)
                }

            }).catch((error) => {

                setError({ error: true, message: error.response.data.message })
    
    
            })
           
        }




        
    }

    const verifyEmail = () => {
        verifyEmailotp({ email: values.email, otp: values.otp }).then(() => {

            history.push('/')
        }).catch((error) => {


        })

    }





    return (
        <div className='LoginPage'>

            <Grid container >
                <Grid item className='item'>
                    {
                        sendOtp ? (
                            <Card className='card'>
                                <div className="header">
                                    <h2 className='headerName'>Social Media</h2>
                                    <h4>Enter your otp</h4>
                                </div>
                                <div className="form">
                                    <Box
                                        className='Box'
                                        component="form"
                                        sx={{
                                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                                        }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <div>
                                            <TextField
                                                required
                                                id="outlined-required"
                                                label="OTP"
                                                defaultValue=""
                                                name='otp'
                                                onChange={handleOtp}
                                            />
                                        </div>

                                        <div className='d-flex'>

                                            <Button onClick={verifyEmail} className='signupBtn' variant='contained' size='large'>verify OTP</Button>
                                        </div>
                                    </Box>
                                </div>
                                <div className='errormessage'>


                                </div>
                                <div className="agreepolicy">
                                    By signing up, you agree to our Terms , Data Policy and Cookies Policy .
                                </div>

                            </Card>

                        ) : (
                            <Card className='card'>
                                <div className="header">
                                    <h2 className='headerName'>Social Media</h2>
                                </div>
                                <div className="form">
                                    <Box
                                        className='Box'
                                        component="form"
                                        sx={{
                                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                                        }}
                                        noValidate

                                    >

                                        <div>
                                            <TextField
                                                required
                                                id="outlined-required"
                                                label="Email"
                                                defaultValue=""
                                                name='email'
                                                onChange={handleEmail}
                                            />
                                        </div>


                                        <div>
                                            <TextField
                                                required
                                                id="outlined-required"
                                                label="Password"
                                                type="password"
                                                defaultValue=""
                                                name='password'
                                                onChange={handlePassword}
                                            />
                                        </div>
                                        <div className='d-flex'>

                                            <Button onClick={Loginsubmit} className='signupBtn' variant='contained' size='large'>LOGIN</Button>
                                        </div>
                                    </Box>
                                </div>
                                <div className='errormessage'>
                                    {
                                        error.error && <span >{error.message}</span>
                                    }

                                </div>
                                <div className="agreepolicy">
                                    Forgot password?
                                </div>

                            </Card>

                        )
                    }



                    <Card className='footer'>
                        <span>
                            Don't have an account? <Link to='/signup'> Sign up</Link>
                        </span>
                    </Card>
                </Grid>

            </Grid>

        </div>
    )
}

export default LoginPage
