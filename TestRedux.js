import React, { Component } from 'react';
import {View} from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './src/reducers';
import LocalPosts from './src/components/LocalPosts';

class TestRedux extends Component {
  render(){
    return(
      <Provider store={createStore(reducers)}>
      <View>
        <LocalPosts />
      </View>
      </Provider>
    )
  }
}

export default TestRedux