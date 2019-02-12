import React from 'react';
import { Icon } from 'expo';
import {Text} from 'react-native';
import FontAwesome, { Icons, IconTypes } from "react-native-fontawesome";
import Colors from '../constants/Colors';

const tabColor = Colors.tabIconDefault;
export default class TabBarIconFA extends React.Component {
  render() {


    return (
      <Text style={{
        margin: 10, 
        fontSize: 26, 
        textAlign: 'center', 
        marginBottom: -3,
        color: tabColor}}>
        <Icon name='news' />
      </Text>
    );
  }
}