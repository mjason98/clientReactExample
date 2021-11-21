import React  from "react";
import agenda from "./agenda.svg"
import person from "./person.svg"

class Navigation extends React.Component {
    render (){
        return (<div className="col-md-1" >
                <div className="logo-img" >
                <button > <img src={agenda} alt="prev" /> </button>
                </div>
                <div className="logo-img sett-img" >
                <button > <img src={person} alt="prev" /> </button>
                </div>
                </div>);
    }
}

export default Navigation;