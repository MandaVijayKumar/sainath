import React, { useState, useEffect, useRef } from "react";
import { Button, Table, Form } from "react-bootstrap";
import axios from "axios";
import { DownloadTableExcel } from "react-export-table-to-excel";

const FullCollege = () => {
  const [allData, setAllData] = useState([]);
  const searchRef = useRef();
  const [filterData, setFilterData] = useState(allData);
  const tableRef1 = useRef(null);
 
  const [filter, setFilter] = useState("");
  const [category, setCategory] = useState("College name");
  const [placeholder, setPlaceholder] = useState("search by college name");

  console.log("all data in all colleges", allData);

  const searchHandler = (e) => {
    new Promise((res, rej) => {
      setFilter(e.target.value);

      res(e.target.value);
    }).then((result) => {
      console.log("after filter text:", result);
      if (category === "College name") {
        const searchData = allData.filter((data) =>
          data.collegeName
            .toLocaleLowerCase()
            .includes(result.toLocaleLowerCase())
        );
        console.log("the filter data:", searchData);
        searchData.length === 0
          ? setFilterData(allData)
          : setFilterData(searchData);
      }
      if (category === "jnbcode") {
        const searchData = allData.filter((data) =>
          data.jnbCode.toLocaleLowerCase().includes(result.toLocaleLowerCase())
        );
        console.log("the filter data:", searchData);
        searchData.length === 0
          ? setFilterData(allData)
          : setFilterData(searchData);
      }
      if (category === "nature of college") {
        const searchData = allData.filter((data) =>
          data.natureOfCollege
            .toLocaleLowerCase()
            .includes(result.toLocaleLowerCase())
        );
        console.log("the filter data:", searchData);
        searchData.length === 0
          ? setFilterData(allData)
          : setFilterData(searchData);
      }
    });

  }

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/fullCollege")
      .then((result) => {
        if (result.data.success) {
          setAllData(result.data.data);
          setFilterData(result.data.data);
        } else {
          alert("failed to fetch college info...!");
        }
      })
      .catch((error) => {
        alert(`failed...!`);
      });
  }, []);
  return (
    <div className="container-fluid">
      <div className="text-end">
      <DownloadTableExcel
            filename="college table"
            sheet="AfliatedColleges"
            currentTableRef={tableRef1.current}
            
          >
            <Button variant="info" size="sm">
              Export to Excel
            </Button>
          </DownloadTableExcel>
      </div>
      <h5 className="text-center text-primary mt-2 ">
        Colleges - Full information table
      </h5>
      <div
        className="row"
        style={{ display: "flex", justifyContent: "center"}}
      >
        <div
          className="col-sm-8 my-2"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Form.Group className=" text-primary p-1" style={{ width: "100%" }}>
            <Form.Control
              type="search"
              placeholder={`Search by ${category}`}
              value={filter}
              name="search"
              ref={searchRef}
              onChange={searchHandler}
              style={{ color: "blue", fontSize: "18px" }}
            />
          </Form.Group>
          <div
            style={{ display: "flex", justifyContent: "space-evenly" }}
            className="text-primary"
          >
            <Form.Check
              inline
              label="College name"
              name="search"
              type="radio"
              isValid
              onChange={() => {
                setCategory("College name");
                searchRef.current.focus();
              }}
            />
            <Form.Check
              inline
              label="Jnbcode"
              name="search"
              type="radio"
              isValid
              onChange={() => {
                setCategory("jnbcode");
                searchRef.current.focus();
              }}
            />
            <Form.Check
              inline
              label="Nature of college"
              name="search"
              type="radio"
              isValid
              onChange={() => {
                setCategory("nature of college");
                
                searchRef.current.focus();
              }}
            />
          </div>
          {/* <Button variant="primary" size="sm" onClick={searchHandler}>
            search
          </Button> */}
          ,
        </div>
       
      </div>
      <div className="table">
      
        <Table bordered hover responsive className="text-center text-primary " ref={tableRef1}>
          <thead className="bg-secondary text-white">
            <tr>
              <th>jnbCode</th>
              <th style={{ width: "150px !important" }}>collegeName</th>
              <th>natureOfCollege</th>
              <th>address</th>
              <th>totalCourse</th>
              <th>totalFaculty</th>
              <th>totalLabs</th>
              <th>totalClassRooms</th>
              <th>totalIntake</th>
              <th>totalStudent-2022</th>
              <th>totalStudent-2021</th>
              <th>totalStudent-2020</th>
              <th>totalStudent-2019</th>
              <th>totalStudent-2018</th>
            </tr>
          </thead>
          <tbody className="bg-light">
            {filterData.length > 0
              ? filterData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.jnbCode}</td>
                    <td>{data.collegeName}</td>
                    <td>{data.natureOfCollege}</td>
                    <td>{data.address}</td>
                    <td>{data.totalCourse}</td>
                    <td>{data.totalFaculty}</td>
                    <td>{data.totalLabs}</td>
                    <td>{data.totalClassRooms}</td>
                    <td>{data.totalIntake}</td>
                    <td>{data.total2022}</td>
                    <td>{data.total2021}</td>
                    <td>{data.total2020}</td>
                    <td>{data.total2019}</td>
                    <td>{data.total2018}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </Table>
 
      </div>
    </div>
  );
};
export default FullCollege;
