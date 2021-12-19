import axios from 'axios';



const baseURL = 'http://localhost:4000'


export const checkUserName = (formdata) => {
    return new Promise(async (resolve, reject) => {
        await axios.post('http://localhost:4000/api/v1/user/checkUserName', formdata).then((data) => {
            resolve(data)

        }).catch((err) => {

            reject({ usernameExist: true, message: "choose another one" })
        })
    })
}


export const doSignup = (formdata) => {
    console.log(formdata);
    return new Promise(async (resolve, reject) => {
        await axios.post('http://localhost:4000/api/v1/user/signup', formdata).then((data) => {
            resolve(data.data)

        }).catch((err) => {
            reject(err)
        })

    })


}

export const verifyEmailotp = (fromdata) => {
    return new Promise(async (resolve, reject) => {
        axios.post('http://localhost:4000/api/v1/user/verifyEmailOtp', fromdata).then((data) => {

            localStorage.setItem("token", data.data.token)
            localStorage.setItem("user", JSON.stringify(data.data.user))

            resolve(data)

        }).catch((err) => {
            console.log("otpverification err");
            console.log('err', err);
            reject(err)
        })
    })

}

export const verifyMobileOtp = (fromdata) => {
    return new Promise(async (resolve, reject) => {
        axios.post('http://localhost:4000/api/v1/user/verifyMobileOtp', fromdata).then((data) => {

            localStorage.setItem("token", data.data.token)
            localStorage.setItem("user", JSON.stringify(data.data.user))

            resolve(data)

        }).catch((err) => {
            console.log("otpverifissssscation err");
            console.log('err', err);
            reject(err)
        })
    })

}

export const login = (formdata) => {
    return new Promise(async (resolve, reject) => {
        console.log(formdata);
        axios.post('http://localhost:4000/api/v1/user/login', formdata).then((data) => {

            console.log("login data", data);
            localStorage.setItem("token", data.data.token)
            console.log("login user", data.data.user);
            console.log("login success");
            localStorage.setItem("user", JSON.stringify(data.data.user))

            resolve(data.data.user)

        }).catch((err) => {
            console.log('err', err);
            reject(err)
        })
    })

}

export const google=()=>{
    
    return new Promise (async(resolve,reject)=>{
        axios.get("http://localhost:4000/auth/google").then(()=>{

        }).catch(()=>{
            
        })
    })
}

export const createPost = (formdata) => {
    console.log(">>>>>>>>>>>>>>>>>>>>",formdata);
    console.log(1);
    return new Promise(async (resolve, reject) => {
        console.log(2);

        console.log(formdata);
        const token = localStorage.getItem("token")
        console.log(3);

        axios.post('http://localhost:4000/api/v1/user/addpost', formdata, { headers: { Authorization: token } }).then((data) => {
            console.log(4);

            resolve(data.data.post)

        }).catch((err) => {
            console.log(5);

            console.log('err', err);
            reject(err)
        })
    })

}


export const getAllpost = () => {

    return new Promise(async (resolve, reject) => {

        const token = localStorage.getItem("token")

        axios.get('http://localhost:4000/api/v1/user/getAllPost', { headers: { Authorization: token } }).then((data) => {

            resolve(data.data.posts)

        }).catch((err) => {

            console.log('err', err);
            reject(err)
        })
    })

}

export const getProfileDetails = (userId) => {
    console.log(userId);

    return new Promise(async (resolve, reject) => {

        const token = localStorage.getItem("token")

        axios.post('http://localhost:4000/api/v1/user/getProfileDetalils', { userId }, { headers: { Authorization: token } }).then((data) => {
            console.log(data);

            resolve({user:data.data.user[0], posts:data.data.posts})

        }).catch((err) => {

            console.log('err', err);
            reject(err)
        })
    })

}

export const addAccountDetails = (userdata) => {
    console.log(userdata.state,userdata.phone);

    return new Promise(async (resolve, reject) => {

        const token = localStorage.getItem("token")

        axios.post('http://localhost:4000/api/v1/user/addAccountDetails', { userdata }, { headers: { Authorization: token } }).then((data) => {
            console.log(data);
            localStorage.setItem("user", JSON.stringify(data.data))


            resolve(data.data.user)

        }).catch((err) => {

            console.log('err', err);
            reject(err)
        })
    })

}

export const search = ({keyword,userId}) => {

    return new Promise(async (resolve, reject) => {

        const token = localStorage.getItem("token")

        axios.post('http://localhost:4000/api/v1/user/search', { keyword,userId }, { headers: { Authorization: token } }).then((data) => {

        resolve(data.data)
            
        }).catch((err) => {

          
        })
    })

}

export const dofollow=({userId,currentuserId})=>{
    console.log(userId,currentuserId);
    return new Promise ((resolve,reject)=>{
        

        const token = localStorage.getItem("token")

        axios.post('http://localhost:4000/api/v1/user/follow', {userId, currentuserId }, { headers: { Authorization: token } }).then((data) => {
            console.log(data);
            resolve(data.data)
            

        }).catch((err) => {
            reject(err.data)
 
          
        })

    })

}


    export const doLike=({postId,userId})=>{
    console.log(userId,postId);
    return new Promise ((resolve,reject)=>{
    
        const token = localStorage.getItem("token")

        axios.post('http://localhost:4000/api/v1/user/postLike', {userId, postId }, { headers: { Authorization: token } }).then((data) => {
            console.log(data);
            resolve(data.data)
            

        }).catch((err) => {
            reject(err.data)
 
          
        })

    })

}


export const doSave=({postId,userId})=>{
    return new Promise ((resolve,reject)=>{
    
        const token = localStorage.getItem("token")

        axios.post('http://localhost:4000/api/v1/user/postSave', {userId, postId }, { headers: { Authorization: token } }).then((data) => {
            console.log(data);
            localStorage.setItem("user", JSON.stringify(data.data.user))

            resolve(data.data)
            

        }).catch((err) => {
            reject(err.data)
 
          
        })

    })

}

export const addProfilePhoto=({profilePhoto,currentuserId})=>{
    return new Promise ((resolve,reject)=>{
        

        const token = localStorage.getItem("token")

        axios.post('http://localhost:4000/api/v1/user/addProfilePhoto', {profilePhoto, currentuserId }, { headers: { Authorization: token } }).then((data) => {
            console.log(data);
            localStorage.setItem("user", JSON.stringify(data.data.user))

            resolve(data.data.user)            

        }).catch((err) => {
            reject(err.data)
 
          
        })

    })

}

export const DoAddCoverPhoto=({coverPhoto,currentuserId})=>{
    return new Promise ((resolve,reject)=>{
        

        const token = localStorage.getItem("token")

        axios.post('http://localhost:4000/api/v1/user/addCoverPhoto', {coverPhoto, currentuserId }, { headers: { Authorization: token } }).then((data) => {
            console.log(data);
            localStorage.setItem("user", JSON.stringify(data.data.user))

            resolve(data.data.user)            

        }).catch((err) => {
            reject(err.data)
 
          
        })

    })

}
