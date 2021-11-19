import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import { Modal , ModalBody} from "react-bootstrap";

import Navigation from "./Navigation";
import ListOfEvents from "./ListOfEvents";
import BigDateTable from "./BigDateTable";
import ModalHeader from "react-bootstrap/esm/ModalHeader";

function LessonsModal(props){
	if (!props.show)
		return ('');
	else{
		const hora = Array(12).fill(0).map((_ , i) => <option value={i+7} className="selectD-content">{i+7}</option>);
		const mins = Array(4).fill(0).map((_ , i) => <option value={i*15} className="selectD-content">{i*15}</option>);

		return ( <div className="container">
		<Modal 
		{...props}
		size="lg"
		centered
		aria-labelledby="contained-modal-title-vcenter"
		>
		<ModalHeader>
		<div className="eventt-header">
		New Lesson
		</div>
		</ModalHeader>
		<ModalBody>
		<form onSubmit={props.handleNewLesson}>
			<div className="row">
				{/*name*/}
				<div className="col-sm-4 form-col">
				<label for="name" className="eventt-author text-in-form"> Subject </label> <p/>
				<select id="name" name="name" className="form-sele" required>
					<option value="1" className="selectD-content">1</option>
					<option value="2" className="selectD-content">2</option>	
				</select>
				</div>

				{/* profesor */}
				<div className="col-sm-4 form-col">
				<label for="topic" className="eventt-author text-in-form"> Given by </label> <p/>
				<select id="topic" name="topic" className="form-sele" required>
					<option value="1" className="selectD-content">a</option>
					<option value="2" className="selectD-content">b</option>	
				</select>
				</div>

				{/* horario */}
				<div className="col-sm-4 form-col">
					<label for="hora" className="eventt-author text-in-form"> Time and Duration</label> <p/>
					<select id="horaI" name="horaI" className="form-sele time-sele time-row" required>
						{hora}
					</select>
					<div className="sep-text time-row" >:</div>
					<select id="minI" name="minsI" className="form-sele time-sele time-row" required>
						{mins}
					</select>
					<div className="sep-text time-row" >and last</div>
					<select id="dur" name="dur" className="form-sele time-sele time-row" required>
						<option value={45}>45 mins</option>
						<option value={60}>1 hour </option>
						<option value={90}>1&#189; hour</option>
						<option value={120}>2 hours</option>
						<option value={180}>3 hours</option>
					</select>
				</div>
				<div className="row">
				<div className="col-sm-9 form-col">
				<label for="desc" className="eventt-author"> Description </label> <p/>
				<textarea id="desc" name="desc" className="form-BT" maxLength="256" placeholder="this one will be good"/>
				</div>
				<div className="col-sm-3 form-col">
					<button className="btn-ok red" onClick={() => props.onHide()}>Cancel</button>
					<button className="btn-ok" type="submit">OK</button>
				</div>
				</div>
			</div>
		</form>
		
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
