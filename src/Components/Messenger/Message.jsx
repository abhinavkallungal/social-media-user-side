import moment from 'moment';
import React from 'react'


function Message(props) {
    const { item } = props;


    return (
        <div className='Message'>
            <div className={item.own ? 'content own' : 'content'}>

                <span>{item.message}</span>
                <span className='time'>{moment(item.time).fromNow()}</span>

            </div>


        </div>

    )
}

export default Message
