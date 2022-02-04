import axios from 'axios';

let BASE_URL ='http://socialmediaserver.kallungal.tech'



export const checkUserName = (formdata) => {
  
    return new Promise(async (resolve, reject) => {
        await axios.post(BASE_URL+'/api/v1/user/checkUserName', formdata).then((data) => {
            
            resolve(data)

        }).catch((err) => {
          
            reject({ usernameExist: true, message: "choose another one" })
        })
    })
}


export const doSignup = (formdata) => {
   
    return new Promise(async (resolve, reject) => {
        await axios.post(BASE_URL+'/api/v1/user/signup', formdata).then((data) => {
            resolve(data.data)

        }).catch((err) => {
            reject(err)
        })

    })


}

export const emailOtpResend = ({ email }) => {
   
    return new Promise(async (resolve, reject) => {
        axios.post(BASE_URL+'/api/v1/user/reSendEmailOtp', { email }).then((data) => {

            resolve(data)

        }).catch((err) => {
            reject(err.response.data)
        })
    })

}

export const verifyEmailotp = (fromdata) => {
    return new Promise(async (resolve, reject) => {
        axios.post(BASE_URL+'/api/v1/user/verifyEmailOtp', fromdata).then((data) => {

            localStorage.setItem("token", data.data.token)
            localStorage.setItem("user", JSON.stringify(data.data.user))

            resolve(data)

        }).catch((err) => {
            reject(err.data)
        })
    })

}

export const phoneOtpResend = ({ phone }) => {
  
    return new Promise(async (resolve, reject) => {
        axios.post(BASE_URL+'/api/v1/user/reSendEmailOtp', { phone }).then((data) => {

            resolve(data)

        }).catch((err) => {
            reject(err.response.data)
        })
    })

}

export const verifyMobileOtp = (fromdata) => {
    return new Promise(async (resolve, reject) => {
        axios.post(BASE_URL+'/api/v1/user/verifyMobileOtp', fromdata).then((data) => {

            localStorage.setItem("token", data.data.token)
            localStorage.setItem("user", JSON.stringify(data.data.user))

            resolve(data)

        }).catch((err) => {
            
            
            reject(err)
        })
    })

}






export const login = (formdata) => {
    return new Promise(async (resolve, reject) => {
       
        axios.post(BASE_URL+'/api/v1/user/login', formdata).then((data) => {

          
            localStorage.setItem("token", data.data.token)
           
            localStorage.setItem("user", JSON.stringify(data.data.user))

            resolve(data.data)

        }).catch((err) => {
            
            reject(err)
        })
    })

}

export const thirdPartyLogin = ({ email }) => {

    return new Promise(async (resolve, reject) => {
        axios.post(BASE_URL+"/api/v1/user/thirdPartyLogin", { email }).then((data) => {

          
            localStorage.setItem("token", data.data.token)
           
            localStorage.setItem("user", JSON.stringify(data.data.user))

            resolve(data.data)

        }).catch((err) => {
            
            reject(err)

        })
    })
}

export const forgotPasswordRequest = (formData) => {

    return new Promise(async (resolve, reject) => {
        axios.post(BASE_URL+"/api/v1/user/forgotPasswordRequest", formData).then((data) => {

           


            resolve(data.data.user)

        }).catch((err) => {
           
            reject(err)

        })
    })
}

export const forgotPasswordReset = (formData) => {
   

    return new Promise(async (resolve, reject) => {
        axios.post(BASE_URL+"/api/v1/user/forgotPasswordReset", formData,).then((data) => {

           


            resolve(data.data.user)

        }).catch((err) => {
            
            reject(err)

        })
    })
}


export const resetPassword = (formData) => {
   
    return new Promise(async (resolve, reject) => {
        axios.post(BASE_URL+"/api/v1/user/resetPassword", formData,).then((data) => {

           


            resolve(data.data.user)

        }).catch((err) => {
         
            reject(err.response.data.message)

        })
    })
}




export const createPost = (formdata) => {

    return new Promise(async (resolve, reject) => {

       
        const token = localStorage.getItem("token")

        axios.post(BASE_URL+'/api/v1/user/addpost', formdata, { headers: { Authorization: token, 'Content-Type': 'multipart/form-data' } }).then((data) => {
          

            resolve(data.data.post)

        }).catch((err) => {
           

            
            reject(err)
        })
    })

}

export const getFriends = ({ userId }) => {
    

    return new Promise(async (resolve, reject) => {

        const token = localStorage.getItem("token")


        axios.get(`${BASE_URL}/api/v1/user/getFriends/${userId}`,  { headers: { Authorization: token } }).then((data) => {

            resolve(data.data.friends)

        }).catch((err) => {
           

            
            reject(err)
        })
    })

}

export const getTagsDetailes = ({ postId }) => {
   

    return new Promise(async (resolve, reject) => {

        const token = localStorage.getItem("token")


        axios.post(BASE_URL+'/api/v1/user/getTagsDetailes', { postId }, { headers: { Authorization: token } }).then((data) => {
            
            resolve(data.data.tagWith)

        }).catch((err) => {
           

            
            reject(err)
        })
    })

}



export const getAllpost = ({ userId, page }) => {

    
    return new Promise(async (resolve, reject) => {

        const token = localStorage.getItem("token")

        axios.post(BASE_URL+'/api/v1/user/getAllPost', { userId, page }, { headers: { Authorization: token } }).then((data) => {
            

            resolve(data.data.posts)

        }).catch((err) => {

            
            reject(err)
        })
    })

}

export const getTrendingPost = () => {
    return new Promise((resolve, reject) => {

        const token = localStorage.getItem("token")

        axios.get(BASE_URL+'/api/v1/user/getTrendingPost', { headers: { Authorization: token } }).then((data) => {
            

            resolve(data.data)


        }).catch((err) => {
            reject(err)


        })

    })

}

export const getProfileDetails = (userId) => {
  


    return new Promise(async (resolve, reject) => {

        const token = localStorage.getItem("token")

        axios.get(`${BASE_URL}/api/v1/user/getProfileDetails/${userId}`,  { headers: { Authorization: token } }).then((data) => {
            

            resolve({ user: data.data.user[0], posts: data.data.posts })

        }).catch((err) => {

            
            reject(err)
        })
    })

}

export const addAccountDetails = (userdata) => {
  

    return new Promise(async (resolve, reject) => {

        const token = localStorage.getItem("token")

        axios.post(BASE_URL+'/api/v1/user/addAccountDetails', { userdata }, { headers: { Authorization: token } }).then((data) => {
            
            localStorage.setItem("user", JSON.stringify(data.data))


            resolve(data.data.user)

        }).catch((err) => {

            
            reject(err)
        })
    })

}


export const AddSocialAccounts = ({socialAccounts,userId}) => {

    

    return new Promise(async (resolve, reject) => {

        const token = localStorage.getItem("token")

        axios.post(BASE_URL+'/api/v1/user/AddSocialAccount',  {socialAccounts,userId} , { headers: { Authorization: token } }).then((data) => {
            
            localStorage.setItem("user", JSON.stringify(data.data))


            resolve(data.data.user)

        }).catch((err) => {

            
            reject(err)
        })
    })

}


export const getSocialAccounts = (userId) => {

    return new Promise(async (resolve, reject) => {

        const token = localStorage.getItem("token")


        axios.get(`${BASE_URL}/api/v1/user/getSocialAccounts/${userId}`,  {  headers: { Authorization: token } }).then((data) => {
            


            resolve(data.data)

        }).catch((err) => {

            
            reject(err)
        })
    })

}



export const getTagedPost = ({userId}) => {


    return new Promise(async (resolve, reject) => {

        const token = localStorage.getItem("token")


        axios.get(`${BASE_URL}/api/v1/user/getTagedPost/${userId}`,  {  headers: { Authorization: token } }).then((data) => {
            


            resolve(data.data)

        }).catch((err) => {

            
            reject(err)
        })
    })

}

export const getSavedPosts = ({userId}) => {

    return new Promise(async (resolve, reject) => {

        const token = localStorage.getItem("token")


        axios.get(`${BASE_URL}/api/v1/user/getSavedPosts/${userId}`,  {  headers: { Authorization: token } }).then((data) => {
            


            resolve(data.data)

        }).catch((err) => {

            
            reject(err)
        })
    })

}

export const getFollowers = ({userId}) => {

    return new Promise(async (resolve, reject) => {

        const token = localStorage.getItem("token")


        axios.get(`${BASE_URL}/api/v1/user/getFollowers/${userId}`,  {  headers: { Authorization: token } }).then((data) => {
            


            resolve(data.data)

        }).catch((err) => {

            
            reject(err)
        })
    })

}

export const getFollowings = ({userId}) => {

    return new Promise(async (resolve, reject) => {

        const token = localStorage.getItem("token")


        axios.get(`${BASE_URL}/api/v1/user/getFollowings/${userId}`,  {  headers: { Authorization: token } }).then((data) => {
            


            resolve(data.data)

        }).catch((err) => {

            
            reject(err)
        })
    })

}




export const search = ({ keyword, userId }) => {


    return new Promise(async (resolve, reject) => {

        const token = localStorage.getItem("token")

        axios.get(`${BASE_URL}/api/v1/user/search/${userId}/${keyword}`,{ headers: { Authorization: token } }).then((data) => {

            resolve(data.data)

        }).catch((err) => {
            reject(err)

        })
    })

}

export const getFollowRequest = ({userId}) => {
    
    return new Promise(async (resolve, reject) => {

        const token = localStorage.getItem("token")

        axios.get(`${BASE_URL}/api/v1/user/getFollowRequest/${userId}`, { headers: { Authorization: token } }).then((data) => {
            resolve(data.data)

        }).catch((err) => {

            reject(err)
        })
    })

}

export const dofollow = ({ userId, currentuserId }) => {
    return new Promise((resolve, reject) => {


        const token = localStorage.getItem("token")

        axios.post(BASE_URL+'/api/v1/user/follow', { userId, currentuserId }, { headers: { Authorization: token } }).then((data) => {
            
            resolve(data.data)


        }).catch((err) => {
            reject(err)


        })

    })

}


export const doLike = ({ postId, userId }) => {

    return new Promise((resolve, reject) => {

        const token = localStorage.getItem("token")

        axios.post(BASE_URL+'/api/v1/user/postLike', { userId, postId }, { headers: { Authorization: token } }).then((data) => {
            resolve(data.data)


        }).catch((err) => {
            reject(err)


        })

    })

}


export const doSave = ({ postId, userId }) => {
    return new Promise((resolve, reject) => {

        const token = localStorage.getItem("token")

        axios.post(BASE_URL+'/api/v1/user/postSave', { userId, postId }, { headers: { Authorization: token } }).then((data) => {
            
            localStorage.setItem("user", JSON.stringify(data.data.user))

            resolve(data.data)


        }).catch((err) => {
            reject(err)


        })

    })

}

export const doDeletePost = ({ postId, userId }) => {
    return new Promise((resolve, reject) => {

        const token = localStorage.getItem("token")

        axios.delete(BASE_URL+'/api/v1/user/deletePost', { userId, postId }, { headers: { Authorization: token } }).then((data) => {
            

            resolve(data.data)


        }).catch((err) => {
            reject(err)


        })

    })

}

export const doCommet = ({ postId, userId, comment }) => {

    return new Promise((resolve, reject) => {

        const token = localStorage.getItem("token")

        axios.post(BASE_URL+'/api/v1/user/comment', { userId, postId, comment }, { headers: { Authorization: token } }).then((data) => {
          

            resolve({ comments: data.data.comments, NotificationId: data.data.NotificationId })


        }).catch((err) => {
            reject(err)


        })

    })

}

export const doReport = ({ postId, userId, optoion, message }) => {
    return new Promise((resolve, reject) => {

        const token = localStorage.getItem("token")

        axios.post(BASE_URL+'/api/v1/user/report', { userId, postId, optoion, message }, { headers: { Authorization: token } }).then((data) => {


            resolve(data.data.comment)


        }).catch((err) => {
            reject(err)


        })

    })

}

export const addProfilePhoto = ({ profilePhoto, currentuserId }) => {
    return new Promise((resolve, reject) => {


        const token = localStorage.getItem("token")

        axios.post(BASE_URL+'/api/v1/user/addProfilePhoto', { profilePhoto, currentuserId }, { headers: { Authorization: token } }).then((data) => {
            
            localStorage.setItem("user", JSON.stringify(data.data.user))

            resolve(data.data.user)

        }).catch((err) => {
            reject(err)


        })

    })

}

export const DoAddCoverPhoto = ({ coverPhoto, currentuserId }) => {
    return new Promise((resolve, reject) => {


        const token = localStorage.getItem("token")

        axios.post(BASE_URL+'/api/v1/user/addCoverPhoto', { coverPhoto, currentuserId }, { headers: { Authorization: token } }).then((data) => {
            
            localStorage.setItem("user", JSON.stringify(data.data.user))

            resolve(data.data.user)

        }).catch((err) => {
            reject(err)


        })

    })

}

export const getAllNotifications = ({ userId }) => {
    return new Promise((resolve, reject) => {


        const token = localStorage.getItem("token")

        axios.post(BASE_URL+'/api/v1/user/getAllNotifications', { userId }, { headers: { Authorization: token } }).then((data) => {
            

            resolve(data.data.notifications)

        }).catch((err) => {
            reject(err)


        })

    })

}


export const getPostComment = ({ postId }) => {

    return new Promise(async (resolve, reject) => {

        const token = localStorage.getItem("token")

        axios.post(BASE_URL+'/api/v1/user/getPostComments', { postId }, { headers: { Authorization: token } }).then((data) => {
            

            resolve(data.data.comments)

        }).catch((err) => {

            
            reject(err)
        })
    })

}

export const getUserDetailes =({userId})=>{

   
    
    return new Promise(async (resolve,reject)=>{


        const token = localStorage.getItem("token")

        axios.get(`${BASE_URL}/api/v1/user/getUserDetailes/${userId}`,{headers:{Authorization:token}}).then((data)=>{


        

        resolve(data.data)

        }).catch((error)=>{

            reject(error.response)

        })

    })
}

export const sendmsg = ({message,sender,receiver}) => {

    return new Promise(async (resolve, reject) => {

        const token = localStorage.getItem("token")

        axios.post(BASE_URL+'/api/v1/user/sendMessage', {message,sender,receiver}, { headers: { Authorization: token } }).then((data) => {
            

            resolve(data)

        }).catch((err) => {

            
            reject(err)
        })
    })

}


export const getMessages = ({sender,userId}) => {


    return new Promise(async (resolve, reject) => {

        const token = localStorage.getItem("token")

        axios.post(BASE_URL+'/api/v1/user/getmessages', {   sender,receiver:userId}, { headers: { Authorization: token } }).then((data) => {
            

            resolve(data.data.messages)

        }).catch((err) => {

            
            reject(err)
        })
    })

}

export const addStory = (formdata) => {
   

    return new Promise(async (resolve, reject) => {

       
        const token = localStorage.getItem("token")

        axios.post(BASE_URL+'/api/v1/user/addpost', formdata, { headers: { Authorization: token, 'Content-Type': 'multipart/form-data' } }).then((data) => {
          
              
            resolve(data.data.story)

        }).catch((err) => {
           

            
            reject(err)
        })
    })

}


export const getALLStories = () => {
;
    return new Promise(async (resolve, reject) => {

        const token = localStorage.getItem("token")

        axios.get(BASE_URL+'/api/v1/user/getALLStories', { headers: { Authorization: token } }).then((data) => {
          
                
            resolve(data.data)

        }).catch((err) => {
           

            
            reject(err)
        })
    })

}


export const getTrendingStories = () => {
    return new Promise(async (resolve, reject) => {

        const token = localStorage.getItem("token")

        axios.get(BASE_URL+'/api/v1/user/getTrendingStories', { headers: { Authorization: token } }).then((data) => {
               
            resolve(data.data)

        }).catch((err) => {

            reject(err)
        })
    })

}

export const getStoriesSideBar = () => {
;
    return new Promise(async (resolve, reject) => {

        const token = localStorage.getItem("token")

        axios.get(BASE_URL+'/api/v1/user/getStoriesSideBar', { headers: { Authorization: token } }).then((data) => {
          
               
            resolve(data.data)

        }).catch((err) => {
           

            
            reject(err)
        })
    })

}


export const viewSroty = ({storyId,ViewerId}) => {
    return new Promise(async (resolve, reject) => {

        const token = localStorage.getItem("token")

        axios.post(BASE_URL+'/api/v1/user/viewSroty',{storyId,ViewerId}, { headers: { Authorization: token } }).then((data) => {
             
            resolve(data.data)

        }).catch((err) => {

            
            reject(err)
        })
    })

}

export const getBanner = () => {
    return new Promise(async (resolve, reject) => {

        const token = localStorage.getItem("token")
       

        axios.get(BASE_URL+'/api/v1/user/getBanner', { headers: { Authorization: token } }).then((data) => {
            
            resolve(data.data)

        }).catch((err) => {
           

            
            reject(err)
        })
    })

}





