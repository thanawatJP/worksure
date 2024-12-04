import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import "./Describe.css";
import axios from "axios";

// components

function CompanySignup() {
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [data1, setData1] = useState({
    compName: "",
    busType: "",
    contName: "",
    contPhone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [data2, setData2] = useState({
    comImg: "",
    taxNo: "",
    comType: "",
    comAbout: "",
    comFace: "",
    comLine: "",
    address: "",
    city: "",
    amphur: "",
    tambon: "",
    postalCode: "",
  });

  const handleSubmit1 = async (event) => {
    try {
      event.preventDefault();
      const res = await axios.post("http://localhost:8000/comregisone", data1);
      if (res.data.message === "Input Null") {
        setError("กรุณากรอกข้อมูลให้ครบ");
      } else if (res.data.message === "Email Founded") {
        setError("อีเมลถูกใช้แล้ว");
      } else if (res.data.message === "Password Not Collect") {
        setError("รหัสผ่านไม่ตรงกัน");
      } else if (res.data.message === "Success") {
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
      formdata.append("name", data1.compName);
      formdata.append("businessType", data1.busType);
      formdata.append("contractName", data1.contName);
      formdata.append("contractPhone", data1.contPhone);
      formdata.append("email", data1.email);
      formdata.append("password", data1.password);
      formdata.append("taxNo", data2.taxNo);
      formdata.append("type", data2.comType);
      formdata.append("about", data2.comAbout);
      formdata.append("facebook", data2.comFace);
      formdata.append("line", data2.comLine);
      formdata.append("address", data2.address);
      formdata.append("province", data2.city);
      formdata.append("district", data2.amphur);
      formdata.append("subDistrict", data2.tambon);
      formdata.append("postCode", data2.postalCode);
      formdata.append("image", data2.comImg);

      await axios.post("http://localhost:8000/comsignup", formdata);
      navigate("/");

    } catch (error) {
      setError(error?.data?.message);
    }
  };

  return (
    <>
      <div className="w-screen h-screen flex items-center justify-center bg-zinc-100">
        {page === 1 && (
          <div className="shadow-lg rounded max-w-xl w-full md:w-1/2 lg:w-1/3 p-5 mx-5 md:mx-0 bg-white">
            <form className="flex flex-col gap-2 px-5" onSubmit={handleSubmit1}>
              <div className="flex flex-col items-center mb-5">
                <h1 className="text-primary font-semibold text-xl">WorkSuRe</h1>
                <p className="fond-medium text-2xl">สมัครสมาชิกสำหรับบริษัท</p>
              </div>

              <input
                className="border py-2 rounded-md px-2"
                type="text"
                placeholder="ชื่อบริษัท"
                value={data1.compName}
                onChange={(e) => setData1({ ...data1, compName: e.target.value })}
              />

              <input
                className="border py-2 rounded-md px-2"
                type="text"
                placeholder="ลักษณะธุรกิจ (e.x. ค้าปลีก/ค้าส่ง)"
                value={data1.busType}
                onChange={(e) => setData1({ ...data1, busType: e.target.value })}
              ></input>

              <input
                className="border py-2 rounded-md px-2"
                type="text"
                placeholder="ชื่อ นามสกุล ผู้ติดต่อ"
                value={data1.contName}
                onChange={(e) => setData1({ ...data1, contName: e.target.value })}
              ></input>
              <input
                className="border py-2 rounded-md px-2"
                type="text"
                placeholder="เบอร์โทรติดต่อ"
                value={data1.contPhone}
                onChange={(e) => setData1({ ...data1, contPhone: e.target.value })}
              ></input>

              <input
                className="border py-2 rounded-md px-2"
                type="email"
                placeholder="Email"
                value={data1.email}
                onChange={(e) => setData1({ ...data1, email: e.target.value })}
              ></input>

              <input
                className="border py-2 rounded-md px-2"
                type="password"
                placeholder="Password"
                value={data1.password}
                onChange={(e) => setData1({ ...data1, password: e.target.value })}
              ></input>

              <input
                className="border py-2 rounded-md px-2"
                type="password"
                placeholder="Confirm Password"
                value={data1.confirmPassword}
                onChange={(e) => setData1({ ...data1, confirmPassword: e.target.value })}
              ></input>

              <div className="alert">{error && error}</div>
              <div>
                <button type="submit" className="mx-auto w-full py-2 bg-primary text-white rounded-md mt-2">
                  Next
                </button>
              </div>
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
                <p className="fond-medium text-2xl">ข้อมูลบริษัท</p>
              </div>
              <div className="w-full flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col">
                    <label>ประเภทบริษัท</label>
                    <input
                      className="border py-2 rounded-md px-2 mt-2"
                      type="text"
                      placeholder="ex.บริษัทบุคคล"
                      onChange={(e) => setData2({ ...data2, comType: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>เลขประจําตัวผู้เสียภาษี</label>
                    <input
                      className="border py-2 rounded-md px-2 mt-2"
                      type="text"
                      placeholder="13 หลัก"
                      onChange={(e) => setData2({ ...data2, taxNo: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Facebook</label>
                    <input
                      className="border py-2 rounded-md px-2 mt-2"
                      type="text"
                      placeholder="Facebook"
                      onChange={(e) => setData2({ ...data2, comFace: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>ID Line</label>
                    <input
                      className="border py-2 rounded-md px-2 mt-2"
                      type="text"
                      placeholder="ID Line"
                      onChange={(e) => setData2({ ...data2, comLine: e.target.value })}
                    />
                  </div>
                </div>
                <hr />
                <div className="grid grid-cols-2 gap-x-2">
                  <div className="flex flex-col">
                    <label>ที่อยู่</label>
                    <input
                      className="border py-2 rounded-md px-2 mt-2"
                      type="text"
                      placeholder="ที่อยู่"
                      onChange={(e) => setData2({ ...data2, address: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>ตำบล</label>
                    <input
                      className="border py-2 rounded-md px-2 mt-2"
                      type="text"
                      placeholder="ตำบล"
                      onChange={(e) => setData2({ ...data2, tambon: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-x-2">
                  <div className="flex flex-col">
                    <label>อำเภอ</label>
                    <input
                      className="border py-2 rounded-md px-2 mt-2"
                      type="text"
                      placeholder="อำเภอ"
                      onChange={(e) => setData2({ ...data2, amphur: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>จังหวัด</label>
                    <input
                      className="border py-2 rounded-md px-2 mt-2"
                      type="text"
                      placeholder="จังหวัด"
                      onChange={(e) => setData2({ ...data2, city: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>รหัสไปรษณีย์</label>
                    <input
                      className="border py-2 rounded-md px-2 mt-2"
                      type="text"
                      placeholder="รหัสไปรษณีย์"
                      onChange={(e) => setData2({ ...data2, postalCode: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label>เกี่ยวกับบริษัท</label>
                  <textarea
                    className="border py-2 rounded-md px-2 mt-2"
                    type="text"
                    placeholder="เกี่ยวกับบริษัท"
                    onChange={(e) => setData2({ ...data2, comAbout: e.target.value })}
                  />
                </div>

                <div className="flex flex-col">
                  <label>รูปบริษัท</label>
                  <input
                    className="w-full border py-2 rounded-md px-2 mt-2"
                    type="file"
                    onChange={(e) => setData2({ ...data2, comImg: e.target.files[0] })}
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
    </>
  );
}

export default CompanySignup;
