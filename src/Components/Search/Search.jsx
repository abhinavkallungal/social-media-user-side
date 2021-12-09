import React, { useState } from 'react'
import "./Search.css"
import { ArrowBack, SearchOutlined } from '@mui/icons-material'
import {  TextField, IconButton } from '@mui/material'
import { search } from "../../Axios"
import{useHistory} from 'react-router-dom'


function Search() {
    const history=useHistory()
    const[searchresult,setSearch]=useState([])

    const doSearch=(e)=>{
        search(e.target.value).then((result)=>{
            console.log(result);
            setSearch(result)

        }).catch(()=>{

        })

    }
    const onClick=(id)=>{
        history.push(`/profile/${id}`)

    }



    return (
        <div className="Search" >

        <div className="card ">
            <div className="Head">
                <div className="backIcon">
                    <IconButton style={{ backgroundColor: "#ffffff", marginRight: "20px" }}>  <ArrowBack style={{ color: '#007fff' }} /></IconButton>

                </div>
                <TextField
                fullWidth
                id="standard-bare"
                variant="filled"
                placeholder="Search"
                onChange={doSearch}
                style={{borderBottom:"2px solid #ffffff",color:"red"}}
                InputProps={{
                  endAdornment: (
                    <IconButton>
                      <SearchOutlined style={{color:"#ffffff"}} />
                    </IconButton>
                  ),
                }}
              />            
              </div>
              <div className="resuls">
                  {
                      searchresult ? searchresult.map((item)=>{
                          return (
                            <div className="searchcard" onClick={()=>onClick(item._id)}>
                            <div className="img">
                                <img src="" alt="" />
                            </div>
                            <div>
                                <h6>{item.name}</h6>
                                <h5>{item.username}</h5>
                            </div>
          
                        </div>
                          )

                      }) : "fdfasdf"
                  }

              </div>
            
           

        </div>

    </div>
    )
}

export default Search
