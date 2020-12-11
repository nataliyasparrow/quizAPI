import App from "./components/App";
import 'bootstrap/dist/css/bootstrap.min.css';

// import React, { useEffect, useState } from 'react';
// import ReactDOM from 'react-dom';
// // import './index.css';

// function GetDataFromAPI(){
//     const [data, setData] = useState(null);
//     useEffect(() => {
//       fetch(`http://localhost:8000/api/v1/categories`)
//         .then(res => res.json())
//         .then(setData)
//         .catch(console.error);
//     }, []);
  
//     if (data) {
//       return <div>{JSON.stringify(data)}</div>;
//     }
//     return null;
//   }
  
//   function App(){
//       return <h1>Django React App!</h1>;
//     // return <GetDataFromAPI/>;
//   }
  
//   ReactDOM.render(
//     <App />,
//     document.getElementById("root")
//     );