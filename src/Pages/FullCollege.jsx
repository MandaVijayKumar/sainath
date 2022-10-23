import React, {useState, useEffect} from 'react';
import {Button, Table} from 'react-bootstrap';
import axios from 'axios';

const FullCollege = () => {
    const [ allData, setAllData] = useState([]);

    console.log('all data in all colleges',allData)

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/fullCollege').then((result) => {
            if(result.data.success) {
                setAllData(result.data.data)
            } else {
                alert('failed to fetch college info...!')
            }

        }).catch(error => {
            alert(`failed...!`)
        })

    }, [])
    return(
        <div className='container-fluid'>
            {
                allData.length>0?(
                    <Table bordered hover responsive className='text-center text-primary mt-5'>
                        
                        
                        <thead className='bg-secondary text-white'>
                            <tr>
                                <th>jnbCode</th>
                                <th style={{width: '150px !important'}}>collegeName</th>
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
                        <tbody className='bg-light'>
                            {
                                allData.length > 0? allData.map((data, index) =>(
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
                                )): null
                            }
                        
                        </tbody>

                    </Table>
                ): null
            }



        </div>
    )
}
export default FullCollege;