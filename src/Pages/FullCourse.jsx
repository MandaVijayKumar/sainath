import React, {useState, useEffect} from 'react';
import {Button, Table} from 'react-bootstrap';
import axios from 'axios';

const FullCourse = () => {
    const [ allData, setAllData] = useState([]);

    console.log('all data in all courses',allData)

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/fullCourse').then((result) => {
            if(result.data.success) {
                setAllData(result.data.data)
            } else {
                alert('failed to fetch fullCourse info...!')
            }

        }).catch(error => {
            alert(`failed...!`)
        })

    }, [])
    return(
        <div className='container-fluid'>


        </div>
    )
}
export default FullCourse;