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
import CreateNewQuestion from './CreateQuestionForm';

// function SelectCategory(props) {
//     const [categories, setCategoriesList] = useState(null)

//     const getCategories = async () => {
//         try {
//         const categoriesList = await axios.get(`api/v2/categories`)
//         setCategoriesList(categoriesList.data);

//         } catch (err) {
//         console.error(err.message);
//         }
//     };

//     useEffect(() => {
//         getCategories();
//         console.log(categories);
//     }, [])


//     const handleChange = () => (e, value) => {
//         let data = { ...props.value };
//         data["categories"] = value;
//         props.onChange(null, data);
//       }
//     if(categories && categories.count > 0) {
//     <Form.Group controlId="QuizCategorySelect">
//         <Form.Label>Select category</Form.Label>
//         <Form.Control as="select" name="category" value={props.value} onChange={handleChange}>
//             {categories.results.map(item => (
//                 <option key={item.id} value={item.id}>
//                     {item.title}
//                 </option>
//             ))}
//             </Form.Control>
//     </Form.Group>
//     }
//     return (
//         <Container>
//         <Col>
//             <h3>Loading...</h3>
//         </Col>
//     </Container>
//     );
// }

export default function CreateNewQuiz() {
const [categories, setCategories] = useState(null)
const [quiz, setQuiz] = useState(null)

useEffect(() => {
    fetch(`api/v2/categories`)
    .then(res => res.json())
    .then(setCategories)
    .catch(console.error);
  }, []);

const [input_data, setInputData] = useState({"title":"", "description":"", "category": 0, "questions": []});
const [status, setStatus] = useState(false);
// const [quiz, setQuiz] = useState(null);

//   const getCategories = async () => {
//     try {
//       const categoriesList = await axios.get(`api/v2/categories`)
//       setCategoriesList(categoriesList.data);

//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   useEffect(() => {
//     getCategories();

//   }, [])

async function postQuiz(input_data) {
    // console.log("Post input data", input_data);
    return new Promise((resolve, reject) => {
        axios.post('/api/v1/quizes/new', input_data).then((response) => {
          resolve(response.data);
        }).catch((error) => {
          reject(error.response.data);
        });
      });
};

// async function postQuiz(input_data){
//     const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(input_data)
//     };
//     fetch('/api/v1/quizes/new', requestOptions)
//         .then(response => response.json())
//         .then(data => setQuiz(data.id));
// }


const handleChange = e => {
    // e.persist();
    setInputData(input_data => ({...input_data, [e.target.name]: e.target.value}));
    console.log("Handle change Input data: ", input_data);

}

    const handleChangeSelect = () => (e, value) => {
        let data = { ...input_data }; 
        data["category"] = value;  
        setInputData(data);
    }



const handleSubmit = e => {
    e.preventDefault();
    postQuiz(input_data).
    then(setQuiz).
    then(setStatus(true)).
    catch(console.error); 
}



// useEffect(() => {
//     setQuiz()
//   }, [])

if(categories){
return (
    <Container>
        { status ?
        <Col>
            <h3>Success!</h3>
            {quiz ? 
            <>
                <p>New quiz has been created. Quiz id: {quiz.id} Category id:{quiz.category.id}</p>
                <CreateNewQuestion quiz_id={quiz.id} category_id={quiz.category.id}/>
            </>
             : <p>Can't show new quiz</p>}
            {/* <Redirect to='/new_question'/> */}
            {/* <h4>Add questions to the quiz</h4> */}
            {/* <h4>New quiz has been created</h4>
            
                Quiz id: {quiz} */}
            
            {/* <CreateNewQuestion /> */}
        </Col> :
        <Col>
            <h4>Create new quiz</h4>
            <Form onSubmit={handleSubmit}>
            {/* <SelectCategory name="category" value={input_data.category} onChange={handleChangeSelect}/> */}
            <Form.Group controlId="QuizCategorySelect">
                <Form.Label>Select category</Form.Label>
                <Form.Control as="select" name="category" value={input_data.category} onChange={handleChange}>
                    <option placeholder="Select category" value="">Select category</option>
                    {categories.results.map(item => (
                        <option key={item.id} value={item.id}>
                            {item.title}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>
            <FormGroup controlId="QuizTitleField">
                <FormLabel>Title</FormLabel>
                <FormControl type="input" value={input_data.title} name="title" placeholder="Title" onChange={handleChange} required/>
            </FormGroup>
            <FormGroup controlId="QuizDescField">
                <FormLabel>Description</FormLabel>
                <FormControl as="textarea" value={input_data.description} name="description" rows={5} placeholder="Description" onChange={handleChange} required/>
            </FormGroup>
            {/* <Form.Group controlId="QuizCategorySelect">
            <Form.Label>Select category</Form.Label>
            <Form.Control as="select" name="category" value={input_data.category} onChange={handleChange}>
                {categories.results.map(item => (
                    <option key={item.id} value={item.id}>
                        {item.title}
                    </option>
                ))}
                </Form.Control>
            </Form.Group> */}
            <Button variant="secondary" type="submit" size="sm">Submit</Button>
            </Form>
        </Col>
        }
    </Container>
    );
}
    
return (
    <Container>
        <Col>
            <h3>Loading...</h3>
        </Col>
    </Container>
);
}