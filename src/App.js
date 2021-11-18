import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import Navigation from "./Navigation";
import ListOfEvents from "./ListOfEvents";
import BigDateTable from "./BigDateTable";

class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			currentDate : new Date(),
			loading : false,
			lessons : []
		};
		this.handleDay = this.handleDay.bind(this);
	}

	handleDay(date){
		if (date.day < 0){
			this.setState({lessons : []});
			return;
		}
		
		this.setState({loading: true});
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
			<ListOfEvents loading={this.state.loading} value={this.state.lessons} />
			</div>
		);
	}
}

export default App;
