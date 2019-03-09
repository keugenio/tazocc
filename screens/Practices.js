import React, {Component} from 'react';
import {View, Text, StyleSheet, Platform, Linking, ScrollView, ListView , Image, Dimensions} from 'react-native';
import { Card, Button } from 'react-native-elements';
import Colors from '../constants/Colors';
import FontSize from '../constants/FontSize';
import Icon from '@expo/vector-icons/FontAwesome';

const {height, width}=Dimensions.get('window');

class Practices extends Component{
  static navigationOptions = {
    title: 'Practices',
    headerStyle: {
      backgroundColor: Colors.mainBg,
    },
    headerTintColor: '#FFF',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };  
  constructor() {
    super();
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }).cloneWithRows([
        'From Loop 202 in Tempe, exit on Scottsdale Road and head North.  You must immediately get into the leftmost lane.  You’ll see the Carvana glass structure to your left.', 
        'Turn at the first left on E. Gilbert Dr.', 
        'Follow E. Gilbert Drive westward and the marina entrance is right after the overpass.',
        'Park anywhere in the parking lot and we gather on the west side of the boatyard.  Look for the blue and white canoes.'
      ]),
    };
  }

  renderRow(data) {
    return (
      <Text style={{fontSize:FontSize.FONTSIZE}}>{`\u2022 ${data}`}</Text>
    );
  }
  _handleOnPress= function (){
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${33.4346562},${-111.9347937}`;
    const label = 'Team Arizona Practice Site';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });    
    Linking.openURL(url); 
  }
  _getHeja = function () {
    const heja = Platform.select({
      ios: `Team Arizona uses the Heja app for scheduling practices.  Download it from the App Store. Use our team code `,
      android: `Team Arizona uses the Heja app for scheduling practices.  Download it from the Google Play Store. Use our team code `
    });        
    return heja;
  }
  render(){
    const {container, p, lineSpacer, textLeft} = styles;
    return(
      <View style={container}>
        <ScrollView>
        <Image source={require('../src/images/practice_3.jpg')} style={styles.imageStyle}/>
        <View style={{marginHorizontal:FontSize*2}}>
          <View style={[lineSpacer, textLeft]}><Text style={[p, {textAlign:'center', fontSize:FontSize.FONTSIZE+5, fontWeight:'700'}]}>Team Arizona holds practices</Text></View>
          <View style={[lineSpacer]}><Text style={[p, {textAlign:'left'}]}>Tuesday Evenings 6:00pm  (Open Practice, Women and Men split)</Text></View>
          <View style={[lineSpacer]}><Text style={[p, {textAlign:'left'}]}>Thursday Evenings 6:00pm (Open Practice){"\n"}</Text></View>
          <View style={[lineSpacer]}><Text style={[p, {textAlign:'left'}]}>Saturday Mornings 8:00am (Open Practice){"\n"}</Text></View>
          <View style={[lineSpacer]}><Text style={[p, {textAlign:'left'}]}>Practices are held on the north side of Tempe Town Lake at the marina.{"\n"}</Text></View>
          <View style={[lineSpacer]}><Text style={[p, {textAlign:'center'}]}>550 E Tempe Town Lake{"\n"}Tempe, AZ 85281
          </Text></View>
          <View style={{padding:FontSize.FONTSIZE}}>
          <Card
            containerStyle={{backgroundColor:Colors.warning}}
            title='Directions to the marina:'>
            <ListView
              style={{marginHorizontal:FontSize.FONTSIZE}}
              dataSource={this.state.dataSource}
              renderRow={this.renderRow}
            />
            <Button
              icon={<Icon name='car' color='#ffffff' />}
              backgroundColor='#03A9F4'
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
              title=' Directions'
              onPress={this._handleOnPress} 
              containerStyle={{marginTop:FontSize.FONTSIZE+10}}
              />
          </Card>
          <Card containerStyle={{backgroundColor:Colors.success}}>            
              <Text style={{color:'#FFFF00', fontSize:FontSize.FONTSIZE}}>
                {this._getHeja()}{'\n'}
                <Text style={{textAlign:'center', fontWeight:'700', fontSize:FontSize.FONTSIZE+5}}>RPXH</Text> {'\n'}
                to sign up for practices
              </Text>
          </Card> 

          </View>
          <Image source={require('../src/images/oc1.jpg')} style={styles.imageStyle}/>          
        </View>
        </ScrollView>
      </View>
    )
  }
}
export default Practices

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
  },
  imageStyle: {
    height:.35*height,
    width,
    resizeMode:'contain',
    marginTop:10,
    marginBottom:10
  },
})