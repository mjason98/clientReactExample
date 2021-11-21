import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import ProfAndTop from "./ProfesorsAndTopics";

import { BrowserRouter, Route, Routes } from 'react-router-dom';


function WrapApp(props){
  return(
    <BrowserRouter >
      <Routes>
        <Route exact path="/"            element={<App/>}/>
        <Route exact path="/man-content" element={<ProfAndTop />} /> 
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(
  <WrapApp />
  ,document.getElementById('root')
);