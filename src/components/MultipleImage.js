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
      case 'practice2':
        return require('../images/practice2.jpg')
        case 'oc1':
        return require('../images/oc1.jpg')        
      case 'aboutus':
        return require('../images/aboutus.jpg')   
      case 'events':
        return require('../images/events.png')  
      case 'hibiscus':
        return require('../images/hibiscus.png')  
      case 'smart waiver':
        return require('../images/smart_waiver.png')                                
      case 'shopping cart':
        return require('../images/shopping-cart.png')  
      case 'sponsors':
        return require('../images/aunty-aloha.jpg')                    
    default:
      break;
  }
}

const MultipleImage = (props) =>{
  const {source, width, height, text} = props;

  return (
    <View style={styles.containerStyle}>
      <Image blurRadius={1} source={this.getImage(source[0])} style={[styles.imageStyle, {height, width}]} /> 
      <View style={{height, width, justifyContent:'center', alignItems:'center', paddingHorizontal:20}}>
        <Text style={styles.textStyle}>{text[0]}</Text>
      </View>

      <Image blurRadius={1} source={this.getImage(source[1])} style={[styles.imageStyle, {height, width, right:0}]} /> 
      <View style={{height, width, justifyContent:'center', alignItems:'center', paddingHorizontal:20}}>
        <Text style={styles.textStyle}>{text[1]}</Text>
      </View>      
    </View>
  )
}

export default MultipleImage

const styles = StyleSheet.create({
  containerStyle:{
    flex:1,
    flexDirection:'row',
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
    borderWidth:2,
    resizeMode:'contain',
    tintColor:'#44a4f2'
  },
  textStyle:{
    color:'#f0f4c3',
    fontWeight:'400',
    fontSize:FontSize.FONTSIZE+10,
    textAlign:'center',
    textShadowColor: '#000000',
    textShadowOffset:{width:5, height:5},
    textShadowRadius:5,
    fontFamily:'Quicksand-Medium'
  }

})