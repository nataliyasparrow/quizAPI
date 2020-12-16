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
import axios from 'axios';

import QuizesListByCategory from './QuizesListByCategory';
import ShowQuizById from './ShowQuizById';
import CreateCategoryForm from './CreateCategoryForm';
import CreateQuizForm from './CreateQuizForm';
import NextButton from './NextButton';
import CreateQuestionForm from './CreateQuestionForm';

// const dummy_list = [
//   { id: "1", title: "Math", description: "Math category" },
//   { id: "2", title: "CS", description: "CS category" },
//   { id: "3", title: "Art", description: "Art category" },
//   { id: "4", title: "Music", description: "Music category" },
//   { id: "5", title: "Chemistry", description: "Chemistry category" }
// ];

// const len = 5;



function CategoryItem({ title, description, route }) {
  return (
    <section>
      <Link className="App-link" to={route}>
        <h4>{title}</h4>
      </Link>
      <p>Description: {description}</p>
    </section>
  );
}

function ShowCategoriesList() {
  // useEffect(() => {
  //   fetch(`api/v2/categories`)
  //   .then(res => res.json())
  //   .then(setData)
  //   .catch(console.error);
  // }, []);

  const [categories, setCategoriesList] = useState([])
  const getCategories = async () => {
    try {
      const categoriesList = await axios.get(`api/v2/categories`)
      setCategoriesList(categoriesList.data);

    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getCategories();

  }, [])

  if (categories.count > 0) {
    return (
      <Container>
        <Col>
          {categories.results.map(item => (
            <CategoryItem key={item.id}
              route={`/quizes_by_cat/${item.id}`}
              title={item.title}
              description={item.description} />
          ))}
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

// function PrevNextBlock({ list, c }) {
//   const items = list;
//   const count = c - 1;

//   const [idx, setIdx] = useState(0);
//   const currentItem = items[idx];
//   return (
//     <div>
//       <h4>Current item: {currentItem.title}</h4>
//       <h5>Item {idx + 1} from {count}</h5>
//       <Row>
//         {idx > 0 ? (<Button className="App-button" variant="outline-secondary" size="sm" onClick={() => setIdx(idx - 1)}>Previous</Button>) :
//           (<Button className="App-button" variant="outline-secondary" size="sm" disabled>Previous</Button>)}

//         {idx < count ? (<Button className="App-button" variant="outline-secondary" size="sm" onClick={() => setIdx(idx + 1)}>Next</Button>) :
//           (<Button className="App-button" variant="outline-secondary" size="sm" disabled>Next</Button>)}
//       </Row>
//     </div>
//   );
// }

// function TestRadioForm({ content }) {
//   // const [count, setData] = useState(0);
//   const [value, setValue] = useState(0);
//   const [score, setScore] = useState(0);

//   const handleChange = e => {
//     setValue(e.target.value);
//     console.log("Value changed: ", value);
//   }


//   const handleSubmit = e => {
//     e.preventDefault();
//     // alert(`${kindOfStand}`);
//     console.log("Value: ", value);
//     if (value == 2) {
//       setScore(score + 1);
//       // console.log("score changed: ", score);
//     }
//     // else 
//     //   console.log("score: ", score);
//   };
//   return (
//     <Container>
//       <Row>
//         <Col>
//           <Form onSubmit={handleSubmit}>
//             <FormGroup>
//               {content.map(ans => (
//                 <Form.Check
//                   type="radio"
//                   name="answers_radio"
//                   key={ans.id}
//                   id={ans.id}
//                   label={ans.id}
//                   value={ans.id}
//                   onChange={handleChange}
//                 />
//               ))}
//             </FormGroup>
//             <Button type="submit" variant="outline-secondary">Submit</Button>
//           </Form>
//         </Col>
//         <Col>
//           <h5>Current value: {value}</h5>
//           <h5>Current score: {score}</h5>
//         </Col>
//       </Row>
//     </Container>
//   );
// }


// function OneQuestionRadioFormById({ question_id }) {
//   const [data, setData] = useState(null);
//   const [correct, setCorrect] = useState(-1);

//   const [value, setValue] = useState(0);
//   const [score, setScore] = useState(0);
//   // correct = data.content.correct_answer;



//   useEffect(() => {
//     fetch(`api/v1/questions/${question_id}`)
//       .then(res => res.json())
//       .then(setData)
//       .catch(console.error);
//   }, []);

//   const handleChange = e => {
//     setValue(e.target.value);
//     console.log("Value changed: ", value);
//   }

//   const handleSubmit = e => {
//     e.preventDefault();
//     setScore(score + 1);
//   };
//   if (data) {
//     return (
//       <Container>
//         <Row>
//           <Col>
//             <p>Question category: {data.category}</p>
//             <h5>{question_id}. {data.content.question}</h5>
//             <Form onSubmit={handleSubmit}>
//               <FormGroup>
//                 {data.content.answers.map((ans, idx) => (
//                   <Form.Check
//                     type="radio"
//                     name="answers_radio"
//                     key={idx}
//                     label={ans}
//                     value={idx}
//                     onChange={handleChange}
//                   />
//                 ))}
//               </FormGroup>
//               <Button type="submit" variant="outline-secondary">Submit</Button>
//             </Form>
//           </Col>
//           <Col>
//             <h5>Current value: {value}</h5>
//             <h5>Current score: {score}</h5>
//             <p>Correct answer# : {data.content.correct_answer}</p>
//           </Col>
//         </Row>
//       </Container>
//     );
//   }
//   console.log("No data!")
//   return null;
// }


// function ListQuestionById({ question_id }) {
//   const [data, setData] = useState(null);
//   // const { question_id } = props.match.params;

//   useEffect(() => {
//     fetch(`api/v1/questions/${question_id}`)
//       .then(res => res.json())
//       .then(setData)
//       .catch(console.error);
//   }, []);

//   if (data) {
//     return (
//       <Container>
//         <p>Question category: {data.category}</p>
//         <h4>Question : {data.content.question}</h4>
//         <ListGroup>
//           {data.content.answers.map((ans, index) => (
//             <ListGroup.Item key={index}>{ans}</ListGroup.Item>
//           ))}
//         </ListGroup>
//       </Container>
//     );
//   }
//   return null;
// }

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


function AppNavigation() {
  return (
    <Navbar bg="light" variant="light" expand="md">
      <Navbar.Brand href="/">Quiz App</Navbar.Brand>
      <Nav className="justify-content-around">
        <Link className="App-link" to="/">Home</Link>
        <Link className="App-link" to="/">Take Quiz</Link>
        <Link className="App-link" to="/new_category">Create Category</Link>
        <Link className="App-link" to="/new_question">Create Question</Link>
        <Link className="App-link" to="/new_quiz">Create Quiz</Link>
      </Nav>
    </Navbar>
  );
}

function Home() {
  return (
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

function App() {
  return (
    <BrowserRouter>
      <AppNavigation />
      <Route path="/" exact component={Home} />
      <Route path="/quizes_by_cat/:category_id" component={QuizesListByCategory} />
      <Route path="/quizes/:quiz_id" component={ShowQuizById} />
      <Route path="/new_category" component={CreateCategoryForm} />
      <Route path="/new_quiz" component={CreateQuizForm} />
      <Route path="/new_question" component={CreateQuestionForm} />
    </BrowserRouter>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);