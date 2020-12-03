import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
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
]

function ShowItem({id}){
const [data, setData] = useState(null);
useEffect(() => {
    fetch(`api/v1/categories/${id}`)
    .then(res => res.json())
    .then(setData)
    .catch(console.error);
}, []);

if (data) {
    return ( 
    <div>
        <h3>Category title: {data.title}</h3>
        <p>Category description: {data.description}</p>
    </div>
    );
}
return null;
}

function Item({title, description}) {
    return(
    <div>
        <h2>{title}</h2>
        <p>Description: {description}</p>
    </div>
    );
}

function ShowListAPI(){
    const [data, setData] = useState(null);
    useEffect(() => {
    fetch(`api/v1/categories`)
    .then(res => res.json())
    .then(setData)
    .catch(console.error);
    }, []);

    if (data) {
        return(
            <div>
              {data.results.map(item => (
                <Item key = {item.id} 
                            title = {item.title} 
                            description = {item.description}/>
              ))}
            </div>
        );
    }
    return null;
}
  
function ShowList({items}){
  return(
    <div>
      {items.map(item => (
        <Item key = {item.id} 
                    title = {item.title} 
                    description = {item.description}/>
      ))}
    </div>
  );
}

function App(){
    return (
      <>
      <h1>List of items</h1>
      <ShowListAPI />
      </>
    );
}

//   function App(){
//       return (
//         <>
//         <h1>Item details</h1>
//         <ShowItem id = "2"/>
//         </>
//       );
//   }
  
  ReactDOM.render(
    <App />,
    document.getElementById("root")
    );