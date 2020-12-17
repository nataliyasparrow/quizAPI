import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import FormControl from "react-bootstrap/FormControl";
import FormLabel from "react-bootstrap/FormLabel";
import Table from 'react-bootstrap/Table';


function TableFormRow(){
// const initial = ["aaa", "bbb", "ccc"];
const [data, setData] = useState( ["aaa", "bbb", "ccc"]);

const handleChangeAnswer  = (index) => (e) => {
    // setData((data) => data[index] = e.target.value);
}

const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit");
}

const handleChangeRadio = (e) => {
    console.log("Radio value", e.target.value);
}
return (
    <Container>
        <Form onSubmit={handleSubmit}>
        {data.map((item, index) =>
            <Row key={index}>
                <Col>
                <Form.Check 
                    type="radio"
                    name="answers_radio"
                    key = {index}
                    label = {index + 1}
                    value = {index}
                    onChange = {handleChangeRadio}
                    />
                </Col>
                <Col>
                    <FormLabel>Answer {index + 1}</FormLabel>
                    <FormControl as="textarea" value={item} onChange={handleChangeAnswer(index)} rows={1} placeholder="Type answer here" required/>
                </Col>
            </Row>
        )}
        <Button className="App-button" variant="secondary" type="submit" size="md">Submit</Button>
    </Form>
    </Container>
);
}

export default function TableForm(){
    // const initial = ["aaa", "bbb", "ccc"];
    const [data, setData] = useState( ["aaa", "bbb", "ccc"]);
    
    const handleChangeAnswer  = (index) => (e) => {
        // setData((data) => data[index] = e.target.value);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submit");
    }
    
    const handleChangeRadio = (e) => {
        console.log("Radio value", e.target.value);
    }
    return (
        <Container>
            <Form onSubmit={handleSubmit}>
            <Table borderless variant="light">
                <thead>
                    <tr>
                        <th>Correct</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {data.map((item, index) =>
                    <tr key={index}>
                        <td className="align-middle">
                        <Form.Check 
                            type="radio"
                            name="answers_radio"
                            key = {index}
                            label = {index + 1}
                            value = {index}
                            onChange = {handleChangeRadio}
                            />
                        </td>
                        <td>
                            <FormLabel>Answer {index + 1}</FormLabel>
                            <FormControl as="textarea" value={item} onChange={handleChangeAnswer(index)} rows={1} placeholder="Type answer here" required/>
                        </td>
                    </tr>       
                )}
                </tbody>
            </Table>
            <Button className="App-button" variant="secondary" type="submit" size="md">Submit</Button>
            </Form>
        </Container>
    );
}