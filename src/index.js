import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import ReactDOM from "react-dom/client";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>);

// import ReactDOM from "react-dom";
// ReactDOM.render(
//   <React.StrictMode>
//       <div className="head">
//           <meta charSet="utf-8" />
//           <meta name="viewport" content="width=device-width, initial-scale=1" />
//           <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
//       </div>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

