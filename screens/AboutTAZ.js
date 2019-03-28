import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView } from 'react-native';
import {Card} from 'react-native-elements';
import Colors from '../constants/Colors';
import FontSize from '../constants/FontSize';

class AboutTAZ extends Component{
  static navigationOptions = {
    title: 'About TAZ',
    headerStyle: {
      backgroundColor: Colors.mainBg,
    },
    headerTintColor: '#FFF',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }
  
  render(){
    const {container, p, lineSpacer, textLeft} = styles;
    return(
      <View style={container}>
        <ScrollView>
        <View style={{marginHorizontal:FontSize*2}}>
          <Card
            title='Our History'
            image={require('../src/images/allen.jpg')}
            imageStyle ={{width:300, alignSelf:'center'}}
            containerStyle={{backgroundColor:'rgba(255,255,255,.1)'}}
            titleStyle={{color:'#FFF', fontSize:FontSize.FONTSIZE+5}}
            >
            <Text style={[p,{fontSize:FontSize.FONTSIZE}]}>
              Team Arizona was founded by Coach Allen Abad.  Coach Allen started paddling in the mid 1960’s with the Leeward Kai Canoe Club.  Leeward Kai Canoe Club was a family oriented club where all members came together to paddle and help the club. In 1968, Coach Allen left Hawaii to serve in the Navy.  After serving four years in the Navy, Coach Allen moved to San Diego in 1972.  {'\n'}{'\n'}
                  
              In 1976, San Diego’s first canoe club was established.  It started as a recreational club, allowing locals to enjoy what they missed from back home.  That club later became Kai Elua Outrigger Canoe Club. {'\n'}{'\n'}

              Coach Allen eventually moved to Arizona and founded Team Arizona (TAZ) Outrigger Canoe Club in 2004.  After a two year battle with pancreatic cancer, Coach Allen passed away in 2009.{'\n'}{'\n'}

              Team Arizona proudly paddles in loving memory of Coach Allen, and strives to honor him each and every time we are in the canoe together.
            </Text>
          </Card> 
          <Card
            containerStyle={{backgroundColor:'rgba(255, 136, 0,.9)', marginBottom:200}}
            >
            <Text style={[p,{fontSize:FontSize.FONTSIZE, color:'#F7FF00'}]}>
              Team Arizona is a standing member of the Southern California Outrigger Canoe Association (SCORA). {'\n'}{'\n'}

              While we practice year long, our racing season starts in May in San Diego, California and ends in Parker Arizona during the fall.  We travel to Hawaii and other states to compete with other clubs and share our aloha.{'\n'}{'\n'}

              Team Arizona members range as young as 10 to 77 years old.  Team Arizona accepts all those interested in outrigger paddling regardless of your skill level.  We are not only an outrigger canoe racing club, we share a special bond as an Ohana (family). E komo mai! Welcome!
            </Text>
          </Card>                    
        </View>
        </ScrollView>
      </View>
    )
  }
}
export default AboutTAZ

const styles = StyleSheet.create({
  container:{
    height:'100%',
    backgroundColor:Colors.mainBg,
  },
  p:{
    fontSize:FontSize.FONTSIZE,
    color:'#FFFFFF'
  },
  lineSpacer:{
    margin:FontSize.FONTSIZE-10
  },
})