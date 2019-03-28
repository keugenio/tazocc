import React from 'react';
import { createBottomTabNavigator} from 'react-navigation';
import Home from '../screens/HomeScreen';
import Practices from '../screens/Practices';
import News from '../screens/News';
import Email from '../screens/EmailScreen';
import Colors from '../constants/Colors';
import FontSize from '../constants/FontSize';

export default createBottomTabNavigator(
  {
    'Team Arizona OCC': Home,
    'Contact TAZ': Email,
    'TAZ News and Events':News,
    'TAZ Practices': Practices,
  }, {
      tabBarOptions: {
        activeTintColor: Colors.warning,
        inactiveTintColor:'#FFFFFF',
        labelStyle: {
        fontSize: FontSize.FONTSIZE,
        },
        style: {
          backgroundColor: Colors.mainBg,
        },
      },
      navigationOptions:({navigation}) => {
        const routeName = navigation.state.routes[navigation.state.index].routeName;
        return {
          headerTitle:routeName,
          headerStyle: {
            backgroundColor: Colors.mainBg,
          },
          headerTintColor: '#FFF',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: FontSize.FONTSIZE+5
          },          
        }
      }

  }
);
