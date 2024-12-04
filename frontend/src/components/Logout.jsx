// Logout.js
import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Logout() {
    const navigate = useNavigate()
    useEffect(() => {
        async function logout() {
            const res = await axios.post('http://localhost:8000/logout')
            if (res.data.message === 'Logout Success') {
                localStorage.setItem("userId", "");
                navigate('/');
            }
        }
        logout();
    });

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-gray-200 p-8 rounded-lg shadow-md">
                <p className="text-gray-600">Logging out...</p>
            </div>
        </div>
    );
}

export default Logout;
