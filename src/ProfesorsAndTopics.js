import React from "react";
import Navigation from "./Navigation";
import PLUS from "./PLUS.svg";
import circ from "./circ.svg";
import pen from "./pen.svg";

import { ProfessorModal, UpdateProfessorModal , DeleteProfModal} from "./MyModals";

export function SmallEvent (props){
    const tipo = ' grayest';
    return (
        <div className={"eventt"+tipo} > 
        <div className="eventt-header" >
            
            <button type="button" className="edit" onClick={() => props.handleUpdate()}> 
            <img src={pen} alt="edit" /> 
            </button>

            <button type="button" className="close" onClick={() => props.handleDelete()}>
            <span aria-hidden="true">&times;</span>
            </button>
        
        </div>
        
        <div className="row"> 
            <div className="col-sm-12 eventt-author" > {props.P} </div>
        </div>
        
        </div>
    );
}

class ProfesorsList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            profs : [],
            loading : false,
            createP: false,

            updateP: false,
            updateV: null,
            deleteP: false,
            deleteV: null,
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleProfessor = this.handleProfessor.bind(this);
        this.handleUpdateProf = this.handleUpdateProf.bind(this); 
        this.handleNewProfessor = this.handleNewProfessor.bind(this);
    }

    handleProfessor(){
        this.setState({loading: true});
        fetch(process.env.REACT_APP_API+'Profesor', {
            method:'GET',
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
            }
        })
        .then(response => response.json())
        .then(data => {
            this.setState({profs : data, loading: false});
        }, (error) => {
            this.setState({profs : [], loading: false});
            console.log(error);
        });	
    }

    componentDidMount(){
        this.handleProfessor();
    }

    handleNewProfessor(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'Profesor', {
            method:'POST',
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
				name:event.target.name.value,
            })
        }).then(response => response.json())
        .then(data => {
            console.log('sucess');
			this.setState({createP: false});
            this.handleProfessor();
        }, (error) => {
            console.log(error);
        });
    }

    handleDelete(){
        fetch(process.env.REACT_APP_API+'Profesor/'+this.state.deleteV.id , {
            method:'DELETE',
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
            }
        }).then((data) => {
			this.setState({deleteV : null, deleteP: false});
			this.handleProfessor();
		});
    }

    handleUpdateProf(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'Profesor/' + this.state.updateV.id, {
            method:'PUT',
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
				name:event.target.name.value,
            })
        }).then(data => {
			this.setState({updateP: false});
            this.handleProfessor();
        }, (error) => {
            console.log(error);
        });
    }

    render (){
        const head = (this.state.loading === true)?<div className="btn-event btn-event-empty"> <img src={circ} alt='loading' /> </div>:<button className="btn-event" onClick={() => this.setState({createP:true})} > <img src={PLUS} alt='+' /> </button>;
        const profs = this.state.profs.map((v) => <SmallEvent P={v.name} key={v.id}
                                                              handleUpdate={() => this.setState({updateV:v , updateP: true})} 
                                                              handleDelete={() => this.setState({deleteV:v , deleteP: true})}
                                                              />);

        return (
            <div className="col-md-6">
                <div className="new-event"> {head} <h3> Professors </h3> </div>
                <div className="eventt-container">
                {profs}
                </div>

                <ProfessorModal show={this.state.createP}
                                onHide={()=>this.setState({createP:false})}
                                handleNewProfessor={(v) => this.handleNewProfessor(v)}
                                />
                <UpdateProfessorModal show={this.state.updateP} value={this.state.updateV} 
                                onHide={()=>this.setState({updateP:false})}
                                handleUpdateProf={(v) => this.handleUpdateProf(v)}
                                />
                <DeleteProfModal show={this.state.deleteP} 
                                onHide={()=>this.setState({deleteP:false})}
                                handleDelete={() => this.handleDelete()}/>
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