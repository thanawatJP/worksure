import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Axios from 'axios';

// component
import Login from "./components/loginSignup/Login";
import UserSignup from "./components/loginSignup/UserSignup";
import CompanySignup from "./components/loginSignup/CompanySignup";

import User from "./components/user/User"
import Userhome from "./components/user/Userhome";
import DescribeWork from "./components/user/DescribeWork";
import MyWork from "./components/user/MyWork";
import MyProfile from "./components/user/MyProfile";

import Company from "./components/company/Company";
import Comhome from "./components/company/ComHome";
import AddWork from "./components/company/Addwork";
import Detail from "./components/company/Detail";
import Branch from "./components/company/Branch";
import AddBranch from "./components/company/Addbranch";
import ComWork from "./components/company/ComWork";
import Enroll from "./components/company/Enroll";
import UserProfile from "./components/company/UserProfile";

import Logout from "./components/Logout";

function App() {

  // const [jobList, setJobList] = useState([]);

  // const getJob = () => {
  //   Axios.get('http://localhost:3001/job').then((Response) => {
  //     setJobList(Response.data);
  //   })
  // }

  // const role = 'user';
  // const role = 'company';

  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      {/* <Navbar isLoggedIn={false} role={role}/> */}
      {/* <Navbar isLoggedIn={true} role={role}/> */}
      <Routes>
        <Route>
          {/* <Route path="" element={<Home />} /> */}
          {/* <Route path="" element={role === 'company' ? (<ComHome />) : (<Home />)} /> */}
          
          
          
          {/* login is home */}
          <Route path="" element={<Login />} />
          <Route path="usersignup" element={<UserSignup />} />
          <Route path="comsignup" element={<CompanySignup />} />
          <Route path="/user" element={<User />}>
            <Route path="" element={<Userhome />} />
            <Route path="describe/:jobId" element={<DescribeWork />} />
            <Route path="mywork" element={<MyWork />} />
            <Route path="myprofile" element={<MyProfile />} />
          </Route>
          <Route path="/company" element={<Company />}>
            <Route path="" element={<Comhome />} />
            <Route path="addwork" element={<AddWork />} />
            <Route path="describe/:jobId" element={<Detail />} />
            <Route path="branch" element={<Branch />} />
            <Route path="addbranch" element={<AddBranch />} />
            <Route path="work" element={<ComWork />} />
            <Route path="enroll" element={<Enroll />} />
            <Route path="userprofile/:jobberId" element={<UserProfile />} />
          </Route>
          <Route path="logout" element={<Logout />} />



          {/*<Route path="usersignup" element={<UserSignup />} />
          <Route path="comsignup" element={<CompanySignup />} />
          <Route path="describe" element={<Describe />} />
          <Route path="mywork" element={<Myworklist />} />
          <Route path="myprofile" element={<MyProfile />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
