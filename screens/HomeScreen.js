import React from 'react';
import {Image,Platform,ScrollView,StyleSheet,Text,TouchableOpacity,View,Dimensions,FlatList, ActivityIndicator, AsyncStorage} from 'react-native';
import { WebBrowser } from 'expo';
import Colors from '../constants/Colors';
import FontSize from '../constants/FontSize';
import BackgroundImage from '../src/components/BackgroundImage';
import MultipleImage from '../src/components/MultipleImage';
import Philosophies from '../src/components/Philosophies';

const {width, height} = Dimensions.get('window');

export default class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      dataSource:[],
      newPosts:[],
    } 

  }
  _keyExtractor = (item, index) => item.id;
  static navigationOptions = {
    header: null,
  };

  async componentWillMount(){
    try {
      fetch('http://www.tazocc.com//wp-json/wp/v2/posts')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ 
          isLoading: false,
          dataSource: responseJson});
      })
      .then((responseJson) => {
        AsyncStorage.getItem('localStorage').then((localDataSource) =>{
          let localStorage = JSON.parse(localDataSource);
          if (localStorage.length>0){
            this.state.dataSource.forEach(element => {
              if (localStorage.includes(element)==false){
                this.setState({newPosts:[...this.state.newPosts, element.id]})
                
              }

            });
          }         
        })

        let localArr = [];
        this.state.dataSource.forEach(element => {
          localArr.push(element);
        });
        AsyncStorage.setItem('localStorage', JSON.stringify(localArr));
      })
      .catch((error) => {
        console.error(error);
      });

    }
    catch (error) {
      console.error(error);
    }   
  }
  
  _showNewPosts = function() {
    console.log(this.state.newPosts);
  }

  _clearNews = function() {
    AsyncStorage.getItem('localStorage').then((results) =>{
      if (results){
        let localArr = JSON.parse(results);
        localArr.pop();
        AsyncStorage.setItem('localStorage', JSON.stringify(localArr));
        alert(localArr);
      }
      else
        alert('storage empty');
    })
  }
  _showStorage = function () {
    AsyncStorage.getItem('localStorage').then((results) =>{
      if (results)
        alert(results);
      else
        alert('storage empty');
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
    console.log("new posts: " + this.state.newPosts);

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <Image source={require('../src/images/header_copy.png')} style={styles.headerImageStyle}/>
          </View>

          <View style={styles.mainBodyContainer}>
          <View style={{flex: 1, paddingTop:20}}>
          <FlatList
            data={this.state.dataSource}
            renderItem={this._getItem}
            keyExtractor={(item, index) => index.toString()} 
          />
          <View style={[styles.buttonContainer, {width:width*.25}]}>
            <TouchableOpacity onPress={this._showNewPosts} style={styles.buttonPadding}>
              <Text style={styles.buttonText}>Show newPosts</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.buttonContainer, {width:width*.25}]}>
            <TouchableOpacity onPress={this._showStorage} style={styles.buttonPadding}>
              <Text style={styles.buttonText}>Show storage</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.buttonContainer, {width:width*.25}]}>
            <TouchableOpacity onPress={this._clearNews} style={styles.buttonPadding}>
              <Text style={styles.buttonText}>Clear Storage</Text>
            </TouchableOpacity>
          </View> 
          
          </View>          
            <BackgroundImage height={height*.25} width={width} text="News" source={'oc1'} />
            <Image source={require('../src/images/adr2018.jpg')} style={styles.imageStyle}/>             
            
            <MultipleImage height={height*.25} width={width*.5} 
              text={["Events", "Practices"]} 
              source={['shopping cart', 'paddling101']} />
            <Image source={require('../src/images/adr2.jpg')} style={styles.imageStyle}/> 
            <View style={{marginVertical:FontSize.FONTSIZE*2}}>
              <Text style={[{color:'#FFFF00', fontSize:FontSize.FONTSIZE*2, fontFamily:'Broda', textAlign:'center'}]}>our Mission</Text>
              <Text style={styles.mainBodyText}>to promote the Hawaiian culture through competitive and recreational outrigger canoe paddling for youth (keikis), family (ohana), and the community.</Text>            
            </View>
            <MultipleImage height={height*.25} width={width*.5} 
              text={[ "My SCORA info","Smart Waiver"]} 
              source={['hibiscus','smart waiver']} />  
            <Image source={require('../src/images/trailing.jpg')} style={styles.imageStyle}/>  
             
            <Philosophies />  
           
            <MultipleImage height={height*.25} width={width*.5} 
              text={["Shop TAZ", "Sponsors"]} 
              source={['shopping cart', 'sponsors']} />  
                      
            <BackgroundImage height={height*.25} width={width} text="About TAZ" source={'aboutus'} />
            <Image source={require('../src/images/auntyaloha.jpg')} style={[styles.imageStyle,{opacity:.75}]}/>             
          </View>

         
        </ScrollView>

        <View style={styles.messagesContainer}>
          <Text style={styles.tabBarInfoText}> {this.state.newPosts.length} new posts</Text>
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
  p:{
    fontSize: FontSize.FONTSIZE,
    color: '#FFFFFF',  
    fontFamily:'Raleway',  
  },
  pHighlight:{
    color:'#FFFF00',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
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
