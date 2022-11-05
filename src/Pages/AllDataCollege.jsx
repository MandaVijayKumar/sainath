import React, { useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import FullCollege from "./FullCollege";
import FullCourse from "./FullCourse";
import FullFaculty from "./FullFaculty";

function AllDataCollege() {
  const [select, setSelect] = useState("fullCollege");
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-6 m-auto mt-3">
          <ButtonGroup size="lg">
            <Button className="" onClick={() => setSelect("fullCollege")} style={{backgroundColor: select==='fullCollege'? '#6fa8dc':''}}>
              College Info
            </Button>
            <Button className="" onClick={() => setSelect("fullCourse")} style={{backgroundColor: select==='fullCourse'? '#6fa8dc':''}}>
              Course Info
            </Button>
            <Button className="" onClick={() => setSelect("fullFaculty")} style={{backgroundColor: select==='fullFaculty'? '#6fa8dc':''}}>
              Faculty Info
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          {select === "fullCollege" && <FullCollege />}
          {select === "fullCourse" && <FullCourse />}
          {select === "fullFaculty" && <FullFaculty />}
        </div>
      </div>
    </div>
  );
}

export default AllDataCollege;
