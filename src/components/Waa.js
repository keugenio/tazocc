
import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, Image, } from 'react-native';
import { Card } from 'react-native-elements';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import FontSize from '../../constants/FontSize';

const {width, height} = Dimensions.get('window');

class Waa extends Component{
  constructor() {
    super()
    this.state = {
      activeSlide:0,
      data:[
        {title:'wa\‘a', text:'generic term for canoe'},
        {title:'heihei', text:'a race of any kind including a canoe race'},
        {title:'\‘au wa\‘a', text:'a fleet of canoes'},
        {title:'\‘auwa\‘a \‘a ho\‘\`apipi', text:'two canoes hastily joined to form or to use as a double canoe'},
        {title:'wa\‘a kaulua', text:'another term for double canoe'},
        {title:'kaukahi', text:'a single canoe with an outrigger'},
        {title:'kialoa', text:'a long, light, and swift canoe used for racing & display. This term may also refer to a beautiful woman and her shape. Queen Ka\‘ahumanu was referred to as \“Kialoa\” in her youth'},
        {title:'Ko\‘okahi', text:'OC1'},
        {title:'Ko\‘olua', text:'OC2'},
        {title:'Ko\‘oha', text:'OC4'},
        {title:'Ko\‘eono', text:'OC6'},
        {title:'Wa\‘a \‘Apulu', text:'an old, worn-out canoe. Also an old person. You see, the old time Hawaiians DID have a real sense of humor'},
      ]
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  _renderItem ({item, index}) {
  return (

        <Card 
          containerStyle={{
            backgroundColor:'rgba(230,126,34,.85)'
          }} 
          titleStyle = {{
            fontSize: FontSize.FONTSIZE,
            textAlign:'center',
            color:'#FFFF00',
            fontFamily:'Raleway',        
          }}
          title={item.title}
          >
          <Text style={styles.p}>{item.text}</Text>      
        </Card>
  );
  }
  get pagination () {
      const { data, activeSlide } = this.state;
      return (
          <Pagination
            dotsLength={data.length}
            activeDotIndex={activeSlide}
            containerStyle={{ backgroundColor: 'transparent'}}
            dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 1,
                backgroundColor: 'rgba(255, 255, 255, 0.92)'
            }}
            inactiveDotStyle={{
                // Define styles for inactive dots here
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
      );
  } 

  render(){
    const {p, pHighlight} =  styles;
    
    return (
      <View>
        <Text style={[p, pHighlight, {fontSize:FontSize.FONTSIZE*2.5, textAlign:'center'}]}>Hawaiian Canoes Terms</Text>
        {this.pagination}
      
        <Carousel
        loop
        ref={(c) => { this._carousel = c; }}
        data={this.state.data}
        renderItem={this._renderItem}
        sliderWidth={width*.85}
        itemWidth={width*.80} 
        onSnapToItem={(index) => this.setState({ activeSlide: index }) }/>  

      </View>
    )
  } 
}

export default Waa

const styles = StyleSheet.create({
  p:{
    fontSize: FontSize.FONTSIZE,
    color: '#FFFFFF',  
    fontFamily:'Raleway', 
    textAlign:'center' 
  },
  pHighlight:{
    color:'#FFFF00',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    fontFamily:'Broda',
  },
})