import { CastForEducation, Home, LocationCity } from '@mui/icons-material'
import React from 'react'
import "./ProfileIntroCard.css"

function ProfileIntroCard({user}) {
    console.log(user);
    return (
        <div className="ProfileIntroCard mt-3">
            <div className="card shadow p-4">
                <div className="Heder fw-bold mb-3">
                    INTRODUCTION
                </div>
                
                    {
                        user.hometown ?<div className="mb-2"> <Home/> Lives in <span className="fw-bold">{user.hometown}</span>    </div> :null
                    }

                    {
                        user.city ?  <div className="mb-2"> <LocationCity/> From  <span className="fw-bold">{user.city}</span>  </div> : null
                    }
                    {
                        user.college? <div className="mb-2"> <CastForEducation/> Went to <span className="fw-bold"> {user.college}</span> </div> :
                        user.highersecondary? <div className="mb-2"> <CastForEducation/> Went to <span className="fw-bold"> {user.highersecondary}</span> </div> :
                        user.highschool ?<div className="mb-2"> <CastForEducation/> Went to <span className="fw-bold"> {user.highschool}</span> </div>:null

                    }
                    
                    
             
            </div>
            
        </div>
    )
}

export default ProfileIntroCard
