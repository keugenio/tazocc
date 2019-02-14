import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, StyleSheet, LayoutAnimation} from 'react-native';
import { Card, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import HtmlText from 'react-native-html-to-text';
import { CardSection } from '../components/common/CardSection';
import * as actions from '../actions';
import FontSize from '../../constants/FontSize';
import Colors from '../../constants/Colors';

class SinglePost extends Component {
  componentWillUpdate(){
    LayoutAnimation.spring();
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
  render(){
    const { id, title} = this.props.post.item;
    return (
      <TouchableWithoutFeedback 
        onPress = {() =>{this.props.SelectPostID(id)}}>
        <View style={this._titleBarBackgroundColor()}>
          <CardSection>
              <Text style={this._titleBarTextStyle()}>
                {this._cleanText(title.rendered)}
              </Text>          
          </CardSection>          

          <View style={{backgroundColor:'rgb(13,71,161)'}}>
            {this._renderExcerpt()}
          </View>
        </View>
      </TouchableWithoutFeedback>

    )
  }
}

const styles = StyleSheet.create({
  excerptStyle:{
    padding: FontSize.FONTSIZE
  }
});

const mapStateToProps = (state, ownProps) => {
  const expanded = state.selectedPostID === ownProps.post.item.id;
  return {expanded:expanded}
};

export default connect(mapStateToProps, actions)(SinglePost);