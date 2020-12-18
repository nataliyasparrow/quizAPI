import React, { useEffect, useState } from 'react';
import {Link, Redirect} from 'react-router-dom';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import FormControl from "react-bootstrap/FormControl";
import FormLabel from "react-bootstrap/FormLabel";
import axios from 'axios';

export default function CreateNewCategory(){

const [input_data, setInputData] = useState({"title":"", "description":""});
const [status, setStatus] = useState(false);

async function postCategory(input_data) {
    // console.log("Post input data", input_data);
    return new Promise((resolve, reject) => {
        axios.post('/api/v2/categories/', input_data).then((response) => {
          resolve(response.data);
        }).catch((error) => {
          reject(error.response.data);
        });
      });
};


const handleChange = e => {
    e.persist();
    setInputData(input_data => ({...input_data, [e.target.name]: e.target.value}));
    console.log("Handle change Input data: ", input_data);

}

const handleSubmit = e => {
    e.preventDefault();
    postCategory(input_data).
    then(setStatus(true)).
    catch(console.error); 
}

return (
<Container>
    { status ?
    <Col xs={6}>
        {/* <h3>Success!</h3> */}
        <Redirect to='/'/>
    </Col> :
    <Col xs={6}>
        <h4>Create new category</h4>
        <Form onSubmit={handleSubmit}>
        <FormGroup controlId="CategoryTitleField">
            <FormLabel>Title</FormLabel>
            <FormControl type="input" value={input_data.title} name="title" placeholder="New Category" onChange={handleChange} required/>
        </FormGroup>
        <FormGroup controlId="CategoryDescField">
            <FormLabel>Description</FormLabel>
            <FormControl as="textarea" value={input_data.description} name="description" rows={5} placeholder="Description" onChange={handleChange} required/>
        </FormGroup>
        <Button variant="secondary" type="submit" size="sm">Submit</Button>
        </Form>
    </Col>
    }
</Container>
);
}