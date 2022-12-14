
import React from 'react'
import { Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';


function SafeRouter3({children}) {
    const isLogin = useSelector((state) => state.authentication.isCdcLogin)
    console.log('login is:', isLogin);
    if(!isLogin)  return <Navigate to ='/officialLogin' replace />
    if(isLogin) {
        return children;
    } 
  
}

export default SafeRouter3