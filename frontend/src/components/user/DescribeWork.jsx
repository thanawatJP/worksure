import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './Describe.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Components

function DescribeWork() {
    
    const { jobId } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState()
    const [data, setData] = useState({
        "id": 0,
        "position": '',
        "detail": '',
        "num": '',
        "req": '',
        "welfare": '',
        "wages": '',
        "image": '',
        "jobDate": '',
        "timeStart": '',
        "timeEnd": '',
        "Branch": {
            "name": '',
            "phone": '',
            "email": '',
            "Location": {
                "id": 0,
                "address": '',
                "province": '',
                "district": '',
                "subDistrict": '',
                "postCode": ''
            },
            "Company": {
                "name": '',
                "image": '' 
            }
    }
    });

    useEffect(() => {
        async function fetchData() {
            try {
                // console.log(jobId);
                const res = await axios.get(`http://localhost:8000/job/${jobId}`);
                setData(res.data);
                // console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    const handelEnroll = async () => {
        // console.log(localStorage.getItem("userId"))
        // console.log(jobId)
        try {
            const userId = localStorage.getItem("userId");
            const res = await axios.post('http://localhost:8000/enroll', {
                userId: userId,
                jobId: jobId
            });
            // console.log(res.data);
            navigate('../mywork');
        } catch (error) {
            setError(error.response.data.message);
            console.log(error.response.data.message);
        }
        
    }

    const formattedTime = (timestamp) => {
        const date = new Date(timestamp);
        const hours = date.getHours();
        const minutes = date.getMinutes();

        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');

        const formattedTime = `${formattedHours}:${formattedMinutes}`;

        return formattedTime;
    }

    return (
        <div className="dw-container">
            <div className="sub-detail">
                <div className="s-d-com-img">
                    <div className="dw-image">
                        <div className="dw-circular-image">
                            <img src={`http://localhost:8000/images/`+data.Branch.Company.image} alt="Company" />
                        </div>
                    </div>
                    <div className="pos">
                        {data.position}
                    </div>
                </div>
                <div className="s-d-contain">
                    <div className="semi-detail">
                        <div>รูปแบบงาน</div>
                        <div className="text">พาร์ทไทม์</div>
                    </div>
                    <div className="semi-detail">
                        <div>ค่าจ้าง</div>
                        <div className="text">{data.wages}</div>
                    </div>
                    <div className="semi-detail">
                        <div>จำนวนคน</div>
                        <div className="text">{data.num}</div>
                    </div>
                    <div className="semi-detail">
                        <div>สถานที่ทำงาน</div>
                        <div className="text">{data.Branch.name}</div>
                    </div>
                    <div className="semi-detail">
                        <div>บริษัท</div>
                        <div className="text">{data.Branch.Company.name}</div>
                    </div>
                </div>
                <div className="s-d-contain">
                    <div className="b-enroll">
                        <button onClick={handelEnroll}>สมัครงาน</button>
                        <div className="error">{error && error}</div>
                    </div>
                </div>
            </div>

            <div className="main-detail">
                <div className="m-d-contain">
                    <div className="semi-detail">
                        <div className="title">รายละเอียดงาน:</div>
                        <pre>{data.detail}</pre>
                    </div>
                    <div className="semi-detail">
                        <div className="title">เวลาทำงาน:</div>
                        <div>{formattedTime(data.timeStart)} น. - {formattedTime(data.timeEnd)} น.</div>
                    </div>
                    <div className="semi-detail">
                        <div className="title">คุณสมบัติ:</div>
                        <pre>{data.req}</pre>
                    </div>
                    <div className="semi-detail">
                        <div className="title">สวัสดิการ:</div>
                        <pre>{data.welfare}</pre>
                    </div>
                    <div className="semi-detail">
                        <div className="title">ที่อยู่:</div>
                        <div>{data.Branch.Location.address} ตำบล/แขวง {data.Branch.Location.district} อำเภอ/เขต {data.Branch.Location.subDistrict} จังหวัด {data.Branch.Location.province} {data.Branch.Location.postCode}</div>
                    </div>
                    <div className="semi-detail">
                        <div className="title">ติดต่อ:</div>
                        <div><b>Email:</b> {data.Branch.email}</div>
                        <div><b>Phone:</b> {data.Branch.phone}</div>
                    </div>
                    <div className="semi-detail">
                        <div className="title"><b>รูปเกี่ยวกับงาน:</b></div>
                        <img src={`http://localhost:8000/images/`+data.image} alt="Company" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DescribeWork;
