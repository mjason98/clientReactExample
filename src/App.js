import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import Navigation from "./Navigation";
import ListOfEvents from "./ListOfEvents";
import BigDateTable from "./BigDateTable";
import {LessonsModal, DeleteLessonModal} from "./MyModals";

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

			deleteLesson : false,
			deleteIde : null,
		};
		this.handleDay = this.handleDay.bind(this);
		this.handleNewLesson = this.handleNewLesson.bind(this);
		this.handlePreModal = this.handlePreModal.bind(this);
		this.DailyLessons = this.DailyLessons.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
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

	handleDelete(){ 
		fetch(process.env.REACT_APP_API+'Lesson/'+this.state.deleteIde , {
            method:'DELETE',
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
            }
        }).then((data) => {
			this.setState({deleteIde : null, deleteLesson: false});
			
			this.DailyLessons({year: this.state.selectedDate.year, month: this.state.selectedDate.month})
			this.handleDay(this.state.selectedDate);
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
						  handleDelete={(ide) => this.setState({deleteLesson:true, deleteIde: ide})}
						  />
			<LessonsModal show={this.state.createLesson} handleNewLesson={(v) => this.handleNewLesson(v)}
						  onHide={() => this.setState({createLesson:false})}
						  profesors={this.state.namesP}
						  topics={this.state.topics}
			/>
			<DeleteLessonModal show={this.state.deleteLesson} onHide={() => this.setState({deleteLesson:false})} 
							   handleDelete={() => this.handleDelete()}
			/>
			</div>
		);
	}
}

export default App;
