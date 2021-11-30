import axios from 'axios';



const baseURL = 'http://localhost:4000'


export const checkUserName=(formdata)=>{
    return new Promise(async(resolve,reject)=>{
        await axios.post('http://localhost:4000/api/v1/user/checkUserName',formdata).then((data)=>{
            resolve(data)

        }).catch((err)=>{
            
            reject({usernameExist:true,message:"choose another one"})
        })
    })
}


export const doSignup = (formdata) => {
        return new Promise(async (resolve, reject) => {
                await axios.post('http://localhost:4000/api/v1/user/signup', formdata).then((data) => {

                resolve(data.data)

                }).catch((err) => {
                        console.log("catch", err);
                        reject(err)
                })

        })


}

export const verifyEmailotp =(fromdata)=>{
    return new Promise(async(resolve,reject)=>{
        axios.post('http://localhost:4000/api/v1/user/verifyEmailOtp',fromdata).then((data)=>{

        localStorage.setItem("token", data.data.token)
        localStorage.setItem("user",JSON.stringify( data.data.user))

            resolve(data)

        }).catch((err)=>{
            console.log("otpverification err");
            console.log('err',err);
            reject(err)
        })
    })

}

export const login =(formdata)=>{
    return new Promise(async(resolve,reject)=>{
        console.log(formdata);
        axios.post('http://localhost:4000/api/v1/user/login',formdata).then((data)=>{

        console.log("login data",data);
        localStorage.setItem("token", data.data.token)
        console.log("login user",data.data.user);
        console.log("login success");
        localStorage.setItem("user",JSON.stringify( data.data.user))

            resolve(data)

        }).catch((err)=>{
            console.log('err',err);
            reject(err)
        })
    })

}

export const createPost=(formdata)=>{
    console.log(1);
    return new Promise(async(resolve,reject)=>{
        console.log(2);

        console.log(formdata);
        const token = localStorage.getItem("token")
        console.log(3);

        axios.post('http://localhost:4000/api/v1/user/addpost',formdata, { headers: { Authorization: token } }).then((data)=>{
            console.log(4);
    
            resolve(data.data.post)

        }).catch((err)=>{
            console.log(5);

            console.log('err',err);
            reject(err)
        })
    })

}


export const getAllpost=()=>{

    return new Promise(async(resolve,reject)=>{
      
        const token = localStorage.getItem("token")

        axios.get('http://localhost:4000/api/v1/user/getAllPost', { headers: { Authorization: token } }).then((data)=>{
    
            resolve(data.data.posts)

        }).catch((err)=>{

            console.log('err',err);
            reject(err)
        })
    })

}