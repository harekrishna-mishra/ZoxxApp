// ComponentOne.js
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./Profile.css";
import { toast } from "react-toastify";
import { viewUserAllPostAPI, followAPI, unfollowAPI } from "../../services/ServiceAPI";
import LoaderComponent from "../../components/loaderComponent/LoaderComponent";
import eventEmitter from '../../utils/EventEmit';

function Profile() {
  const navigate = useNavigate();
  const location = useParams();

  const [id, setId] = useState(location?.id);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [follow, setFollow] = useState(false);

  const userDetails = JSON.parse(sessionStorage.getItem("userData"));

  const viewProfile = async (id) => {
    try {
      setLoading(true);
      const res = await viewUserAllPostAPI(id);
      if (res.success) {
        setUserData(res?.data);
        toast.success(res.message);
      } else {
        toast.error(res?.message);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setId(location?.id);
  }, [location]);

  useEffect(() => {
    if (id) {
      viewProfile(id);
    }
  }, [id, follow]);

  const handleUnfollow = async () => {
    setLoading(true);
    try {
      const res = await unfollowAPI({ targetId: id });
      if (res.success) {
        toast.success(res.message);
        eventEmitter.emit('followStatusChanged');
      } else {
        toast.error(res.message);
      }
      setFollow(!follow);
    } catch (error) {
      toast.error(error?.message);
    }
    setLoading(false);
  };

  const handleFollow = async () => {
    setLoading(true);
    try {
      const res = await followAPI({ targetId: id });
      if (res?.success) {
        toast.success(res?.message);
        eventEmitter.emit('followStatusChanged');
      } else {
        toast?.error(res?.message);
      }
      setFollow(!follow);
    } catch (error) {
      toast.error(error?.message);
    }
    setLoading(false);
  };

  return (
    <div className="profile" style={{ width: "60%", margin: "auto", background: "white", marginTop: "5rem", height: "80vh", overflowY: "scroll" }}>
      {loading && <LoaderComponent />}
      <button style={{ margin: "2rem", border: "1px solid gray", padding: "12px 20px", borderRadius: "5px", marginLeft: "111px", backgroundColor: "transparent", color: "black", fontWeight: "600", width: "8rem" }} onClick={() => { navigate(-1); }}>
        Back
      </button>
      <div style={{ width: "5rem", height: "5rem", borderRadius: "50%", border: "3px solid gray", margin: "0rem auto", overflow: "hidden", marginTop: "3rem" }}>
        <img style={{ width: "100%", height: "100%",objectFit: 'cover' }} src={userData?.posts?.[0]?.user?.url || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3flIHsvZtK3eU7tEnp-LSEjNznTZCn0dkcA&s" }alt="Profile" />
      </div>
      <div style={{ textAlign: "center", padding: "0", margin: "0" }}>
        <p style={{ margin: "0", padding: "0", color: "gray", fontWeight: "600" }}>
          {userData?.posts?.[0]?.user?.username || "Unknown"}
        </p>
        <p style={{ margin: "0", padding: "0", color: "gray", fontSize: "0.8em" }}>
          {userData?.posts?.[0]?.user?.email || "unknown@mail.com"}
        </p>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", fontSize: "0.8em", marginTop: "1rem", fontWeight: "600" }}>
          <div>
            <p style={{ color: "black", padding: "0", margin: "0" }}>{userData?.posts?.length || 0}</p>
            <p style={{ color: "gray", padding: "0", margin: "0" }}>Posts</p>
          </div>
          <div>
            <p style={{ color: "black", padding: "0", margin: "0" }}>{userData?.posts?.[0]?.user?.followers?.length || userData?.user?.followers?.length || 0}</p>
            <p style={{ color: "gray", padding: "0", margin: "0" }}>Followers</p>
          </div>
          <div>
            <p style={{ color: "black", padding: "0", margin: "0" }}>{userData?.posts?.[0]?.user?.following?.length || userData?.user?.following?.length || 0}</p>
            <p style={{ color: "gray", padding: "0", margin: "0" }}>Following</p>
          </div>
        </div>
      </div>
      <div style={{ margin: "auto", width: "100%", backgroundColor: "" }}>
        <div style={{ display: "flex", justifyContent: "space-evenly", margin: "1rem auto" }}>
          {userDetails?._id === id ? (
            <button onClick={()=>{navigate(`/create-post?id=${id}`)}} style={{ border: "none", padding: "12px 20px", borderRadius: "5px", marginLeft: "5px", backgroundColor: "#075e5e", color: "white", fontWeight: "600", width: "8rem" }}>
              Update DP
            </button>
          ) : userData?.isFollowed ? (
            <button onClick={handleUnfollow} style={{ border: "none", padding: "12px 20px", borderRadius: "5px", marginLeft: "5px", backgroundColor: "#075e5e", color: "white", fontWeight: "600", width: "8rem" }}>
              Unfollow
            </button>
          ) : (
            <button onClick={handleFollow} style={{ border: "none", padding: "12px 20px", borderRadius: "5px", marginLeft: "5px", backgroundColor: "#075e5e", color: "white", fontWeight: "600", width: "8rem" }}>
              Follow
            </button>
          )}
          <button style={{ border: "none", padding: "12px 20px", borderRadius: "5px", marginLeft: "5px", backgroundColor: "#075e5e", color: "white", fontWeight: "600", width: "8rem" }}>
            Message
          </button>
        </div>
      </div>
      <div style={{ borderBottom: "1px solid #bebebe", width: "100%", marginTop: "2rem" }}></div>
      <div>
        <div className="grid-container">
          {Array.isArray(userData?.posts) && userData.posts.map((e, index) => (
            <div key={index} className="grid-item">
              <video style={{ width: "100%", height: "100%", objectFit: "cover" }} src={e?.video} alt={`Post ${index}`}></video>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
