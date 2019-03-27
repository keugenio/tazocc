
import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, Image, } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import FontSize from '../../constants/FontSize';
import { Card } from 'react-native-elements';
import Colors from '../../constants/Colors';

const {width, height} = Dimensions.get('window');

class Olelo extends Component{
  constructor() {
    super()
    this.state = {
      activeSlide:0,
      data:[
        {title:'\‘E \‘E!', text:'pronounced ay ay (this is hard to describe.. actually a very short \“e\”). Get in the canoe!'},
        {title:'HO\‘OMAKAUKAU!', text:'pronounced Ho oh MAH cow cow. Get ready or get set!'},
        {title:'E KAUPE!', text:'pronounced Eh kah oo peh. Poised to plant the blade in the water.'},
        {title:'HOE', text:'pronounced ho aee. Paddle! And off you go.'},
        {title:'UNE', text:'pronounced OO-NAY. To \“lever\". This is the action to help HO\‘OKELE (steerer) turn the bow of the canoe.'},
        {title:'KAHI', text:'pronounced, KAH-HEE. Planting the blade out on the left side and pulling water under the canoe to help turn the front of the canoe to the left.'},
      ]
    }
  }

  _renderItem ({item, index}) {
  return (
      <Card 
        containerStyle={{
          backgroundColor:'rgba(46,204,113,.85)'
        }} 
        titleStyle = {{
          fontSize: FontSize.FONTSIZE,
          textAlign:'center',
          color:Colors.mainBg,
          fontFamily:'Raleway',        
        }}
        title={item.title}
        dividerStyle={{backgroundColor:Colors.mainBg}}
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
      <View style={{justifyContent:'flex-start',alignItems:'center', padding:0}}>
        <Text style={[p, pHighlight, {fontSize:FontSize.FONTSIZE*2.5, textAlign:'center'}]}>Outrigger Paddling Terms</Text>

        {this.pagination}
          <Carousel
            ref={(c) => { this._carousel = c; }}
            data={this.state.data}
            renderItem={this._renderItem}
            sliderWidth={width*.85}
            itemWidth={width*.85} 
            onSnapToItem={(index) => this.setState({ activeSlide: index })}
            loop
            autoplay
          />  
      </View>
    )
  } 
}

  export default Olelo

const styles = StyleSheet.create({
  p:{
    fontSize: FontSize.FONTSIZE,
    color: Colors.mainBg,  
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