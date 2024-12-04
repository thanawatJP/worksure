import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./Enroll.css";
// Components

function Enroll() {
  const [data, setData] = useState([]);

  async function fetchData() {
    const userId = localStorage.getItem("userId");
    const res = await axios.get(`http://localhost:8000/get/enroll/${userId}`);
    // console.log(res.data[0].jobberId);
    setData(res.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleAccept = async (jobberId, jobId) => {
    try {
      await axios.patch("http://localhost:8000/update/enroll", {
        state: "accepted",
        jobId: jobId,
        jobberId: jobberId,
      });
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeny = async (jobberId, jobId) => {
    try {
      await axios.patch("http://localhost:8000/update/enroll", {
        state: "denied",
        jobId: jobId,
        jobberId: jobberId,
      });
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="er-contain">
      <div className="enroll">
        <div>
          <header>คนสมัครงานของเรา</header>
        </div>
        <div className="er-table">
          <table>
            <thead>
              <tr>
                <th>ลำดับ</th>
                <th>ชื่อ</th>
                <th>เบอร์โทร</th>
                <th>ตำแหน่ง</th>
                <th>สาขา</th>
                <th>Profile</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {item.Jobber.firstName} {item.Jobber.lastName}
                  </td>
                  <td>{item.Jobber.phone}</td>
                  <td>{item.Job.position}</td>
                  <td>{item.Job.Branch.name}</td>
                  <td>
                    <Link to={`../userprofile/${item.jobberId}`}>
                      <button className="profile">Profile</button>
                    </Link>
                  </td>
                  <td>
                    {item.state === "waiting" ? (
                      <div>
                        <button className="accept" onClick={() => handleAccept(item.jobberId, item.jobId)}>
                          Accept
                        </button>
                        <button className="deny" onClick={() => handleDeny(item.jobberId, item.jobId)}>
                          Deny
                        </button>
                      </div>
                    ) : (
                      <div className={`state-${item.state}`}>{item.state}</div>
                    )}
                  </td>
                  {/* <td><button className="b-edit" key={index} id={`b-e-${index}`}>Edit</button> <button className="b-del" key={index} id={`b-d-${index}`}>Delete</button></td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Enroll;
