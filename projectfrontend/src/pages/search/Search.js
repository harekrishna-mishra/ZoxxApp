import React, { useState, useEffect } from 'react'
import LoaderComponent from '../../components/loaderComponent/LoaderComponent'
import {useLocation, useNavigate} from "react-router-dom";
import {searchUser} from "../../services/ServiceAPI"


function Search() {
  const [loading , setLoading] = useState(false)
  const location = useLocation()
  const query = new URLSearchParams(location.search);
  const username = query.get('username');
  const [searchData, setSearchData] = useState([])
  const navigate = useNavigate()

  const searchUserAPI = async (username) =>{
    setLoading(true)
    const res = await searchUser(username) 
    if(res.success){
      setSearchData(res.data)
    }
    setLoading(false)
  }

  useEffect(()=>{
    if(username){
      searchUserAPI(username)
    }
  },[])
  
  return (
    <div>
      {loading && <loaderComponent/>}
      <div
      className="profile"
      style={{
        width: "40%",
        margin: "auto",
        background: "white",
        marginTop: "2rem",
        height: "90vh",
        backgroundColor: "white",
        overflowY: "scroll",
        borderRadius:"5px",
        overflowY:"scroll"
      }}
    >
      <div style={{display:"flex"}}>
      <p onClick={()=>{navigate(-1)}} style={{color:"gray",paddingLeft:"5%", cursor:"pointer",fontWeight:"600"}}>Back</p>
      <p style={{color:"gray",marginLeft:'20%',fontWeight:"600"}}>Total Result  <span style={{color:"black",fontWeight:"600"}}>{searchData?.length} </span></p>
      </div>
      <div
        style={{
          borderBottom: "1px solid #bebebe",
          width: "100%",
          margin: "0 auto",
          marginBottom: "1rem",
        }}
      ></div>
      {loading && <LoaderComponent />}

      {
        searchData.map((e)=>{
          return(
            <div
          onClick={() => {
            navigate(`/profile/${e?._id}`);
          }}
          style={{
            display: "flex",
            flexDirection: "row",
            cursor: "pointer",
            alignItems: "center",
            paddingLeft: "1rem",
            padding:"1rem"
          }}
        >
          <div
            style={{
              width: "3rem",
              height: "3rem",
              borderRadius: "50%",
              border: "3px solid gray",
              overflow: "hidden",
            }}
          >
            <img
              style={{ width: "100%", height: "100%",objectFit:"cover" }}
              src={e?.url || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3flIHsvZtK3eU7tEnp-LSEjNznTZCn0dkcA&s"}
            ></img>
          </div>
          <div
            style={{ textAlign: "center", padding: "0", margin: "auto 10px" }}
          >
            <p
              style={{
                margin: "0",
                padding: "0",
                color: "gray",
                fontWeight: "600",
              }}
            >
              {e?.username || "Admin Alis"}
            </p>
            <p
              style={{
                margin: "0",
                padding: "0",
                color: "gray",
                fontSize: "0.8em",
              }}
            >
              {e?.email || "admin@123"}
            </p>
          </div>
        </div>
          )
        })
      }
      
    </div>
    </div>
  )
}

export default Search
