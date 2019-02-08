import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native';
import { WebBrowser } from 'expo';
import Colors from '../constants/Colors';
import FontSize from '../constants/FontSize';
import { MonoText } from '../components/StyledText';
import BackgroundImage from '../src/components/BackgroundImage';

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
            <Text>Header</Text>
          </View>

          <View style={styles.mainBodyContainer}>
            <BackgroundImage height={height*.25} width={width} text="Paddling 101" source={'paddling101'} />
            <Image source={require('../src/images/canoe_repair.jpg')} style={{width, height:.25*height}}/>
            <BackgroundImage height={height*.25} width={width} text="History" source={'history'} />
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
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(255,255,255,0.9)',
    fontSize: FONTSIZE,
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
    flex:1,
    backgroundColor:'#FF0000'
  },
  homeScreenFilename: {
    marginVertical: 7,
  },

  mainBodyText: {
    fontSize: FONTSIZE,
    color: 'rgba(227, 242, 253, 1)',
    lineHeight: FONTSIZE+7,
    textAlign: 'center',
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
    borderWidth:FONTSIZE/10,
    borderRadius:FONTSIZE/5
  },
  buttonPadding: {
    paddingVertical: FONTSIZE-5,
  },
  buttonText: {
    fontSize: FONTSIZE-3,
    color: '#e3f2fd',
  },
});
