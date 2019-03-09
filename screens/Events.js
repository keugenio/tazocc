import React, {Component} from 'react';
import {View, Dimensions, StyleSheet, AsyncStorage} from 'react-native';
import { Text } from 'react-native-elements';
import Colors from '../constants/Colors';
import { CalendarList } from 'react-native-calendars';
import moment from 'moment';
import FontSize from '../constants/FontSize';

const {height, width} = Dimensions.get("screen");

const low = moment().subtract(3, 'months').format("YYYY-MM-DD");
const high = moment().add(3, 'months').format("YYYY-MM-DD");

export default class Events extends Component{   
    constructor(props) {
      super(props);
      this.state = {
        items:{},
        allCalEvents: {},
        currentClickedEvent:{startDate:moment().format('YYYY-MM-DD'), summary:'select a day to view', startTime:''},
        markedDates: null,
        current: {low:low, high:high}
      };      
    }
    async componentDidMount(){
      await AsyncStorage.getItem('allCalEvents', (err, result) => {
        this.setState({allCalEvents: JSON.parse(result)})
      });      
    }   

    _handleOnDayPress(day) {
      const selectedDay = this.state.allCalEvents.find(event => event.startDate == day.dateString)
      if (selectedDay){
        this.setState({currentClickedEvent:selectedDay})        
      } else {
        this.setState({currentClickedEvent: {startDate:moment(day.dateString).format('YYYY-MM-DD'), summary:'', startTime:''}})
      }
    }

    _handleMonthChanged(month){     
      
      if (!this.state.markedDates){
        this.setMarkedDates(month)
      } else {
        const lowTimeStamp = moment(this.state.current.low).unix();
        const highTimeStamp = moment(this.state.current.high).unix();
        if (month[0].timestamp/1000 <= lowTimeStamp || month[0].timestamp/1000 >= highTimeStamp) {
          this.setState({current: {low:moment(month[0].dateString).subtract(3, "months").format("YYYY-MM-DD"), high:moment(month[0].dateString).add(3, "months").format("YYYY-MM-DD")}});       const high  = this.state.current.high;
          this.setMarkedDates(month);
        }

      }

      
    }
    setMarkedDates(month){      
      const fourMonthsBack = -30*4; // 4 months of 30 days
      const fourMonthsAhead = 30*4;
      const markedDates = {};

      // loop through all days 4 months back and 4 months forward, if there's an event, then mark the date
      for (let i = fourMonthsBack; i < fourMonthsAhead; i++) {
        const time = month[0].timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);

        const aMarkedDate = this.state.allCalEvents.find(event => event.startDate == strTime)
        if (aMarkedDate){
          if (aMarkedDate.summary.toUpperCase().includes('PRACTICE'))         
            markedDates[aMarkedDate.startDate] = {
              marked: true, dotColor: 'white'
            };
          else if (aMarkedDate.summary.toUpperCase().includes('BOARD'))
            markedDates[aMarkedDate.startDate] = {
              marked: false, 
              selected: true, 
              selectedColor: '#ffb74d',
            };   
          else 
            markedDates[aMarkedDate.startDate] = {
              marked: false,
              selected: true, 
              selectedColor: '#9e9d24'             
            };          
        }
      }
      this.setState({markedDates:markedDates})
    }

    timeToString(time) {
      const date = new Date(time);
      return date.toISOString().split('T')[0];
    }
    render() {
      return (
        <View style={{height, backgroundColor:Colors.mainBg}}>
          <View style={{flex:4}}>
            <CalendarList
              // Initially visible month. Default = Date()
              current={this.state.current}
              // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
              minDate={'2017-05-10'}
              // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
              maxDate={'2020-05-30'}
              // Handler which gets executed on day press. Default = undefined
              onDayPress={(day) => {this._handleOnDayPress(day)}}
              // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
              monthFormat={'MMM yyyy'}
              // Handler which gets executed when visible month changes in calendar. Default = undefined
              onVisibleMonthsChange={(month) => {this._handleMonthChanged(month)}}
              // Hide month navigation arrows. Default = false
              hideArrows={true}
              // Replace default arrows with custom ones (direction can be 'left' or 'right')
              renderArrow={(direction) => (<Arrow />)}
              // Do not show days of other months in month page. Default = false
              hideExtraDays={true}
              // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
              // day from another month that is visible in calendar page. Default = false
              disableMonthChange={true}
              // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
              firstDay={0}
              // Hide day names. Default = false
              hideDayNames={false}
              // Show week numbers to the left. Default = false
              markedDates={this.state.markedDates}
              style={{
                borderWidth: 1,
                borderColor: 'gray',
                height: height*.75
              }}
              // Specify theme properties to override specific styles for calendar parts. Default = {}
              theme={{
                backgroundColor: Colors.mainBg,
                calendarBackground: Colors.mainBg,
                textSectionTitleColor: '#b6c1cd',
                selectedDayBackgroundColor: '#00adf5',
                selectedDayTextColor: Colors.success,
                todayTextColor: Colors.warning,
                dayTextColor: Colors.info,
                textDisabledColor: '#d9e1e8',
                dotColor: '#00adf5',
                selectedDotColor: '#ffffff',
                arrowColor: 'orange',
                monthTextColor: '#ffe57f',
                textDayFontFamily: 'Raleway',
                textMonthFontFamily: 'Raleway',
                textDayHeaderFontFamily: 'Raleway',
                textDayFontSize: FontSize.FONTSIZE,
                textMonthFontSize: FontSize.FONTSIZE+5,
                textDayHeaderFontSize: FontSize.FONTSIZE-3
              }}            
            />        
          </View>
          <View style={{flex:1, backgroundColor:'rgba(255,255,255,.5)'}}>
              <View style={{flexDirection:'row', borderWidth:2, borderColor:Colors.mainBg, padding:5, backgroundColor:'rgb(255,255,255)'}}>
                <View style={{flexDirection:'column', padding:5}}>
                  <Text h5 style={{textAlign:'center', fontWeight:'400'}}>{moment(this.state.currentClickedEvent.startDate).format("dddd")}</Text>
                  <Text h5 style={{textAlign:'center', fontWeight:'800'}}>{moment(this.state.currentClickedEvent.startDate).format("MMMM Do")}</Text>
                  <Text h5 style={{textAlign:'center', fontWeight:'600'}}>{this.state.currentClickedEvent.startTime}</Text>
                </View>
                <View style={{flexDirection:'column', borderLeftWidth:1, borderLeftColor: Colors.mainBg, justifyContent:'center', padding:5, paddingLeft:10, width:width*.75}}>
                  <Text style={{flexWrap:'wrap', fontWeight:'200'}} h4>{this.state.currentClickedEvent.summary}</Text>
                </View>
              </View>
          </View>

        </View>
      );
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
    }
  });
