import React from 'react'
import {useLocation} from 'react-router-dom'

function DownLoadTable() {
    const location = useLocation();
    console.log(location)
  return (
    <div>DownLoadTable</div>
  )
}

export default DownLoadTable