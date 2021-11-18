import React  from "react";
import PLUS from "./PLUS.svg";

function Event (props){
    const tipo = ' gray';
    const iniDate = new Date(props.H1);
    const endDate = new Date(props.H2);

    return (
        <div className={"eventt"+tipo} > 
        <div className="eventt-header" > {props.name} </div>
        <div className="row"> 
            <div className="col-sm-8 eventt-author" > {props.P} </div>
            <div className="col-sm-4 eventt-time" > | {iniDate.getHours()}:{iniDate.getMinutes()} - {endDate.getHours()}:{endDate.getMinutes()} </div>
        </div>
        <hr className="eventt-line"/>
        <div className="eventt-text" > {props.value}  </div>
        </div>
    );
}



class ListOfEvents extends React.Component {
    render (){
        if (this.props.loading === true)
            return (<div className="col-md-5" >
                        loading
                    </div>);
        else {
            const myLessons = this.props.value.map(l => {
                return <Event key={l.id} name={l.name} P={l.prophesor}
                        value={l.description} H1={l.dateIni} H2={l.dateFin}                      
                />
            });
            return (<div className="col-md-5" >
                    <div className="new-event">  <button className="btn-event"> <img src={PLUS} alt='+' /> </button> </div>
                    <div className="eventt-container">
                    {myLessons}
                    </div>
                    </div>);
        }
    }
}

export default ListOfEvents;