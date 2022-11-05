import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CdcRegister() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    jnbCode: "",
    collegeName: "",
    natureOfCollege: "",
    address: "",
    password: "",
    longitude: "",
    latitude: "",
    status: true,
    eligible: "pending",
  });

  const natureOfCollegeHandler = (e) => {
    setData({ ...data, natureOfCollege: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:5000/addColleges", data)
      .then((result) => {
        if (result.data.success) {
          alert("college Register successfull ..!");
          navigate("/collegeTable");
        } else {
          alert(
            "college submision failed because your college jnbcode is  already exists in database"
          );
        }
      })
      .catch((error) => {
        alert(" college register failed");
      });
  };

  return (
    <div
      className=" p-2"
      style={{ backgroundColor: "#c0c0c0", height: "100vh" }}
    >
      <Form
        onSubmit={submitHandler}
        className="mt-4  w-75 m-auto text-center p-2 "
        style={{ borderRadius: "10px", backgroundColor: "#557700" }}
      >
        <div className="text-center text-white my-3">
          <h4>Register College Information Form</h4>
        </div>
        <Form.Group className="mb-3">
          <Form.Control
            type="number"
            placeholder="Enter JNB Code"
            value={data.jnbCode}
            name="jnbCode"
            onChange={(e) => setData({ ...data, jnbCode: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter College Name"
            value={data.collegeName}
            name="collegeName"
            onChange={(e) => setData({ ...data, collegeName: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Select
            name="natureOfCollege"
            onChange={natureOfCollegeHandler}
            required
          >
            <option value="">Select Nature of College</option>
            <option value="UG">UG</option>
            <option value="PG">PG</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter city"
            value={data.address}
            onChange={(e) => setData({ ...data, address: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default CdcRegister;
