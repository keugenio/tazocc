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

const CustomDrawerComponent =(props) =>(
  <SafeAreaView> 
    <ScrollView>
      <View style={{flexDirection:'column', justifyContent:'space-around'}}>
        <View style={{flex:4, height:height*.75, backgroundColor:'rgba(255,255,255,.5)'}} >
          <DrawerItems {...props}/>
          <View style={{flexDirection:'column'}}>
            <View>
              <TouchableOpacity onPress={() => { WebBrowser.openBrowserAsync('https://www.scoraregistration.com/paddler_login')}}>
                <Text style={styles.drawerItemStyle}>SCORA Login</Text>
              </TouchableOpacity>
            </View>
            <View style={{marginTop:20}}>
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
const DrawerNavigator = createDrawerNavigator({
    Events:Events,
    Practices:Practices,
    AboutTAZ:AboutTAZ,
    Sponsors:Sponsors,
  },{
    drawerPosition:'right',
    contentComponent: CustomDrawerComponent,
    drawerWidth: FontSize.FONTSIZE*10,
  
  });

const MoreNavigator = createStackNavigator({    
    DrawerNavigator:{
        screen: DrawerNavigator
    }
  },{
    navigationOptions: ({ navigation }) => ({
        tabBarLabel: 'More',
        tabBarIcon: ({ focused }) => (
            <TouchableOpacity  onPress={() => {navigation.dispatch(DrawerActions.openDrawer())} }>
              <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'} />
            </TouchableOpacity>       
          )
               
    })
});

export default createBottomTabNavigator(
  {
    HomeStack,
    EmailStack,
    NewsStack,
    MoreNavigator,

  }, {
      tabBarOptions: {
          activeTintColor: Colors.warning,  // Color of tab when pressed
          inactiveTintColor: Colors.info, // Color of tab when not pressed
          showIcon: 'true', // Shows an icon for both iOS and Android
          showLabel: (Platform.OS !== 'android'), //No label for Android
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
