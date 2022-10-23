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
        axios.get(`http://127.0.0.1:5000/getFaculty/${jnbCode}`).then(result => setFacultyData(result.data)).catch(error =>console.log(error))

    }, [status, dumy]);
  return (
    <div className='container-fluid mt-3' >
        <h5 className="text-center text-primary">Faculty Information Table</h5>
        <Table responsive bordered hover className='text-center' style={{marginTop:'5px', backgroundColor:'#dad0db', color:'#435def', fontWeight:'400'}}>
            <thead className='text-white bg-secondary'>
                <tr>
                    <th>Sno</th>
                    <th>Image</th>
                    <th>Faculty name</th>
                    <th>Designation</th>
                    <th>Qualification</th>
                    <th>Department</th>
                    <th>Course name</th>
                    <th>Medium</th>
                    <th>CourseId</th>
                    <th>Mobile</th>
                    <th>Email</th>
                    <th>Account number</th>
                    <th>ifcs code</th>
                    <th>Adhar no</th>
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
                            <td>{faculty.courseName}</td>
                            <td>{faculty.medium}</td>
                            <td>{faculty.courseId}</td>
                            <td>{faculty.mobileNumber}</td>
                            <td>{faculty.facultyEmail}</td>
                            <td>{faculty.accountNumber}</td>
                            <td>{faculty.ifcsCode}</td>
                            <td>{faculty.adharCardNumber}</td>
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