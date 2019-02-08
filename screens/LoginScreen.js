import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Colors from '../constants/Colors';
import {FONTSIZE} from '../constants'

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
    headerStyle: {
      backgroundColor: Colors.mainBg,
    },
    headerTintColor: '#FFF',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  render() {
    return( 
      <View style={styles.container}>
        <Text style={styles.p}>Login</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: Colors.mainBg
  },
  p:{
    fontSize: FONTSIZE,
    color:'#FFF'
  }
})