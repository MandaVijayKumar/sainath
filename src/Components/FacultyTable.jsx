import React, {useState, useEffect} from 'react';
import {Table, Button} from 'react-bootstrap';
import axios from 'axios'
import './CollegeDetails/facultyTable.css';
import {useNavigate} from 'react-router-dom';
import { useDispatch } from "react-redux";
import { collegeDumy } from "../Redux/authSlice";
import {useSelector} from 'react-redux';

function FacultyTable({jnbCode, statusHandler, stat}) {
    const [facultyData, setFacultyData] = useState([]);
    const [status, setStatus] = useState(false);
    const [loading, setLoading] = useState(null)
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const dumy = useSelector((state) => state.authentication.dumy)
   

   const deleteHandler = (email) => {
    axios.post(`http://127.0.0.1:5000/deleteFaculty/${email}`).then((result) => {
        if(result.data.success) {
            alert('successfully deleted...!')
            setStatus(!status)
            statusHandler();
            dispatch(collegeDumy());
        } else {
            alert('delete operation failed...!')
            setStatus(!status)
        }

    }).catch((error) => {});

   }
    

    useEffect(() => { 
        axios.get(`http://127.0.0.1:5000/getFaculty/${jnbCode}`,{
            onDownloadProgress: (dataUpload) => {
              console.log("upload loaded", dataUpload.loaded);
              console.log("download lab total", dataUpload.total);
              console.log(typeof dataUpload.total)
              console.log('percentage',Math.round((Number(dataUpload.loaded) / Number(dataUpload.total)) * 100));
              setLoading(
                Math.round((Number(dataUpload.loaded) / Number(dataUpload.total)) * 100)
              );
            },
          }).then(result =>{setFacultyData(result.data);setLoading(null)} ).catch(error =>{console.log(error);setLoading(null)})

    }, [status, dumy]);
  return (
    <div className='container-fluid mt-3' >
        <h5 className="text-center text-primary">Faculty Information Table</h5>
        
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
        <Table responsive bordered hover className='text-center' style={{marginTop:'5px', backgroundColor:'#dad0db', color:'#435def', fontWeight:'400'}}>
            <thead className='text-white bg-secondary'>
                <tr>
                    <th>Sno</th>
                    <th>Image</th>
                    <th>Faculty name</th>
                    <th>Designation</th>
                    <th>Qualification</th>
                    <th>Department</th>
                    <th>Gender</th>
                    <th>Teaching Position</th>
                    <th>Course name</th>
                    <th>Medium</th>
                    <th>CourseId</th>
                    <th>Mobile</th>
                    <th>Email</th>
                    <th>Account number</th>
                    <th>ifcs code</th>
                    <th>Adhar no</th>
                    <th>salary(monthly)</th>
                    <th>category</th>
                    <th>dateOfJoin</th>

                    
                    <th>Download certificate</th>
                    <th>Delete</th>
                </tr>

            </thead>
            <tbody>
                {
                    facultyData.length> 0? facultyData.map((faculty,index)=>(
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td><img src={`http://127.0.0.1:5000/uploads/${faculty.profileImage}`} alt="not found" style={{width:'100px', height: '120px', borderRadius:'5px'}}/></td>
                            <td>{faculty.facultyName}</td>
                            <td >{faculty.facultyDesignation}</td>
                            <td>{faculty.hieghtDegree}</td>
                            <td>{faculty.departmentName}</td>
                            <td>{faculty.gender}</td>
                            <td>{faculty.teachingPosition}</td>
                            <td>{faculty.courseName}</td>
                            <td>{faculty.medium}</td>
                            <td>{faculty.courseId}</td>
                            <td>{faculty.mobileNumber}</td>
                            <td>{faculty.facultyEmail}</td>
                            <td>{faculty.accountNumber}</td>
                            <td>{faculty.ifcsCode}</td>
                            <td>{faculty.adharCardNumber}</td>
                            <td>{faculty.salary}</td>
                            <td>{faculty.category}</td>
                            <td>{faculty.dateOfJoin}</td>
                            {/* <td><img className='certificate' src={`http://127.0.0.1:5000/uploads/${faculty.heightDegreeCertificate}`} alt="not found" style={{width:'100px', height:'100px'}}/></td> */}
                           
                            <td><a href={`http://127.0.0.1:5000/uploads/${faculty.heightDegreeCertificate}`} download >download</a></td>  
                            <td><Button variant='danger' size='sm' onClick={() => deleteHandler(faculty.facultyEmail)}>delete</Button></td>
                        </tr>
                    )) :null
                }

            </tbody>

        </Table>
    </div>
  )
}

export default FacultyTable