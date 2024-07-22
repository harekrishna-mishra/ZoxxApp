import React, { useState } from "react";
import "./Login.css";
import LoaderComponent from "../../../components/loaderComponent/LoaderComponent";
import { signupAPI, loginAPI } from "../../../services/ServiceAPI";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../../../utils/Validation";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login() {
  const [sendOtp, setSendOtp] = useState(false);
  const [number, setNumber] = useState();
  const [errMess, setErrMess] = useState();
  const [otpSection, setOtpSection] = useState(true);
  const [otp, setOtp] = useState();
  const [otpErrMess, setOtpErrMess] = useState();
  const [isValidOtp, setIsValidOtp] = useState(false);

  const [login, setLogin] = useState({ email: "", password: "" });
  const [signup, setSignup] = useState({ email: "", name: "", password: "" });
  const [signupErr, setSignupErr] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate()

  console.log(signup);
  console.log(signupErr);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLogin({
      ...login,
      [name]: value,
    });
  };
  const handleInputChange2 = (e) => {
    const { name, value } = e.target;
    setSignup({
      ...signup,
      [name]: value,
    });
  };

  const handleOtp = (e) => {
    setOtp(e.target.value);
    if (e.target.value.length === 4) {
      setIsValidOtp(false);
    }
  };

  const loginAPIFun = async (payload) => {
    try {
      const response2 = await loginAPI(payload);
      if (response2.success) {
        toast.success(response2?.message);
        setLoader(false);
        sessionStorage.setItem("userDetails",response2?.data?.token)
        sessionStorage.setItem("userData",JSON.stringify(response2?.data?.user))
        navigate("/")
      } else {
        toast.error(response2.message);
      }
      console.log("CreateViewPatchApi_Response", response2);
    } catch (err) {
      console.log("CreateViewApi_Error", err);
    }
    setLoader(false);
  };

  const SubmitHandleLogin = () => {
    let { name, ...rest } = login;
    let payload = { username: name, ...rest };
    setLoader(true);
    let timeout = setTimeout(()=>{
      loginAPIFun(login)
    }, 500);
  };

  const signupAPIFun = async (payload) => {
    try {
      const response2 = await signupAPI(payload);
      if (response2.success) {
        toast.success(response2?.message);
        setLoader(false);
        setSignup({ email: "", name: "", password: "" })
        setOtpSection(true)
      } else {
        toast.error(response2.message);
      }
    } catch (err) {
      console.log("CreateViewApi_Error", err);
    }
    setLoader(false);
  };

  const SubmitHandleRegister = () => {
    setSignupErr({ email: "", name: "", password: "" });

    if (!validateEmail(signup.email)) {
      setSignupErr((prev) => ({
        ...prev,
        email: "Please enter a valid email.",
      }));
    }
    if (!validateName(signup.name) || signup.name.length < 3) {
      setSignupErr((prev) => ({
        ...prev,
        name: "Name should be greater than 2 characters and it cannot take a number.",
      }));
    }
    if (!validatePassword(signup.password)) {
      setSignupErr((prev) => ({
        ...prev,
        password:
          "Password must include 1 uppercase, 1 lowercase, 1 special character, and 1 number.",
      }));
    }

    if (
      validateEmail(signup.email) &&
      validateName(signup.name) &&
      validatePassword(signup.password)
    ) {
      let { name, ...rest } = signup;
      let payload = { username: name, ...rest };
      setLoader(true);
      setTimeout(() => {
        signupAPIFun(payload);
      }, 500);
    }
    // If all validations pass, proceed with registration logic
    // (e.g., call an API to register the user)
  };


  return (
    <div className="main">
      {loader && <LoaderComponent />}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          height: "550px",
          maxWidth: "800px",
          borderRadius: "5px",
          overflow: "hidden",
          boxShadow: "#00000038 5px 2px 12px",
        }}
      >
        <div
          style={{
            backgroundColor: "black",
            minWidth: "400px",
            minHeight: "400px",
            color: "white",
            textAlign: "center",
          }}
        >
          <h1 style={{ marginTop: "40%" }}>Welcome to Zoxx.</h1>
          <h3>In Virtual Reality</h3>
          <p style={{ fontSize: "0.8em", color: "gray" }}>
            Please Login to see virtual world.
          </p>
        </div>
        <div className="main-child">
          {otpSection ? (
            <div className="sub-child">
              <h1 style={{ textAlign: "center" }}>Login</h1>
              <input
                autoComplete="off"
                type="email"
                name="email"
                value={login.email}
                onChange={handleInputChange}
                className="input"
                placeholder="Enter Your Email"
              ></input>
              <input
                type="password"
                name="password"
                value={login.password}
                onChange={handleInputChange}
                className="input"
                placeholder="Enter Your Password"
              ></input>
              <button
                style={{
                  opacity: `${
                    validateEmail(login.email) &&
                    validatePassword(login.password)
                      ? 1
                      : 0.1
                  }`,
                }}
                onClick={() => {
                  SubmitHandleLogin();
                }}
                className="btn"
                disabled={
                  !(
                    validateEmail(login.email) &&
                    validatePassword(login.password)
                  )
                }
              >
                Login
              </button>
              <p
                onClick={() => {
                  setOtpSection(false);
                  setSignup({ email: "", name: "", password: "" });
                }}
                style={{ cursor: "pointer", color: "gray" }}
              >
                Don't have an account ?
              </p>
            </div>
          ) : (
            <div style={{ margin: "2rem 5rem" }}>
              <button
                className="getBack"
                onClick={() => {
                  setOtpSection(true);
                  setNumber("");
                }}
              >
                {" "}
                Get Back
              </button>
              <h1 style={{ padding: "0", margin: "0", textAlign: "center" }}>
                Register
              </h1>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "2rem",
                }}
              >
                <input
                  type="email"
                  name="email"
                  value={signup.email}
                  onChange={(e) => {
                    handleInputChange2(e);
                    setSignupErr({ email: "", name: "", password: "" });
                  }}
                  className="input"
                  placeholder="Enter Your Email"
                ></input>
                {signupErr.email && (
                  <p style={{ color: "red", fontSize: "0.7em" }}>
                    {signupErr.email}
                  </p>
                )}
                <input
                  type="name"
                  name="name"
                  value={signup.name}
                  onChange={(e) => {
                    handleInputChange2(e);
                    setSignupErr({ email: "", name: "", password: "" });
                  }}
                  className="input"
                  placeholder="Enter Your Username"
                ></input>
                {signupErr.name && (
                  <p style={{ color: "red", fontSize: "0.7em" }}>
                    {signupErr.name}
                  </p>
                )}
                <input
                  type="password"
                  name="password"
                  value={signup.password}
                  onChange={(e) => {
                    handleInputChange2(e);
                    setSignupErr({ email: "", name: "", password: "" });
                  }}
                  className="input"
                  placeholder="Enter Your Password"
                ></input>
                {signupErr.password && (
                  <p style={{ color: "red", fontSize: "0.7em" }}>
                    {signupErr.password}
                  </p>
                )}
                <button
                  style={{
                    opacity: `${
                      signup.email && signup.email && signup.password ? 1 : 0.1
                    }`,
                  }}
                  onClick={() => {
                    SubmitHandleRegister();
                  }}
                  className="btn"
                >
                  Register
                </button>
                {/* <div className="sent-otp">OTP sent successfully</div> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
