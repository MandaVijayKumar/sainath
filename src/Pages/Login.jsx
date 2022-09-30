import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Login() {
    const [data, setData ] = useState({jnbCode:'', collegeName:'', natureOfCollege:'', password:'', status: true})
  
    const natureOfCollegeHandler = (e) => {
        setData({...data, natureOfCollege: e.target.value})
    }
    const submitHandler = (e) => {
        e.preventDefault();
        console.log('first')
        console.log(data)
    }
    
  
    return (
    <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" >
        <Form.Label>JNB Code</Form.Label>
        <Form.Control
         type="number"
         placeholder="Enter JNB Code"
         value={data.jnbCode}
         name='jnbCode'
         onChange={(e)=>setData({...data, jnbCode: e.target.value})}
         />        
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>College Name</Form.Label>
        <Form.Control
         type="text"
          placeholder="Enter College Name"
          value={data.collegeName}
          name = 'collegeName'
          onChange={(e)=>setData({...data, collegeName: e.target.value})}

          
          />        
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Nature of the College</Form.Label>
        <Form.Select
         name='natureOfCollege'
         onChange={natureOfCollegeHandler }
         
         >
          <option value='UG'>UG</option>
          <option value='PG'>PG</option>
         
        </Form.Select>        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
         type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e)=>setData({...data, password:e.target.value})}
          
          />
      </Form.Group>
      
      <Button variant="primary" type="submit" >
        Submit
      </Button>
    </Form>
  );
}

export default Login