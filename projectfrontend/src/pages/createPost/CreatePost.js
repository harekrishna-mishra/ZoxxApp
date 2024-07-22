import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoaderComponent from "../../components/loaderComponent/LoaderComponent";
import { toast } from "react-toastify";
import { createPostAPI, uploadDP } from "../../services/ServiceAPI";

function CreatePost() {
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [data, setData] = useState({
    caption: "",
    video: "",
  });
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const uploadWalaId = query.get("id");

  const [payload, setPayload] = useState({ caption: "", url: "", userId: "" });

  let sessionUser = JSON.parse(sessionStorage.getItem("userData"));
  console.log("Session User ID:", sessionUser?._id);

  const createPostAPIFun = async (payload) => {
    try {
      let res = await createPostAPI(payload);
      if (res.success) {
        toast.success(res.message);
        navigate("/reels");
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to upload.");
    }
  };

  const uploadMedia = async (file, type) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Zoxx-Data");

    try {
      setUploading(true);
      const endpoint = type === "image" ? "image/upload" : "video/upload";
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/drhiix8od/${endpoint}`,
        formData
      );
      // toast.success(` uploaded successfully`);
      return res.data;
    } catch (err) {
      toast.error(`Failed to upload ${type}`);
    } finally {
      setUploading(false);
    }
  };

  const handleUpload = async () => {
    if (data?.video) {
      const fileType = data.video.type.split("/")[0]; // 'image' or 'video'
      const response = await uploadMedia(data.video, fileType);
      if (response?.secure_url) {
        setPayload({
          ...payload,
          caption: data.caption,
          url: response.secure_url,
          userId: sessionUser?._id,
        });
        if (uploadWalaId) {
          uploadDPapiFun({ targetId: uploadWalaId, url: response?.secure_url });
        }
      }
    }
  };

  useEffect(()=>{
    if (payload?.url && payload?.userId && !uploadWalaId) {
      createPostAPIFun(payload);
    }
  },[payload])

  const handlePost = () => {
    console.log("chal raha hai")
    if (payload?.url && payload?.userId) {
      createPostAPIFun(payload);
    }
  };

  const uploadDPapiFun = async (payload) => {
    try {
      const res = await uploadDP(payload);
      if (res.success) {
        toast.success(res.message);
        navigate(-1);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePostDP = () => {
    if (uploadWalaId) {
      uploadDPapiFun({ targetId: uploadWalaId, url: payload?.url });
    }
  };

  console.log(uploadWalaId,data);

  return (
    <div
      style={{
        background: "",
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {uploading && <LoaderComponent />}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "5px",
          height: "80%",
          width: "50%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <button
          style={{
            margin: "2rem",
            border: "1px solid gray",
            padding: "12px 20px",
            borderRadius: "5px",
            marginLeft: "11px",
            backgroundColor: `${true ? "transparent" : "#bebebe"}`,
            color: "black",
            fontWeight: "600",
            width: "8rem",
          }}
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </button>
        <h2 style={{ color: "gray" }}>Upload Files</h2>
        <textarea
          style={{
            width: "80%",
            border: "1px solid gray",
            padding: "12px 20px",
            borderRadius: "5px",
            marginLeft: "5px",
            marginBottom: "10px",
            color: "black",
            fontWeight: "600",
          }}
          placeholder="Caption"
          type="text"
          onChange={(e) => {
            setData({ ...data, caption: e.target.value });
          }}
        />
        <input
          id="video"
          name="video"
          style={{
            display: "none",
          }}
          type="file"
          accept={uploadWalaId ? "image/*" : "video/*"}
          onChange={(e) => {
            setData({ ...data, video: e.target.files[0] });
          }}
        />
        <label
          htmlFor="video"
          style={{
            width: "60%",
            border: "1px solid gray",
            padding: "12px 20px",
            borderRadius: "5px",
            marginLeft: "5px",
            marginBottom: "10px",
            backgroundColor: "",
            cursor: "pointer",
            overflow: "hidden",
          }}
        >
          {data?.video?.name || "Choose File"}
        </label>
        <div>
          <button
            style={{
              margin: "2rem",
              border: "none",
              padding: "12px 20px",
              borderRadius: "5px",
              marginLeft: "5px",
              backgroundColor: `${true ? "#075e5e" : "#bebebe"}`,
              color: "white",
              fontWeight: "600",
              width: "8rem",
            }}
            onClick={handleUpload}
          >
            Upload
          </button>
          {!!uploadWalaId ? (
            ""
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
