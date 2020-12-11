import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, NavLink, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
// import ToggleButton from "react-bootstrap/ToggleButton";
// import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";

import QuizesListByCategory from './QuizesListByCategory';
import ShowQuizById from './ShowQuizById';

// import './index.css';

// function ShowDataFromAPIToJson(){
//     const [data, setData] = useState(null);
//     useEffect(() => {
//       fetch(`api/v1/categories`)
//         .then(res => res.json())
//         .then(setData)
//         .catch(console.error);
//     }, []);
  
//     if (data) {
//       return <div>{JSON.stringify(data)}</div>;
//     }
//     return null;
//   }

const dummy_list = [
    {id: "1", title: "Math", description: "Math category"},
    {id: "2", title: "CS", description: "CS category"},
    {id: "3", title: "Art", description: "Art category"},
    {id: "4", title: "Music", description: "Music category"},
    {id: "5", title: "Chemistry", description: "Chemistry category"}
];

const len = 5;

// function ShowItem({id}){
// const [data, setData] = useState(null);
// useEffect(() => {
//     fetch(`api/v1/categories/${id}`)
//     .then(res => res.json())
//     .then(setData)
//     .catch(console.error);
// }, []);

// if (data) {
//     return ( 
//     <div>
//         <h3>Category title: {data.title}</h3>
//         <p>Category description: {data.description}</p>
//     </div>
//     );
// }
// return null;
// }

function CategoryItem({title, description, route}) {
    return(
    <section>
        <Link className="App-link" to={route}>
          <h4>{title}</h4>
        </Link>
        <p>Description: {description}</p>
    </section>
    );
}

function ShowCategoriesList(){
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`api/v1/categories`)
    .then(res => res.json())
    .then(setData)
    .catch(console.error);
  }, []);


  if (data) {
      return(
          <Container>
            <Col>
              {data.results.map(item => (
                <CategoryItem key = {item.id}
                      route = {`/quizes_by_cat/${item.id}`}
                      title = {item.title} 
                      description = {item.description}/>
              ))}
            </Col>
          </Container>
      );
  }
  return null;
}

// function ShowListAPIWithPagination(){
//   const [data, setData] = useState([]);

//   const [pageNum, setPageNum]= useState(1)
//   const [itemNum]= useState(2)

//   const currentPageNum = (pageNum * itemNum) - itemNum  
//   const paginatedItems = data.splice(currentPageNum, itemNum)

//   const handlePrev =()=>{
//     if(pageNum === 1) return
//     setPageNum(pageNum - 1)
//   }
//   const handleNext =()=>{
//       setPageNum(pageNum + 1)
//   }

//   useEffect(() => {
//     fetch(`api/v1/categories`)
//     .then(res => res.json())
//     .then(setData)
//     .catch(console.error);
//   }, []);

//   if (data) {
//       return(
//         <>
//           <div>
//             {paginatedItems.map(item => (
//               <Item key = {item.id} 
//                     title = {item.title} 
//                     description = {item.description}/>
//             ))}
//           </div>
//           <div>Page {pageNum} </div>
//           <div>
//               <button onClick={handlePrev} >prev</button>
//               <button onClick={handleNext}>next</button>
//           </div>
//         </>
//       );
//   }
//   return null;
// }

function PrevNextBlock({list, c}){
  const items = list;
  const count = c - 1;

  const [idx, setIdx] = useState(0);
  const currentItem = items[idx];
  return (
      <div>
        <h4>Current item: {currentItem.title}</h4>
        <h5>Item {idx + 1} from {count}</h5>
        <Row>
          {idx > 0 ? (<Button className="App-button" variant="outline-secondary" size="sm" onClick={() => setIdx(idx - 1)}>Previous</Button>) :   
            (<Button className="App-button" variant="outline-secondary" size="sm" disabled>Previous</Button>)}

          {idx < count ? (<Button className="App-button" variant="outline-secondary" size="sm" onClick={() => setIdx(idx + 1)}>Next</Button>) : 
            (<Button className="App-button" variant="outline-secondary" size="sm" disabled>Next</Button>)}
        </Row>
      </div>
  );
}

function ShowCategoriesListOneByOne(){
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`api/v1/categories`)
    .then(res => res.json())
    .then(setData)
    .catch(console.error);
  }, []);

  if (data) {
    return(
        <PrevNextBlock list={data.results} c = {data.count}/>
    );
  }
  return(
    <h3>No data available</h3>
  );
}

function TestRadioForm({content}){
  // const [count, setData] = useState(0);
  const [value, setValue] = useState(0);
  const [score, setScore] = useState(0);

  const handleChange = e => {
    setValue(e.target.value);
    console.log("Value changed: ", value);
  }


  const handleSubmit = e => {
    e.preventDefault();
    // alert(`${kindOfStand}`);
    console.log("Value: ", value);
    if (value == 2) {
      setScore(score + 1); 
      // console.log("score changed: ", score);
    } 
    // else 
    //   console.log("score: ", score);
  };
  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              {content.map(ans => (
                <Form.Check 
                  type="radio"
                  name="answers_radio"
                  key = {ans.id}
                  id = {ans.id}
                  label = {ans.id}
                  value = {ans.id}
                  onChange = {handleChange}
                />
              ))}
            </FormGroup>
            <Button type="submit" variant="outline-secondary">Submit</Button>
          </Form>
        </Col>
        <Col>
          <h5>Current value: {value}</h5>
          <h5>Current score: {score}</h5>
        </Col>
      </Row>
    </Container>
  );
}

function QuestionToggleButtonForm({content}){
  // const [count, setData] = useState(0);
  const [value, setValue] = useState(0);
  const handleChange = val => {
                        setValue(val);
                        console.log(val);
                      }
  return (
    <ToggleButtonGroup
      name="value"
      type="radio"
      value={value}
      onChange={handleChange}
    >
      {content.map(ans => (
        <ToggleButton
          key = {ans.id}
          value = {ans.id}
          label = {ans.title}
        >{ans.title}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

function OneQuestionRadioFormById({question_id}){
  const [data, setData] = useState(null);
  const [correct, setCorrect] = useState(-1);

  const [value, setValue] = useState(0);
  const [score, setScore] = useState(0);
  // correct = data.content.correct_answer;

  

  useEffect(() => {
    fetch(`api/v1/questions/${question_id}`)
    .then(res => res.json())
    .then(setData)
    .catch(console.error);
}, []);

  const handleChange = e => {
    setValue(e.target.value);
    console.log("Value changed: ", value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    setScore(score + 1);
  };
  if (data) {
    return (
      <Container>
        <Row>
          <Col>
            <p>Question category: {data.category}</p>
            <h5>{question_id}. {data.content.question}</h5>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                {data.content.answers.map((ans, idx) => (
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
              <Button type="submit" variant="outline-secondary">Submit</Button>
            </Form>
          </Col>
          <Col>
            <h5>Current value: {value}</h5>
            <h5>Current score: {score}</h5>
            <p>Correct answer# : {data.content.correct_answer}</p>
          </Col>
        </Row>
      </Container>
    );
  }
  console.log("No data!")
  return null;
}


// function QuestionsOneByOne({questions}){
//   const [value, setValue] = useState(0);
//   const [score, setScore] = useState(0);
//   const [correct, setCorrect] = useState(-100);
//   const data = questions;
//   const count = data.length;

//   const [idx, setIdx] = useState(0);
//   const currentQuestion = data[idx];
//   // const correct = currentQuestion.content.correct_answer;


//   const handleChange = e => {
//     setValue(e.target.value);
//     setCorrect(currentQuestion.content.correct_answer);
//     // console.log("Correct ans: ", data[idx].correct_answer);
//     // setCorrect(data[idx].correct_answer);
//     // if (value == 2) setScore(score + 1); 
//     // console.log("Value changed: ", value);
//   }
  
//   const handleSubmit = e => {
//     e.preventDefault();
//     // setCorrect(currentQuestion.content.correct_answer);
//     // console.log("Correct: ", correct);
//     if (idx === +correct) setScore(score+1);
//     setIdx(idx + 1);
//   };

//   return (
//     <Row>
//       {idx < count ? (
//       <Col>
//         <h5>{idx + 1}. {currentQuestion.content.question}</h5>
//         <Form onSubmit={handleSubmit}>
//           <FormGroup>
//             {currentQuestion.content.answers.map((ans, idx) => (
//               <Form.Check 
//                 type="radio"
//                 name="answers_radio"
//                 key = {idx}
//                 label = {ans}
//                 value = {idx}
//                 onChange = {handleChange}
//               />
//             ))}
//           </FormGroup>
//           <Button type="submit" variant="secondary" size="sm" >Next</Button>
//         </Form>
//       </Col> ) : 
//       (<Col>
//         <h5>Your score: {score} / {count} </h5>
//         <Link className="App-link" to='/'>Go Home</Link>
//       </Col>)}
//       {/* <Col>
//       <h5>Current score: {score}</h5>
//       <p>Current index: {idx}</p>
//       <p>Current correct: {correct}</p>

//     </Col> */}
//   </Row>
//   );
// }

// function ShowQuizById(props){
//   const { quiz_id } = props.match.params;
//   const [data, setData] = useState(null);
//   // const quiz_id = {quiz_id}

//   useEffect(() => {
//     fetch(`/api/v1/quizes/${quiz_id}`)
//     .then(res => res.json())
//     .then(setData)
//     .catch(console.error);
//   }, []);

//   if (data) {
//     return(
//       <Container>
//         <h4>{data.title}</h4>
//         <p>Category: {data.category}</p>
//         <QuestionsOneByOne questions={data.questions}/>
//       </Container>
//     );
//   }
//   return null;
// }

function ListQuestionById({question_id}){
const [data, setData] = useState(null);
// const { question_id } = props.match.params;

useEffect(() => {
    fetch(`api/v1/questions/${question_id}`)
    .then(res => res.json())
    .then(setData)
    .catch(console.error);
}, []);

if (data) {
    return ( 
    <Container>
      <p>Question category: {data.category}</p>
      <h4>Question : {data.content.question}</h4>
      <ListGroup>
        {data.content.answers.map((ans, index) => (
          <ListGroup.Item key={index}>{ans}</ListGroup.Item>
        ))}
      </ListGroup>    
    </Container>
    );
}
return null;
}

function ShowQuizOneByOne({id}){
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`api/v1/quizes/${id}`)
    .then(res => res.json())
    .then(setData)
    .catch(console.error);
  }, []);

  if (data) {
    return(
        <PrevNextBlock list={data.results} c = {data.count}/>
    );
  }
  return(
    <h3>No data available</h3>
  );
}

// function ShowQuizByIdJSON(props){
//   const [data, setData] = useState(null);
//   const { quiz_id } = props.match.params;
//   useEffect(() => {
//     fetch(`/api/v1/quizes/${quiz_id}`)
//       .then(res => res.json())
//       .then(setData)
//       .catch(console.error);
//   }, []);

//   if (data) {
//     return (
//       <div>
//       <h3>Show Quiz component, quiz id:{quiz_id}</h3>
//       <p>Data: {JSON.stringify(data)}</p>
//       </div>
//     );
//   }
//   return (
//     <h3>No data available</h3>
//   );
// }

// function QuizItem({title, route}) {
  
//     return(
//     <section>
//         <Link className="App-link" to={route}>
//           <h5>{title}</h5>
//         </Link>
//     </section>
//     );
// }

// function QuizesListByCategory(props){
//   const [data, setData] = useState(null);
//   const { category_id } = props.match.params;
//   useEffect(() => {
//     fetch(`/api/v1/quizes?category=${category_id}`)
//       .then(res => res.json())
//       .then(setData)
//       .catch(console.error);
//   }, []);

//   if (data) {
//     return (
//       <Container>
//         { (data.count > 0) ? (
//         <Col>
//         <h4>Quizes available: {data.count}</h4>
//           {data.results.map(item => (
//             <QuizItem key = {item.id}
//                   route = {`/quizes/${item.id}`}
//                   title = {item.title}
//                   // description = {item.description}
//             />
//             ))}
//           </Col>) : 
//           (<Col>
//             <h5>Sorry, no quizes found</h5>
//             <Link className="App-link" to='/'>Back</Link>
//           </Col>)}
//       </Container>
//     );
//     // return <div>{JSON.stringify(data)}</div>;
//   }
//   return null;
// }

function AppNavigation(){
  return (
  <Navbar bg="light" variant="light" expand="md">
    <Navbar.Brand href="/">Quiz App</Navbar.Brand>
    <Nav className="justify-content-around">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/">Take Quiz</Nav.Link>
      <Nav.Link href="/">Create Quiz</Nav.Link>
    </Nav>
  </Navbar>
  );
}

function Home(){
  return(
  <Container>
    <h4>Welcome to Quiz App!</h4>
    <Row>
      <Col>
        <h5>Please select quiz category:</h5>
      </Col>
        <ShowCategoriesList />
      <Col>
      </Col>
    </Row>
  </Container>
  );
}

function App(){
  return(
    <BrowserRouter>
      <AppNavigation />
      <Route path="/" exact component={Home} />
      <Route path="/quizes_by_cat/:category_id" component={QuizesListByCategory} />
      <Route path="/quizes/:quiz_id" component={ShowQuizById} />
    </BrowserRouter>
  );
}
  
ReactDOM.render(
  <App />,
  document.getElementById("root")
  );