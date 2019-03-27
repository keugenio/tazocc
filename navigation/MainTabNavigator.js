import React, { Component } from 'react';
import { Platform, Linking, SafeAreaView, ScrollView , TouchableOpacity, View, Text, Dimensions, StyleSheet} from 'react-native';
import { Button } from 'react-native-elements';
import { createStackNavigator, createBottomTabNavigator, createDrawerNavigator, DrawerItems, DrawerActions, MenuItem} from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import EmailScreen from '../screens/EmailScreen';
import Practices from '../screens/Practices';
import Events from '../screens/Events';
import AboutTAZ from '../screens/AboutTAZ';
import News from '../screens/News';
import Sponsors from '../screens/Sponsors';
import Paddle101 from '../screens/Paddle101';
import Colors from '../constants/Colors';
import FontSize from '../constants/FontSize';
import Icon from 'react-native-vector-icons/FontAwesome';
import {WebBrowser} from 'expo';


const {width, height} = Dimensions.get('window');

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});
HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={
          Platform.OS === 'ios'
            ? `ios-home`
            : 'md-home'
        }
      />
  ),
};

const EmailStack = createStackNavigator({
  Links: EmailScreen,
});
EmailStack.navigationOptions = {
  tabBarLabel: 'Email TAZ',
  tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-mail' : 'md-mail'}
      />
  ),
  tabBarOnPress:(()=>{
    Linking.openURL('mailto:teamazoutrigger@gmail.com?subject=Inquiry from TAZ App');
  })
};

const NewsStack = createStackNavigator({
  Settings: News,
});
NewsStack.navigationOptions = {
  tabBarLabel: 'News',
  tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-notifications' : 'md-notifications'}
      />  
  ), 
};

const PracticesStack = createStackNavigator({
  Settings: Practices,
});
NewsStack.navigationOptions = {
  tabBarLabel: 'Practices',
  tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-notifications' : 'md-notifications'}
      />  
  ), 
};



export default createBottomTabNavigator(
  {
    HomeStack,
    EmailStack,
    NewsStack,
    PracticesStack,
    }, {
        defaultNavigationOptions: {
          gesturesEnabled: false,
        },
        tabBarOptions: {
            activeTintColor: Colors.warning,  // Color of tab when pressed
            inactiveTintColor: Colors.info, // Color of tab when not pressed
            showIcon: 'true', // Shows an icon for both iOS and Android
            showLabel: (Platform.OS !== 'android'), //No label for Android
            gesturesEnabled:false,
            gestureResponseDistance:0,
            header:false,
            labelStyle: {
              fontSize: FontSize.FONTSIZE-5,
            },
            style: {
              backgroundColor: Colors.mainBg, // Makes Android tab bar white instead of standard blue
              height: (Platform.OS === 'ios') ? 48 : 50 // I didn't use this in my app, so the numbers may be off. 
            }
          },
    }
);

const styles=StyleSheet.create({
  drawerItemStyle:{
      fontWeight:'600',
      marginLeft:15,

  }

})
