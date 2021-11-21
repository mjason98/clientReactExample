import React from "react";
import Navigation from "./Navigation";

class ProfesorsList extends React.Component {
    return (){
        return (
            <div className="col-md-6">
                profesors
            </div>
        );
    }
} 

class TopicsList extends React.Component {
    return (){
        return (
            <div className="col-md-6">
                profesors
            </div>
        );
    }
} 

class ProfAndTop extends React.Component {
    return(){
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