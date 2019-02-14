import React, { Component } from 'react';
import {FlatList} from 'react-native';
import { connect } from 'react-redux';
import SinglePost from './SinglePost';

class LocalPosts extends Component {
  renderItem(post){
    return <SinglePost post = {post} />
  }

  render(){
    console.log("lds", this.props.localDataSource );
    
    return(
      <FlatList
        data={this.props.localDataSource}
        renderItem={this.renderItem}
        keyExtractor={post => post.id.toString()}
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