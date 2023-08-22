import React, { useState, useEffect } from "react";
// import YearSelector from '../components/YearSelector'
// import Text from '../components/Text'
import ReusableTextField from "../components/ReusableTextField";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import Filter from "../components/Filter";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "UserId", headerName: "UserId", width: 280 },
  { field: "UserName", headerName: "UserName", width: 280 },
  { field: "EmailId", headerName: "EmailId", width: 280 },
  { field: "Language", headerName: "Language", width: 80 },
  // {
  //   field: "fullName",
  //   headerName: "Full name",
  //   description: "This column has a value getter and is not sortable.",
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  // },
];

const Select = () => {
  const [managerArr, setManagerArr] = useState([]);
  // const [managerType, setManagerType] = useState();
  const [passcode, setPasscode] = useState("");
  const [managerName, setManagerName] = useState("");
  // const [selectedYear, setSelectedYear] = useState("");
  const [data, setData] = useState([]);
  const [change, setChange] = useState("");
console.log("data------->",change);
  useEffect(() => {
    axios
      .get(`https://thinkzone.in.net/thinkzone/getManagerIdsWidPasscode`)
      .then((response) => {
        setManagerArr(response.data.resData);
      });
  }, []);

  let passcodeArray = [];

  managerArr?.filter((element) => {
    if (element.managerid === managerName) {
      passcodeArray = element.passcodes;
    }
  });

  const sortteacher = async () => {
    // if ( managerName === "" || passcode === "") {
    //   return alert("Please select some filters to preceed");
    // }

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };

    // const body = {
    //   passcode: passcode,
    //   managerid: managerName,
    // };

    try {
      const res = await axios.get(
        `https://thinkzone.in.net/thinkzone/searchteacher/${change}`
        // body,
        // config
      );
      if (res.status === 200) {
        setData(res.data);
        console.log("data---->", res.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    sortteacher();
  }, []);

  // const handleYearChange = (selectedYear) => {
  //   setSelectedYear(selectedYear);
  // };
  const handleManagerChange = (event) => {
    setManagerName(event.target.value);
  };
  // const handleManagerTypeChange = (event) => {
  //   setManagerType(event.target.value);
  // };
  const handlePasscodeChange = (event) => {
    setPasscode(event.target.value);
  };
  const handleChange = (event) => {
    setChange(event.target.value)
  }

  const rows = data.map((item, index) => ({
    id: index + 1,
    UserId: item.userid,
    UserName: item.username,
    EmailId: item.emailid,
    Language: item.baseline[0]?.language,
    // fullName: `${item.firstName || ""} ${item.lastName || ""}`,
    // Add more properties as needed
  }));

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <TextField
          id="outlined-basic"
          label="Search Fellow"
          value={change}
          onChange={handleChange}
          variant="outlined"
          style={{ width: 600 }}
        />
        <Button
          variant="contained"
          onClick={sortteacher}
          
          style={{ width: 250, height: 40, marginTop: 5,marginLeft:20 }}
        >
          Filter
        </Button>
      </div>
      <div
        style={{
          marginTop: "20px",
          marginLeft: "60px",
          padding: "50px 20px",
          display: "grid",
          gap: "20px",
          gridTemplateColumns: "repeat(auto-fill, minmax(430px, 1fr))",
        }}
      >
        {/* <YearSelector selectedYear={selectedYear} onChange={handleYearChange} />
        <Text
          name="Select manager-type"
          currencies={managerTypeSet}
          handleChange={handleManagerTypeChange}
        /> */}
        <TextField
          select
          label="Select manager"
          defaultValue="none"
          value={managerName}
          onChange={(e) => handleManagerChange(e)}
        >
          {managerArr.map((option, index) => (
            <MenuItem key={index + 1} value={option.managerid}>
              {option.managername}
            </MenuItem>
          ))}
        </TextField>

        <ReusableTextField
          label="Select passcode"
          value={passcode}
          options={passcodeArray}
          onChange={handlePasscodeChange}
        />
        <Button
          variant="contained"
          onClick={sortteacher}
          style={{ width: 250, height: 40, marginTop: 5 }}
        >
          Filter
        </Button>
      </div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10]}
          checkboxSelection
        />
      </div>

      {/* <>
        {data.map((loop) => (
          <ol>
            <li>id----: {loop.userid}</li>
          </ol>
        ))}
      </> */}
    </>
  );
};

export default Select;
