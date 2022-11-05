import React, { useState, useEffect, useRef } from "react";
import { Button, Table, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FullFaculty = () => {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(null)

  const navigate = useNavigate();
  const searchRef = useRef();

  const [category, setCategory] = useState("faculty name");

  const [filterData, setFilterData] = useState(allData);
  
  const [filter, setFilter] = useState("");
  const [placeholder, setPlaceholder] = useState("search by faculty name");

  console.log("all data in all faculty", allData);
  const searchHandler = (e) => {
    new Promise((res, rej) => {
      setFilter(e.target.value);

      res(e.target.value);
    }).then((result) => {
      console.log("after filter text:", result);
      if (category === "faculty name") {
        const searchData = allData.filter((data) =>
          data.facultyName
            .toLocaleLowerCase()
            .includes(result.toLocaleLowerCase())
        );
        console.log("the filter data:", searchData);
        searchData.length === 0
          ? setFilterData(allData)
          : setFilterData(searchData);
      }
      if (category === "college name") {
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
      if (category === "mobile number") {
        const searchData = allData.filter((data) =>
          data.mobileNumber
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
      .get("http://127.0.0.1:5000/fullFaculty", {
        onDownloadProgress: (dataUpload) => {
          console.log("download loaded", dataUpload.loaded);
          console.log("download building total", dataUpload.total);
          console.log(typeof dataUpload.total)
          console.log('percentage',Math.round((Number(dataUpload.loaded) / Number(dataUpload.total)) * 100));
          setLoading(
            Math.round((Number(dataUpload.loaded) / Number(dataUpload.total)) * 100)
          );
        },
      })
      .then((result) => {
        if (result.data.success) {
          setAllData(result.data.data);
          setFilterData(result.data.data);
          setLoading(null)
        } else {
          setLoading(null)
          alert("failed to fetch faculty info...!");
        }
      })
      .catch((error) => {
        alert(`failed...!`);
      });
  }, []);
  return (
    <div className="container-fluid">
      <div className="text-end">
        <Button
          variant="info"
          size="sm"
          onClick={() => navigate("/facultyDownload")}
        >
          download to Excel
        </Button>
      </div>
      {loading !== null &&(<div className="contianer">
        <div className="progress m-2" style={{ height:'30px'}}>
          <div
            className="progress-bar progress-bar-striped bg-primary"
            role="progressbar"
            style={{width:`${loading}%`}}
            aria-valuenow={loading}
            aria-valuemin="0"
            aria-valuemax="100"
          >
           <h4 className="text-center text-white">{loading} % loading </h4> 
          </div>
        </div>
      </div>)}
      <h5 className="text-center text-primary mt-2 ">
        {" "}
        Faculty - full information table
      </h5>
      <div
        className="row"
        style={{ display: "flex", justifyContent: "center" }}
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
              label="Faculty name"
              name="search"
              type="radio"
              isValid
              onChange={() => {
                setCategory("faculty name");
                searchRef.current.focus();
              }}
            />
            <Form.Check
              inline
              label="College Name"
              name="search"
              type="radio"
              isValid
              onChange={() => {
                setCategory("college name");
                searchRef.current.focus();
              }}
            />
            <Form.Check
              inline
              label="Mobile Number"
              name="search"
              type="radio"
              isValid
              onChange={() => {
                setCategory("mobile number");

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
        <Table bordered hover responsive className="text-center text-primary ">
          <thead className="bg-secondary text-white">
            <tr>
              <th>Sno</th>
              <th>ProfileImage</th>
              <th>Faculty Name</th>
              <th>Designation</th>
              <th>Qualification</th>
              <th>Department</th>
              <th>Gender</th>
              <th>CourseId</th>
              <th>Course name</th>
              <th>Medium</th>
              <th>College Name</th>
              <th>nature of College</th>
              <th>address</th>
              <th>jnbCode</th>

              <th>Mobile</th>
              <th>Email</th>
              <th>Account number</th>
              <th>ifcs code</th>
              <th>Adhar no</th>
              <th>Salary</th>
              <th>Category</th>
              <th>TeachingPosition</th>
              <th>DateOfJoin</th>
             
              <th>Download certificate</th>
            </tr>
          </thead>
          <tbody className="bg-light">
            {filterData.length > 0
              ? filterData.map((data, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={`http://127.0.0.1:5000/uploads/${data.profileImage}`}
                        alt="not found"
                        style={{
                          width: "100px",
                          height: "120px",
                          borderRadius: "5px",
                        }}
                      />
                    </td>
                    <td>{data.facultyName}</td>
                    <td>{data.facultyDesignation}</td>
                    <td>{data.hieghtDegree}</td>
                    <td>{data.departmentName}</td>
                    <td>{data.gender}</td>
                    <td>{data.courseId}</td>
                    <td>{data.courseName}</td>
                    <td>{data.medium}</td>
                    <td>{data.collegeName}</td>
                    <td>{data.natureOfCollege}</td>
                    <td>{data.address}</td>
                    <td>{data.jnbCode}</td>

                    <td>{data.mobileNumber}</td>
                    <td>{data.facultyEmail}</td>
                    <td>{data.accountNumber}</td>
                    <td>{data.ifcsCode}</td>
                    <td>{data.adharCardNumber}</td>
                    <td>{data.salary}</td>
                    

                    <td>{data.category}</td>
                    <td>{data.teachingPosition}</td>
                    <td>{data.dateOfJoin}</td>
                    {/* <td><img className='certificate' src={`http://127.0.0.1:5000/uploads/${faculty.heightDegreeCertificate}`} alt="not found" style={{width:'100px', height:'100px'}}/></td> */}

                    <td>
                      <a
                        href={`http://127.0.0.1:5000/uploads/${data.heightDegreeCertificate}`}
                        download
                      >
                        download
                      </a>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
export default FullFaculty;
