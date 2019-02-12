import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimesions } from 'react-native';
import Colors from '../constants/Colors';
import FontSize from '../constants/FontSize';

class AboutTAZ extends Component{
  render(){
    const {container, p} = styles;
    return(
      <View style={container}><Text style={p}>About TAZ</Text></View>
    )
  }
}
export default AboutTAZ

const styles = StyleSheet.create({
  container:{
    backgroundColor:Colors.mainBg,
  },
  p:{
    fontSize:FontSize.FONTSIZE,
    color:'#FFFFFF'
  }
})