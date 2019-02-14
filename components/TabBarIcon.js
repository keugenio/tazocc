import React from 'react';
import {AsyncStorage, View, Text} from 'react-native';
import {Badge} from 'react-native-elements';

import { Icon } from 'expo';

import Colors from '../constants/Colors';

export default class TabBarIcon extends React.Component {
  constructor(){
    super();
    this.state={
      newPostCount:0
    }
  }
  async componentWillMount(){
    const newPostCount = await AsyncStorage.getItem('newPostCount');
    this.setState({newPostCount:parseInt(newPostCount)})
  }
  _getBadge = function () {
    if ((this.props.name == 'ios-notifications' || this.props.name == 'md-notifications') && this.state.newPostCount>0 )
      return (
        <Badge 
          value={this.state.newPostCount}  
          status="warning" 
          containerStyle={{ position: 'absolute', top: -5, right: -15 }}
        />
      )
  }
  render() {
    return (
      <View>
        <Icon.Ionicons
          name={this.props.name}
          size={26}
          style={{ marginBottom: -3 }}
          color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
        />
        {this._getBadge()}
      </View>

    );
  }
}