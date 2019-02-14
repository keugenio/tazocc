import React from 'react';
import { Platform, Linking } from 'react-native';
import { createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import EmailScreen from '../screens/EmailScreen';
import Login from '../screens/LoginScreen';
import News from '../screens/News';
import Colors from '../constants/Colors';
import {AddButton} from '../src/components/AddButton';
import TestRedux from '../TestRedux';


const TestStack = createStackNavigator({
  Test: TestRedux,
});

TestStack.navigationOptions = {
  tabBarLabel: 'Redux',
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
  tabBarLabel: null,
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

const AuthStack = createStackNavigator({
  Settings: Login,
});

AuthStack.navigationOptions = {
  tabBarLabel: 'Login',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-log-in' : 'md-log-in'}
      onPress
    />
  ),
};



export default createBottomTabNavigator(

  {
    HomeStack,
    EmailStack,
    More: {
        screen: () => null, // Empty screen
        navigationOptions: () => ({
            tabBarIcon: <AddButton />, // Plus button component
            tabBarLabel:' '
        })
    },
    NewsStack,
    AuthStack,
    },

  {tabBarOptions: {
    labelStyle: {
      color:'#FFFFFF'
    },
    style: {
      backgroundColor: Colors.mainBg,
    },
  }}
);
