import React, { useState } from 'react'
import './SignupPage.css'
import { Grid, Card, Box, TextField, Button } from '@mui/material'
import { doSignup, checkUserName,verifyEmailotp } from '../../Axios'
import { useHistory ,Link} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginAction } from "../../Redux/userSlice"

function SignupPage() {
    const history = useHistory()
    const dispatch = useDispatch()

    const [otpsend, setOtpSend] = useState(false)
    
    const [user, setUser] = useState({
        email: '',
        name: "",
        username: "",
        password: '',
        otp: ''
    })
    const [error,setError]=useState({error:false,message:null})
    
    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    
    const changeUsername = (e) => {
        setUser({ ...user, username: e.target.value });
        console.log(user.username);
        checkUserName({username:e.target.value.trim()}).then((data)=>{
            setError({error:false,message:''})

        }).catch((error)=>{
            setError({error:true,message:'username Already exist'})

        })
    }
   
    const signup = () => {
        if(user.name===''){
            setError({error:true,message:"name is requerd"})
        } if(user.username===''){
            setError({error:true,message:"username is requerd"})
        }
        if(user.email===''){
            setError({error:true,message:"email is requerd"})
        }
        else if(user.password===''){
            setError({error:true,message:"password is requerd"})
        }
        else{
            setError({error:false,message:''})

            doSignup(user).then(()=>{
                    setOtpSend(true)
            }).catch((error)=>{
                setError({ error: true, message: error.response.data.message })


            })

        }
        

    }


    const verifyEmail=()=>{
        console.log(">>>>>>>>>1");
        verifyEmailotp({email:user.email,otp:user.otp}).then((data)=>{
            console.log(">>>>>>>>>2",data.data.user);
            history.push('/')
        }).catch(()=>{
            console.log(">>>>>>>>>3");
        })

    }
    return (
        <div className='SignupPage'>

            <Grid container >
                <Grid item className='item'>

                    {
                        otpsend ? (<Card className='card'>
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
                                            onChange={onChange}
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

                        </Card>) 

                        : 

                        (<Card className='card'>
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
                                            label="Name"
                                            defaultValue=""
                                            name='name'
                                            onChange={onChange}


                                        />
                                    </div>
                                    <div>
                                        <TextField
                                            required
                                            id="outlined-required"
                                            label="User Name"
                                            defaultValue=""
                                            name='username'
                                            onChange={changeUsername}

                                        />
                                    </div>
                                    <div>
                                        <TextField
                                            required
                                            id="outlined-required"
                                            label="Email"
                                            defaultValue=""
                                            name='email'
                                            onChange={onChange}
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
                                            onChange={onChange}

                                        />
                                    </div>
                                    <div className='d-flex'>

                                        <Button onClick={signup} className='signupBtn' variant='contained' size='large'>SignUp</Button>
                                    </div>
                                </Box>
                            </div>
                            <div className='errormessage'>
                            {
                                    error ? <span >{error.message}</span> :null
                            }
                            </div>
                            <div className="agreepolicy">
                                By signing up, you agree to our Terms , Data Policy and Cookies Policy .
                            </div>

                        </Card>)
                    }

                    <Card className='footer'>
                        <span>
                            Have an account? <Link href='/login'>Log in</Link> 
                        </span>
                    </Card>
                </Grid>

            </Grid>

        </div>
    )
}

export default SignupPage
