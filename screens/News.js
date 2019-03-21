import React from 'react';
import {View, SafeAreaView, StyleSheet, AsyncStorage} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../src/actions';

import LocalPosts from '../src/components/LocalPosts';

import Colors from '../constants/Colors';
import {FONTSIZE} from '../constants'

class News extends React.Component {
  constructor(props){
    super(props)
    this._handleOnPress=this._handleOnPress.bind(this);

    AsyncStorage.getItem('localDataStorage').then( (results)=> {
      this.props.UpdateLocalDataSource(JSON.parse(results))
      }
    );
    AsyncStorage.getItem('unReadNews').then( (results)=> {
      this.props.SetNewPostIDs(JSON.parse(results))
      }
    );
  }
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

  _handleOnPress(id){

    const index = newPosts.IDs.indexOf(id);
    
    // update unread in redux to trigger badge on tab bar icon.  Redux will remove id from state as well as unread
    // news items in storage.
    // add id to read items in Async Storage. 
    if (index>=0){      
      this.props.UpdateNewPostIDs(newPostIDs, id);
      AsyncStorage.getItem("readNews").then((results)=>{
        if (results){
          unreadNewsArr = JSON.parse(results);
          unreadNewsArr.push(id);
          AsyncStorage.setItem("readNews", JSON.stringify(unreadNewsArr))
        }
      })
    }
  }

  render() {    
    
    return( 
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <LocalPosts onPress={this._handleOnPress}  /> 
        </View>
      </SafeAreaView>

    )
  }
}
const mapStateToProps = (state) => {    
    return {
      localDataSource :state.localDataSource.localDataSource,
      newPosts:{
        IDs: state.newPosts.postIDs
      }
    }
}
export default connect(mapStateToProps, actions)(News);

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
