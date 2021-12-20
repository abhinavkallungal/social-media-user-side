import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';




function FeedSkeleton() {
    return (
        <div className='FeedSkeleton p-5'>

       
        <Stack >
            <div className="postHeader d-flex justify-content-between align-items-center">
                <div className="profile  d-flex justify-content-between">
                    <div className="img me-3">
                     <Skeleton variant="circular" width={40} height={40} />
                    </div>
                    <div>
                    <Skeleton variant="text" width={150}/>
                    <Skeleton variant="text" width={50}/>

                    </div>
                </div>
                <Skeleton variant="rectangular" width={10} height={30} />



            </div>
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="rectangular" width='100%' height={260} className='mt-3' />

            <div className="profile  d-flex justify-content-between mt-3">
                  
                    <Skeleton variant="text" width={50}/>
                    <Skeleton variant="text" width={50}/>

            </div>

        </Stack>
        </div>

            
    )
}

export default FeedSkeleton
