import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions } from 'react-native';
import Colors from '../constants/Colors';
import FontSize from '../constants/FontSize';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import request from 'superagent'
import moment, { version } from 'moment';

let { height,width } = Dimensions.get('window')

const CALENDAR_ID = 'teamazoutrigger@gmail.com'
const API_KEY = 'AIzaSyAaSI4_tgkpYn0PLVDYGR90gh68fTMdmSQ'
let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`

export default class Events extends Component{   
    constructor(props) {
      super(props);
      this.state = {
        items:{
          '2019-02-22': [{summary: 'item 1 - any js object'}],
          '2019-02-23': [{summary: 'item 2 - any js object'}],
          '2019-02-24': [],
          '2019-02-25': [{summary: 'item 3 - any js object'},{summary: 'any js object'}],
       }
      };
    }


    componentDidMount(){
      request
      .get(url)
      .end((err, resp) => {
        if (!err) {
          const events = []
          JSON.parse(resp.text).items.map((event) => {
            if (event.start && event.end){
              events.push({
                start: moment(event.start.date).format("YYYY-MM-DD") || moment(event.start.dateTime).format("YYYY-MM-DD"),
                end: event.end.date || event.end.dateTime,
                title: event.summary,
                id: event.id
              })
            }
          })
          console.log(events['2019-02-26']);
          
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
      console.log(day);
      
      setTimeout(() => {
        for (let i = -30; i < 70; i++) {
          const time = day.timestamp + i * 24 * 60 * 60 * 1000;
          const strTime = this.timeToString(time);
          if (!this.state.items[strTime]) {
            this.state.items[strTime] = [];
          }
        }
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
  
  const styles = StyleSheet.create({
    item: {
      backgroundColor: '#fff9c4',
      flex: 1,
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      marginTop: 17
    },
    emptyDate: {
      height: 15,
      flex:1,
      paddingTop: 30
    }
  });