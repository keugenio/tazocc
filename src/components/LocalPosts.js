import React, { Component } from 'react';
import {FlatList, View,Text, SafeAreaView} from 'react-native';
import { connect } from 'react-redux';
import SinglePost from './SinglePost';
import Colors from '../../constants/Colors';

class LocalPosts extends Component {
  constructor(props){
    super(props);
    this._renderItem = this._renderItem.bind(this);
  }

  _renderItem = function (post){    
    const {newPostIDs}= this.props.newPosts;
    const { id } = post.item
    
    let aNewPost = false;
    if (newPostIDs.includes(id))
      aNewPost = true;
    return <SinglePost post = {post} textStyle={{color:Colors.primary}} onPress={this.props.onPress} aNewPost={aNewPost}/>
  }

  render(){            
    return(
      <SafeAreaView style={{flex:1, backgroundColor:Colors.mainBg}}>
        <FlatList
          data={this.props.localDataSource}
          renderItem={this._renderItem}
          keyExtractor={post => post.id.toString()}
          contentContainerStyle={{backgroundColor:'#e3f2fd'}}
        />
      </SafeAreaView>
    )
  }
}
const mapStateToProps = state => {  
  return {
    localDataSource: state.localPosts.localDataSource
  }
}
export default connect(mapStateToProps)(LocalPosts);