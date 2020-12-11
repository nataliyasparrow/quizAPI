import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import Col from "react-bootstrap/Col";

function QuizItem({title, route}) {
  
  return(
  <section>
      <Link className="App-link" to={route}>
        <h5>{title}</h5>
      </Link>
  </section>
  );
}

export default function QuizesListByCategory(props){
  const [data, setData] = useState(null);
  const { category_id } = props.match.params;
  useEffect(() => {
    fetch(`/api/v1/quizes?category=${category_id}`)
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (data) {
    return (
      <Container>
        { (data.count > 0) ? (
        <Col>
        <h4>Quizes available: {data.count}</h4>
          {data.results.map(item => (
            <QuizItem key = {item.id}
                  route = {`/quizes/${item.id}`}
                  title = {item.title}
                  // description = {item.description}
            />
            ))}
          </Col>) : 
          (<Col>
            <h5>Sorry, no quizes found</h5>
            <Link className="App-link" to='/'>Back</Link>
          </Col>)}
      </Container>
    );
    // return <div>{JSON.stringify(data)}</div>;
  }
  return null;
}