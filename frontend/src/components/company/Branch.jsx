import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./Branch.css"
// Components 

function Branch() {

    const [value, setValue] = useState([])

    useEffect(() => {
        async function fetchData() {
            const userId = localStorage.getItem("userId")
            const res = await axios.get(`http://localhost:8000/getBranch/${userId}`);
            // console.log(res.data.data.Branch)
            setValue(res.data.data.Branch);
            // if (res.data.message === "Get Branch Success") {
            //     setValue(res.data.data.Branch);
            // } 
        }
        fetchData();
    }, []);

    return (
        <div className="b-contain">
            <div className="branch">
                <div>
                    <header>สาขาของเรา</header>
                </div>
                <div className="b-addBranch">
                    <Link to="../addbranch">
                        <button>
                            เพิ่มสาขา
                        </button>
                    </Link>
                </div>
                <div className="b-table">
                    <table>
                        <thead>
                            <tr>
                                <th>ลำดับ</th>
                                <th>ชื่อสาขา</th>
                                <th>เบอร์โทร</th>
                                <th>อีเมล</th>
                                <th>ที่อยู่</th>
                                {/* <th>Action</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {value.map((item, index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.email}</td>
                                    <td>{item.Location.address} {item.Location.district} {item.Location.subDistrict} {item.Location.province} {item.Location.postCode}</td>
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

export default Branch;
