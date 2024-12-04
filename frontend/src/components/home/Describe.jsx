import React from "react";
import { useParams } from "react-router-dom";

import './Describe.css'

// components

function Describe({imageUrl, position, num, company, branch, location, wage, detail, time_start, time_end, req, welfare}) {
    imageUrl = 'data:image/png;base64,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';
    position = 'คนขายกล้วย';
    num = 2;
    company = 'กล้วย';
    branch = 'กล้วยสงขลา';
    location = 'กล้วยตากสิน';
    wage = 2000;
    detail = 'ขายกล้วย 24 ชม.';
    time_start = '8.00 น.';
    time_end = '17.00 น.';
    req = 'เป็นลิง';
    welfare = 'กินกล้วยฟรีตลอดการทำงาน';

    return (
        <div className="dContain">
            <div className="circular-image">
                <img src={imageUrl} alt="Company Picture" />
            </div>
            <div className="box">
                <div className="box-2">ตำแหน่ง: {position}</div>
                <div className="box-2">จำนวนที่รับ: {num}</div>
                <div className="box-2">ค่าจ้าง: {wage}</div>
                <div className="box-2">บริษัท: {company}</div>
                <div className="box-2">สาขา: {branch}</div>
                <div className="box-2">สถานที่ทำงาน: {location}</div>
            </div>
            <div className="box">
                <div className="box-2">
                    <div>รายละเอียดงาน:</div>
                    <div>{detail}</div>
                </div>
                <div className="box-2">
                    <div>เวลาทำงาน:</div>
                    <div>{time_start}-{time_end}</div>
                </div>
                <div className="box-2">
                    <div>คุณสมบัติ:</div>
                    <div>{req}</div>
                </div>
                <div className="box-2">
                    <div>สวัสดิการ:</div>
                    <div>{welfare}</div>
                </div>
            </div>
        </div>
    );
}

export default Describe;
