import React from "react";
import { useState } from "react";

import "./Userhome.css";

// components
import Search from "./Search";
import Worklist from "./Worklist";
import axios from "axios";
import { useEffect } from "react";

function Userhome() {
  const [jobList, setJobList] = useState([]);

  const [searchDate, setSearchDate] = useState({
    province: "",
    district: "",
    subDistrict: "",
  });

  async function getJob() {
    try {
      const res = await axios.get("http://localhost:8000/job/list");
      setJobList(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getJob();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchDate({ ...searchDate, [name]: value });
  };

  const search = async () => {
    const searchJob = jobList.filter((item) => {
      return (
        item.Branch.Location.province === searchDate.province ||
        item.Branch.Location.district === searchDate.district ||
        item.Branch.Location.subDistrict === searchDate.subDistrict
      );
    });
    if (searchJob.length === 0) {
      getJob();
      return alert("ไม่พบงานที่คุณต้องการ");
    } else {
      setJobList(searchJob);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <img
        src="https://shortrecap.co/wp-content/uploads/2020/01/%E0%B8%84%E0%B8%B4%E0%B8%94%E0%B8%87%E0%B8%B2%E0%B8%99%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B8%AD%E0%B8%AD%E0%B8%81_cover.jpg"
        alt="findwork"
      ></img>
      <div className="mt-10 mb-20">
        <Search onSearch={search} onChange={handleInputChange} value={searchDate} />
        <Worklist jobList={jobList} />
      </div>
    </div>
  );
}

export default Userhome;
