
import React from 'react'
import {useParams} from 'react-router-dom'

function ViewCollege() {
    const {jnbCode} = useParams();
    console.log('myjnbCode', jnbCode)
  return (
    <div style={{height:'100vh', backgroundColor: '#ead295'}}>{jnbCode}</div>
  )
}

export default ViewCollege