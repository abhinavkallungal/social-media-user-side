import React from 'react'
import './ProfileCard.css'
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    logo: {
        color: "#007FFF",
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 700,
        fontSize: 22

    },
    navItem: {
        maxWidth: '42px',
        maxHeight: '42px',
        minWidth: '42px',
        minHeight: '42px',
        borderRadius: 10,
        backgroundColor: "#f1f1f1",
        padding: 0,
    },
    root: {
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
        color: '#ffffff',
        height: 42,
        padding: '0 30px',
    },
});

function ProfileCard() {
    const classes =useStyles()
    return (
        <div className="ProfileCard" >
            <div className="img">
                <img  src="https://source.unsplash.com/user/erondu/50x50" alt="" />
            </div>
            <div>
                <p>Abhinav Kallungal</p>
                <span>@abhinavKallungal</span>
            </div>
            
        </div>
    )
}

export default ProfileCard
