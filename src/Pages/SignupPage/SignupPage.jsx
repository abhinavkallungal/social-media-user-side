import React from 'react'
import './SignupPage.css'
import { Grid, Card, Box, TextField, Button } from '@mui/material'

function SignupPage() {
    return (
        <div className='SignupPage'>

            <Grid container >
                <Grid item  className='item'>

                    <Card className='card'>
                        <div className="header">
                            <h2 className='headerName'>Social Media</h2>
                            <h4>Sign up to see photos and videos from your friends.</h4>
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
                                        label="Email"
                                        defaultValue=""
                                    />
                                </div>
                                <div>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Name"
                                        defaultValue=""
                                    />
                                </div>
                                <div>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="User Name"
                                        defaultValue=""
                                    />
                                </div>
                                <div>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Password"
                                        defaultValue=""
                                    />
                                </div>
                                <div className='d-flex'>

                                <Button className='signupBtn'  variant='contained' size='large'>SignUp</Button>
                                </div>
                            </Box>
                        </div>
                        <div className='errormessage'>
                            <span >Enter a valid email address.</span>
                        </div>
                        <div className="agreepolicy">
                             By signing up, you agree to our Terms , Data Policy and Cookies Policy .
                        </div>

                    </Card>
                    <Card className='footer'>
                        <span>
                            Have an account? Log in
                        </span> 
                    </Card>
                </Grid>

            </Grid>

        </div>
    )
}

export default SignupPage
