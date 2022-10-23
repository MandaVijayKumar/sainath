
import React from 'react'
import { Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';


function SafeRouter6({children}) {
    const isCollegeLogin = useSelector((state) => state.authentication.isCollegeLogin)
    const isCdcLogin = useSelector((state) => state.authentication.isCdcLogin)
    console.log('collegelogin is:', isCollegeLogin);
    if(!isCollegeLogin && !isCdcLogin)  return <Navigate to ='/' replace />
    if(isCollegeLogin || isCdcLogin) {
        return children;
    } 
  
}

export default SafeRouter6;