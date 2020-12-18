import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import axios from 'axios';

// function QuestionItem({question}){
//     return (
//         <div>
//         <h3>Show Question Item, id:{question.id}</h3>
//         <p>Data: {JSON.stringify(question)}</p>
//         </div>
//     );
// }


function QuestionsOneByOne({q_ids}){
    const count = q_ids.length;
    const [idx, setIdx] = useState(0);
    const [data, setData] = useState(null);

    const [value, setValue] = useState(0);
    const [score, setScore] = useState(0);
    const [correct, setCorrect] = useState(-100);

    //Axios version og data retrieve
    // const getData = async (id) => {
    //     try {
    //     const question = await axios.get(`/api/v2/questions/${id}`)
    //     setData(question.data);
    //     console.log("getData, new data: ", data);
    //     } catch (err) {
    //     console.error(err.message);
    //     }
    // };

    // useEffect(() => {
    //     console.log("useEffect, before getData, data: ", data);
    //    getData(id);
    // }, [])

    const getData = async (id) => {
        console.log("Get data, id: ", id);
        fetch(`/api/v2/questions/${id}`)
            .then(res => res.json())
            .then(setData)
            .catch(console.error);
    }

    useEffect(() => {
        if (idx < count) {
            getData(q_ids[idx]);
        }
    }, [idx]);

    const handleChange = e => {
        setValue(e.target.value);
        setCorrect(data.content.correct_answer[0]);
      }
      
      const handleSubmit = e => {
        e.preventDefault();
        if (value == correct) setScore(score + 1);
        setIdx(idx + 1);
      };

    if (data) {
    return (
        <Row>
        {idx < count ? (        
            <Col>
                <Row className="justify-content-between">
                    <h5>{data.content.question}</h5>
                    <h5>{idx + 1} / {count}</h5>
                </Row>
                {/* <p>Current score: {score}</p> */}
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        {data.content.answers.map((ans, i) => (
                            <Form.Check 
                            type="radio"
                            name="answers_radio"
                            key = {i}
                            label = {ans}
                            value = {i}
                            onChange = {handleChange}
                            />
                        ))}
                    </FormGroup>
                    <Button type="submit" variant="secondary" size="sm" >Next</Button>
                </Form>
            </Col>) :
        (<Col>
            <h5>Your score: {score} / {count} </h5>
            <Link className="App-link" to='/'>Go Home</Link>
        </Col>)}
        </Row>
    );
  }
  return (
    <Container>
      <Col>
        <p>Loading...</p>
      </Col>
    </Container>);
}
  
  export default  function ShowQuizById(props){
    const { quiz_id } = props.match.params;
    const [data, setData] = useState(null);
    // const quiz_id = {quiz_id}
  
    useEffect(() => {
      fetch(`/api/v2/quizes/${quiz_id}`)
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
    }, []);

    // useEffect(() => {
    //     fetch(`/api/v2/questions/${id}`)
    //         .then(res => res.json())
    //         .then(setData)
    //         .catch(console.error);
    // }, [idx]);
  
    if (data) {
      return(
        <Container>
            <Col xs={6}>
                <h5>{data.title}</h5>
                <QuestionsOneByOne q_ids={data.questions}/>
            </Col>
        </Container>
      );
    }  
    return (
        <Container>
          <Col>
            <p>Loading...</p>
          </Col>
        </Container>);
  }