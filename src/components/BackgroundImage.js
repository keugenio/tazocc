import React from "react";
import {Image, View, Text, StyleSheet} from 'react-native';
import FontSize from "../../constants/FontSize";
import Colors from '../../constants/Colors';

getImage= function(image) {
  switch (image) {
    case 'paddling101':
      return require('../images/paddling101.jpg')
      case 'history':
      return require('../images/history.jpg')
  
    default:
      break;
  }
}
const BackgroundImage = (props) =>{
  const {source, width, height, text} = props;

  return (
    <View style={styles.containerStyle}>
      <Image blurRadius={1} source={this.getImage(source)} style={[styles.imageStyle, {height, width}]} /> 
      <View style={{height, width, justifyContent:'center', alignItems:'center', paddingHorizontal:20}}>
        <Text style={styles.textStyle}>{text}</Text>
      </View>
    </View>
  )
}

export default BackgroundImage

const styles = StyleSheet.create({
  containerStyle:{
    flex:1,
    backgroundColor:Colors.mainBg
  },
  imageStyle:{ 
    position:'absolute', 
    top:0, 
    opacity:.5, 
    borderColor:Colors.primaryBorder,
    borderWidth:2
  },
  textStyle:{
    color:'#f0f4c3',
    fontWeight:'400',
    fontSize:FontSize.FONTSIZE*2,
    textAlign:'center',
    textShadowColor: '#000000',
    textShadowOffset:{width:5, height:5},
    textShadowRadius:5
  }

})