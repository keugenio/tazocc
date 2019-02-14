import React, { Component } from 'react';
import { View } from 'react-native';
import { Card, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import HtmlText from 'react-native-html-to-text';
import { CardSection } from '../components/common/CardSection';
import * as actions from '../actions';

class SinglePost extends Component {

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

  render(){
    const { id, title, excerpt} = this.props.post.item;
    console.log(this.props);
    return (
      <CardSection>
        <Text>
          {this._cleanText(title.rendered)}
        </Text>
        <View>
          <HtmlText html={this._removeHTMLLink(excerpt.rendered)} />
        </View>
        
      </CardSection>

    )
  }
}


export default connect(null, actions)(SinglePost);