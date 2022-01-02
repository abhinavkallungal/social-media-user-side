import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Card } from '@mui/material';
import { useHistory } from 'react-router-dom'
import { useDispatch, useStore } from 'react-redux'
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { formatMuiErrorMessage } from '@mui/utils';
import { forgotPasswordRequest } from '../../Axios';






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

export default function ForgotPassword() {


  const history = useHistory()
  const [errors, setErrors] = useState({ error: false, emailErr: "" })
  const [form, setForm] = useState({})
  const[submited,setSubmited]=useState(false)
  const[success,setSuccess]=useState(false)






  const handleSubmit = () => {

    if(form.email===undefined && form.phone==undefined){
      setErrors({ error: true, emailErr:  " email or phone number is required " })

    }else{
      setSubmited(true)

      forgotPasswordRequest(form).then(()=>{
        setSuccess(true)
        setSubmited(true)

        
      }).catch((err)=>{
        console.log(err);
        setErrors({ error: true, emailErr: err.response.data.message })
        setSubmited(false)
        console.log(err.response);




      })

    }

  }

  const handleChange = (e) => {


    if (e.target.name === "email") {

      const trimEmail = e.target.value.trim()
  
      if (new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(trimEmail)) {
        setForm({ email: trimEmail })

        setErrors({ error: false, emailErr: "" })
      }
       else if (new RegExp(/^([+]\d{2})?\d{10}$/).test(trimEmail)) {

        setForm({  phone: trimEmail })

        setErrors({ error: false, emailErr: "" })
  
      } else {
        setErrors({ error: true, emailErr: " Not valid a  detailes " })
  
      }
  
  
    }
    
  
  }
  












  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">

        {
          !success ? <Card className="card py-5 px-4 mt-5 shadow">
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
              Forgot Password
            </Typography>
            <Box noValidate sx={{ mt: 1 }}>
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


              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={submited}
                onClick={handleSubmit}
              >
                {
                  submited ? <Box sx={{ display: 'flex' }}><CircularProgress /> </Box> : "send Reset Link"
                }
                
                
              </Button>
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
            <Typography className="Typography " component="h1" variant="h5" color='green'>
              Successfull ..........!
            </Typography>
            <Box noValidate sx={{ mt: 1 }}>

            <Typography className="Typography " component="h1" variant="h6" >
                Successfully send  Link in to Your Email
            </Typography>
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
        

        

        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>

    </ThemeProvider>
  );
}

