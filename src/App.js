import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import { Modal , ModalBody, Form } from "react-bootstrap";

import Navigation from "./Navigation";
import ListOfEvents from "./ListOfEvents";
import BigDateTable from "./BigDateTable";
import ModalHeader from "react-bootstrap/esm/ModalHeader";

function LessonsModal(props){
	if (!props.show)
		return ('');
	else{
		// pedir prof y topica
		const names_options  = props.profesors.map(p => <option key={p.id} value={p.id} className="selectD-content">{p.name}</option>)
		const topics_options = props.topics.map(t => <option key={t.id} value={t.id} className="selectD-content">{t.name}</option>)

		const hora = Array(12).fill(0).map((_ , i) => <option key={i} value={i+7} className="selectD-content">{i+7}</option>);
		const mins = Array(4).fill(0).map((_ , i) => <option  key={i} value={i*15} className="selectD-content">{i*15}</option>);

		return ( <div className="container">
		<Modal 
		show={props.show}
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
		<Form onSubmit={(v) => props.handleNewLesson(v)}>
			<div className="row">
				{/*name*/}
				<div className="col-sm-4 form-col">
				<label htmlFor="topic" className="eventt-author text-in-form"> Subject </label> <p/>
				<select  id="topic" name="topic" className="form-sele" required>
					{topics_options}	
				</select>
				</div>

				{/* profesor */}
				<div className="col-sm-4 form-col">
				<label htmlFor="name" className="eventt-author text-in-form"> Given by </label> <p/>
				<select id="name" name="name" className="form-sele" required>
					{names_options}
				</select>
				</div>

				{/* horario */}
				<div className="col-sm-4 form-col">
					<label htmlFor="hora" className="eventt-author text-in-form"> Time and Duration</label> <p/>
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
				<label htmlFor="desc" className="eventt-author"> Description </label> <p/>
				<textarea id="desc" name="desc" className="form-BT" maxLength="256" placeholder="this one will be good"/>
				</div>
				<div className="col-sm-3 form-col">
					<button className="btn-ok red" onClick={() => props.onHide()}>Cancel</button>
					<button className="btn-ok" type="submit">OK</button>
				</div>
				</div>
			</div>
		</Form>
		
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
			topics : [],
			namesP :[],
			dailyL : [],
		};
		this.handleDay = this.handleDay.bind(this);
		this.handleNewLesson = this.handleNewLesson.bind(this);
		this.handlePreModal = this.handlePreModal.bind(this);
		this.DailyLessons = this.DailyLessons.bind(this);
	}

	DailyLessons(props){
		const year = 'year' in props?props.year:null;
        const month = 'month' in props?props.month:null;

        fetch(process.env.REACT_APP_API+'Lesson/days-bmy', {
            method:'POST',
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                year:year,
                month:month,
            })
        })
        .then(response => response.json())
        .then(data => {
            this.setState({dailyL : data});
        }, (error) => {
            this.setState({dailyL : []});
            console.log(error);
        });
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
		v.preventDefault();
		this.setState({createLesson: false});

		// problema con las hora aun
		const todayOff = 0;//new Date().getTimezoneOffset();

		const fechaIni = new Date(this.state.selectedDate.year, this.state.selectedDate.month-1, this.state.selectedDate.day,
								  v.target.horaI.value, v.target.minI.value - todayOff, 0, 0).toUTCString();
		const fechaFin = new Date(this.state.selectedDate.year, this.state.selectedDate.month-1, this.state.selectedDate.day,
								  v.target.horaI.value, v.target.minI.value + v.target.dur.value - todayOff, 0, 0).toUTCString();

		fetch(process.env.REACT_APP_API+'Lesson', {
            method:'POST',
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                prophesor:v.target.name.value,
				name:v.target.topic.value,
                description:v.target.desc.value,
				dateIni:fechaIni,
				dateFin:fechaFin,
            })
        }).then(response => response.json())
        .then(data => {
            console.log('sucess');
			this.DailyLessons({year: this.state.selectedDate.year, month: this.state.selectedDate.month});
			this.handleDay(this.state.selectedDate);
        }, (error) => {
            console.log(error);
        });
	}

	handlePreModal(){
		this.setState({createLesson:true});

		fetch(process.env.REACT_APP_API+'Profesor', {
            method:'GET',
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
            }
        })
        .then(response => response.json())
        .then(data => {
            this.setState({namesP : data});
        }, (error) => {
            this.setState({namesP : []});
            console.log(error);
        });	

		fetch(process.env.REACT_APP_API+'Topic', {
            method:'GET',
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
            }
        })
        .then(response => response.json())
        .then(data => {
            this.setState({topics : data});
        }, (error) => {
            this.setState({topics : []});
            console.log(error);
        });	
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
				DailyLessons = {(p) => this.DailyLessons(p)} 
				dailyL = {this.state.dailyL}
			/>
			<ListOfEvents loading={this.state.loading} value={this.state.lessons} 
						  handleNewLesson={() => this.handlePreModal()}
						  showNew={this.state.selectedDate.day>0?true:false}
						  />
			<LessonsModal show={this.state.createLesson} handleNewLesson={(v) => this.handleNewLesson(v)}
						  onHide={() => this.setState({createLesson:false})}
						  profesors={this.state.namesP}
						  topics={this.state.topics}
			/>
			</div>
		);
	}
}

export default App;
