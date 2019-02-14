import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimesions } from 'react-native';
import Colors from '../constants/Colors';
import FontSize from '../constants/FontSize';

class Practices extends Component{
  render(){
    const {container, p} = styles;
    return(
      <View style={container}><Text style={p}>Practices</Text></View>
    )
  }
}
export default Practices

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