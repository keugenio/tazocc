import React from "react";
import {Image, View, Text, StyleSheet} from 'react-native';
import FontSize from "../../constants/FontSize";
import Colors from '../../constants/Colors';

getImage= function(image) {
  switch (image) {
    case 'paddling101':
        return require('../images/paddling101.png')
      case 'history':
        return require('../images/history.jpg')
      case 'oc1':
        return require('../images/oc1.jpg')
      case 'aboutus':
        return require('../images/aboutus.jpg')                 
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
    backgroundColor:Colors.mainBg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,    
  },
  imageStyle:{ 
    position:'absolute', 
    top:0, 
    opacity:.5, 
    borderColor:'#0d91a1',
    borderWidth:2
  },
  textStyle:{
    color:'#f0f4c3',
    fontWeight:'400',
    fontSize:FontSize.FONTSIZE*2,
    textAlign:'center',
    textShadowColor: '#000000',
    textShadowOffset:{width:5, height:5},
    textShadowRadius:5,
    fontFamily:'Quicksand-Medium'
  }

})