import React from 'react';
import {View, StyleSheet} from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../src/reducers';
import LocalPosts from '../src/components/LocalPosts';

import Colors from '../constants/Colors';
import {FONTSIZE} from '../constants'

export default class News extends React.Component {
  static navigationOptions = {
    title: 'TAZ News and Messages',
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
      <Provider store={createStore(reducers)}>
        <View style={styles.container}>
          <LocalPosts />
        </View>
      </Provider>
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
