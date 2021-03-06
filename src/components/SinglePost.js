import React, { Component } from 'react';
import { ScrollView, SafeAreaView, View, TouchableWithoutFeedback, TouchableHighlight, StyleSheet, LayoutAnimation, Dimensions, Modal, WebView, AsyncStorage} from 'react-native';
import { Button, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import HtmlText from 'react-native-html-to-text';
import { CardSection } from '../components/common/CardSection';
import * as actions from '../actions';
import FontSize from '../../constants/FontSize';
import Colors from '../../constants/Colors';
import Icon from '@expo/vector-icons/FontAwesome';
import moment from 'moment';

const {height, width} = Dimensions.get('window');

class SinglePost extends Component {
  constructor(props){
    super(props);
    this.state = {
      modalVisible: false,
    }
    this._selectPostID = this._selectPostID.bind(this)
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  componentWillUpdate(){
    LayoutAnimation.spring();
  }
  _selectPostID(id){   
    this.props.SelectPostID(id); //update redux with selected news item

    // remove the news item from the unread array in redux. redux will update Async storage
    this.props.UpdateNewPostIDs(this.props.unReadNews, id);

    // add this post in read news items array in Async storage
    AsyncStorage.getItem('readNews').then((result)=>{
      let readNewsArr = [];
      if (result)
        readNewsArr = JSON.parse(result);
      readNewsArr.push(id);
      AsyncStorage.setItem('readNews', JSON.stringify(readNewsArr))
    })

    //this.props.onPress(id); <-used to send state change to the parent component
  }
  _cleanText = function (text) {
    var mapObj = {
        '&#8211;':"",
        '&amp;':"&",
        'Fw: ':"",
        'Fwd: ':""
    }

    cleanedText = text.replace(/&#8211|&amp|Fw: |Fwd: /g, function(matched){
      return mapObj[matched];
    });

    cleanedText=cleanedText.replace('undefined; ', "");
    cleanedText=cleanedText.replace('undefined; ', "");

    return cleanedText
  }
  _removeHTMLLink = function (text){
    cleanedText = text.replace(/<a href.*a>/, "");
    
    return cleanedText;
  }
  _renderExcerpt(){
    const {post, expanded} = this.props;
    if (expanded){
      return (
        <View style={styles.excerptStyle}>
            <HtmlText html={this._removeHTMLLink(post.item.excerpt.rendered)} style={{color:'#FFFFFF'}}/>
            <View style={{width:.25*width}}>
              <Button 
                title="More" 
                type="outline" 
                raised={true} 
                buttonStyle={{backgroundColor:Colors.primary, borderColor:'#F8F8F8', borderWidth:1}}
                onPress={() => {this.setModalVisible(true)}}
              />
            </View>
        </View>
      )
    }
  }
  _titleBarBackgroundColor(){
    const { expanded } = this.props;
    const { title} = this.props.post.item;
    if (!expanded) {
      return ({
        backgroundColor:Colors.info
      })   
    } else {
      return ({
        backgroundColor:Colors.primary
      })
    } 
  }
  _titleBarTextStyle(){
    const { expanded } = this.props;
    const { title} = this.props.post.item;
    if (!expanded) {
      return ({
        color:Colors.primary
      })   
    } else {
      return ({
        color:'#F8F8F8',
        fontWeight:'800'
      })
    }     
  }
  _renderTitleBar(){
    const { expanded } = this.props;
    const { title} = this.props.post.item;
    if (!expanded) {
      return (
        <CardSection>
            <Text style={this.props.textStyle}>
              {this._cleanText(title.rendered)} 
            </Text>          
        </CardSection>        
      )
    } else {
      return (
        <CardSection containerStyle={{backgroundColor:Colors.primary}}>
            <Text style={{color:'#F8F8F8', width:'100%'}}>
              {this._cleanText(title.rendered)}
            </Text>          
        </CardSection>      
      )
    }
  }
  _isNewPost(){ 
    if (this.props.aNewPost)
      return (
        <View style={{marginLeft: FontSize.FONTSIZE}}>
          <Icon name="star" size={FontSize.FONTSIZE} color={'#FFFF00'}/>
        </View>
      )
    else
        return null
  }

  render(){    
    const { id, title, content} = this.props.post.item;
    return (
      <SafeAreaView style={{flex:1, backgroundColor:Colors.mainBg}}>
        <View>
        <TouchableWithoutFeedback 
          onPress = {() =>{this._selectPostID(id)}}>
          <View style={this._titleBarBackgroundColor()}>
            <CardSection>
            <View style={{flex:2, flexDirection:'row', alignItems:'stretch'}}>
              <View style={{flex:1}}>
                <Text style={this._titleBarTextStyle()}>
                  {this._cleanText(title.rendered)} 
                </Text> 
              </View>
              <View style={{flex:1, alignItems:'flex-end', flexDirection:'row', justifyContent:'flex-end'}}>
                <Text style={[this._titleBarTextStyle(), {textAlign:'right'}]}>
                  {moment(this.props.post.item.date).format("MMM D")}
                </Text> 
                {this._isNewPost()}                      
              </View>              
            </View>
            </CardSection>          

            <View style={{backgroundColor:'rgb(13,71,161)'}}>
              {this._renderExcerpt()}
            </View>
          </View>
        </TouchableWithoutFeedback>
        
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');

          }}>

            <ScrollView contentContainerStyle={{flex:1, marginTop:FONTSIZE}}>
             <View style={{flex:1, marginTop:FontSize.FONTSIZE*4}}>
              <WebView 
                style={{flex:1}} 
                originWhitelist={['*']}
                source={{html: content.rendered}}
                
              />
             </View>
              <TouchableHighlight
                style={styles.buttonClose}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text><Icon name="times-circle"  size={FontSize.FONTSIZE} /></Text>
              </TouchableHighlight>
            </ScrollView>

        </Modal>
      </View>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = (state, ownProps) => {

  const expanded = state.selectedPostID === ownProps.post.item.id;
  // for the first time the app install, set all news items as new.  
  // after that, it depends if it's on the newPost.IDs array
  let aNewPost =  true;
  if (state.newPosts.IDs)
    aNewPost = state.newPosts.IDs.includes(ownProps.post.item.id);

  return {
    expanded:expanded,
    aNewPost:aNewPost,
    unReadNews:state.newPosts.IDs,
  }
};

const styles = StyleSheet.create({
  excerptStyle:{
    padding: FontSize.FONTSIZE,
    justifyContent:'center',
    alignItems:'center',
  },
  buttonClose:{
    position:'absolute',
    top: FontSize.FONTSIZE*2,
    right:15
  }
});


export default connect(mapStateToProps, actions)(SinglePost);