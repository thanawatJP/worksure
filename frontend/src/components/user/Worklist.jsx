import React from "react";
import "./Work.css";

// Components
import Work from "./Work";

function Worklist({ jobList }) {
  return (
    <div className="flex flex-col items-center">
      <h1 className="font-semibold text-xl my-5">งานทั้งหมด</h1>

      {jobList?.map((item, index) => (
        <Work
          key={index}
          image={item?.Branch.Company.image}
          position={item?.position}
          company={item?.Branch.Company.name}
          wages={item?.wages}
          address={item?.Branch.Location.address}
          province={item?.Branch.Location.province}
          district={item?.Branch.Location.district}
          subDistrict={item?.Branch.Location.subDistrict}
          postCode={item?.Branch.Location.postCode}
          num={item?.num}
          jobId={item?.id}
        />
      ))}
    </div>
  );
}

export default Worklist;
