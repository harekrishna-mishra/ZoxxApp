import React from "react";
import { useNavigate } from "react-router-dom";

function Comment({coments}) {
    const navigate = useNavigate()
    console.log(coments)
  return (
    <div
        onClick={()=>{navigate("/profile/${userId}")}}
        style={{
        display: "flex",
        flexDirection: "row",
        background: "",
        borderRadius: "6px",
        margin: "1rem",
        width:"85%"
      }}
    >
      <div onClick={()=>{}} style={{display: "flex",
        flexDirection: "row",
        margin: "1rem",
        marginRight:"0rem",
        background: "#00700047",
        borderRadius: "16px 0px 0px 16px",
        padding: "1rem",}}>
        <div
          style={{
            width: "2rem",
            height: "2rem",
            borderRadius: "50%",
            border: "3px solid gray",
            overflow: "hidden",
          }}
        >
          <img
            style={{ width: "100%", height: "100%" }}
            src={coments?.user?.url ||"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3flIHsvZtK3eU7tEnp-LSEjNznTZCn0dkcA&s"}
          ></img>
        </div>
        <div
          style={{
            textAlign: "center",
            padding: "0",
            margin: "auto 10px",
            fontSize: "0.8em",
          }}
        >
          <p
            style={{
              margin: "0",
              padding: "0",
              color: "gray",
              fontWeight: "600",
            }}
          >
            {coments?.user?.username || "Admin Alis"}
          </p>
          <p
            style={{
              margin: "0",
              padding: "0",
              color: "gray",
              fontSize: "0.8em",
            }}
          >
            {coments?.user?.email || "admin@123"}
          </p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontWeight: "600",
          color: "#2b2b2b",
          margin:"1rem 0rem",
          paddingRight:"1rem",
          borderRadius:"0px 16px 0px 0px",
          backgroundColor:"#00700047"
        }}
      >
        {coments?.comment || "hello sir sjfskljf  jkkljklj l kljl;jkjj  "}
      </div>
    </div>
  );
}

export default Comment;
