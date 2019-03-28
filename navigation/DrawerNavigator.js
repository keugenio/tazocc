import React from 'react';
import { SafeAreaView, ScrollView , TouchableOpacity, View, Text, Dimensions, StyleSheet} from 'react-native';
import { createDrawerNavigator, createStackNavigator, DrawerItems, DrawerActions, MenuItem} from 'react-navigation';

import AboutTAZ from '../screens//AboutTAZ';
import Calendar from '../screens/Events';
import Sponsors from '../screens/Sponsors';
import Paddle101 from '../screens/Paddle101';
import FontSize from '../constants/FontSize';
import Icon from '@expo/vector-icons/Ionicons';
import {WebBrowser} from 'expo';
import MainTabNavigator from './MainTabNavigator';
import Colors from '../constants/Colors';
import fontSize from '../constants/FontSize';

const CustomDrawerComponent =(props) =>(
  <SafeAreaView> 
    <ScrollView>
        <View style={{backgroundColor:'rgba(255,255,255,.5)', marginTop:40}} >
          <DrawerItems {...props}/>
          <View style={{flexDirection:'column'}}>
            <View  style={{marginTop:10}}>
              <TouchableOpacity onPress={() => { WebBrowser.openBrowserAsync('https://www.scoraregistration.com/paddler_login')}}>
                <Text style={styles.drawerItemStyle}>SCORA Login</Text>
              </TouchableOpacity>
            </View>
            <View style={{marginTop:30}}>
              <TouchableOpacity onPress={() => { WebBrowser.openBrowserAsync('https://waiver.smartwaiver.com/w/5bfc43ae42c8a/web')}}>
                <Text style={styles.drawerItemStyle}>Smart Waiver</Text>
              </TouchableOpacity>
            </View>          
          </View>  
        </View>  
    </ScrollView>                
  </SafeAreaView>      
);


const CalendarStack = createStackNavigator({
  News: {
    screen: Calendar,
    navigationOptions: ({navigation})=>{
      return {
        headerTitle:'TAZ Calendar',
        headerLeft:(
          <Icon 
            name="md-menu" 
            size={FontSize.FONTSIZE*2} 
            onPress = { ()=> navigation.openDrawer()}
            style={{paddingLeft:FontSize.FONTSIZE/2, color:'#FFFFFF'}} />
        ),
        headerStyle:{backgroundColor:Colors.mainBg},
        headerTitleStyle:{color:'#FFFFFF', fontWeight:'bold',fontSize:FontSize.FONTSIZE+5}
      }
      
    }
  } 
});

const AboutTAZStack = createStackNavigator({
  AboutTAZ: {
    screen: AboutTAZ,
    navigationOptions: ({navigation})=>{
      return {
        headerTitle:'About TAZ',
        headerLeft:(
          <Icon 
            name="md-menu" 
            size={FontSize.FONTSIZE*2} 
            onPress = { ()=> navigation.openDrawer()}
            style={{paddingLeft:FontSize.FONTSIZE/2, color:'#FFFFFF'}} />
        ),
        headerStyle:{backgroundColor:Colors.mainBg},
        headerTitleStyle:{color:'#FFFFFF', fontWeight:'bold',fontSize:FontSize.FONTSIZE+5}
      }
      
    }
  } 
});

const Paddling101Stack = createStackNavigator({
Paddling101: {
    screen: Paddle101,
    navigationOptions: ({navigation})=>{
      return {
        headerTitle:'Paddling 101',
        headerLeft:(
          <Icon 
            name="md-menu" 
            size={FontSize.FONTSIZE*2} 
            onPress = { ()=> navigation.openDrawer()}
            style={{paddingLeft:FontSize.FONTSIZE/2, color:'#FFFFFF'}} />
        ),
        headerStyle:{backgroundColor:Colors.mainBg},
        headerTitleStyle:{color:'#FFFFFF', fontWeight:'bold',fontSize:FontSize.FONTSIZE+5}
      }
    }
  } 
});

const SponsorsStack = createStackNavigator({
  Sponsors: {
      screen: Sponsors,
      navigationOptions: ({navigation})=>{
        return {
          headerTitle:'Our Sponsors',
          headerLeft:(
            <Icon 
            name="md-menu" 
            size={FontSize.FONTSIZE*2} 
            onPress = { ()=> navigation.openDrawer()}
            style={{paddingLeft:FontSize.FONTSIZE/2, color:'#FFFFFF'}} />
        ),
        headerStyle:{backgroundColor:Colors.mainBg},
        headerTitleStyle:{color:'#FFFFFF', fontWeight:'bold',fontSize:FontSize.FONTSIZE+5}
      }
    }
  } 
});

const DashTabStackNavigator = createStackNavigator({
  DashTabNav: MainTabNavigator
  }, {
  defaultNavigationOptions:({navigation}) => {
    
    return {
      headerLeft:(
        <Icon 
          name="md-menu" 
          size={fontSize.FONTSIZE*2} 
          onPress = { ()=> navigation.openDrawer()}
          style={{paddingLeft:FontSize.FONTSIZE/2, color:'#FFFFFF'}} />
      )
      
    }
  }
})

export default DrawerNavigator = createDrawerNavigator({
    Home:{screen:DashTabStackNavigator},
    'TAZ Calendar':CalendarStack,
    'About TAZ':AboutTAZStack,
    'Our Sponsors':SponsorsStack,
    'Paddling 101':Paddling101Stack, 
    },{
      drawerPosition:'left',
      contentComponent: CustomDrawerComponent,
      drawerWidth: FontSize.FONTSIZE*10
    },
  );

const styles=StyleSheet.create({
  drawerItemStyle:{
      fontWeight:'600',
      marginLeft:15,
  }

})
