import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimesions } from 'react-native';
import Colors from '../constants/Colors';
import FontSize from '../constants/FontSize';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import request from 'superagent'
import moment, { version } from 'moment';
import gapiInfo from '../apiGoogleConfig.json';

class Events extends Component{
  render(){
    const {container, p} = styles;
    return(
      <View style={container}><Text style={p}>Events</Text></View>
    )
  }
}
export default Events

// get google API auth values
const CALENDAR_ID = gapiInfo.CALENDAR_ID;
const API_KEY = gapiInfo.API_KEY

// set parameters for calendar search
const prevYear = moment().subtract(1, 'year').format('YYYY') + "-01-01";
const endOfYear = moment().format('YYYY') + "-12-31";
const timeMin =  moment(prevYear).format();
const timeMax = moment(endOfYear).format();

// url for GET statement to google Calendar API
let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?maxResults=2500&orderBy=updated&singleEvents=true&timeMin=${timeMin}&timeMax=${timeMax}&key=${API_KEY}`;

export default class Events extends Component{   
    constructor(props) {
      super(props);
      this.state = {
        items:{
          '2019-02-22': [{summary: 'item 1 - any js object'}],
          '2019-02-23': [{summary: 'item 2 - any js object'}],
          '2019-02-24': [],
          '2019-02-25': [{summary: 'item 3 - any js object'},{summary: 'any js object'}],
       },
       allCalEvents: {}
      };
    }

    componentDidMount(){        
      // load calendar events from TAZ calendar using Google Calendar API REST into state
      request
      .get(url)
      .end((err, resp) => {
        if (!err) {
          // build allCalEvents array from downloaded Google Calendare and format start and end dates
          const allCalEvents = [];
          JSON.parse(resp.text).items.forEach((event) => {
            if (event.start && event.end) {
              event.start.date ? 
              allCalEvents.push({
                id:event.id, 
                startDate:moment(event.start.date).format("YYYY-MM-DD"),
                endDate:moment(event.end.date).format("YYYY-MM-DD"),
                startTime:moment(event.start.date).format("h:mm:ss a"),
                summary: event.summary,
                recurringEventId:event.recurringEventId
              }) : 
              allCalEvents.push({
                id:event.id, 
                startDate:moment(event.start.dateTime).format("YYYY-MM-DD"),
                endDate:moment(event.end.dateTime).format("YYYY-MM-DD"),
                startTime:moment(event.start.dateTime).format("h:mm a"),
                summary: event.summary,
                recurringEventId:event.recurringEventId
              })
            }
          })
          
          this.setState({allCalEvents: allCalEvents})          
        }
      })
    }

    render() {
      
      return (
        <View style={{height}}>
          <Agenda
            items={this.state.items}
            loadItemsForMonth={this.loadItems.bind(this)}
            selected={Date()}

            renderItem={this.renderItem.bind(this)}
            renderEmptyDate={this.renderEmptyDate.bind(this)}
            rowHasChanged={this.rowHasChanged.bind(this)}
            markingType={'period'}
            markedDates={{
              '2019-02-14': {startingDay: true, endingDay: true, color: 'blue'},
              '2019-02-21': {startingDay: true, color: 'blue'},
              '2019-02-22': {endingDay: true, color: 'gray'},
              '2019-02-24': {startingDay: true, color: 'gray'},
              '2019-02-25': {color: 'gray'},
              '2019-02-26': {endingDay: true, color: 'gray'}}}
            monthFormat={'MMM yyyy'}
            theme={{calendarBackground: Colors.mainBg, agendaKnobColor: 'green', dayTextColor: '#e3f2fd',monthTextColor: '#ffee58'}}
            renderDay={(day, item) => (<Text>{day ? day.month + "/" +  day.day: null}</Text>)}
          />
        </View>
      );
    }
  

    loadItems(day) {
      
      const calEvents = [];
      setTimeout(() => {
        for (let i = -30; i < 70; i++) {
          const time = day.timestamp + i * 24 * 60 * 60 * 1000;
          const strDate = this.timeToString(time);
          // add blank info for days with no current data.
          if (!this.state.items[strDate]) {
            this.state.items[strDate] = [];
          }
          let obj = this.state.allCalEvents.find(event => event.startDate == strDate);
          if (obj)
            calEvents.push(obj)
        }

        //console.log("calEvents", calEvents);
        calEvents.map((event)=> {
          this.state.items[event.startDate] = [{summary:event.summary}]
        })

        console.log("state.items", this.state.items);
        
        const newItems = {};
        Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
        this.setState({
          items: newItems
        });
      }, 1000);

    }
  
    renderItem(item) {
      return (
        <View style={[styles.item, {height: item.height}]}><Text>{item.summary}</Text></View>
      );
    }
  
    renderEmptyDate() {
      return (
        <View style={styles.emptyDate}><Text>This is an empty date!</Text></View>
      );
    }

    rowHasChanged(r1, r2) {
      return r1.name !== r2.name;
    }
  
    timeToString(time) {
      const date = new Date(time);
      return date.toISOString().split('T')[0];
    }
  }
})