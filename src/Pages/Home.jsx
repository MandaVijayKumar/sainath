import React from "react";
import CollegeLogin from "./CollegeLogin";
// import {useSelector, useDispatch} from 'react-redux';
// import {officialLogin, collegeLogin} from '../Redux/authSlice'


function Home() {
  // const dispatch = useDispatch();
  // const isLogin = useSelector((state) => state.authentication.isCdcLogin)
  // const isCollegeLogin = useSelector((state) => state.authentication.isCollegeLogin)
  // console.log(' home login is:', isLogin);
  // console.log(' home college login is:', isCollegeLogin);
  // // isLogin && dispatch(officialLogin());
  // // isCollegeLogin && dispatch(collegeLogin());
  // console.log(' home login is:', isLogin);
  // console.log(' home college login is:', isCollegeLogin);

  return (
    <div className="container-fluid" style={{height:'100vh', backgroundColor:'#708196'}}>
        <div className="row  " style={{height:'350px',}}>


            <div className="col-xs-5">

            </div>
            <div className="col-xs-7">

            </div>
        </div>
        <div className="row">
          <div className="col-sm-3">
            
          </div>
          <div className="col-sm-6">
          <CollegeLogin/>

          </div>
          <div className="col-sm-3">

          </div>
          

        </div>
    </div>
     
  );
}

export default Home;
