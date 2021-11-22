import React from "react";
import Navigation from "./Navigation";
import book from "./book.svg";
import circ from "./circ.svg";
import pen from "./pen.svg";
import person_p from "./person_p.svg"

import { GeneralModal, UpdateGeneralModal , DeleteGeneralModal} from "./MyModals";

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

class GeneralList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            profs : [],
            loading : false,
            createO: false,

            updateO: false,
            updateV: null,
            deleteO: false,
            deleteV: null,
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleProfessor = this.handleProfessor.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this); 
        this.handleNew = this.handleNew.bind(this);
    }

    handleProfessor(){
        this.setState({loading: true});
        fetch(process.env.REACT_APP_API+this.props.nameURL, {
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

    handleNew(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+this.props.nameURL, {
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
			this.setState({createO: false});
            this.handleProfessor();
        }, (error) => {
            console.log(error);
        });
    }

    handleDelete(){
        fetch(process.env.REACT_APP_API+this.props.nameURL+'/'+this.state.deleteV.id , {
            method:'DELETE',
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
            }
        }).then((data) => {
			this.setState({deleteV : null, deleteO: false});
			this.handleProfessor();
		});
    }

    handleUpdate(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+this.props.nameURL+'/' + this.state.updateV.id, {
            method:'PUT',
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
				name:event.target.name.value,
            })
        }).then(data => {
			this.setState({updateO: false});
            this.handleProfessor();
        }, (error) => {
            console.log(error);
        });
    }

    render (){
        const head = (this.state.loading === true)?<div className="btn-event btn-event-empty"> <img src={circ} alt='loading' /> </div>:<button className="btn-event" onClick={() => this.setState({createO:true})} > <img src={this.props.icon} alt='+' /> </button>;
        const profs = this.state.profs.map((v) => <SmallEvent P={v.name} key={v.id}
                                                              handleUpdate={() => this.setState({updateV:v , updateO: true})} 
                                                              handleDelete={() => this.setState({deleteV:v , deleteO: true})}
                                                              />);

        return (
            <div className="col-md-5">
                <div className="new-event"> {head} <h3> {this.props.title} </h3> </div>
                <div className="eventt-container">
                {profs}
                </div>

                <GeneralModal show={this.state.createO}
                                onHide={()=>this.setState({createO:false})}
                                handleNewProfessor={(v) => this.handleNew(v)}
                                title={this.props.dialogT}
                                placeholder={this.props.dialogP}
                                />
                <UpdateGeneralModal show={this.state.updateO} value={this.state.updateV} 
                                onHide={()=>this.setState({updateO:false})}
                                handleUpdateProf={(v) => this.handleUpdate(v)}
                                />
                <DeleteGeneralModal show={this.state.deleteO} 
                                onHide={()=>this.setState({deleteO:false})}
                                handleDelete={() => this.handleDelete()}/>
            </div>
        );
    }
} 

class ProfAndTop extends React.Component {
    render(){
        return(
            <div className="row">
                <Navigation />
                <GeneralList title="Professors" nameURL="Profesor" dialogT="New professor" dialogP="someone" icon={person_p}/>
                <GeneralList title="Subjects" nameURL="Topic" dialogT="New subject" dialogP="things and more" icon={book} />
            </div>
        );
    }
}

export default ProfAndTop;