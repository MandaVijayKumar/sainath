import React,{useState} from 'react'
import {Button, ButtonGroup} from 'react-bootstrap'
import FullCollege from './FullCollege'
import FullCourse from './FullCourse'
import FullFaculty from './FullFaculty'

function AllDataCollege() {
    const [select, setSelect] = useState('fullCollege')
  return (
    <div className='container-fluid'>
        <div className="row">
            <div className="col-sm-6 m-auto mt-3">
                <ButtonGroup size='lg'>
                    <Button className='' onClick={() => setSelect('fullCollege')}>College Info</Button>
                    <Button className='' onClick={() => setSelect('fullCourse')}>Course Info</Button>
                    <Button className='' onClick={() => setSelect('fullFaculty')}>Faculty Info</Button>

                </ButtonGroup>
            </div>
        </div>
        <div className="row">
            <div className="col-sm-12">
                {select === 'fullCollege' && <FullCollege/>}
                {select === 'fullCourse' && <FullCourse/>}
                {select === 'fullFaculty' && <FullFaculty/>}

            </div>
        </div>

    </div>
  )
}

export default AllDataCollege