import React, { useState, useEffect, useRef } from "react";
import { Button, Table, Form } from "react-bootstrap";
import axios from "axios";

import { DownloadTableExcel } from "react-export-table-to-excel";

const FullCourse = () => {
  const [allData, setAllData] = useState([]);
  const searchRef = useRef();
  const tableRef = useRef(null);
  const [category, setCategory] = useState("course name");
 
  const [filterData, setFilterData] = useState(allData);
  const [status, setStatus] = useState(false);
  const [filter, setFilter] = useState("");
  const [placeholder, setPlaceholder] = useState("search by course name");

  console.log("all data in all courses", allData);
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
      if (category === "course name") {
        const searchData = allData.filter((data) =>
          data.courseName
            .toLocaleLowerCase()
            .includes(result.toLocaleLowerCase())
        );
        console.log("the filter data:", searchData);
        searchData.length === 0
          ? setFilterData(allData)
          : setFilterData(searchData);
      }
    });
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/fullCourse")
      .then((result) => {
        if (result.data.success) {
          setAllData(result.data.data);
          setFilterData(result.data.data);
        } else {
          alert("failed to fetch fullCourse info...!");
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
            filename="course table"
            sheet="course table"
            currentTableRef={tableRef.current}
            
          >
            <Button variant="info" size="sm">
              Export to Excel
            </Button>
          </DownloadTableExcel>
      </div>
      <h5 className="text-center text-primary mt-2 ">
        Course - Full information table
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
              label="course name"
              name="search"
              type="radio"
              isValid
              onChange={() => {
                setCategory("course name");
                
                searchRef.current.focus();
              }}
            />
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
           
          </div>
          {/* <Button variant="primary" size="sm" onClick={searchHandler}>
            search
          </Button> */}
          ,
        </div>
       
      </div>
      <div className="table">
     
        <Table bordered hover responsive className="text-center text-primary " ref={tableRef}>
          <thead className="bg-secondary text-white">
            <tr>
              {" "}
              <th>Sno</th>
              <th>jnbCode</th>
              <th>courseId</th>
              <th style={{ width: "150px !important" }}>courseName</th>
              <th>medium</th>
              <th>Course Category</th>
              
              <th>CollegeName</th>
              <th>address</th>
              <th>totalFaculty</th>
              <th>totalLabs</th>
              <th>totalClassRooms</th>
              <th>Intake seats</th>
              <th>Alloted-2022</th>
              <th>Alloted-2021</th>
              <th>Alloted-2020</th>
              <th>Alloted-2019</th>
              <th>Alloted-2018</th>
            </tr>
          </thead>
          <tbody className="bg-light">
            {filterData.length > 0
              ? filterData.map((data, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{data.jnbCode}</td>
                    <td>{data.courseId}</td>
                    <td>{data.courseName}</td>
                    <td>{data.medium}</td>
                    <td>{data.courseCategory}</td>
                   
                    <td>{data.collegeName}</td>
                    <td>{data.address}</td>
                    <td>{data.facultyCount}</td>
                    <td>{data.labCount}</td>
                    <td>{data.classCount}</td>
                    <td>{data.allotedSeats}</td>
                    <td>{data.enroll2022}</td>
                    <td>{data.enroll2021}</td>
                    <td>{data.enroll2020}</td>
                    <td>{data.enroll2019}</td>
                    <td>{data.enroll2018}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </Table>
     
      </div>
    </div>
  );
};
export default FullCourse;
