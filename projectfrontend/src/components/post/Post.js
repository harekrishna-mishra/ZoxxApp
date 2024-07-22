import React, { useEffect, useRef, useState } from "react";
import Comment from "./Comment";
import { useNavigate } from "react-router-dom";
import "./Post.css";
import {
  likeAPI,
  unLikeAPI,
  createComentAPI,
  viweComentAPI,
  viewAllPostAPI,
} from "../../services/ServiceAPI";
import LoaderComponent from "../loaderComponent/LoaderComponent";
import { FaThumbsUp, FaComment } from "react-icons/fa";

function Post({ postData, likeMod, setLikeMod }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isComent, setIsComent] = useState(false);
  const [follow, setFollow] = useState(false);
  const userDetails = JSON.parse(sessionStorage.getItem("userData"));
  const [coments, setComents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [coment, setComent] = useState("");
  const [payload, setPayload] = useState({});
  const commentsContainerRef = useRef(null);

  const navigate = useNavigate();
  const isLikedd = postData?.likes.includes(userDetails?._id);

  const handleFollow = () => {
    setFollow(!follow);
  };

  useEffect(() => {
    if (commentsContainerRef.current) {
      commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight;
    }
  }, [coments]);

  useEffect(() => {
    setPayload({
      postId: postData?._id,
      userId: userDetails?._id,
      comment: coment,
    });
  }, [coment]);

  const createComentAPIFun = async () => {
    setLoading(true);
    try {
      const res = await createComentAPI(payload);
      if (res.success) {
        viweComentAPIFun({ postId: postData?._id });
        setComent("");
        setLikeMod(!likeMod);
      }
    } catch (error) {}
    setLoading(false);
  };

  const viweComentAPIFun = async (payload) => {
    setLoading(true);
    const res = await viweComentAPI(payload);
    if (res.success) {
      setComents(res?.data?.comments);
    }
    setLoading(false);
  };

  const likeAPIFun = async () => {
    try {
      const res = await likeAPI({ targetPost: postData?._id });
      if (res.success) {
        setLikeMod(!likeMod);
        setIsLiked(true);
      }
    } catch (error) {}
  };

  const unLikeAPIFun = async () => {
    try {
      const res = await unLikeAPI({ targetPost: postData?._id });
      if (res.success) {
        setLikeMod(!likeMod);
        setIsLiked(false);
      }
    } catch (error) {}
  };

  return (
    <div
      className="post"
      style={{
        scrollSnapAlign: "center",
        height: "80vh",
        marginBottom: "1rem",
        overflow: "hidden",
        position: "relative",
        fontSize: "0.8em",
        paddingTop: "1rem",
      }}
    >
      {loading && <LoaderComponent />}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          position: "absolute",
          bottom: "2rem",
          left: "2%",
          zIndex: "999",
          width: "94.7%",
        }}
      >
        <div
          onClick={() => {
            navigate(`/profile/${postData?.user?._id}`);
          }}
          style={{
            display: "flex",
            flexDirection: "row",
            cursor: "pointer",
            alignItems: "center",
            paddingLeft: "1rem",
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
            onClick={() => {
              setIsComent(false);
            }}
          >
            <img
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              src={
                postData?.user?.url ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3flIHsvZtK3eU7tEnp-LSEjNznTZCn0dkcA&s"
              }
              alt="User"
            />
          </div>
          <div style={{ textAlign: "center", padding: "0", margin: "auto 10px" }}>
            <p
              style={{
                margin: "0",
                padding: "0",
                color: "white",
                fontWeight: "600",
              }}
            >
              {postData?.user?.username || "Admin Alis"}
            </p>
            <p
              style={{
                margin: "0",
                padding: "0",
                color: "white",
                fontSize: "0.8em",
              }}
            >
              {postData?.user?.email || "admin@123"}
            </p>
          </div>
        </div>
        <div
          style={{
            margin: "0 auto",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            color: "gray",
            fontWeight: "600",
            right: "0",
            bottom: "25%",
            zIndex: "999",
          }}
        >
          <div
            className="forHover"
            style={{
              cursor: "pointer",
              // border: "1px solid lightgray",
              padding: "6px 10px",
              borderRadius: "5px",
              marginLeft: "5px",
              color: `${isLikedd || isLiked ? "red" : "white"}`,
              background: "rgba(255, 255, 255, 0.1)",
              fontWeight: "600",
              backdropFilter: "blur(1px)",
            }}
            onClick={() => {
              isLikedd ? unLikeAPIFun() : likeAPIFun();
            }}
          >
            <p style={{ margin: "auto" }}>
              <FaThumbsUp />
            </p>
            <p style={{ margin: "auto" }}>{postData?.likes?.length}</p>
          </div>
          <div
            className="forHover"
            style={{
              cursor: "pointer",
              // border: "1px solid gray",
              padding: "6px 10px",
              borderRadius: "5px",
              marginLeft: "5px",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              color: "white",
              fontWeight: "600",
              backdropFilter: "blur(1px)",
            }}
            onClick={() => {
              !isComent && viweComentAPIFun({ postId: postData?._id });
              setIsComent(!isComent);
            }}
          >
            <p style={{ margin: "auto" }}>
              <FaComment />
            </p>
            <p style={{ margin: "auto" }}>
              {JSON.stringify(postData?.comments?.length || 0)}
            </p>
          </div>
        </div>
      </div>
      <div
        style={{
          padding: "0",
          height: "100%",
          width: "95%",
          margin: "0 auto",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <video
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          src={
            postData?.video ||
            "https://res.cloudinary.com/drhiix8od/video/upload/v1721448076/junun9zyizwuzgebksrw.mp4"
          }
          autoPlay
          loop
          muted
        ></video>
      </div>

      <div
        style={{
          borderBottom: "1px solid #bebebe",
          width: "95%",
          margin: "0 auto",
          marginTop: "1rem",
        }}
      ></div>

      {isComent && (
        <div
          className="scroll-containerr"
          style={{
            border: "0px solid #bebebe",
            margin: "0 auto",
            height: "16rem",
            position: "absolute",
            top: "0",
            backgroundColor: "white",
            width: "100%",
            borderRadius: "10px",
          }}
        >
          <div
            ref={commentsContainerRef}
            className="scroll-container"
            style={{
              height: "12rem",
              overflowY: "scroll",
              width: "100%",
              position: "relative",
            }}
          >
            {coments?.map((e, index) => (
              <Comment key={index} coments={e} />
            ))}
          </div>
          <div style={{ height: "4rem", width: "100%" }}>
            <div
              style={{
                margin: "0px 0px 0px 2px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                height: "100%",
              }}
            >
              <input
                onChange={(e) => setComent(e.target.value)}
                value={coment}
                style={{
                  padding: "10px 20px",
                  border: "1px solid gray",
                  borderRadius: "25px",
                  width: "65%",
                }}
                placeholder="Type Comment Here"
              />
              <button
                onClick={createComentAPIFun}
                style={{
                  width: "20%",
                  border: "none",
                  padding: "12px 20px",
                  borderRadius: "5px",
                  marginLeft: "5px",
                  fontWeight: "600",
                  background: "#075e5e",
                  color: "white",
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Post;
