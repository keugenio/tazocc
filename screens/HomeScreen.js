import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  WebView
} from 'react-native';
import { WebBrowser } from 'expo';
import Colors from '../constants/Colors';
import FontSize from '../constants/FontSize';
import BackgroundImage from '../src/components/BackgroundImage';
import MultipleImage from '../src/components/MultipleImage';

const {width, height} = Dimensions.get('window');


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <Image source={require('../src/images/header_copy.png')} style={styles.headerImageStyle}/>
          </View>

          <View style={styles.mainBodyContainer}>
            <BackgroundImage height={height*.25} width={width} text="News" source={'oc1'} />
            <Image source={require('../src/images/adr2018.jpg')} style={styles.imageStyle}/>             
            
            <MultipleImage height={height*.25} width={width*.5} 
              text={["Events", "Practices"]} 
              source={['shopping cart', 'paddling101']} />
            <Image source={require('../src/images/adr2.jpg')} style={styles.imageStyle}/> 
            <View style={styles.fillerContainer}>
              <Text style={styles.mainBodyText}>our Mission: to promote the Hawaiian culture through competitive and recreational outrigger canoe paddling for youth (keikis), family (ohana), and the community.</Text>            
            </View>
            <MultipleImage height={height*.25} width={width*.5} 
              text={[ "My SCORA info","Smart Waiver"]} 
              source={['hibiscus','smart waiver']} />  
            <Image source={require('../src/images/trailing.jpg')} style={styles.imageStyle}/>   
            <View style={styles.fillerContainer}>
            
              <Text style={styles.mainBodyText}>our philosophies</Text>  
        
            </View>            
            <MultipleImage height={height*.25} width={width*.5} 
              text={["Shop TAZ", "Sponsors"]} 
              source={['shopping cart', 'sponsors']} />  
                      
            <BackgroundImage height={height*.25} width={width} text="About TAZ" source={'aboutus'} />
            <Image source={require('../src/images/practice2.jpg')} style={styles.imageStyle}/>             

                     
          </View>

          <View style={[styles.buttonContainer, {width:width*.25}]}>
            <TouchableOpacity onPress={this._handleOnlineWaiver} style={styles.buttonPadding}>
              <Text style={styles.buttonText}>Smart Waiver</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.buttonContainer, {width:width*.25}]}>
            <TouchableOpacity onPress={this._handleSCORA} style={styles.buttonPadding}>
              <Text style={styles.buttonText}>My SCORA Info</Text>
            </TouchableOpacity>
          </View>          
        </ScrollView>

        <View style={styles.messagesContainer}>
          <Text style={styles.tabBarInfoText}>New Messages go here</Text>
        </View>
      </View>
    );
  }

  _handleSCORA = () => {
    WebBrowser.openBrowserAsync('https://www.scoraregistration.com/paddler_login');
  };

  _handleOnlineWaiver = () => {
    WebBrowser.openBrowserAsync(
      'https://waiver.smartwaiver.com/w/5bfc43ae42c8a/web/'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainBg,
    paddingBottom:50
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(255,255,255,0.9)',
    fontSize: FontSize.FONTSIZE,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
    alignItems:'center',
    justifyContent:'center'
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  mainBodyContainer: {
    alignItems:'stretch',
    flex:1
  },
  homeScreenFilename: {
    marginVertical: 7,
  },

  mainBodyText: {
    fontSize: FontSize.FONTSIZE,
    color: 'rgba(227, 242, 253, 1)',
    lineHeight: FontSize.FONTSIZE,
    textAlign: 'center',
    fontFamily:'Raleway',
  },
  fillerContainer:{
    margin:20,

  },
  messagesContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: FONTSIZE-5,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  buttonContainer: {
    marginTop: 15,
    alignItems: 'center',
    backgroundColor: '#2962ff',
    borderStyle:'solid',
    borderColor:'#1e88e5',
    borderWidth:FontSize.FONTSIZE/10,
    borderRadius:FontSize.FONTSIZE/5
  },
  buttonPadding: {
    paddingVertical: FontSize.FONTSIZE-5,
  },
  buttonText: {
    fontSize: FontSize.FONTSIZE-3,
    color: '#e3f2fd',
  },
  imageStyle: {
    height:.35*height,
    width,
    resizeMode:'cover',
    marginTop:10,
    marginBottom:10
  },
  headerImageStyle:{
    height:.25*height,
    width,
    resizeMode:'contain',
    tintColor:'#44a4f2',    
  }
});
