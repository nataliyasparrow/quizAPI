import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';

export default function NextButton(){
    const text = "Something here";
    const [lines, setLines] = useState([]);
    const [status, setStatus] = useState(true);

    const handleMore = e =>{
        setLines([...lines, text]);
    }

    const handleEnough = e =>{
        setStatus(false);
    }

    function Inner({text}){
        return(
            <h3>{text}</h3>
        );
    }
    return(
        <Container>
            <Row>
            <Col>
                {lines.map((el, i) =>  
                <Inner key={i} text={text}></Inner>
                )}
            </Col>
            {status ?
            (<Col>
                <Button className="App-button" variant="outline-secondary" size="sm" onClick={handleMore}>More</Button>
                <Button className="App-button" variant="outline-secondary" size="sm" onClick={handleEnough}>Enough!</Button>
            </Col>)
             : (<Col><h3>Enough</h3></Col>)}
            </Row>
        </Container>
    );

}