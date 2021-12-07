import React  from "react";
import agenda from "./agenda.svg"
import person from "./person.svg"

import { useNavigate } from 'react-router-dom' 

function Navigation (props) {
    const navigate = useNavigate();
    const token = window.sessionStorage.getItem("agenda_token");

    if (token && token === '')
        navigate('/logging');

    return (<div className="col-md-1" >
                <div className="logo-img" >
                <button onClick={() => navigate("/")} > <img src={agenda} alt="prev" /> </button>
                </div>
                <div className="logo-img sett-img" >
                <button onClick={() => navigate("/man-content")}> <img src={person} alt="prev" /> </button>
                </div>
            </div>);

}

export default Navigation;