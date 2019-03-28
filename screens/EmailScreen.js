import React from 'react';
import {View,Text, StyleSheet, Linking, Platform} from 'react-native';
import Colors from '../constants/Colors';
import {FONTSIZE} from '../constants'
import TabBarIcon from '../components/TabBarIcon';

export default class EmailScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel:'Email Us',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={
          Platform.OS === 'ios'
            ? `ios-mail`
            : 'md-mail'
        }
      />
    ),
    tabBarOnPress:(()=>{
      Linking.openURL('mailto:teamazoutrigger@gmail.com?subject=Inquiry from TAZ App');
    })
  };

  render() {
    return( 
      <View style={styles.container}>
        <Text style={styles.p}>Email Screen</Text>
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
