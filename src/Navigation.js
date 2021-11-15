import React  from "react";
import agenda from "./agenda.svg"

class Navigation extends React.Component {
    render (){
        return (<div className="col-md-1" >
                <img className="logo-img" src={agenda} alt="prev"></img> 
                </div>);
    }
}

export default Navigation;