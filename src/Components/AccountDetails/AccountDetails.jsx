import React, { useState, useEffect } from 'react'
import { ArrowBack, Input } from '@mui/icons-material'
import { InputBase, Typography, TextField, Button, IconButton } from '@mui/material'
import './AccountDetails.css'
import { useSelector } from 'react-redux'
import { addAccountDetails } from "../../Axios"


function AccountDetails() {


    const user = (useSelector((state) => state.user.user))
    //  let data = JSON.parse(user)
    let userData = { ...user }



    const onChange = (e) => {

        userData = { ...userData, [e.target.name]: e.target.value }

    }
    const onSubmit = () => {
        console.log(userData);
        addAccountDetails(userData).then((data) => {
            
        }).catch((error) => {

        })
    }





    return (
        <div className="AccountDetails" >

            <div className="card ">
                <div className="Head">
                    <div className="backIcon">
                        <IconButton style={{ backgroundColor: "#ffffff", marginRight: "20px" }}>  <ArrowBack style={{ color: '#007fff' }} /></IconButton>

                    </div>
                    Account Details
                </div>
                <div className="profile p-3">
                    <div className="img">
                        <img src="" alt="" />
                    </div>
                    <Typography variant="h5">{userData.name}</Typography>
                    <Typography variant="h6">@{userData.username}</Typography>
                </div>
                <div className="Details p-3">
                    <form action="">
                        <div className="row">
                            <div className="col-lg-6">
                                <TextField

                                    fullWidth
                                    id="FirstName"
                                    label="Name"
                                    autoComplete="family-name"
                                    value={userData.name}
                                    disabled={true}
                                />
                            </div>
                            <div className="col-lg-6">
                                <TextField
                                    required
                                    fullWidth
                                    disabled={true}
                                    id="Last name"
                                    label="User Name"
                                    value={userData.username}
                                    autoComplete="family-name"
                                />
                            </div>
                            <div className="col-lg-6">
                                <TextField
                                    required
                                    fullWidth
                                    disabled={userData.email ? true : false}
                                    id="Email"
                                    label="Email"
                                    name="email"
                                    value={userData.email ? userData.email : null}
                                    autoComplete="family-name"

                                />
                            </div>
                            <div className="col-lg-6">
                                <TextField
                                    required
                                    fullWidth
                                    disabled={userData.phone ? true : false}
                                    id="Phone"
                                    label="Phone Nummber"
                                    value={userData.phone ? userData.phone : null}
                                    name="phone"
                                    onChange={onChange}

                                    autoComplete="family-name"
                                />
                            </div>
                            <div className="col-lg-12">
                                <TextField
                                    required
                                    fullWidth
                                    id="address"
                                    label="Address Line 1"
                                    name="address1"
                                    value={userData.address1 ? userData.address1 : null}
                                    autoComplete="family-name"
                                    onChange={onChange}

                                />
                            </div>
                            <div className="col-lg-12">
                                <TextField
                                    required
                                    fullWidth
                                    id="addresstwo"
                                    label="Address Line 2"
                                    name="address2"
                                    value={userData.address2 ? userData.address2 : null}

                                    autoComplete="family-name"
                                    onChange={onChange}

                                />
                            </div>
                            <div className="col-lg-6">
                                <TextField
                                    required
                                    fullWidth
                                    id="HomeTown"
                                    label="Home Town"
                                    name="hometown"
                                    value={userData.hometown ? userData.hometown : null}

                                    onChange={onChange}


                                />
                            </div>
                            <div className="col-lg-6">
                                <TextField
                                    required
                                    fullWidth
                                    id="City"
                                    label="City"
                                    name="city"
                                    value={userData.city ? userData.city : null}
                                    autoComplete="family-name"
                                    onChange={onChange}

                                />

                            </div>
                            <div className="col-lg-6">
                                <TextField
                                    required
                                    fullWidth
                                    id="State"
                                    label="State"
                                    name="state"
                                    value={userData.state ? userData.state : null}
                                    autoComplete="state"
                                    onChange={onChange}

                                />
                            </div>
                            <div className="col-lg-6">
                                <TextField
                                    required
                                    fullWidth
                                    id="Pincode"
                                    label="PinCode"
                                    value={userData.pincode ? userData.pincode : null}
                                    name="pincode"
                                    autoComplete="family-name"

                                    onChange={onChange}

                                />
                            </div>

                            <div className="col-lg-6">
                                <TextField
                                    required
                                    fullWidth
                                    id="EmployStatus"
                                    label="Employ Status"
                                    name="employstatus"
                                    autoComplete="family-name"
                                    value={userData.employstatus && userData.employstatus }
                                    onChange={onChange}

                                />
                            </div>
                            <div className="col-lg-6">
                                <TextField
                                    required
                                    fullWidth
                                    id="c"
                                    label="Current Working Place"
                                    name="workingplace"
                                    autoComplete="family-name"
                                    value={userData.workingplace ? userData.workingplace : null}

                                    onChange={onChange}

                                />
                            </div>
                            <div className="col-lg-6">
                                <TextField
                                    required
                                    fullWidth
                                    id="qualification"
                                    label="Education Qualification"
                                    name="qualification"
                                    autoComplete="family-name"
                                    value={userData.qualification ? userData.qualification : null}

                                    onChange={onChange}

                                />
                            </div>
                            <div className="col-lg-6">
                                <TextField
                                    required
                                    fullWidth
                                    id="highschool"
                                    label="High School"
                                    name="highschool"
                                    value={userData.highschool ? userData.highschool : null}

                                    autoComplete="family-name"
                                    onChange={onChange}

                                />
                            </div>
                            <div className="col-lg-6">
                                <TextField
                                    required
                                    fullWidth
                                    id="highersecondary"
                                    label="Higher Secondary"
                                    name="highersecondary"
                                    autoComplete="family-name"
                                    value={userData.highersecondary &&  userData.highersecondary }

                                    onChange={onChange}

                                />
                            </div>
                            <div className="col-lg-6">
                                <TextField
                                    required
                                    fullWidth
                                    id="college"
                                    label="College"
                                    name="college"
                                    autoComplete="family-name"
                                    onChange={onChange}
                                    value={userData.college ? userData.college : null}


                                />
                            </div>
                            <div className="saveButton">

                                <Button variant="contained" onClick={onSubmit}>Save Data</Button>
                            </div>

                        </div>
                    </form>
                </div>

            </div>

        </div>
    )
}

export default AccountDetails
