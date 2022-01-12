import { useState, useEffect } from 'react'
import { ArrowBack, Facebook, Google, Instagram, LinkedIn, Twitter } from '@mui/icons-material'
import { Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import React from 'react'
import './AddSocialAccount.css'
import { AddSocialAccounts, getSocialAccounts } from '../../Axios'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom'







function AddSocialAccount({user}) {
    const [socialAccounts, setSocialAccouts] = useState({})
    const [updated, setUpdated] = useState(false)
  
    const history = useHistory()
    const handleInput = (e) => {
        setUpdated(true)
        setSocialAccouts({ ...socialAccounts, [e.target.name]: e.target.value })
    }

    const submit = () => {

        console.log(socialAccounts);

        AddSocialAccounts({ socialAccounts:socialAccounts, userId: user._id }).then(() => {
            Swal.fire(
                'Updated!',
                'Your profile is Updated.',
                'success'
            ).then(() => {
                history.push('/settings')
            })

        })

    }

    useEffect(() => {
        if (user._id === undefined){

           
        }else{
            getSocialAccounts(user?._id).then((data) => {
                
                console.log(data);
                setSocialAccouts(data?.socialAccounts[0])
                
            })
        }
    }, [user])


    return (
        <div className="AddSocialAccount">
            <div className="card ">
                <div className="Head">
                    <div className="backIcon">
                        <IconButton style={{ backgroundColor: "#ffffff", marginRight: "20px" }}>  <ArrowBack style={{ color: '#007fff' }} /></IconButton>

                    </div>
                    Account Details
                </div>
                <div className="profile p-3">
                    <div className="img">
                        <img src={user?.ProfilePhotos?.slice(-1).pop()} alt="" />
                    </div>
                    <Typography variant="h5">{user?.name}</Typography>
                    <Typography variant="h6">{user?.username}</Typography>
                </div>
                <div className="Details p-3">
                    <form action="">

                        <div className="row">
                            <div className="col-lg-6 p-4">
                                <TextField
                                    id="input-with-icon-textfield"
                                    label="Facebook"
                                    name='Facebook'
                                    type='url'
                                    fullWidth
                                    value={socialAccounts?.Facebook}
                                    onChange={handleInput}
                                    placeholder='https://www.facebook.com'
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Facebook style={{ color: '#4065AD' }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    variant="outlined"
                                />

                            </div>

                            <div className="col-lg-6 p-4">
                                <TextField
                                    id="input-with-icon-textfield"
                                    label="Twitter"
                                    type='url'
                                    name='Twitter'
                                    value={socialAccounts?.Twitter}

                                    fullWidth
                                    placeholder='https://twitter.com'
                                    onChange={handleInput}

                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Twitter style={{ color: "#00acee" }} Size='40px' />
                                            </InputAdornment>
                                        ),
                                    }}
                                    variant="outlined"
                                />

                            </div>


                            <div className="col-lg-6 p-4">
                                <TextField
                                    id="input-with-icon-textfield"
                                    label="LinkedIn"
                                    name="LinkedIn"
                                    type='url'
                                    fullWidth
                                    onChange={handleInput}
                                    value={socialAccounts?.LinkedIn}

                                    placeholder='https://www.linkedin.com'
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LinkedIn style={{ color: "#0e76a8" }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    variant="outlined"
                                />

                            </div>

                            <div className="col-lg-6 p-4">
                                <TextField
                                    id="input-with-icon-textfield"
                                    label="Instagram"
                                    name="Instagram"
                                    type='url'
                                    onChange={handleInput}
                                    value={socialAccounts?.Instagram}

                                    fullWidth
                                    placeholder='https://www.instagram.com'
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Instagram style={{ color: "#E1416A", size: '40px' }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    variant="outlined"
                                />

                            </div>
                            <div className="d-flex align-items-center justify-content-center">
                                <Button variant='contained' onClick={submit} disabled={!updated}>Save</Button>
                            </div>
                        </div>

                    </form>
                </div>

            </div>

        </div>
    )
}

export default AddSocialAccount
