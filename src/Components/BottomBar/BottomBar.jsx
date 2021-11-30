import React from 'react'
import './BottomBar.css'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import { HomeRounded, NotificationsRounded, ChatRounded, PeopleAltRounded } from '@mui/icons-material';


function BottomBar() {

    const [value, setValue] = React.useState('recents');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div  className="BottomBar">

        <BottomNavigation sx={{ width: "100%", position: 'fixed', bottom: 0, left: 0, right: 0 }}  value={value} onChange={handleChange} >
            <BottomNavigationAction
                label="Home"
                value="Home"
                icon={<HomeRounded />}
            />
            <BottomNavigationAction
                label="Notifications"
                value="Notifications"
                icon={<NotificationsRounded />}
            />
            <BottomNavigationAction
                label="Chat"
                value="Chat"
                icon={<ChatRounded />}
            />
            <BottomNavigationAction label="Friends" value="Friends" icon={<PeopleAltRounded />} />
        </BottomNavigation>
        </div>

    );


}

export default BottomBar




