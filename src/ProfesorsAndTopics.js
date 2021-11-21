import React from "react";
import Navigation from "./Navigation";

class ProfesorsList extends React.Component {
    render (){
        return (
            <div className="col-md-6">
                profesors
            </div>
        );
    }
} 

class TopicsList extends React.Component {
    render (){
        return (
            <div className="col-md-5">
                topics
            </div>
        );
    }
} 

class ProfAndTop extends React.Component {
    render(){
        return(
            <div className="row">
                <Navigation />
                <ProfesorsList />
                <TopicsList />
            </div>
        );
    }
}

export default ProfAndTop;