import React, { useState } from 'react'
import "./Search.css"
import { ArrowBack, SearchOutlined } from '@mui/icons-material'
import { TextField, IconButton, Button } from '@mui/material'
import { search } from "../../Axios"
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'


function Search() {
    const history = useHistory()
    const [searchresult, setSearch] = useState([])
    const user = (useSelector((state) => state.user.user))


    const doSearch = (e) => {
        search({ keyword: e.target.value, userId: user._id }).then((result) => {

            setSearch(result)
            console.log(result);

        }).catch(() => {

        })

    }
    const onClick = (id) => {
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
                        autoComplete='off'
                        variant="standard"
                        placeholder="Search"
                        onChange={doSearch}
                        style={{  color: "red" }}
                        InputProps={{
                            endAdornment: (
                                <IconButton>
                                    <SearchOutlined style={{ color: "#ffffff" }} autocomplete="off" />
                                </IconButton>
                            ),
                        }}
                    />
                </div>
                <div className="resuls">
                    {
                        searchresult ? searchresult.map((item, index) => {
                            return (
                                <div className="searchcard" key={item._id} >
                                    <div className='searchbody' onClick={() => onClick(item._id)}>
                                        <div className="img">
                                            <img src="" alt="" />
                                        </div>
                                        <div>
                                            <h6>{item.name}</h6>
                                            <h5>{item.username}</h5>
                                        </div>
                                    </div>
                                    <div className='followbtn flex-end'>
                                        {
                                            item.following ?null : <Button>follow</Button>
                                        }
                                        
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
