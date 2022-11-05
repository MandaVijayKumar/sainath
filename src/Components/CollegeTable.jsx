import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import Table from "react-bootstrap/Table";
// import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { DownloadTableExcel } from "react-export-table-to-excel";
// import { useReactToPrint } from 'react-to-print';
import {useSelector} from 'react-redux'

import CollegeTablePdf from "./CollegeTablePdf";

function CollegeTable() {
  const isCheck = useSelector((state) => state.authentication.isCheck);
  const searchRef = useRef();
  const tableRef = useRef(null);
  const [enable, setEnable] = useState('true');
  const [category, setCategory] = useState("College name");
  const [collegedata, setCollegeData] = useState([]);
  const [filterData, setFilterData] = useState(collegedata);
  const [status, setStatus] = useState(false);
  const [filter, setFilter] = useState("");
  const [placeholder, setPlaceholder] = useState("search by college name");
  const navigate = useNavigate();
  const componentRef = useRef();
  console.log('the check', isCheck);
  console.log('thee enable is', enable)
  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  // });
  const registrationHandler = () => {
    if(enable ==='true') {
      axios.post('http://127.0.0.1:5000/setEnable',{registration: false}).then((result) => {
       if(result.data.success === true) { 
        alert('registration closed successfully...!')
        setStatus(!status)
       } else {
        alert('registration failed ...!')
       }
      }).catch(error =>console.log(error))
    } else {
      axios.post('http://127.0.0.1:5000/setEnable',{registration: true}).then((result) => {
       if(result.data.success === true) { 
        alert('registration enabled successfully...!')
        setStatus(!status)
       } else {
        alert('registration failed ...!')
       }
      }).catch(error =>console.log(error))

    }
  }
  const searchHandler = (e) => {
    new Promise((res, rej) => {
      setFilter(e.target.value);

      res(e.target.value);
    }).then((result) => {
      console.log("after filter text:", result);
      if (category === "College name") {
        const searchData = collegedata.filter((data) =>
          data.collegeName
            .toLocaleLowerCase()
            .includes(result.toLocaleLowerCase())
        );
        console.log("the filter data:", searchData);
        searchData.length === 0
          ? setFilterData(collegedata)
          : setFilterData(searchData);
      }
      if (category === "jnbcode") {
        const searchData = collegedata.filter((data) =>
          data.jnbCode.toLocaleLowerCase().includes(result.toLocaleLowerCase())
        );
        console.log("the filter data:", searchData);
        searchData.length === 0
          ? setFilterData(collegedata)
          : setFilterData(searchData);
      }
      if (category === "nature of college") {
        const searchData = collegedata.filter((data) =>
          data.natureOfCollege
            .toLocaleLowerCase()
            .includes(result.toLocaleLowerCase())
        );
        console.log("the filter data:", searchData);
        searchData.length === 0
          ? setFilterData(collegedata)
          : setFilterData(searchData);
      }
    });
  };
  const editHandler = (jnbCode) => {
    navigate(`/cdeEditable/${jnbCode}`);
  };
  const viewHandler = (jnbCode) => {
    navigate(`/cdcViewCollege/${jnbCode}`);
  };

  const deleteHandler =  (jnbCode, collegeName) => {
     axios.post("http://127.0.0.1:5000/deleteCollege", {
      jnbCode,
    }).then((result) => {
      if (result.data.success === true) {
        alert(`${collegeName} with jnbcode ${jnbCode} successfully deleted..!`);
        setStatus(!status);
      } else {
        alert("delete faild");
      }

    }).catch(error => console.log(error));

   
  };

  const getData = () => {
    axios
      .get("http://127.0.0.1:5000/collegeTable")
      .then((res) => {
        setCollegeData(res.data.result);
        setFilterData(res.data.result);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getData();
    axios.get('http://127.0.0.1:5000/enable').then((result) => {
      if(result.data.success === true) {
        setEnable(result.data.data[0].enable)
        console.log('enable is ', result.data.data[0].enable
        )
      } else {
        alert('failed to get enable data...!')
      }
    }).catch()
  }, [status]);
  return (
    <div
      className="container-fluid"
      style={{ backgroundColor: "#ffe4e1", paddingTop: "0px" }}

    >
      <div className="row">
      <div
          className="col-sm-12 mt-3"
          style={{ display: "flex", justifyContent: "center", alignItems:'center' }}
        >
          <ButtonGroup size='lg'>
          {/* <div className=""> */}
          <Button
            variant="primary"
            size="sm"
            disabled ={isCheck? false: true}
            onClick={() => navigate("/cdcRegister")}
          >
            Add New College
          </Button>
          {/* </div> */}
          {/* <div className=""> */}
          <Button
            variant="primary"
            size="sm"
            disabled ={isCheck? false: true}
            onClick={() => navigate("/addCourseList")}
          >
            Add New Course
          </Button>
         { isCheck &&( <Button
            variant="primary"
            size="sm"
           
            onClick={registrationHandler}
          >
           {(enable === 'true')?'Close Registration':'Enable Registration'}
          </Button>) }
          {/* <div> */}
            <Button variant='primary' size='sm' onClick={() => navigate('/allDataCollege')}>College Full Info</Button>
          {/* </div> */}
          {/* </div> */}
          {/* <div className=""> */}
          {/* <Button
            variant="primary"
            size="sm"
            onClick={handlePrint}
          >
            Download to Pdf
          </Button> */}
          {/* </div> */}
          {/* <Button
            variant="primary"
            size="sm"
            onClick={() => navigate("/downLoadTable",{state: [...filterData]})}
          >
            Download
          </Button> */}
          
         
          </ButtonGroup>
          

        </div>
      </div>
      <div className='px-2 text-end'>
          <DownloadTableExcel
            filename="college table"
            sheet="AfliatedColleges"
            currentTableRef={tableRef.current}
            
          >
            <Button variant="info" size="sm">
              Export to Excel
            </Button>
          </DownloadTableExcel>
          </div>
      <div
        className="row"
        style={{ display: "flex", justifyContent: "center"}}
      >
        <div
          className="col-sm-8 my-4"
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
      <div >
   
        <Table
          responsive
          hover
          bordered
          className="text-center table-primary"
          ref={tableRef}
          
        >
          <thead className="text-success">
            <tr>
              <th>Sno</th>
              <th>JNB Code</th>
              <th>College Name</th>

              <th>Address</th>
              <th>Nature of College</th>
              <th>password</th>
              <th>View</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className="text-primary">
            {filterData.length > 0
              ? filterData.map((data, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <NavLink
                        to={`/cdcViewCollege/${data.jnbCode}`}
                        style={{ textDecoration: "none" }}
                      >
                        {" "}
                        {data.jnbCode}
                      </NavLink>
                    </td>
                    <td>
                      <NavLink 
                        to={`/cdcViewCollege/${data.jnbCode}`}
                        style={{ textDecoration: "none" }}
                      >
                        {" "}
                        {data.collegeName}
                      </NavLink>
                    </td>

                    <td>{data.address}</td>
                    <td>{data.natureOfCollege}</td>
                    <td>{data.password}</td>
                    <td>
                      <Button
                        size="sm"
                        onClick={() => viewHandler(data.jnbCode)}
                      >
                        View
                      </Button>
                    </td>
                    <td>
                      <Button
                        size="sm"
                        disabled ={isCheck? false: true}
                        onClick={() => editHandler(data.jnbCode)}
                      >
                        edit
                      </Button>
                    </td>
                    <td>
                      <Button
                        size="sm"
                        variant="danger"
                        disabled ={isCheck? false: true}
                        onClick={() =>
                          deleteHandler(data.jnbCode, data.collegeName)
                        }
                      >
                        delete
                      </Button>
                    </td>
                  </tr>
                ))
              : ""}
          </tbody>
        </Table>
        {/* <CollegeTablePdf ref={componentRef}/> */}
      </div>
    </div>
  );
}

export default CollegeTable;
