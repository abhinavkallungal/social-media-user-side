import React from 'react'
import './LoginPage.css'
import { Grid, Card, Box, TextField, Button } from '@mui/material'

function LoginPage() {
    return (
        <div className='LoginPage'>

            <Grid container >
                <Grid item  className='item'>

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
                                        label="Password"
                                        defaultValue=""
                                    />
                                </div>
                                <div className='d-flex'>

                                <Button className='signupBtn'  variant='contained' size='large'>LOGIN</Button>
                                </div>
                            </Box>
                        </div>
                        <div className='errormessage'>
                            <span >Enter a valid email address.</span>
                        </div>
                        <div className="agreepolicy">
                                Forgot password?
                            </div>

                    </Card>
                    <Card className='footer'>
                        <span>
                        Don't have an account? Sign up
                        </span> 
                    </Card>
                </Grid>

            </Grid>

        </div>
    )
}

export default LoginPage
