import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Addbranch.css"
import { useNavigate } from "react-router-dom";

// Components

function AddBranch() {

    const navigate = useNavigate();
    const [error, setError] = useState();
    const [data, setData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        district: '',
        subDistrict: '',
        province: '',
        postCode: '',
        userId: localStorage.getItem("userId")
    });

    const [value, setValue] = useState([])

    useEffect(() => {
        async function fetchData() {
            const res = await axios.post('http://localhost:8000/getBranch', {
                userId: localStorage.getItem("userId")
            });
            if (res.data.message === "Get Branch Success") {
                setValue(res.data.data.Branch);
            }
        }
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log(data)
        const res = await axios.post('http://localhost:8000/company/addbranch', data);
        // console.log(res.data)
        if (res.data.message === "สร้างสำเร็จ") {
            navigate('/company/branch');
        } else {
            // console.log(res.data.message)
            setError(res.data.message)
        }
    }

    return (
        <div className="ab-contain">
            <div className="addbranch">
                <div>
                    <header>เพิ่มรายละเอียดสาขา</header>
                </div>
                <div className="d-f">
                    <form onSubmit={handleSubmit}>
                        <div className="add-data">
                            <div className="semi">
                                <label>ชื่อสาขา</label>
                                <input type="text" placeholder="ชื่อสาขา" onChange={e => setData({...data, name: e.target.value})}></input>
                            </div>
                            
                        </div>
                        <div className="add-data">
                            <div className="semi">
                                <label>อีเมลสาขา</label>
                                <input type="email" placeholder="อีเมลสาขา" onChange={e => setData({...data, email: e.target.value})}></input>
                            </div>
                        </div>
                        <div className="add-data">
                            <div className="semi">
                                <label>เบอร์โทรสาขา</label>
                                <input type="text" placeholder="เบอร์โทรสาขา" onChange={e => setData({...data, phone: e.target.value})}></input>
                            </div>
                        </div>
                        <div className="add-data">
                            <div className="semi">
                                <label>สถานที่</label>
                            </div>
                        </div>
                        <div className="add-data-3">
                            <div className="semi-1">
                                <label>ที่อยู่</label>
                                <input type="text" placeholder="ที่อยู่" onChange={e => setData({...data, address: e.target.value})}></input>
                            </div>
                            <div className="semi-2">
                                <label>ตำบล/แขวง</label>
                                <input type="text" placeholder="ตำบล/แขวง" onChange={e => setData({...data, district: e.target.value})}></input>
                            </div>
                            <div className="semi-3">
                                <label>อำเภอ/เขต</label>
                                <input type="text" placeholder="อำเภอ/เขต" onChange={e => setData({...data, subDistrict: e.target.value})}></input>
                            </div>
                        </div>
                        <div className="add-data">
                            <div className="semi-1">
                                <label>จังหวัด</label>
                                <input type="text" placeholder="จังหวัด" onChange={e => setData({...data, province: e.target.value})}></input>
                            </div>
                            <div className="semi-2">
                                <label>เลขไปรษณีย์</label>
                                <input type="text" placeholder="เลขไปรษณีย์" onChange={e => setData({...data, postCode: e.target.value})}></input>
                            </div>
                        </div>
                        <div className="error">
                            {error && error}
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

export default AddBranch;
