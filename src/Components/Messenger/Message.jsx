import moment from 'moment';
import React from 'react'


function Message(props) {
    const { item ,currentUser} = props;


    return (
        <div className='Message'>
            <div className={(item.sender ===currentUser) ? 'content own' : 'content'}>

                <span>{item.message}</span>
                <span className='time'>{moment(item.createdAt).fromNow()}</span>

            </div>


        </div>

    )
}

export default Message
