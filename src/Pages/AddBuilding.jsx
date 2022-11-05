import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import aprcet from "../assets/aprcet.pdf";

function AddBuilding() {
  const { jnbCode } = useParams();
  const navigate = useNavigate();
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [ecfile, setEcFile] = useState(null);
  const [leasedfile, setLeasedFile] = useState("");
  const [landfile, setLandFile] = useState(null);
  const [uploading, setUploading] = useState(null);
  const [data, setData] = useState({
    jnbCode: jnbCode,
    property: "",
    totalArea: "",
    phoneNumber: "",
    email: "",
    address: "",
    longitude: "",
    latitude: "",
  });
  console.log('data uploading....', uploading)
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("jnbCode", data.jnbCode);
    formData.append("property", data.property);
    formData.append("totalArea", data.totalArea);
    formData.append("phoneNumber", data.phoneNumber);

    formData.append("address", data.address);
    formData.append("latitude", data.latitude);
    formData.append("longitude", data.longitude);
    formData.append("email", data.email);
    formData.append("image1", image1);
    formData.append("image2", image2);
    formData.append("image3", image3);
    formData.append("image4", image4);
    formData.append("ecfile", ecfile);
    if (
      image1.type.toLowerCase().includes("/jpeg") ||
      image1.type.toLowerCase().includes("/jpg") ||
      image1.type.toLowerCase().includes("/png") ||
      image1.type.toLowerCase().includes("/gif")
    ) {
      if (
        (image2.type.toLowerCase().includes("/jpeg") ||
          image2.type.toLowerCase().includes("/jpg") ||
          image2.type.toLowerCase().includes("/png") ||
          image2.type.toLowerCase().includes("/gif")) &&
        (image3.type.toLowerCase().includes("/jpeg") ||
          image3.type.toLowerCase().includes("/jpg") ||
          image3.type.toLowerCase().includes("/png") ||
          image3.type.toLowerCase().includes("/gif")) &&
        (image4.type.toLowerCase().includes("/jpeg") ||
          image4.type.toLowerCase().includes("/jpg") ||
          image4.type.toLowerCase().includes("/png") ||
          image4.type.toLowerCase().includes("/gif"))
      ) {
        console.log("yes");
        console.log(ecfile);
        console.log(ecfile.type);
        if (data.property === "Leased Building") {
          formData.append("leasedfile", leasedfile);
        } else {
          formData.append("leasedfile", landfile);
        }
        formData.append("landfile", landfile);
        console.log("the file", leasedfile);
        // start
        if (
          ecfile.type.includes("application/pdf") &&
          landfile.type.includes("application/pdf")
        ) {
          console.log("yes");
          //start

          axios
            .post("http://127.0.0.1:5000/buildingUpload", formData, {
              onUploadProgress: (dataUpload) => {
                console.log("upload loaded", dataUpload.loaded);
                console.log("upload total", dataUpload.total);
                console.log(typeof dataUpload.total)
                console.log('percentage',Math.round((Number(dataUpload.loaded) / Number(dataUpload.total)) * 100));
                setUploading(
                  Math.round((Number(dataUpload.loaded) / Number(dataUpload.total)) * 100)
                );
              },
            })
            .then((result) => {
              console.log(result);
              if (result.data.success === true) {
                setUploading(null)
                alert("successfully added building details...!");
                navigate(`/viewCollege/${jnbCode}`);
              } else {
                if (result.data.success === false) {
                  alert(`failed - ${result.data.error}`);
                }
              }
            })
            .catch((error) => console.log(error));

          //end
        } else {
          console.log("no");
          alert(
            "please upload Ec file or land file or leased file must be pdf file only"
          );
        }

        //end
      } else {
        console.log("no");
        alert(
          "please upload additional images file extention must be jpeg or jpg or gip or png"
        );
      }
    } else {
      console.log("no");
      alert(
        "please upload front image file extention must be jpeg or jpg or gip or png"
      );
    }
  };
  return (
    <div>
    
      <Form
        onSubmit={submitHandler}
        className="text-center"
        style={{
          width: "80%",
          borderRadius: "10px",
          backgroundColor: "#34eadd",
          padding: "12px",
          fontSize: "16px",
        }}
      >
        <h5 className="text-primary m-2"> Register Building Information</h5>
        <Form.Group className="mb-3">
          <Form.Label>Jnb Code</Form.Label>
          <Form.Control
            type="Number"
            placeholder="jnb code"
            value={data.jnbCode}
            name="jnbCode"
            readOnly
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Total Area (in square feets)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Total Areat (in square feets)"
            value={data.totalArea}
            name="totalArea"
            onChange={(e) =>
              setData({
                ...data,
                [e.target.name]: e.target.value,
              })
            }
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>College Phone Number</Form.Label>
          <Form.Control
            type="number"
            placeholder="College Phone Number"
            value={data.phoneNumber}
            name="phoneNumber"
            onChange={(e) =>
              setData({
                ...data,
                [e.target.name]: e.target.value,
              })
            }
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>College Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="College Email"
            value={data.email}
            name="email"
            onChange={(e) =>
              setData({
                ...data,
                [e.target.name]: e.target.value,
              })
            }
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>latitude</Form.Label>
          <Form.Control
            type="number"
            placeholder="latitude"
            value={data.latitude}
            name="latitude"
            onChange={(e) =>
              setData({
                ...data,
                [e.target.name]: e.target.value,
              })
            }
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>longitude</Form.Label>
          <Form.Control
            type="number"
            placeholder="longitude"
            value={data.longitude}
            name="longitude"
            onChange={(e) =>
              setData({
                ...data,
                [e.target.name]: e.target.value,
              })
            }
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea2">
          <Form.Label>College Address</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="address"
            value={data.address}
            required
            placeholder="college address"
            onChange={(e) =>
              setData({
                ...data,
                [e.target.name]: e.target.value,
              })
            }
          />
        </Form.Group>

        <Form.Label>Select Property</Form.Label>
        <Form.Select
          name="property"
          className="mb-3"
          required
          onChange={(e) =>
            setData({
              ...data,
              [e.target.name]: e.target.value,
            })
          }
        >
          <option value="Own Building">Select Property</option>
          <option value="Own Building">Own Building</option>
          <option value="Leased Building">Leased Building</option>
        </Form.Select>
        {data.property === "Leased Building" && (
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>
              Building Leased Documentation prof ( only PDF file )
            </Form.Label>
            <Form.Control
              type="file"
              name="leasedfile"
              required
              onChange={(e) => setLeasedFile(e.target.files[0])}
            />
          </Form.Group>
        )}
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>
            Building Land Documentation prof ( only PDF file )
          </Form.Label>
          <Form.Control
            type="file"
            name="landfile"
            required
            onChange={(e) => setLandFile(e.target.files[0])}
          />
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>EC ( only PDF file )</Form.Label>
          <Form.Control
            type="file"
            name="ecfile"
            required
            onChange={(e) => setEcFile(e.target.files[0])}
          />
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>
            Front Buliding Image ( only jpeg / jpg / png / gif file extention
            are allowed )
          </Form.Label>
          <Form.Control
            type="file"
            name="image1"
            required
            onChange={(e) => setImage1(e.target.files[0])}
          />
        </Form.Group>
        {uploading !== null &&(<div className="contianer">
        <div className="progress m-2" style={{ height:'30px'}}>
          <div
            className="progress-bar progress-bar-striped bg-primary"
            role="progressbar"
            style={{width:`${uploading}%`}}
            aria-valuenow={uploading}
            aria-valuemin="0"
            aria-valuemax="100"
          >
           <h4 className="text-center text-white">{uploading} % uploading </h4> 
          </div>
        </div>
      </div>)}
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>
            Additional Buliding Image ( only jpeg / jpg / png / gif file
            extention are allowed )
          </Form.Label>
          <Form.Control
            type="file"
            name="image2"
            required
            onChange={(e) => setImage2(e.target.files[0])}
          />
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>
            Additional Buliding Image ( only jpeg / jpg / png / gif file
            extention are allowed )
          </Form.Label>
          <Form.Control
            type="file"
            name="image3"
            required
            onChange={(e) => setImage3(e.target.files[0])}
          />
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>
            Additional Buliding Image ( only jpeg / jpg / png / gif file
            extention are allowed )
          </Form.Label>
          <Form.Control
            type="file"
            name="image4"
            required
            onChange={(e) => setImage4(e.target.files[0])}
          />
        </Form.Group>
     

        <Button variant="primary" type="submit">
          submit
        </Button>
      </Form>
    </div>
  );
}

export default AddBuilding;
