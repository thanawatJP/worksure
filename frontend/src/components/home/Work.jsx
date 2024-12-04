import React from "react";
import './Work.css'

// Components
// import UserLogin from './loginSignup/UserLogin'
import { Link } from "react-router-dom";

function Work({ imageUrl, jobPosition, company, wage, location, numPeople }) {

    // // const imageUrl = {imageUrl};
    // const position = 'คนขายกล้วย';
    // const num = {numPeople};
    // // const company = {company};
    // const branch = 'กล้วยสงขลา';
    // // const location = '${location}';
    // // const wage = {wage};
    // const detail = 'ขายกล้วย 24 ชม.';
    // const time_start = '8.00 น.';
    // const time_end = '17.00 น.';
    // const req = 'เป็นลิง';
    // const welfare = 'กินกล้วยฟรีตลอดการทำงาน';

    // const data = [
    //     imageUrl,
    //     position,
    //     num,
    //     company,
    //     branch,
    //     location,
    //     wage,
    //     detail,
    //     time_start,
    //     time_end,
    //     req,
    //     welfare
    // ];

    return (
        <div className="w-container">
            <div className="circular-image">
                <img src={imageUrl} alt="Company Picture" />
            </div>
            <div className="com-name">
                <div>
                    {jobPosition}
                </div>
                <div>
                    {company}
                </div>
            </div>
            <div className="jobwage-brach">
                <div>
                    ค่าจ้าง
                </div>
                <div>
                    {wage}
                </div>
                <div>
                    สถานที่ทำงาน
                </div>
                <div>
                    {location}
                </div>
            </div>
            <div className="want">
                <div>
                    พาร์ทไทม์ รับ {numPeople} คน
                </div>
                <Link to="/describe">
                    <button>ดูรายละเอียด</button>
                </Link>
            </div>
        </div>
    );
}

export default Work;
