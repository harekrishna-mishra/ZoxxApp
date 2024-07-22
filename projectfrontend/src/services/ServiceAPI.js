import axios from "axios";
import { GetToken } from "../utils/GetToken";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:8000",
    headers: {
        "Content-Type": "application/json",
    }
});

// Request interceptor to set token dynamically
axiosInstance.interceptors.request.use((config) => {
    const token = GetToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response interceptor for handling responses
axiosInstance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    return Promise.reject(convertToApiError(error));
});

export const convertToApiResponse = (response) => {
    return {
        success: true,
        message: response.data.message, 
        statusCode: response.data.statusCode,
        data: response.data, 
    };
};

export const convertToApiError = (error) => {
    console.log(error);
    if (error.response) {
        const { data, status } = error.response;
        const apiErrorResponse = {
            success: false,
            statusCode: status,
            message: data?.errorResponse?.message || data?.errmsg || data?.message || "An error occurred",
            data: null,
        };
        return apiErrorResponse;
    } else {
        const apiErrorResponse = {
            success: false,
            statusCode: 500,
            message: "Please check your network connection/Server Issue.",
            data: null,
        };
        return apiErrorResponse;
    }
};

export default axiosInstance;



  //APIs  =================================================|>>

  export const signupAPI = async (userData) => {
    try {
      const response = await axiosInstance.post("/user/register", userData);
      var res = convertToApiResponse(response);
  
      return res;
    } catch (error) {
      let err = convertToApiError(error);
  
      return err;
    }
  };

  export const loginAPI = async (userData) => {
    try {
      const response = await axiosInstance.post("/user/login", userData);
      var res = convertToApiResponse(response);
  
      return res;
    } catch (error) {
      let err = convertToApiError(error);
  
      return err;
    }
  };

  export const createPostAPI = async (postData) => {
    try {
      const response = await axiosInstance.post("/post/newPost", postData);
      var res = convertToApiResponse(response);
  
      return res;
    } catch (error) {
      let err = convertToApiError(error);
  
      return err;
    }
  };

  export const viewUserAllPostAPI = async (id) => {
    try {
      const response = await axiosInstance.get(`/post/profile/${id}`);
      var res = convertToApiResponse(response);
  
      return res;
    } catch (error) {
      let err = convertToApiError(error);
  
      return err;
    }
  };

  export const viewAllPostAPI = async () => {
    try {
      const response = await axiosInstance.get(`/post/reels`);
      var res = convertToApiResponse(response);
      return res;
    } catch (error) {
      let err = convertToApiError(error);
  
      return err;
    }
  };

  export const searchUser = async (username) => {
    try {
      const response = await axiosInstance.get(`/user/search?username=${username}`);
      var res = convertToApiResponse(response);
      return res;
    } catch (error) {
      let err = convertToApiError(error);
  
      return err;
    }
  };

  export const followAPI = async (targetId) => {
    try {
      const response = await axiosInstance.post(`/user/follow`,targetId);
      var res = convertToApiResponse(response);
      return res;
    } catch (error) {
      let err = convertToApiError(error);
  
      return err;
    }
  };

  export const unfollowAPI = async (targetId) => {
    try {
      const response = await axiosInstance.post(`/user/unfollow`,targetId);
      var res = convertToApiResponse(response);
      return res;
    } catch (error) {
      let err = convertToApiError(error);
  
      return err;
    }
  };

  export const likeAPI = async (targetPost) => {
    try {
      const response = await axiosInstance.put(`/post/likePost`,targetPost);
      var res = convertToApiResponse(response);
      return res;
    } catch (error) {
      let err = convertToApiError(error);
  
      return err;
    }
  };

  export const unLikeAPI = async (targetId) => {
    try {
      const response = await axiosInstance.put(`/post/unLikePost`,targetId);
      var res = convertToApiResponse(response);
      return res;
    } catch (error) {
      let err = convertToApiError(error);
  
      return err;
    }
  };

  export const uploadDP = async (payload) => {
    try {
      const response = await axiosInstance.put(`/user/uploadDP`,payload);
      var res = convertToApiResponse(response);
      return res
    } catch (error) {
      let err = convertToApiError(error);
  
      return err;
    }
  };

  export const createComentAPI = async (payload) => {
    try {
      const response = await axiosInstance.put(`/post/createComent`,payload);
      var res = convertToApiResponse(response);
      return res
    } catch (error) {
      let err = convertToApiError(error);
  
      return err;
    }
  };

  export const viweComentAPI = async (payload) => {
    try {
      const response = await axiosInstance.post(`/post/viewComent`,payload);
      var res = convertToApiResponse(response);
      return res
    } catch (error) {
      let err = convertToApiError(error);
  
      return err;
    }
  };


  