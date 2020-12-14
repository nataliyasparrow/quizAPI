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


function QuestionsOneByOne({questions}){
    const [value, setValue] = useState(0);
    const [score, setScore] = useState(0);
    const [correct, setCorrect] = useState(-100);
    const data = questions;
    const count = data.length;
  
    const [idx, setIdx] = useState(0);
    const currentQuestion = data[idx];
    // const correct = currentQuestion.content.correct_answer;
  
  
    const handleChange = e => {
      setValue(e.target.value);
      setCorrect(currentQuestion.content.correct_answer);
      // console.log("Correct ans: ", data[idx].correct_answer);
      // setCorrect(data[idx].correct_answer);
      // if (value == 2) setScore(score + 1); 
      // console.log("Value changed: ", value);
    }
    
    const handleSubmit = e => {
      e.preventDefault();
      // setCorrect(currentQuestion.content.correct_answer);
      // console.log("Correct: ", correct);
      if (idx === +correct) setScore(score+1);
      setIdx(idx + 1);
    };
  
    return (
      <Row>
        {idx < count ? (
        <Col>
          <h5>{idx + 1}. {currentQuestion.content.question}</h5>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              {currentQuestion.content.answers.map((ans, idx) => (
                <Form.Check 
                  type="radio"
                  name="answers_radio"
                  key = {idx}
                  label = {ans}
                  value = {idx}
                  onChange = {handleChange}
                />
              ))}
            </FormGroup>
            <Button type="submit" variant="secondary" size="sm" >Next</Button>
          </Form>
        </Col> ) : 
        (<Col>
          <h5>Your score: {score} / {count} </h5>
          <Link className="App-link" to='/'>Go Home</Link>
        </Col>)}
        {/* <Col>
        <h5>Current score: {score}</h5>
        <p>Current index: {idx}</p>
        <p>Current correct: {correct}</p>
  
      </Col> */}
    </Row>
    );
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
  
    if (data) {
      return(
        <Container>
          <h4>{data.title}</h4>
          <p>Category: {data.category}</p>
          <QuestionsOneByOne questions={data.questions}/>
        </Container>
      );
    }
    return null;
  }