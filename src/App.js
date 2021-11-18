import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import { Modal , Form, ModalTitle, ModalBody, FormGroup, FormLabel, FormControl } from "react-bootstrap";

import Navigation from "./Navigation";
import ListOfEvents from "./ListOfEvents";
import BigDateTable from "./BigDateTable";
import ModalHeader from "react-bootstrap/esm/ModalHeader";

function LessonsModal(props){
	if (!props.show)
		return ('');
	else{
		return ( <div className="container">
		<Modal 
		{...props}
		size="lg"
		centered
		aria-labelledby="contained-modal-title-vcenter"
		>
		<ModalHeader>
			<ModalTitle id="contained-modal-title-vcenter">
				New Lesson
			</ModalTitle>
		</ModalHeader>
		<ModalBody>
		<div className="row">
			<div className="col-sm-6">
			<Form onSubmit={props.handleNewLesson}>
				<FormGroup controlId="lessonName">
					<FormLabel>Subject Name</FormLabel>
					<FormControl type="text" name="lessonName" required placeholder="0" />
				</FormGroup>
				<FormGroup>
				<button onClick={props.onHide}> Cancel </button>
				<button type="submit"> Add </button>
				</FormGroup>
			</Form>
			</div>
		</div>
		</ModalBody>
		</Modal>
		</div>);
	}
}

class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			currentDate : new Date(),
			loading : false,
			lessons : [],
			selectedDate : {day:-1, year:0, month:0},
			createLesson : false,
		};
		this.handleDay = this.handleDay.bind(this);
		this.handleNewLesson = this.handleNewLesson.bind(this);
	}

	handleDay(date){
		if (date.day < 0){
			this.setState({lessons : [], selectedDate: {day:-1, year:0, month:0}});
			return;
		}
		
		this.setState({loading: true, selectedDate : date});
        fetch(process.env.REACT_APP_API+'Lesson/lbd', {
            method:'POST',
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                year:date.year,
                month:date.month,
				day:date.day,
            })
        })
        .then(response => response.json())
        .then(data => {
            this.setState({lessons : data, loading : false});
        }, (error) => {
            this.setState({lessons : [], loading : false});
            console.log(error);
        });
	}

	handleNewLesson(v){
		// pedir profesores
		// pedir topics
		this.setState({createLesson: true});
	}
	
	render () {
		return (
			<div className='row'>
			<Navigation />
			<BigDateTable 
				currentDate={{  day: this.state.currentDate.getDate(), 
							  month: this.state.currentDate.getMonth() + 1,
							   year: this.state.currentDate.getFullYear()}}
				handleDay = {(date) => this.handleDay(date)}
			/>
			<ListOfEvents loading={this.state.loading} value={this.state.lessons} 
						  handleNewLesson={() => this.handleNewLesson()}
						  showNew={this.state.selectedDate.day>0?true:false}
						  />
			<LessonsModal show={this.state.createLesson} handleNewLesson={(v) => this.handleNewLesson(v)}
						  onHide={() => this.setState({createLesson:false})}
			/>
			</div>
		);
	}
}

export default App;
