// ComponentTwo.js
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { viewUserAllPostAPI } from "../../services/ServiceAPI";
import LoaderComponent from "../../components/loaderComponent/LoaderComponent";
import eventEmitter from '../../utils/EventEmit';

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const userDetails = JSON.parse(sessionStorage.getItem('userData'));

  const viewProfile = async (id) => {
    setLoading(true);
    const res = await viewUserAllPostAPI(id);
    if (res.success) {
      setLoading(false);
      setUserData(res?.data);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    viewProfile(userDetails?._id);
    const handleFollowStatusChange = () => {
      viewProfile(userDetails?._id);
    };
    eventEmitter.on('followStatusChanged', handleFollowStatusChange);

    return () => {
      eventEmitter.off('followStatusChanged', handleFollowStatusChange);
    };
  }, [location]);
  console.log(userData)

  return (
    <div style={{ display: "flex", flexDirection: "row", width: "100vw" }}>
      <div style={{ width: "25%", height: "100vh", background: "white" }}>
        <div style={{ width: "5rem", height: "5rem", borderRadius: "50%", border: "3px solid gray", margin: "1rem auto", overflow: "hidden" }}>
          {loading && <LoaderComponent />}
          <img style={{ width: "100%", height: "100%" , objectFit: 'cover' }} src={userData?.posts?.[0]?.user?.url ||"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3flIHsvZtK3eU7tEnp-LSEjNznTZCn0dkcA&s"} alt="Profile" />
        </div>
        <div style={{ textAlign: "center", padding: "0", margin: "0" }}>
          <p style={{ margin: "0", padding: "0", color: "gray", fontWeight: "600" }}>
            {userDetails?.username}
          </p>
          <p style={{ margin: "0", padding: "0", color: "gray", fontSize: "0.8em" }}>
            {userDetails?.email}
          </p>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", fontSize: "0.8em", marginTop: "1rem", fontWeight: "600" }}>
            <div>
              <p style={{ color: "black", padding: "0", margin: "0" }}>{userData?.posts?.length || 0}</p>
              <p style={{ color: "gray", padding: "0", margin: "0" }}>Post</p>
            </div>
            <div>
              <p style={{ color: "black", padding: "0", margin: "0" }}>{userData?.posts?.[0]?.user?.followers?.length || userData?.user?.followers?.length || 0}</p>
              <p style={{ color: "gray", padding: "0", margin: "0" }}>Follower</p>
            </div>
            <div>
              <p style={{ color: "black", padding: "0", margin: "0" }}>{userData?.posts?.[0]?.user?.following?.length || userData?.user?.following?.length || 0}</p>
              <p style={{ color: "gray", padding: "0", margin: "0" }}>Following</p>
            </div>
          </div>
        </div>
        <div style={{ borderBottom: "1px solid #bebebe", width: "100%", marginTop: "2rem" }}></div>
        <div>
          <div style={{ width: "100%", display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <button className="btn" style={{ border: "none", padding: "12px 20px", borderRadius: "3px", margin: "1rem auto", fontWeight: "600", background: "none", color: "gray" }} onClick={() => { navigate(`/reels`); }}>
              Home
            </button>
            <button className="btn" style={{ border: "none", padding: "12px 20px", borderRadius: "3px", margin: "1rem auto", fontWeight: "600", background: "none", color: "gray" }} onClick={() => { navigate(`/profile/${userDetails?._id}`); }}>
              My Profile
            </button>
            <button className="btn" style={{ border: "none", padding: "12px 20px", borderRadius: "3px", margin: "1rem auto", fontWeight: "600", background: "none", color: "gray" }} onClick={() => { sessionStorage.clear(); navigate("/login"); }}>
              Logout
            </button>
          </div>
        </div>
      </div>
      <div style={{ width: "75%", margin: "0rem auto" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
