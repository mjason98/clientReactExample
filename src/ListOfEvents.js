import React  from "react";


function Event (props){
    const tipo = ' gray';

    return (
        <div className={"eventt"+tipo}> {props.value} </div>
    );
}

class ListOfEvents extends React.Component {
    render (){
        return (<div className="col-md-5" >
                    <div className="eventt-container">
                    <Event value="hola" />
                    <Event value="hola2" />
                    </div>
                </div>);
    }
}

export default ListOfEvents;