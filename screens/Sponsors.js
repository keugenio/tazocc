import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimesions } from 'react-native';
import Colors from '../constants/Colors';
import FontSize from '../constants/FontSize';

class Sponsors extends Component{
  render(){
    const {container, p} = styles;
    return(
      <View style={container}><Text style={p}>Sponsors</Text></View>
    )
  }
}
export default Sponsors

const styles = StyleSheet.create({
  container:{
    height:'100%',
    backgroundColor:Colors.mainBg,
    alignItems:'center',
    justifyContent:'center',
  },
  p:{
    fontSize:FontSize.FONTSIZE,
    color:'#FFFFFF'
  }
})