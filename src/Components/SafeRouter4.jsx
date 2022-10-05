
import React from 'react'
import { Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';


function SafeRouter4({children}) {
    const isCollegeLogin = useSelector((state) => state.authentication.isCollegeLogin)
    console.log('collegelogin is:', isCollegeLogin);
    if(!isCollegeLogin)  return <Navigate to ='/' replace />
    if(isCollegeLogin) {
        return children;
    } 
  
}

export default SafeRouter4