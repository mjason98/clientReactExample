import React  from "react";
import arrowL from "./arrowL.svg";
import arrowR from "./arrowR.svg";

function SquareContainer(props){
    return (<div className="sqcontainer">
            {props.value}
            </div>)
}

function Square(props){
    let corner = '';
    if (props.corner === 0)
        corner = ' square-tlr';
    else if (props.corner === 1)
        corner = ' square-trr';
    else if (props.corner === 2)
        corner = ' square-blr';
    else if (props.corner === 3)
        corner = ' square-brr';

    if (props.isBtn){
        if (props.value)
            return <button className={'square btn-square'+(props.curr?(props.sele?'-curr':'-curr-no'):(props.sele?'-sele':'')) + corner}
                    onClick={props.pressHandler} > 
                    {props.value} 
                   </button>
        else
            return <div className={'square square-empty' + corner} />
    }
    else 
        return (<div className={'square' + corner}> {props.value} </div>)
}

function renderBigTableHeader(props) {
    const MonthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const months = Array(12).fill(0).map((_, i) => {
        return (<option className="selectD-content" value={i} selected={props.month === i+1} > {MonthNames[i]} </option>)
    });
    const iniSize = 7;
    const YearsInitial = Array(iniSize).fill(0).map((_ , i) => {
        return (<option className="selectD-content" value={i-((iniSize/2)|0) + props.year} selected={((iniSize/2)|0) === i} > {props.year + i - ((iniSize/2)|0)} </option>)
    } );

    const Header = [<div className='upHeader'> {/* cambiar esto luego */}
                    <button className='btn-lb'> <img className="btn-img" src={arrowL} alt="prev"></img> </button>
                    <select className='slectD' name="headerMonth" id="headerMonthId">
                    {months}
                    </select>
                    <select className='slectD' name="headerYears" id="headerYearsId">
                    {YearsInitial}
                    </select>
                    <button className='btn-rb'> <img className="btn-img" src={arrowR} alt="next"></img>  </button> </div>
                   ]
    Header.push(<div className='square-row'>
                 {/* week's days */}
                 <Square isBtn={false} value='S' corner={0}/> 
                 <Square isBtn={false} value='M' />
                 <Square isBtn={false} value='T' />
                 <Square isBtn={false} value='W' /> 
                 <Square isBtn={false} value='T' />
                 <Square isBtn={false} value='F' />
                 <Square isBtn={false} value='S' corner={1}/>
                 </div>
               )
    return (<div className="sqheader-c">{Header}</div>);
}
function renderBRow(props){
    let arr = [];
    for (let i = 0; i < 7; i++)
        arr.push(<Square  corner={props.isFinal?( i===0?2:(i===6?3:null) ):null} 
                          isBtn={true} 
                          value={props.values[i]} curr={props.dayPos && props.dayPos === i} sele={props.daySPos && props.daySPos === i}
                          pressHandler={() => props.pressHandler(props.values[i])} /> )
    return (<div className='square-row'> {arr} </div>)
}

function renderBigTableBody(props){
    const weekNo = new Date(props.year, props.month-1, 1).getDay();
    const maxDays = new Date(props.year, props.month-1, 0).getDate() + weekNo;
    
    let dayC = 1, dayInRow = -1,daySInRow = -1;
    let rowvals = [], finalReturn = [];

    for (let i = 0; i < maxDays; i++) {
        if (i >= weekNo){
            rowvals.push(dayC);
            dayC++;
        } else 
            rowvals.push(null);
        
        if (i === weekNo + props.day-1){
            dayInRow = i%7;
        }
        if (i === weekNo + props.dayS-1){
            daySInRow = i%7;
        }
        
        if ((i+1)%7 === 0 || (i+1) === maxDays){
            finalReturn.push(renderBRow({values: rowvals, dayPos : dayInRow , daySPos: daySInRow,
                                         isFinal: (i+1) === maxDays, pressHandler : props.pressHandler}));
            rowvals = [];
            dayInRow = daySInRow = -1;
        }
    }
    return ( <SquareContainer value={finalReturn} /> );
}

class BigDateTable extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentDay : props.currentDate.day,
            currentMonth : this.props.currentDate.month,
            currentYear : this.props.currentDate.year,
            selectedDay : props.currentDate.day,
        }
        this.handleDayPress = this.handleDayPress.bind(this);
    }

    handleDayPress(day){
        this.setState({selectedDay : day});
    }
    
    render (){
        //return (<div className="col-md-6" > table, {this.props.currentDate.day}, {this.props.currentDate.month}, {this.props.currentDate.year} </div>);
        return (<div className="col-md-6 "> 
                {renderBigTableHeader({month : this.state.currentMonth, year: this.state.currentYear})}
                {renderBigTableBody({day : this.state.currentDay, month : this.state.currentMonth, 
                                     year: this.state.currentYear, dayS : this.state.selectedDay,
                                     pressHandler: (d) => this.handleDayPress(d)})}
                </div>
        );
    }
}

export default BigDateTable;