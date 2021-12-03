import { CastForEducation, Home, LocationCity } from '@mui/icons-material'
import React from 'react'
import "./ProfileIntroCard.css"

function ProfileIntroCard() {
    return (
        <div className="ProfileIntroCard mt-3">
            <div className="card shadow p-4">
                <div className="Heder fw-bold mb-3">
                    INTRODUCTION
                </div>
                <div className="mb-2">
                    <Home/> Lives in <span className="fw-bold">Malappuram</span> 
                </div>
                <div className="mb-2">
                    <LocationCity/> From  <span className="fw-bold">Malappuram</span> 
                </div>
                <div className="mb-2">
                    <CastForEducation/> Went to <span className="fw-bold"> Gmhss CU Campus School</span> 
                </div>
            </div>
            
        </div>
    )
}

export default ProfileIntroCard
