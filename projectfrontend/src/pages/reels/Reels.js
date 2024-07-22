import React, { useEffect, useState } from "react";
import Post from "../../components/post/Post";
import { useNavigate } from "react-router-dom";
import "./Reels.css";
import { viewAllPostAPI } from "../../services/ServiceAPI";

function Reels() {
  let postcount = [1, 1, 1, 1, 1, 1, 1, 1];
  const navigate = useNavigate();
  const [allPost, setAllPost] = useState([]);
  const [input, setInput] = useState("")
  const [likeMod, setLikeMod] = useState(true)

  const viewAllPostAPIFun = async () => {
    try {
      const res = await viewAllPostAPI();
      if (res?.success) {
        setAllPost(res?.data?.allPost);
      }
    } catch (error) {}
  };
  useEffect(() => {
    viewAllPostAPIFun();
  }, [likeMod]);

  console.log("all post", allPost);

  return (
    <div
      style={{
        backgroundColor: "",
        height: "100%",
        width: "100%",
        fontWeight: "",
      }}
    >
      <div
        style={{
          width: "100%",
          backgroundColor: "white",
          height: "11vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "#00000038 10px 2px 12px",
          fontWeight: "600",
        }}
      >
        <input
          style={{
            padding: "10px 20px",
            border: "1px solid gray",
            borderRadius: "5px",
            width: "50%",
            color:"gray",
            fontWeight:"600"
          }}
          placeholder="userName"
          onChange={(e)=>{setInput(e.target.value)}}
        ></input>
        <button
          style={{
            border: "none",
            padding: "12px 20px",
            borderRadius: "5px",
            marginLeft: "5px",
            fontWeight: "600",
          }}
          onClick={() => {
            if(input){
              navigate(`/search?username=${input}`);
            }
          }}
        >
          Search
        </button>
        <div>
          <button
            style={{
              border: "none",
              padding: "12px 20px",
              borderRadius: "5px",
              marginLeft: "5px",
              background: "#075e5e",
              color: "white",
              fontWeight: "600",
            }}
            onClick={() => {
              navigate("/create-post");
            }}
          >
            Upload Post
          </button>
        </div>
      </div>

      <div
        className="scroll-container"
        style={{ height: "89vh", overflow: "scroll" }}
      >
        <div>
          <div
            style={{
              // backgroundColor: "white",
              width: "35%",
              margin: "0.8rem auto",
              height: "",
              scrollSnapType: "y mandatory",
              overflowY: "scroll",
              height: "85vh",
              scrollbarWidth: "none",
              // outline: "1px solid rgb(7, 94, 94)",
              borderRadius: "6px",
            }}
            className="scroll-container"
          >
            {allPost.map((e, index) => {
              return (
                <div key={index}>
                  <Post likeMod={likeMod} setLikeMod={setLikeMod} postData={e} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reels;
