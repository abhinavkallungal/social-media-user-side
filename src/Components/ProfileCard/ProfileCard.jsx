import React,{useEffect}  from 'react'
import './ProfileCard.css'
import { useSelector } from 'react-redux';
import { useHistory , Link } from 'react-router-dom';
import userAvatar from '../../Assets/userAvathar.jpg'





function ProfileCard() {
const history=useHistory()
    const user =(useSelector((state) =>  state.user.user))
    let data =user
    let ProfilePhotos=data?.ProfilePhotos;
    console.log(user);
  

    useEffect(() => {
      
    }, [user])

    return (
           <Link to={`/profile/${data._id}`} style={{textDecoration:'none'}}>
        <div className="ProfileCard"  >
           <div className="d-flex" >

<div className="img">
    <img src={ProfilePhotos ? ProfilePhotos[ProfilePhotos.length -1]:userAvatar} alt="" />
</div>
<div>
    <p> {data.name}</p>
    <span>@{data.username}</span>
</div>
</div>

        </div>
           </Link>
    )
}

export default ProfileCard
