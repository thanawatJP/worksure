import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleEmailChange = (e) => {
    setValues({ ...values, email: e.target.value });
  };
  const handlePasswordChange = (e) => {
    setValues({ ...values, password: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/auth/login", values);
      localStorage.setItem("userId", res.data.loginId);
      // console.log(localStorage.getItem("userId"))

      if (res.data.role === "USER") {
        navigate("/user");
      } else if (res.data.role === "ADMIN") {
        navigate("/company");
      }
    } catch (error) {
      setError(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-zinc-100">
      <div className="shadow-lg rounded max-w-xl w-full md:w-1/2 lg:w-1/3 p-5 mx-5 md:mx-0 bg-white">
        <form className="flex flex-col gap-2 px-5" onSubmit={handleSubmit}>
          <div className="flex flex-col items-center mb-5">
            <h1 className="text-primary font-semibold text-xl">WorkSuRe</h1>
            <p className="fond-medium text-2xl">เข้าสู่ระบบผู้ใช้งาน</p>
          </div>
          <div className="w-full flex flex-col gap-2 my-2">
            <input className="border py-2 rounded-md px-2" type="email" value={values.email} onChange={handleEmailChange} placeholder="Email"></input>
            <input
              className="border py-2 rounded-md px-2"
              type="password"
              value={values.password}
              onChange={handlePasswordChange}
              placeholder="Password"
            ></input>
            <div className="text-red-600"> {error && error} </div>

            <button className="mx-auto w-full py-2 bg-primary text-white rounded-md mt-2" type="submit">
              Login
            </button>
          </div>
          <hr className="my-5" />
          <div className="w-ful flex flex-col items-center gap-5">
            <p className="">ยังไม่ได้สมัครสมาชิกใช่ไหม?</p>
            <Link to="/usersignup" className="w-full text-center border py-1 rounded-md px-2 hover:cursor-pointer hover:bg-primary hover:text-white duration-500">
              สำหรับผู้สมัครงาน
            </Link>
            <Link to="/comsignup" className="w-full text-center border py-1 rounded-md px-2 hover:cursor-pointer hover:bg-primary hover:text-white duration-500">
              สำหรับบริษัท
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
