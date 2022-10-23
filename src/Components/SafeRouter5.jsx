
import React from 'react'
import { Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';


function SafeRouter5({children}) {
    const isLogin = useSelector((state) => state.authentication.isCdcLogin)
    console.log('viewlogin is:', isLogin);
    if(!isLogin)  return <Navigate to ='/officialLogin' replace />
    if(isLogin) {
        return children;
    } 
  
}

export default SafeRouter5