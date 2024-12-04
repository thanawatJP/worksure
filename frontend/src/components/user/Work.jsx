import React from "react";
import "./Work.css";

// Components
// import UserLogin from './loginSignup/UserLogin'
import { Link } from "react-router-dom";

function Work({ image, position, company, wages, address, province, district, subDistrict, postCode, num, jobId }) {
  // console.log(image, position, company, wages, address, province, district, subDistrict, postCode, num)
  // console.log(jobId)

  return (
    <div className="w-full flex items-center border rounded-md gap-5 justify-between px-10">
      <div className="w-image">
        <div className="w-circular-image">
          <img src={`http://localhost:8000/images/` + image} alt="Company" />
        </div>
      </div>
      <div className="text-gray-500">
        <div>
          ตำแหน่ง:<span className="text-black"> {position}</span>
        </div>
        <div>
          บริษัท:<span className="text-black"> {company}</span>
        </div>
        <div className="flex items-center gap-2">
          ค่าจ้าง: <span className="text-black">{wages}</span>
        </div>
      </div>

      <div className="">
        <p>- {address}</p>
        <p>- ตำบล / แขวง: {district}</p>
        <p>- อำเภอ / เขต: {subDistrict}</p>
        <p>
          - จังหวัด: {province} <span>{postCode}</span>
        </p>
      </div>
      <div className="flex  flex-col items-center">
        <div>
          จำนวน <span className="text-xl font-medium">{num}</span> คน
        </div>
        <br />
        <Link to={`describe/${jobId}`}>
          <button className="w-fit px-10 py-2 bg-primary text-white rounded-md">ดูรายละเอียด</button>
        </Link>
      </div>
    </div>
  );
}

export default Work;
