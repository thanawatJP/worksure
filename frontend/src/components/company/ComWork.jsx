import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./ComWork.css"
// Components

function ComWork() {

    const [value, setValue] = useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                const userId = localStorage.getItem("userId");
                // console.log(userId)
                const res = await axios.get(`http://localhost:8000/get/Company/Work/${userId}`);
                // console.log(res.data.data)
                // if (res.data.message === "Get Work Success") {
                setValue(res.data.data);
                // }
            } catch (error) {
                console.log(error);
            }
            
        }
        fetchData();
    }, []);

    return (
        <div className="cw-contain">
            <div className="work">
                <div>
                    <header>งานของเรา</header>
                </div>
                <div className="w-b-addWork">
                    <Link to="../addwork">
                        <button>
                            เพิ่มงาน
                        </button>
                    </Link>
                </div>
                <div className="w-table">
                    <table>
                        <thead>
                            <tr>
                                <th>ลำดับ</th>
                                <th>ตำแหน่ง</th>
                                <th>สาขา</th>
                                <th>Email</th>
                                <th>โทรศัพท์</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {value.map((item, index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.position}</td>
                                    <td>{item.Branch.name}</td>
                                    <td>{item.Branch.email}</td>
                                    <td>{item.Branch.phone}</td>
                                    <td>
                                        <Link to={`../describe/${item.id}`}>
                                            <button className="b-detail" key={index} id={`b-e-${item.id}`}>Detail</button>
                                        </Link> 
                                        {/* <button className="b-del" key={index} id={`b-d-${item.id}`}>Delete</button> */}
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

export default ComWork;
