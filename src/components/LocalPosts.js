import React, { Component } from 'react';
import {FlatList} from 'react-native';
import { connect } from 'react-redux';
import SinglePost from './SinglePost';
import Colors from '../../constants/Colors';

class LocalPosts extends Component {
  renderItem(post){
    return <SinglePost post = {post} textStyle={{color:Colors.primary}}/>
  }

  render(){
    
    return(
      <FlatList
        data={this.props.localDataSource}
        renderItem={this.renderItem}
        keyExtractor={post => post.id.toString()}
        contentContainerStyle={{backgroundColor:'#e3f2fd'}}
      />
    )
  }
}
const mapStateToProps = state => {
  return {
    localDataSource: state.localDataSource
  }
}
export default connect(mapStateToProps)(LocalPosts);