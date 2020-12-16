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

export default function CreateNewQuestion(props) {
const quiz_id = 3;
const category_id = 3;
// const { quiz_id } = props.match.params;

// useEffect(() => {
//     fetch(`api/v2/categories`)
//     .then(res => res.json())
//     .then(setCategories)
//     .catch(console.error);
//   }, []);

const [input_data, setInputData] = useState({"quiz": quiz_id, "category": category_id, "content": {"question": "", "answers": ["ans1", "ans2"], "correct_answer": [1]}});
const [status, setStatus] = useState(false);

async function postQuestion(input_data) {
    console.log("Post input data", input_data);
    return new Promise((resolve, reject) => {
        axios.post('/api/v1/questions/new', input_data).then((response) => {
          resolve(response.data);
        }).catch((error) => {
          reject(error.response.data);
        });
      });
};


const handleChangeAnswer = (index) => (e) => {
    let c = input_data.content;
    c.answers[index] = e.target.value;
    setInputData((input_data) => ({...input_data, ["content"]: c}))
}

const handleChange = e => {
    let c = input_data.content;
    c.question = e.target.value;
    setInputData((input_data) => ({...input_data, ["content"]: c}))

}

const handleSubmit = e => {
    e.preventDefault();
    postQuestion(input_data).
    then(setStatus(true)).
    catch(console.error); 
    console.log("Submitting data: ", input_data);
}
return (
    <Container>
        { status ?
        <Col>
            <h3>Success!</h3>
            {/* <Redirect to='/'/> */}
        </Col> :
        <Col>
            <h4>Add question</h4>
            <Form onSubmit={handleSubmit}>
            <FormGroup controlId="QuestionTextField">
                <FormLabel>Question text</FormLabel>
                <FormControl as="textarea" value={input_data.content.question} name="question" rows={5} placeholder="Type question here" onChange={handleChange} required/>
            </FormGroup>
            <>
                {input_data.content.answers.map((item, index) =>
                    <Col key={index}>
                        <FormLabel>Answer {index + 1}</FormLabel>
                        <FormControl as="textarea" value={item} onChange={handleChangeAnswer(index)} rows={3} placeholder="Type answer here"/>
                    </Col>
                )}
            </>
            <Button className="App-button" variant="secondary" type="submit" size="sm">Submit</Button>
            </Form>
        </Col>
        }
    </Container>
);
}