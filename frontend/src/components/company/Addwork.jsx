import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./Addwork.css"
// Components

function AddWork() {

    const [value, setValue] = useState([]);
    const navigate = useNavigate();
    const [data, setData] = useState({
        branchId: '',
        position: '',
        detail: '',
        num: '',
        requ: '',
        welfare: '',
        wages: '',
        jobDate: '',
        timeStart: '',
        timeEnd: '',
        image: ''
    });

    // getListOfBranch
    useEffect(() => {
        async function fetchData() {
            try {
                const userId = localStorage.getItem("userId");
                const res = await axios.get(`http://localhost:8000/getBranch/${userId}`);
                if (res.data.message === "Get Branch Success") {
                    setValue(res.data.data.Branch);
                    setData({...data, branchId: res.data.data.Branch[0].id})
                }
            } catch (error) {
                console.log(error);
            }
            
        }
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // console.log(data)
            const formdata = new FormData();
            formdata.append("branchId", data.branchId);
            formdata.append("position", data.position);
            formdata.append("detail", data.detail);
            formdata.append("num", data.num);
            formdata.append("requ", data.requ);
            formdata.append("welfare", data.welfare);
            formdata.append("wages", data.wages);
            formdata.append("jobDate", data.jobDate);
            formdata.append("timeStart", data.timeStart);
            formdata.append("timeEnd", data.timeEnd);
            formdata.append("image", data.image);
            const res = await axios.post('http://localhost:8000/company/addwork', formdata);
            // console.log(res.data)
            navigate("../work")
        } catch (error) {
            console.log(error.message)
        }
         
    }

    return (
        <div className="aw-contain">
            <div className="addwork">
                <div>
                    <header>เพิ่มรายละเอียดงาน</header>
                </div>
                <div className="d-f">
                    <form onSubmit={handleSubmit}>
                        <div className="add-data">
                            <div className="semi-1">
                                <label>สาขาที่เพิ่มงาน</label>
                                <select onChange={e => setData({...data, branchId: e.target.value})}>
                                    {value.map((item, index) => (
                                        <option key={index} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                    {/* <option>สาขาหลัก</option> */}
                                </select>
                            </div>
                            <div className="semi-2">
                                <label>ตำแหน่งงาน</label>
                                <input type="text" placeholder="ตำแหน่งงาน" onChange={e => setData({...data, position: e.target.value})}></input>
                            </div>
                        </div>
                        <div className="add-data">
                            <div className="semi-1">
                                <label>รายละเอียดงาน</label>
                                <input type="text" placeholder="รายละเอียดงาน" onChange={e => setData({...data, detail: e.target.value})}></input>
                            </div>
                            <div className="semi-2">
                                <label>จำนวนที่รับ</label>
                                <input type="text" placeholder="จำนวนที่รับ" onChange={e => setData({...data, num: e.target.value})}></input>
                            </div>
                        </div>
                        <div className="add-data">
                            <div className="semi-1">
                                <label>คุณสมบัติ</label>
                                <textarea placeholder="คุณสมบัติ" onChange={e => setData({...data, requ: e.target.value})}></textarea>
                            </div>
                            <div className="semi-2">
                                <label>สวัสดิการ</label>
                                <textarea placeholder="สวัสดิการ" onChange={e => setData({...data, welfare: e.target.value})}></textarea>
                            </div>
                        </div>
                        <div className="add-data">
                            <div className="semi-1">
                                <label>ค่าจ้าง</label>
                                <input type="text" placeholder="ค่าจ้าง" onChange={e => setData({...data, wages: e.target.value})}></input>
                            </div>
                            <div className="semi-2">
                                <label>วันเริ่มทำงาน</label>
                                <input type="date" onChange={e => setData({...data, jobDate: e.target.value})}></input>
                            </div>
                        </div>
                        <div className="add-data">
                            <div className="semi-1">
                                <label>เวลาเริ่มงาน</label>
                                <input type="time" onChange={e => setData({...data, timeStart: e.target.value})}></input>
                            </div>
                            <div className="semi-2">
                                <label>เวลาเลิกงาน</label>
                                <input type="time" onChange={e => setData({...data, timeEnd: e.target.value})}></input>
                            </div>
                        </div>
                        <div className="add-data">
                            <div className="semi">
                                <label>รูปเกี่ยวกับงาน</label>
                                <input type="file" onChange={(e) => setData({...data, image: e.target.files[0]})}></input>
                            </div>
                        </div>
                        <div className="b-add-data">
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            
        </div>
    );
}

export default AddWork;
