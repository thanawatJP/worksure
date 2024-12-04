import React from "react";

import './Home.css'

// components
import Worklist from "./Worklist";
import Search from "./Search";

function Home() {
    return (
        <div className="home">
            <div className="homeContain">
                <Search />
                <Worklist />
            </div>
        </div>
    );
}

export default Home;
