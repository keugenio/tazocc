import React from 'react';
import { Platform, StatusBar, StyleSheet, View, AsyncStorage} from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './src/reducers';
import request from 'superagent'
import moment, { version } from 'moment';
import gapiInfo from './apiGoogleConfig.json';

const DATE_YYYY_MM_DD = "YYYY-MM-DD";
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

const initState = {};
export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      isLoadingComplete: false,
      previousPosts: false
    };

    try {
      this._loadNews();
      this._loadCalEvents();
      
    } catch (error) {
      console.log(error)
    }    
  }

  async _loadNews(){
    //download latest news articles from TAZOCC.com
    await fetch('http://www.tazocc.com//wp-json/wp/v2/posts')
    .then((response) => response.json())
    .then((results) => {
      AsyncStorage.setItem('localDataStorage', JSON.stringify(results), () =>{
        AsyncStorage.getItem('unreadNews', (err, unReadNewsStr) =>{
          AsyncStorage.getItem('readNews', (err, readNewsStr) =>{
          
          const unReadNewsArr= unReadNewsStr ? JSON.parse(unReadNewsStr): [];
          const readNewsArr= readNewsStr ? JSON.parse(readNewsStr): [];
          const newNewsArr = [];

          if (!unReadNewsStr && !readNewsStr ){
            // since there are no new news items, push all the articles as new. (only happens when new install)
            results.forEach((newsItem)=>{
              newNewsArr.push(newsItem.id);                                  
            })
          } else {
            // for every news items that wasn't read, push into unReadNewsArray
            results.forEach((newsItem)=>{
              if (!readNewsArr.includes(newsItem.id))
                newNewsArr.push(newsItem.id);
            }) 
          }      
          // store the same or updated array of unread news items
          AsyncStorage.setItem('unReadNews', JSON.stringify(newNewsArr));                 
          
          })
        })
       })
    });
  }

  async _loadCalEvents(){
    // download latest calendar events from Google Calendar for TAZ
    try {
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
                  startDate:moment(event.start.date).format(DATE_YYYY_MM_DD),
                  startTime:moment(event.start.date).format("h:mm:ss a"),
                  summary: event.summary,
                }) : 
                allCalEvents.push({
                  startDate:moment(event.start.dateTime).format(DATE_YYYY_MM_DD),
                  startTime:moment(event.start.dateTime).format("h:mm a"),
                  summary: event.summary,
                })
              }
            })            
            AsyncStorage.setItem('allCalEvents', JSON.stringify(allCalEvents));            
          }
        })

    } catch (error) {
      console.log('error, error');
    }    
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={createStore(reducers)}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppNavigator />
          </View>
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        
        'space-mono': require('./assets/fonts/SpaceMono.ttf'),
        'Raleway': require('./assets/fonts/Raleway.ttf'),
        'Quicksand': require('./assets/fonts/Quicksand.ttf'),
        'Quicksand-Medium': require('./assets/fonts/Quicksand-Medium.ttf'), 
        'Broda':require('./assets/fonts/Broda.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});