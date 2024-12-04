import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

import "./MyWork.css"
// Components

function MyWork() {

    const [value, setValue] = useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                const userId = localStorage.getItem("userId");
                // console.log(userId)
                const res = await axios.get(`http://localhost:8000/mywork/${userId}`);
                console.log(res.data)
                // if (res.data.message === "Get Work Success") {
                setValue(res.data);
                // }
            } catch (error) {
                console.log(error);
            }
            
        }
        fetchData();
    }, []);

    const handleClick1 = () => {

    }

    return (
        <div className="mw-contain">
            <div className="mw-work">
                <div>
                    <header>งานของฉัน</header>
                </div>
                <div className="mw-table">
                    <table>
                        <thead>
                            <tr>
                                <th>ลำดับ</th>
                                <th>ตำแหน่ง</th>
                                <th>สาขา</th>
                                <th>สถานที่</th>
                                <th>เบอร์โทร</th>
                                <th>สถานะ</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {value.map((item, index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.Job.position}</td>
                                    <td>{item.Job.Branch.name}</td>
                                    <td>{item.Job.Branch.Location.address} {item.Job.Branch.Location.district} {item.Job.Branch.Location.subDistrict} {item.Job.Branch.Location.province} {item.Job.Branch.Location.postCode}</td>
                                    <td>{item.Job.Branch.phone}</td>
                                    <td className={`state-${item.state}`}>
                                        {item.state}
                                    </td>
                                    <td>
                                    <Link to={`../describe/${item.jobId}`}>
                                    <button className="b-detail" key={index} id={`b-e-${item.jobId}` }>Detail</button>
                                    </Link>
                                        {/* <button className="b-cancel" key={index} id={`b-c-${item.jobId}`}>Cancel</button> */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default MyWork;
