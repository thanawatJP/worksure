import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './UserProfile.css'
import axios from "axios";

function UserProfile() {
    const [data, setData] = useState({});
    const { jobberId } = useParams();
    
    useEffect(() => {
        async function fetchData() {
            // const userId = localStorage.getItem("userId");
            // get ใช้ params
            // console.log(jobberId)
            try {
                const res = await axios.get(`http://localhost:8000/getMyProfile/${jobberId}`);
                setData((prevData) => ({
                    ...prevData,
                    ...res.data.data.Jobber, // Merge the properties with prevData from Jobber
                    email: res.data.data.email,
                }))
            } catch (error) {
                console.log(error);
            }
            
        }
        // setId();
        fetchData();
    }, [])

    const formattedDate = (dateString) => {
        const date = new Date(dateString);
        // Get the date components
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${day}-${month}-${year}`;
    }

    return (
        <div className="mppage">
            <div className="mpContain">
                <header>
                    <h2 className="font-semibold">My Profile</h2>
                </header>
                <div className="mf-circular-image">
                    <img src={`http://localhost:8000/images/`+data.image} alt="Profile" />
                </div>
                <div className="mp-box">
                    <div className="mp">
                        <div className="data">ชื่อ-นามสกุล: {data.firstName} {data.lastName}</div>
                        <div className="data">ชื่อเล่น: {data.nickName}</div>
                        <div className="data">เพศ: {data.sex}</div>
                        <div className="data">เบอร์โทร: {data.phone}</div>
                        <div className="data">วันเดือนปีเกิด: {formattedDate(data.birthday)}</div>
                        <div className="data">ID Line: {data.lineId}</div>
                        <div className="data">Email: {data.email}</div>
                        <div className="data">Resume: 
                            <div className="toCenter">
                                <img src={`http://localhost:8000/images/`+data.portfolio} alt="Resume" className="resume"/>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="mp-button">
                    <button>แก้ไขข้อมูล</button>
                </div> */}
            </div>
        </div>
    );
}

export default UserProfile;
