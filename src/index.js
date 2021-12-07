import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Logging from './Loging';
import { Siging } from './Loging';
import App from './App';
import ProfAndTop from "./ProfesorsAndTopics";

import { BrowserRouter, Route, Routes } from 'react-router-dom';

const WrapApp = () => {
  const [tokenc, setTokenc] = useState(false);
  const [myerror, setMyerror] = useState('');

  const handleLogging = (v) => {
    v.preventDefault();
    const user = v.target.username.value;
    const pasw = v.target.password.value;
    
    fetch(process.env.REACT_APP_API+'Auth/Login', {
          method:'POST',
          headers:{
              "Accept":"application/json",
              "Content-Type":"application/json",
          },
          body:JSON.stringify({
              username: user,
              password: pasw
          })
      }).then(response => response.json())
      .then(data => {
          if (data[""]){
            // error de logging
            console.log("error");
            window.sessionStorage.setItem("agenda_token", '');
            setTokenc(!tokenc);

            setMyerror(data[""]);
          } else {
            console.log("succes");
            window.sessionStorage.setItem("agenda_token", data.token);
            setTokenc(!tokenc);

            setMyerror(' ');
          }
      }, (error) => {
          console.log("Error!!")
          console.log(error);
      });
  }

  return(
    <BrowserRouter >
      <Routes>
        <Route exact path="/"            element={<App token={tokenc}/>}/>
        <Route exact path="/logging"     element={<Logging token={tokenc} handleLogging={(v) => handleLogging(v)} error={myerror} />}/>
        <Route exact path="/sigin"       element={<Siging token={tokenc} error={myerror} />}/>
        <Route exact path="/man-content" element={<ProfAndTop token={tokenc} />} /> 
      </Routes>
    </BrowserRouter>
  );
}


ReactDOM.render(
  <WrapApp />
  ,document.getElementById('root')
);