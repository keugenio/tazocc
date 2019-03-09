import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import {Card} from 'react-native-elements';
import Colors from '../constants/Colors';
import FontSize from '../constants/FontSize';

class Sponsors extends Component{
  render(){
    const {container, p, lineSpacer, textLeft} = styles;
    return(        
      <View style={container}>
        <ScrollView>
          <View style={[lineSpacer]}>
            <Text style={[p, {textAlign:'center', fontSize:FontSize.FONTSIZE+5, fontWeight:'700'}]}>Visit our Sponsors</Text>
          </View>
          <View style={[lineSpacer, {flex:1}]}>
            <Text style={p}>
            We have had many business acknowledge and support our organization. Their sponsorship helps Team Arizona accomplish our goals and preserve our traditions and philosophy We ask that you show your kokua (support) our sponsors and all they do for us.
            </Text>
          </View>
          <View style={{flex:1}}>
            <Card
            containerStyle={{backgroundColor:'#00C851'}}
            title='Coconuts Fish Cafe'
          >
            <View style={{marginBottom:FontSize.FONTSIZE}}>
              <Image source= {require('../src/images/coconuts.png')} style={{resizeMode:'contain', alignSelf:'center'}} ></Image>
            </View>
            <View style={{marginBottom:FontSize.FONTSIZE}}>
              <Text>
                16640 N Scottsdale Rd. Suite #103{'\n'}
                Scottsdale, AZ 85254{'\n'}
                (480) 275-6690
              </Text>
            </View> 
            <View style={{marginBottom:FontSize.FONTSIZE}}>
              <Text>
                7366 E. Shea Blvd Suite #110{'\n'}
                Scottsdale, AZ 85260{'\n'}
                (480) 596-2987
              </Text>
            </View>
            <View style={{marginBottom:FontSize.FONTSIZE}}>
              <Text>
                1155 W. Ocotillo Rd. Suite #1{'\n'}
                Chandler, AZ 85248 {'\n'}
                (480) 247-7900
              </Text>
            </View>                        
          </Card>
          </View>
          <View style={{flex:1}}>
            <Card
              containerStyle={{backgroundColor:'rgb(187,51,255)'}}
              title='Sack Time Mattress'
            >
              <View style={{marginBottom:FontSize.FONTSIZE}}>
                <Image source= {require('../src/images/sacktime.png')} style={{resizeMode:'contain', alignSelf:'center'}} ></Image>
              </View>
              <View style={{marginBottom:FontSize.FONTSIZE}}>
                <Text>
                14224 N. Scottsdale Road {'\n'}
                Scottsdale, AZ 85254 {'\n'}
                tel: 480-948-1874
                </Text>
              </View>
              <View style={{marginBottom:FontSize.FONTSIZE}}>
                <Text>
                10640 N. 71st Place {'\n'} 
                Scottsdale, AZ 85254 {'\n'}
                Tel: 480 – 948 – 4560
                </Text>
              </View>                                    
            </Card>
          </View>          
          <View style={{flex:1}}>
            <Card
              containerStyle={{backgroundColor:Colors.info}}
              title='Aunty Aloha Leis'
            >
              <View style={{marginBottom:FontSize.FONTSIZE}}>
                <Image source= {require('../src/images/auntyaloha.jpg')} style={{resizeMode:'contain', alignSelf:'center'}} ></Image>
              </View>
              <View style={{marginBottom:FontSize.FONTSIZE}}>
                <Text>
                Leis for all your celebrations. Graduations, Birthdays, Weddings or Reunions, no order is too small{'\n'}{'\n'}
                contact any TAZ member or call {'\n'}
                tel: 650-483-7271
                </Text>
              </View>

            </Card>
          </View>
          </ScrollView> 
      </View>
    )
  }
}
export default Sponsors

const styles = StyleSheet.create({
  container:{
    height:'100%',
    backgroundColor:Colors.mainBg,
    alignItems:'center',
    justifyContent:'center',
  },
  p:{
    fontSize:FontSize.FONTSIZE,
    color:'#FFFFFF'
  },
  lineSpacer:{
    margin:FontSize.FONTSIZE-10
  },
  textLeft:{
    textAlign:'left'
  }
})