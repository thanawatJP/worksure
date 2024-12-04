import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./ComHome.css"
// Components

function Comhome() {

    const [countBranch, setCountBranch] = useState();
    const [countWork, setCountWork] = useState();

    useEffect(() => {
        async function fetchData() {
            const userId = localStorage.getItem("userId");
            const res = await axios.get(`http://localhost:8000/getBranch/${userId}`);
            // console.log(res.data.data.Branch.length);
            setCountBranch(res.data.data.Branch.length);
            const res2 = await axios.get(`http://localhost:8000/get/Company/Work/${userId}`);
            // console.log(res2.data.data.length)
            setCountWork(res2.data.data.length);
        }
        fetchData();
    }, []);

    return (
        <div className="ch-contain">
            <div className="com-home-top">
                <div className="all-branch">
                    <div className="b-text">สาขาทั้งหมด</div>
                    <div>{countBranch}</div>
                </div>
                <div className="all-work">
                    <div className="w-text">งานทั้งหมด</div>
                    <div>{countWork}</div>
                </div>
            </div>
            <div className="com-home-body">
                <div className="find-work">
                    <div className="f-w-text">
                        <div>คุณกำลังหาคนมาทำงานอยู่ไหม</div>
                        <div>คลิกที่นี่เลย 👉👉👉</div>
                    </div>
                    <div className="b-f-w">
                        <Link to="addwork">
                            <button>เพิ่มงาน</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Comhome;
