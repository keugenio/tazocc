import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import DrawerNavigator from './DrawerNavigator';

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  
  // in the future, this route could point to a screen with video that plays
  // while the backend loads. then a button appears to enter into the app when done.
  // Main: MainTabNavigator,  

  Dashboard: { screen: DrawerNavigator },
  },
  {
    initialRouteName: 'Dashboard',
  }
  
));