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



// function QuestionsOneByOne({questions}){
//     const [value, setValue] = useState(0);
//     const [score, setScore] = useState(0);
//     const [correct, setCorrect] = useState(-100);
//     const data = questions;
//     const count = data.length;
  
//     const [idx, setIdx] = useState(0);
//     const currentQuestion = data[idx];
  
  
//     const handleChange = e => {
//       setValue(e.target.value);
//       setCorrect(currentQuestion.content.correct_answer[0]);
//     }
    
//     const handleSubmit = e => {
//       e.preventDefault();
//       if (idx === +correct) setScore(score+1);
//       setIdx(idx + 1);
//     };
  
//     return (
//       <Row>
//         {idx < count ? (
//         <Col>
//           <h5>{idx + 1}. {currentQuestion.content.question}</h5>
//           <Form onSubmit={handleSubmit}>
//             <FormGroup>
//               {currentQuestion.content.answers.map((ans, idx) => (
//                 <Form.Check 
//                   type="radio"
//                   name="answers_radio"
//                   key = {idx}
//                   label = {ans}
//                   value = {idx}
//                   onChange = {handleChange}
//                 />
//               ))}
//             </FormGroup>
//             <Button type="submit" variant="secondary" size="sm" >Next</Button>
//           </Form>
//         </Col> ) : 
//         (<Col>
//           <h5>Your score: {score} / {count} </h5>
//           <Link className="App-link" to='/'>Go Home</Link>
//         </Col>)}
//         {/* <Col>
//         <h5>Current score: {score}</h5>
//         <p>Current index: {idx}</p>
//         <p>Current correct: {correct}</p>
  
//       </Col> */}
//     </Row>
//     );
//   }

// function QuestionById({question_id}){
//     const [data, setData] = useState(null);

    // useEffect(() => {
    // fetch(`/api/v2/questions/${question_id}`)
    //     .then(res => res.json())
    //     .then(setData)
    //     .catch(console.error);
    // }, []);
    
//     if (data) {
//     return (
//         <div>
//         <h3>Show Question component, question_id id:{question_id}</h3>
//         <p>Data: {JSON.stringify(data)}</p>
//         </div>
//     );
//     }
//     return (
//     <h3>No data available</h3>
//     );
// }

function QuestionItem({question}){
    return (
        <div>
        <h3>Show Question Item, id:{question.id}</h3>
        <p>Data: {JSON.stringify(question)}</p>
        </div>
    );
}

// function ShowQuestionsOneByOne({q_ids}){
//     const count = q_ids.length;
//     const [idx, setIdx] = useState(0);
//     const [data, setData] = useState(null);
//     const id = q_ids[0];
    
//     const getData = async (id) => {
//     try {
//       const question = await axios.get(`/api/v2/questions/${id}`)
//       setData(question.data);

//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//     useEffect(() => {
//        getData(id);
//     }, [])

//     if (data) {
//     return (
//         <Row>
//         {idx < count ? (        
//             <Col>
//                 <QuestionItem question={data}/>
//                 <Button variant="secondary" size="sm" onClick={() => {setIdx(idx + 1); getData(q_ids[idx])}} >Next</Button>
//             </Col>) :
//         (<Col>
//             <h3>End of game</h3>
//         </Col>)}
//         </Row>
//     );
//   }
//   return (
//     <Container>
//       <Col>
//         <p>Loading...</p>
//       </Col>
//     </Container>);
// }

function QuestionsOneByOne({q_ids}){
    const id = q_ids[0];
    const count = q_ids.length;
    const [idx, setIdx] = useState(0);
    const [data, setData] = useState(null);

    const [value, setValue] = useState(0);
    const [score, setScore] = useState(0);
    const [correct, setCorrect] = useState(-100);

    //Axios version og data retrive
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
        getData(id);
    }, [idx]);

    const handleChange = e => {
        setValue(e.target.value);
        setCorrect(data.content.correct_answer[0]);
      }
      
      const handleSubmit = e => {
        e.preventDefault();
        if (value == correct) setScore(score + 1);
        console.log("Score: ", score);
        setIdx(idx + 1);
        console.log("Submit, idx, id: ", idx, id);
        // getData(q_ids[idx]);
        console.log("Submit, new data: ", data);
      };

    if (data) {
    return (
        <Row>
        {idx < count ? (        
            <Col>
                <h5>{idx + 1} / {count}. {data.content.question}</h5>
                <p>Current score: {score}</p>
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
                {/* <QuestionItem question={data}/>
                <Button variant="secondary" size="sm" onClick={() => {setIdx(idx + 1); getData(q_ids[idx])}} >Next</Button> */}
            </Col>) :
        (<Col>
            <h3>End of game</h3>
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
  
    if (data) {
      return(
        <Container>
          <h4>{data.title}</h4>
          <p>Category: {data.category.title}</p>
          <QuestionsOneByOne q_ids={data.questions}/>
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