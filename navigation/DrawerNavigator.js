import React, { Component } from 'react';
import { SafeAreaView, ScrollView , TouchableOpacity, View, Text, Dimensions, StyleSheet} from 'react-native';
import { Button } from 'react-native-elements';
import { createDrawerNavigator, DrawerItems, DrawerActions, MenuItem} from 'react-navigation';

import Practices from '../screens/Practices';
import Events from '../screens/Events';
import AboutTAZ from '../screens/AboutTAZ';
import Sponsors from '../screens/Sponsors';
import Paddle101 from '../screens/Paddle101';
import Colors from '../constants/Colors';
import FontSize from '../constants/FontSize';
import Icon from 'react-native-vector-icons/FontAwesome';
import {WebBrowser} from 'expo';
import MainTabNavigator from './MainTabNavigator';

const {width, height} = Dimensions.get('window');

const CustomDrawerComponent =(props) =>(
  <SafeAreaView> 
    <ScrollView>
      <View style={{flexDirection:'column', justifyContent:'space-around'}}>
        <View style={{flex:4, height:height*.75, backgroundColor:'rgba(255,255,255,.5)'}} >
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
        <View style={{flex:1, width:'100%', height:height*.25, alignItems:'flex-end', padding:10}}>
          <View style={{width:'25%'}}>
            <Button
              icon={
                <Icon
                  name="arrow-right"
                  size={15}
                  color="white"
                />
              }
              onPress={()=>{props.navigation.closeDrawer()}}
            />      
          </View>
        </View>    
      </View>
    </ScrollView>                
  </SafeAreaView>      
);
export default DrawerNavigator = createDrawerNavigator({
      Home: MainTabNavigator,
      Events:Events,
      AboutTAZ:AboutTAZ,
      Sponsors:Sponsors,
      'Paddling 101':Paddle101, 
    },{
      drawerPosition:'left',
      contentComponent: CustomDrawerComponent,
      drawerWidth: FontSize.FONTSIZE*10,   
      disableGestures:true, 
    },
  );

const styles=StyleSheet.create({
  drawerItemStyle:{
      fontWeight:'600',
      marginLeft:15,

  }

})
