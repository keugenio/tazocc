import React from 'react';
import {View,Text, StyleSheet, AsyncStorage, FlatList} from 'react-native';
import Colors from '../constants/Colors';
import {FONTSIZE} from '../constants'

export default class News extends React.Component {
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
  constructor(props){
    super(props);
    this.state ={
      dataSource:[]
    }
  }

  componentWillMount(){
    AsyncStorage.getItem('localStorage').then ((result) => {
      this.setState({dataSource:JSON.parse(result)});
    })
  }
  _getItem = function({item}){
    clean = function (text) {
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
    let cleanedText = clean(item.title.rendered);

    return(
      <Text>{cleanedText}</Text>      
    )
  }
    
  render() {
    return( 
      <View style={styles.container}>
      <FlatList
        data={this.state.dataSource}
        renderItem={this._getItem}
        keyExtractor={(item, index) => index.toString()} 
      />
      </View>
    )
  }
}

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
