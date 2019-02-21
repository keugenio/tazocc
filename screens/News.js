import React from 'react';
import {View,Text, StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../src/actions';

import LocalPosts from '../src/components/LocalPosts';

import Colors from '../constants/Colors';
import {FONTSIZE} from '../constants'

class News extends React.Component {
  constructor(props){
    super(props)
    this._handleOnPress=this._handleOnPress.bind(this);

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
    const {newPostsCount, newPostIDs} = this.props.newPosts;
    const index = newPostIDs.indexOf(id);
    if (index>=0){      
      this.props.UpdateNewPostIDs(newPostIDs, id);
      this.props.UpdateNewPostCount(newPostsCount);
    }
  }
  render() {    
    return( 
        <View style={styles.container}>
          <LocalPosts onPress={this._handleOnPress} newPosts={this.props.newPosts}/>
        </View>

    )
  }
}
const mapStateToProps = (state) => {
  return {
    newPosts:{
      newPostsCount: state.newPosts.postCount,
      newPostIDs: state.newPosts.postIDs
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
