import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import "./Describe.css";
import axios from "axios";

// components

function UserSignup() {
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [data1, setData1] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [data2, setData2] = useState({
    firstName: "",
    lastName: "",
    nickName: "",
    sex: "",
    phone: "",
    idLine: "",
    birthDate: "",
    profImg: "",
    idCardImg: "",
    resumeImg: "",
  });

  const handleSubmit1 = async (event) => {
    try {
      event.preventDefault();
      const res = await axios.post("http://localhost:8000/userregisone", data1);
      console.log(res.data.message);
      if (res.data.message === "Input Null") {
        setError("กรุณากรอกข้อมูลให้ครบ");
      } else if (res.data.message === "Email Founded") {
        setError("Email ถูกใช้แล้ว");
      } else if (res.data.message === "Password Not Collect") {
        setError("รหัสผ่านไม่ตรงกัน");
      } else {
        setError("");
        setPage(2);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit2 = async (event) => {
    try {
      event.preventDefault();
      const formdata = new FormData();
      formdata.append("email", data1.email);
      formdata.append("password", data1.password);
      formdata.append("firstName", data2.firstName);
      formdata.append("lastName", data2.lastName);
      formdata.append("nickName", data2.nickName);
      formdata.append("sex", data2.sex);
      formdata.append("phone", data2.phone);
      formdata.append("idLine", data2.idLine);
      formdata.append("birthDate", data2.birthDate);
      formdata.append("profImg", data2.profImg);
      formdata.append("idCardImg", data2.idCardImg);
      formdata.append("resumeImg", data2.resumeImg);
      await axios.post("http://localhost:8000/usersignup", formdata);
      navigate("/");
    } catch (error) {
      setError(error?.data.message);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-zinc-100">
      {page === 1 && (
        <div className="shadow-lg rounded max-w-xl w-full md:w-1/2 lg:w-1/3 p-5 mx-5 md:mx-0 bg-white">
          <form className="flex flex-col gap-2 px-5" onSubmit={handleSubmit1}>
            <div className="flex flex-col items-center mb-5">
              <h1 className="text-primary font-semibold text-xl">WorkSuRe</h1>
              <p className="fond-medium text-2xl">สมัครสมาชิกสำหรับผู้ใช้งาน</p>
            </div>

            <input
              className="border py-2 rounded-md px-2"
              type="email"
              placeholder="Email"
              onChange={(e) => setData1({ ...data1, email: e.target.value })}
            />

            <input
              className="border py-2 rounded-md px-2"
              type="password"
              placeholder="Password"
              onChange={(e) => setData1({ ...data1, password: e.target.value })}
            />

            <input
              className="border py-2 rounded-md px-2"
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setData1({ ...data1, confirmPassword: e.target.value })}
            />

            <div className="alert">{error && error}</div>

            <button type="submit" className="mx-auto w-full py-2 bg-primary text-white rounded-md mt-2">
              Next
            </button>

            <p className="mt-5">
              คุณมีบัญชีอยู่แล้ว?{" "}
              <Link to="/" className="text-black/80 underline">
                เข้าสู่ระบบ
              </Link>
            </p>
          </form>
        </div>
      )}
      {page === 2 && (
        <div className="shadow-lg rounded max-w-xl w-full md:w-1/2 lg:w-1/2 p-5 mx-5 md:mx-0 bg-white">
          <form className="flex flex-col gap-2 px-5" onSubmit={handleSubmit2}>
            <div className="flex flex-col items-center mb-5">
              <h1 className="text-primary font-semibold text-xl">WorkSuRe</h1>
              <p className="fond-medium text-2xl">สมัครสมาชิกสำหรับผู้ใช้งาน</p>
            </div>
            <div className="w-full flex flex-col gap-5">
              <div className="grid grid-cols-3 gap-x-2">
                <div className="flex flex-col">
                  <label>ชื่อ</label>
                  <input
                    className="border py-2 rounded-md px-2 mt-2"
                    type="text"
                    placeholder="ชื่อ"
                    onChange={(e) => setData2({ ...data2, firstName: e.target.value })}
                  />
                </div>
                <div className="flex flex-col">
                  <label>นามสกุล</label>
                  <input
                    className="border py-2 rounded-md px-2 mt-2"
                    type="text"
                    placeholder="นามสกุล"
                    onChange={(e) => setData2({ ...data2, lastName: e.target.value })}
                  />
                </div>
                <div className="flex flex-col">
                  <label>ชื่อเล่น</label>
                  <input
                    className="border py-2 rounded-md px-2 mt-2"
                    type="text"
                    placeholder="ชื่อเล่น"
                    onChange={(e) => setData2({ ...data2, nickName: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-x-2">
                <div className="flex flex-col">
                  <label>เพศ</label>
                  <input
                    className="border py-2 rounded-md px-2 mt-2"
                    type="text"
                    placeholder="เพศ"
                    onChange={(e) => setData2({ ...data2, sex: e.target.value })}
                  />
                </div>
                <div className="flex flex-col">
                  <label>เบอร์โทรศัพท์</label>
                  <input
                    className="border py-2 rounded-md px-2 mt-2"
                    type="text"
                    placeholder="เบอร์โทรศัพท์"
                    onChange={(e) => setData2({ ...data2, phone: e.target.value })}
                  />
                </div>
                <div className="flex flex-col">
                  <label>ID Line</label>
                  <input
                    className="border py-2 rounded-md px-2 mt-2"
                    type="text"
                    placeholder="ID Line"
                    onChange={(e) => setData2({ ...data2, idLine: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label>วันเกิด</label>
                <input
                  className="w-full border py-2 rounded-md px-2 mt-2"
                  type="date"
                  placeholder="ปี-เดือน-วัน ex. 2004-02-11"
                  onChange={(e) => setData2({ ...data2, birthDate: e.target.value })}
                />
              </div>

              <div className="flex flex-col">
                <label>รูปโปรไฟล์</label>
                <input
                  className="w-full border py-2 rounded-md px-2 mt-2"
                  type="file"
                  onChange={(e) => setData2({ ...data2, profImg: e.target.files[0] })}
                />
              </div>

              <div className="flex flex-col">
                <label>รูปสำเนาบัตรประชาชน</label>
                <input
                  className="w-full border py-2 rounded-md px-2 mt-2"
                  type="file"
                  onChange={(e) => setData2({ ...data2, idCardImg: e.target.files[0] })}
                />
              </div>
              <div className="flex flex-col">
                <label>รูปเรซูเม่ (Resume)</label>
                <input
                  className="w-full border py-2 rounded-md px-2 mt-2"
                  type="file"
                  onChange={(e) => setData2({ ...data2, resumeImg: e.target.files[0] })}
                />
              </div>
            </div>

            <div className="alert">{error && error}</div>
            <div className="flex justify-between">
              <button
                className="px-5 py-1.5 border border-primary text-primary rounded-md mt-2"
                onClick={() => {
                  setPage(1);
                }}
                type="button"
              >
                ย้อนกลับ
              </button>
              <button className="px-5 py-1.5 bg-primary text-white rounded-md mt-2" type="submit">
                บันทึกข้อมูล
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default UserSignup;
