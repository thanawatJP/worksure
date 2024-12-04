import "./Search.css";

// components

function Search({ onSearch, value, onChange }) {
  return (
    <div className="border p-5 rounded-md flex flex-col items-center shadow-sm">
      <h1 className="text-xl font-bold">ค้นหางานจากภูมิลำเนา</h1>
      <div className="w-full flex justify-center items-center my-5 gap-5">
        <div className="">
          <label>จังหวัด</label>
          <input
            className="border py-2 rounded-md px-2 ml-2"
            type="text"
            name="province"
            value={value.province}
            onChange={(e) => onChange(e)}
            placeholder="จังหวัด"
          />
        </div>
        <div className="">
          <label>อำเภอ</label>
          <input
            className="border py-2 rounded-md px-2 ml-2"
            type="text"
            name="district"
            value={value.district}
            onChange={(e) => onChange(e)}
            placeholder="อำเภอ"
          />
        </div>
        <div className="">
          <label>ตำบล</label>
          <input
            className="border py-2 rounded-md px-2 ml-2"
            type="text"
            name="subDistrict"
            value={value.subDistrict}
            onChange={(e) => onChange(e)}
            placeholder="ตำบล"
          />
        </div>
        <button onClick={onSearch} className="w-fit px-10 py-2 bg-primary text-white rounded-md">
          ค้นหางาน
        </button>
      </div>
    </div>
  );
}

export default Search;
