import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, NavLink, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import axios from 'axios';

import QuizesListByCategory from './QuizesListByCategory';
import ShowQuizById from './ShowQuizById';
import CreateCategoryForm from './CreateCategoryForm';
import CreateQuizForm from './CreateQuizForm';
import TableForm from './TableForm';
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
        <h5>{title}</h5>
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

function AppNavigation() {
  return (
    <Navbar bg="light" variant="light" expand="md">
      <Navbar.Brand href="/">Quiz App</Navbar.Brand>
      <Nav className="justify-content-around">
        <Link className="App-link" to="/">Home</Link>
        <Link className="App-link" to="/">Take Quiz</Link>
        <Link className="App-link" to="/new_category">Create Category</Link>
        {/* <Link className="App-link" to="/new_question">Create Question</Link> */}
        <Link className="App-link" to="/new_quiz">Create Quiz</Link>
        {/* <Link className="App-link" to="/test">Test link</Link> */}
      </Nav>
    </Navbar>
  );
}

function Home() {
  return (
    <Container>
      {/* <h4>Welcome to Quiz App!</h4> */}
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
      {/* <Route path="/test" component={TableForm} /> */}
    </BrowserRouter>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);