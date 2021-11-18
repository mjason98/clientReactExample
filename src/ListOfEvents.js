import React  from "react";


function Event (props){
    const tipo = ' gray';
    return (
        <div className={"eventt"+tipo} > 
        {props.name} <p/>
        profesor: {props.P} <p/>
        hora1-hora2 : {props.H1} {props.H2} <p/>
        :: {props.value}  ::
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
                    <div className="eventt-container">
                    {myLessons}
                    </div>
                    </div>);
        }
    }
}

export default ListOfEvents;