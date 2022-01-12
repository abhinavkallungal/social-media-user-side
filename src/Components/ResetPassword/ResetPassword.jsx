import React, { useEffect, useState } from 'react';
import { ArrowBack } from '@mui/icons-material'
import { Typography, TextField, Button, IconButton } from '@mui/material'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { resetPassword } from "../../Axios"
import { useHistory } from 'react-router-dom'

import "./ResetPassword.css"
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';


function ResetPassword() {
    const history = useHistory()
    const currentuser = (useSelector((state) => state.user.user))
    let data = currentuser



    const [values, setValues] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
        userId: "",
        showoldPassword: false,
        showNewPassword: false,
        showConfirmPassword: false,
    });

    const [error, setError] = useState({
        oldPassword: '',
        NewPassword: '',
        ConfirmPassword: ''
    })


    useEffect(() => {
        setValues({ ...values, userId: data._id });

    }, [data])


    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value.trim() });
    };

    const handleClickShowPassword = (prop) => {
        setValues({
            ...values,
            [prop]: !values.prop,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };








    const onSubmit = () => {

        if(values.newPassword !== values.confirmPassword){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "password don't match",
              })
        }else{

            
            resetPassword(values).then((data) => {
                Swal.fire(
                    'Password Updated',
                    'Your Password has been Updated.',
                    'success'
                  ).then(()=>{
                      history.push('/settings')
                  })
            }).catch((message) => {
                console.log(message);

                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: message,
                  })
            })
        }


    }




    return (
        <div className='ResetPassword'>
            <div className="card ">
                <div className="Head">
                    <div className="backIcon">
                        <IconButton style={{ backgroundColor: "#ffffff", marginRight: "20px" }}>  <ArrowBack style={{ color: '#007fff' }} /></IconButton>

                    </div>
                    Reset Password
                </div>


                <div className="Details p-3">
                    <Typography variant='h4' color={"#007fff"} textAlign='center'>Reset Password</Typography>
                    <form action="">
                        <div className="row">
                            <div className="col-lg-7  mt-5 mx-auto">
                                <FormControl sx={{ m: 1 }} fullWidth variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Old Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={values.showoldPassword ? 'text' : 'password'}
                                        value={values.oldPassword}
                                        onChange={handleChange('oldPassword')}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => handleClickShowPassword('showoldPassword')}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Old Password"
                                    />
                                    <Typography>{error.oldPassword}</Typography>
                                </FormControl>

                            </div>
                            <div className="col-lg-7  mt-3 mx-auto">
                                <FormControl sx={{ m: 1 }} fullWidth variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password"> New Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={values.showNewPassword ? 'text' : 'password'}
                                        value={values.newPassword}
                                        onChange={handleChange('newPassword')}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {values.showNewPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="New Password"
                                    />
                                    <Typography>{error.NewPassword}</Typography>

                                </FormControl>

                            </div>
                            <div className="col-lg-7  mt-3 mx-auto">
                                <FormControl sx={{ m: 1 }} fullWidth variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={values.showConfirmPassword ? 'text' : 'password'}
                                        value={values.confirmPassword}
                                        onChange={handleChange('confirmPassword')}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {values.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Confirm Password"
                                    />
                                    <Typography>{error.ConfirmPassword}</Typography>
                                </FormControl>

                            </div>



                            <div className="saveButton">

                                <Button variant="contained" onClick={onSubmit}>Reset Pasword</Button>
                            </div>

                        </div>
                    </form>
                </div>

            </div>

        </div>
    )
}

export default ResetPassword
