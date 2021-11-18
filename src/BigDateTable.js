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

    //dia con eevento
    let withLessons = props.n?(props.n<=3?' with-leson-s':(props.n<=6?' with-leson-m':' with-leson-l')):'';

    if (props.isBtn){
        if (props.value)
            return <button className={'square btn-square'+(props.curr?(props.sele?'-curr':'-curr-no'):(props.sele?'-sele':'')) + corner + withLessons}
                    onClick={() => props.pressHandler()} > 
                    {props.value} 
                   </button>
        else
            return <div className={'square square-empty' + corner} />
    }
    else 
        return (<div className={'square' + corner + withLessons}> {props.value} </div>)
}

function renderBigTableHeader(props) {
    const MonthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const months = Array(12).fill(0).map((_, i) => {
        return (<option className="selectD-content" value={i} key={i} > {MonthNames[i]} </option>)
    });
    const iniSize = 7;
    const YearsInitial = Array(iniSize).fill(0).map((_ , i) => {
        const yearPrint = props.year + i - ((iniSize/2)|0);
        return (<option className="selectD-content" value={i} kewy={i} > {yearPrint} </option>)
    } );

    return (<div className="sqheader-c">
                <div className='upHeader' >
                    <button className='btn-lb' onClick={() => props.changeMonth(-1)} > <img className="btn-img" src={arrowL} alt="prev"></img> </button>
                    <select className='slectD'  value={props.month-1} onChange={(m) => props.changeMonth((m.target.value|0) + 1) } name="headerMonth" id="headerMonthId">
                    {months} 
                    </select>
                    <select className='slectD' value={((iniSize/2)|0)} onChange={(a) => props.changeYear(((a.target.value|0) - ((iniSize/2)|0)) + props.year)} name="headerYears" id="headerYearsId">
                    {YearsInitial}
                    </select>
                    <button className='btn-rb' onClick={() => props.changeMonth(-11)} > <img className="btn-img" src={arrowR} alt="next"></img>  </button> 
                </div>
                <div className='square-row' >
                    {/* week's days */}
                    <Square isBtn={false} value='S' corner={0}/> 
                    <Square isBtn={false} value='M' />
                    <Square isBtn={false} value='T' />
                    <Square isBtn={false} value='W' /> 
                    <Square isBtn={false} value='T' />
                    <Square isBtn={false} value='F' />
                    <Square isBtn={false} value='S' corner={1}/>
                 </div>
            </div>
    );
}
function renderBRow(props){
    let arr = [];
    for (let i = 0; i < 7; i++){
        const n = props.dailyL.find(v => v.day===props.values[i]) //filter

        arr.push(<Square  corner={props.isFinal?( i===0?2:(i===6?3:null) ):null} 
                          isBtn={true} 
                          value={props.values[i]} curr={props.dayPos>=0 && props.dayPos === i} sele={props.daySPos>=0 && props.daySPos === i}
                          pressHandler={() => props.pressHandler(props.values[i])} 
                          n = {n?n.n:null}
                  /> )
    }
    return (<div className='square-row' key={props.key}> {arr} </div>)
}

function renderBigTableBody(props){
    const weekNo = new Date(props.year, props.month-1, 1).getDay();
    const maxDays = new Date(props.year, props.month, 0).getDate() + weekNo;
    
    let dayC = 1, dayInRow = -1,daySInRow = -1;
    let rowvals = [], finalReturn = [];
    let kcont = 0;

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
                                         isFinal: (i+1) === maxDays, pressHandler : props.pressHandler,
                                         key : kcont, dailyL : props.dailyL}));
            rowvals = [];
            dayInRow = daySInRow = -1;
            kcont += 1;
        }
    }
    return ( <SquareContainer value={finalReturn} /> );
}

class BigDateTable extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentDay : props.currentDate.day,
            currentMonth : props.currentDate.month,
            currentYear : props.currentDate.year,
            
            selectedDay : props.currentDate.day,
            selectedMonth : props.currentDate.month,
            selectedYear : props.currentDate.year,
            
            dailyL : [],
            loadingL : false,
            //parentHandleDay : props.handleDay,
        }
        this.handleDayPress = this.handleDayPress.bind(this);
        this.handleMonthChange = this.handleMonthChange.bind(this);
        this.handleYearChanges = this.handleYearChanges.bind(this);
        this.DailyLessons = this.DailyLessons.bind(this);
    }

    //anadir cambios si solo state

    DailyLessons(props){
        const year = 'year' in props?props.year:this.state.selectedYear;
        const month = 'month' in props?props.month:this.state.selectedMonth;

        this.setState({loadingL: true});
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
            this.setState({dailyL : data, loadingL : false});
        }, (error) => {
            this.setState({dailyL : [], loadingL : false});
            console.log(error);
        });
    }

    handleDayPress(day){
        if (day === this.state.selectedDay)
            return;
        this.setState({selectedDay : day});
        this.props.handleDay({day : day, month : this.state.selectedMonth, year : this.state.selectedYear})
    }

    handleMonthChange(month){
        if (month < 0){
            const newMonth = ((this.state.selectedMonth + month-1)%12+12)%12 + 1;
            let newYear = this.state.selectedYear;
            if (newMonth === 12 && this.state.selectedMonth === 1)
                newYear = newYear-1;
            else if (newMonth === 1 && this.state.selectedMonth === 12)
                newYear = newYear+1;
            else if (newMonth === this.state.selectedMonth)
                return;
            this.setState({selectedMonth : newMonth, selectedYear: newYear, selectedDay : -1});
            this.DailyLessons({year: newYear, month: newMonth});
        } else{
            if (this.state.selectedMonth === month)
                return;
            this.setState({selectedMonth : month, selectedDay: -1});
            this.DailyLessons({month: month});
        }
        this.props.handleDay({day : -1, month : 0, year : 0})
    }

    handleYearChanges(year){
        if (this.state.selectedYear === year)
            return;
        this.setState({selectedYear : year, selectedDay : -1});
        this.DailyLessons({year: year});
        this.props.handleDay({day : -1, month : 0, year : 0})
    }

    componentDidMount(){
        this.DailyLessons({});
        this.props.handleDay({day : this.state.currentDay, month : this.state.currentMonth, year : this.state.currentYear})
    }
    
    render (){
        const boolean_exp = ( this.state.currentYear !== this.state.selectedYear || this.state.currentMonth !== this.state.selectedMonth );

        return (<div className="col-md-6 "> 
                {renderBigTableHeader({month : this.state.selectedMonth, year: this.state.selectedYear,
                                       changeMonth : (m) => this.handleMonthChange(m), changeYear : (y) => this.handleYearChanges(y)})}
                {renderBigTableBody({day : (boolean_exp?-1:this.state.currentDay), month : this.state.selectedMonth, 
                                     year: this.state.selectedYear, dayS : this.state.selectedDay,
                                     pressHandler: (d) => this.handleDayPress(d),
                                     dailyL : this.state.dailyL})}
                </div>
        );
    }
}

export default BigDateTable;