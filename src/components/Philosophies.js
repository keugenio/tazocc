
import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, Image, } from 'react-native';
import { Card } from 'react-native-elements';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import FontSize from '../../constants/FontSize';

const {width, height} = Dimensions.get('window');

class Philosophies extends Component{
  constructor() {
    super()
    this.state = {
      activeSlide:0,
      data:[
        {title:'hō\'ihi - respect', text:'treat people, places, and things like they are special'},
        {title:'integrity', text:'choose right over wrong'},
        {title:'ha‘aha‘a - humility', text:'be humble, and a good sport'},
        {title:'mo‘omeheu - culture', text:'promote the hawaiian culture through competitive and recreational outrigger canoe paddling'},
        {title:'komo \'oko\'a - enthusiasm', text:'be happy in everything you do'},
        {title:'\'ike - knowledge', text:'learn, share, and have an open mind'},
        {title:'ho\'aloha - friendship', text:'Make friends for life'},
        {title:'alaka\'i - leadership', text:'guide, teach, encourage, enjoy'}
      ]
    }
  } 
  _renderItem ({item, index}) {
  return (
      <View style={{padding:25}}>
        <Text style={[styles.p, styles.pHighlight, {fontFamily:'Raleway'}]}>{item.title}</Text>
        <Text style={styles.p}>{item.text}</Text>
      </View>
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
                marginHorizontal: 8,
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
      <View style={{flex:1}}>
        <Text style={[p, pHighlight, {fontSize:FontSize.FONTSIZE*2, textAlign:'center'}]}>Our Philosophies</Text>
        <Carousel
        ref={(c) => { this._carousel = c; }}
        data={this.state.data}
        renderItem={this._renderItem}
        sliderWidth={width}
        itemWidth={width*.95} 
        onSnapToItem={(index) => this.setState({ activeSlide: index }) }/>  
        {this.pagination}
      </View>
    )
  } 
}

  export default Philosophies

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