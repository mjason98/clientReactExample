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
		};
	}
	
	render () {
		return (
			<div className='row'>
			<Navigation />
			<BigDateTable 
				currentDate={{  day: this.state.currentDate.getDate(), 
							  month: this.state.currentDate.getMonth() + 1,
							   year: this.state.currentDate.getFullYear()}}
			/>
			<ListOfEvents />
			</div>
		);
	}
}

export default App;
